import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";

const LOCAL_STORAGE_KEY = 'nexaar_consultation_leads';

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
    console.warn("Firestore error, falling back to localStorage", err);
  }

  // Fallback to localStorage
  let localLeads = [];
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      localLeads = JSON.parse(saved);
    }
  } catch (err) {
    console.error('Error reading leads from localStorage', err);
  }
  return localLeads;
}

export async function saveLead(leadData) {
  const newLead = {
    createdAt: new Date().toISOString(),
    status: 'new', // new, contacted, archived
    ...leadData
  };

  try {
    const docRef = await addDoc(collection(db, "leads"), newLead);
    return { id: docRef.id, ...newLead };
  } catch (err) {
    console.warn("Firestore save error, falling back to localStorage", err);
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
    console.error('Error saving lead to localStorage', err);
  }

  return localLead;
}

export async function deleteLead(id) {
  try {
    await deleteDoc(doc(db, "leads", id));
    return;
  } catch (err) {
    console.warn("Firestore delete error, falling back to localStorage", err);
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
    console.error('Error deleting lead from localStorage', err);
  }
}

export async function updateLeadStatus(id, status) {
  try {
    await updateDoc(doc(db, "leads", id), { status });
    return;
  } catch (err) {
    console.warn("Firestore update error, falling back to localStorage", err);
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
    console.error('Error updating lead status in localStorage', err);
  }
}
