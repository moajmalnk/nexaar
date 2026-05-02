// Utility helper to handle saving and syncing of leads

const LOCAL_STORAGE_KEY = 'nexaar_consultation_leads';

/**
 * Retrieves all leads from local storage and tries to fetch from cloudflare native endpoint.
 * Returns local leads as fallback.
 */
export async function getLeads() {
  let localLeads = [];
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      localLeads = JSON.parse(saved);
    }
  } catch (err) {
    console.error('Error reading leads from localStorage', err);
  }

  try {
    const res = await fetch('/api/leads');
    if (res.ok) {
      const cloudLeads = await res.json();
      if (Array.isArray(cloudLeads) && cloudLeads.length > 0) {
        // Merge them avoiding duplicates by ID
        const merged = [...localLeads];
        cloudLeads.forEach(cloudLead => {
          if (!merged.some(l => l.id === cloudLead.id)) {
            merged.push(cloudLead);
          }
        });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
    }
  } catch (err) {
    console.log('Using local leads as fallback since Cloudflare Functions is not running locally', err);
  }

  return localLeads;
}

/**
 * Saves a new lead both in local storage and sends to Cloudflare function endpoint.
 */
export async function saveLead(leadData) {
  const newLead = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'new', // new, contacted, archived
    ...leadData
  };

  // 1. Save to localStorage immediately for reliable caching
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const leads = saved ? JSON.parse(saved) : [];
    leads.unshift(newLead);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Error saving lead to localStorage', err);
  }

  // 2. Try sending to serverless API
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.lead) {
        return data.lead;
      }
    }
  } catch (err) {
    console.log('Saved to local storage fallback successfully.', err);
  }

  return newLead;
}

/**
 * Delete a lead.
 */
export async function deleteLead(id) {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const leads = JSON.parse(saved);
      const filtered = leads.filter(l => l.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (err) {
    console.error('Error deleting lead from localStorage', err);
  }

  try {
    await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
  } catch (err) {
    console.error('API deletion error fallback:', err);
  }
}

/**
 * Update the status of a lead.
 */
export async function updateLeadStatus(id, status) {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const leads = JSON.parse(saved);
      const lead = leads.find(l => l.id === id);
      if (lead) {
        lead.status = status;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
      }
    }
  } catch (err) {
    console.error('Error updating lead status in localStorage', err);
  }
}
