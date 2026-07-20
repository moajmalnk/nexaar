import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";

const LOCAL_STORAGE_KEY = 'nexaar_consultation_leads';

/**
 * Fetches all consultation leads from the Firestore database.
 * Architecture Note: Executes a server-side order query (createdAt DESC) to maintain layout clarity (Rule 18).
 * If the primary Firestore node fails or is offline, it gracefully falls back to a locally cached array.
 * 
 * @returns {Promise<Array<Object>>} An array of normalized lead objects.
 */
export async function getLeads() {
  try {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const leads = [];
    querySnapshot.forEach((doc) => {
      leads.push({ id: doc.id, ...doc.data() });
    });
    return leads;
  } catch (err) {
    // Rule 23: Console Scrubbing - Removed debug logs
  }

  // Fallback to localStorage
  let localLeads = [];
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      localLeads = JSON.parse(saved);
      // Rule 18: Strict Data Sorting (Enforce ORDER BY createdAt DESC locally if simulating server)
      localLeads.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
  } catch (err) {
    // Rule 23: Console Scrubbing - Removed debug logs
  }
  return localLeads;
}

// Rule 6: Strict Type Validation Arrays and Sanitization Defenses
const ALLOWED_LEAD_FIELDS = ['name', 'company', 'phone', 'sector', 'projectType', 'message', 'status', 'createdAt'];

// Rule 7: Length Guardrails
const FIELD_MAX_LENGTHS = {
  name: 100,
  company: 100,
  phone: 25,
  sector: 50,
  projectType: 50,
  message: 1000,
  status: 20
};

/**
 * Sanitizes string inputs by escaping critical HTML characters.
 * Architecture Note: Defends against cross-site scripting (XSS) by mutating raw inputs before they hit the database.
 * 
 * @param {string} str - The raw input string.
 * @returns {string} The escaped, safe string.
 */
const escapeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'/]/g, (match) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;'
  })[match]);
};

/**
 * Processes, sanitizes, truncates, and persists a new consultation request payload.
 * Architecture Note: Executes a strict allow-list field filter (Rule 6) and enforces hard character limits (Rule 7)
 * to prevent database injection or engine exceptions.
 * 
 * @param {Object} leadData - The raw payload submitted by the user.
 * @returns {Promise<Object>} The persisted lead object including its generated ID and timestamp.
 */
export async function saveLead(leadData) {
  // Backend Entry Lane Defense: Strict Field Filtering and Escaping
  const sanitizedData = {};
  for (const key of ALLOWED_LEAD_FIELDS) {
    if (leadData[key] !== undefined) {
      let value = leadData[key];
      if (typeof value === 'string') {
        value = escapeInput(value);
        // Rule 7: Backend Size Limits to prevent engine exceptions
        const maxLength = FIELD_MAX_LENGTHS[key] || 1000;
        if (value.length > maxLength) {
          value = value.substring(0, maxLength);
        }
      }
      sanitizedData[key] = value;
    }
  }

  const newLead = {
    createdAt: new Date().toISOString(),
    status: 'new', // new, contacted, archived
    ...sanitizedData
  };

  try {
    const docRef = await addDoc(collection(db, "leads"), newLead);
    return { id: docRef.id, ...newLead };
  } catch (err) {
    // Rule 23: Console Scrubbing - Removed debug logs
  }

  // Fallback to localStorage
  const localLead = {
    id: Date.now().toString(),
    ...newLead
  };

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const leads = saved ? JSON.parse(saved) : [];
    leads.unshift(localLead);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    // Rule 23: Console Scrubbing - Removed debug logs
  }

  return localLead;
}

/**
 * Permanently removes a lead record from the database.
 * Architecture Note: Fails gracefully to local storage removal if the remote deletion triggers a network error.
 * 
 * @param {string} id - The unique identifier of the lead to delete.
 * @returns {Promise<void>}
 */
export async function deleteLead(id) {
  try {
    await deleteDoc(doc(db, "leads", id));
    return;
  } catch (err) {
    // Rule 23: Console Scrubbing - Removed debug logs
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const leads = JSON.parse(saved);
      const filtered = leads.filter(l => l.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (err) {
    // Rule 23: Console Scrubbing - Removed debug logs
  }
}

/**
 * Updates the lifecycle status of an existing lead (e.g., 'new' -> 'contacted' -> 'archived').
 * 
 * @param {string} id - The unique identifier of the lead.
 * @param {string} status - The new lifecycle status string.
 * @returns {Promise<void>}
 */
export async function updateLeadStatus(id, status) {
  try {
    await updateDoc(doc(db, "leads", id), { status });
    return;
  } catch (err) {
    // Rule 23: Console Scrubbing - Removed debug logs
  }

  // Fallback to localStorage
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
    // Rule 23: Console Scrubbing - Removed debug logs
  }
}

/**
 * Purges all cached lead arrays from local browser storage.
 * Architecture Note: Vital for Data-Clear Verification (Rule 4) during hard resets or logouts.
 */
export function clearLocalLeads() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    // Rule 23: Console Scrubbing - Removed debug logs
  }
}
