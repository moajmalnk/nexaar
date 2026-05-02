import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getLeads, deleteLead, updateLeadStatus } from '../utils/leadsStorage';
import Button from '../components/shared/Button';


const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="relative select-none w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-brand-deep-navy/60 border border-brand-electric-purple/15 hover:border-brand-electric-purple/40 text-brand-pure-white px-4 py-3 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body text-sm flex items-center justify-between cursor-pointer backdrop-blur-sm h-full"
      >
        <span className="truncate">{selectedOption.label}</span>
        <svg
          className={`w-4 h-4 text-brand-electric-purple transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-30 top-full left-0 right-0 mt-2 bg-brand-deep-navy/95 border border-brand-electric-purple/25 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md max-h-60 overflow-y-auto"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-sm font-body cursor-pointer transition-colors ${
                    option.value === value
                      ? 'bg-brand-electric-purple/20 text-brand-electric-purple font-semibold'
                      : 'text-brand-pure-white/80 hover:bg-white/5'
                  }`}
                >
                  {option.label}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('nexaar_auth') === 'true');
  const [username, setUsername] = useState(() => localStorage.getItem('nexaar_username') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => localStorage.getItem('nexaar_remember') === 'true');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (failedAttempts >= 5) {
      setLoginError('Maximum login attempts exceeded. Temporary lockout enabled.');
      return;
    }

    setIsSubmitting(true);
    setLoginError('');

    await new Promise(resolve => setTimeout(resolve, 850));

    if ((username === 'Murshid' || username === 'murshid') && password === 'nexaar2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('nexaar_auth', 'true');
      if (rememberMe) {
        localStorage.setItem('nexaar_username', username);
        localStorage.setItem('nexaar_remember', 'true');
      } else {
        localStorage.removeItem('nexaar_username');
        localStorage.removeItem('nexaar_remember');
      }
      setLoginError('');
      setFailedAttempts(0);
    } else {
      setLoginError('The password or username is incorrect.');
    }
    setIsSubmitting(false);
  };

  const loadLeads = async () => {
    const data = await getLeads();
    setLeads(data || []);
  };

  const filterLeads = () => {
    let result = [...leads];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        lead =>
          lead.name?.toLowerCase().includes(q) ||
          lead.company?.toLowerCase().includes(q) ||
          lead.phone?.toLowerCase().includes(q) ||
          lead.message?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(lead => lead.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      result = result.filter(lead => lead.projectType === typeFilter);
    }

    setFilteredLeads(result);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchQuery, statusFilter, typeFilter]);



  const handleDeleteLead = (id) => {
    setConfirmModal({
      isOpen: true,
      title: 'Remove Lead',
      message: 'Are you sure you want to permanently delete this lead? This action cannot be undone.',
      onConfirm: async () => {
        await deleteLead(id);
        loadLeads();
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
      }
    });
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await updateLeadStatus(id, newStatus);
    loadLeads();
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => ({ ...prev, status: newStatus }));
    }
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Company', 'Phone', 'Sector', 'Project Type', 'Status', 'Vision'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.name || ''}"`,
      `"${l.company || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.sector || ''}"`,
      `"${l.projectType || ''}"`,
      l.status || 'new',
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `nexaar_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  // Analytics Stats
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new' || !l.status).length;
  const contactedLeads = leads.filter(l => l.status === 'contacted').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-deep-navy flex items-center justify-center p-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-brand-charcoal/20 border border-brand-electric-purple/20 backdrop-blur-xl p-8 md:p-10 rounded-3xl max-w-md w-full space-y-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] relative z-10 select-none overflow-hidden"
          role="region"
          aria-label="Administrator login region"
        >
          {/* Top border ambient glow accent line */}
          <div className="absolute top-0 left-1/4 w-[50%] h-[2px] bg-gradient-to-r from-transparent via-brand-electric-purple to-transparent" />
          
          <div className="text-center space-y-4">
            {/* Visual logo/icon above title */}
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-electric-purple/10 border border-brand-electric-purple/25 backdrop-blur-sm shadow-inner select-none transition-all duration-300 hover:scale-105">
              <svg className="w-7 h-7 text-brand-electric-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div>
              <h1 className="font-display font-extrabold text-3xl tracking-tight text-brand-pure-white uppercase">
                NEXAAR <span className="text-brand-electric-purple">TECH</span>
              </h1>
            </div>

            {/* Security/Trust line */}
            <div className="inline-flex items-center justify-center gap-1.5 bg-green-500/5 border border-green-500/10 px-3 py-1.5 rounded-full select-none" role="status">
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-body text-[0.6875rem] text-green-400/80 font-medium tracking-wide">
                Secured connection
              </span>
            </div>
          </div>

          <form 
            onSubmit={handleLogin} 
            onKeyDown={(e) => {
              if (e.getModifierState && e.getModifierState('CapsLock')) {
                setIsCapsLockOn(true);
              } else {
                setIsCapsLockOn(false);
              }
            }}
            className="space-y-6"
            role="form"
            aria-label="Admin Login Form"
          >
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-red-400 text-xs text-center font-medium bg-red-500/10 border border-red-500/20 py-2 px-4 rounded-xl flex items-center gap-2 justify-center select-none"
                role="alert"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {loginError}
              </motion.div>
            )}
            <div className="space-y-2">
              <label htmlFor="username" className="font-display text-xs font-semibold tracking-wide text-brand-pure-white/70 pl-1 block select-none">
                Username
              </label>
              <div className="relative group">
                <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-soft-lavender/40 transition-colors group-focus-within:text-brand-electric-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  aria-label="Username"
                  aria-required="true"
                  placeholder="Admin username"
                  className="w-full bg-brand-deep-navy/40 border border-brand-electric-purple/15 hover:border-brand-electric-purple/30 text-brand-pure-white pl-11 pr-4 py-3.5 rounded-xl outline-none focus:border-brand-electric-purple focus:bg-brand-deep-navy/70 focus:ring-4 focus:ring-brand-electric-purple/15 transition-all font-body text-sm placeholder:text-brand-soft-lavender/30 select-text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between pl-1">
                <label htmlFor="password" className="font-display text-xs font-semibold tracking-wide text-brand-pure-white/70 block select-none">
                  Secret password
                </label>
                {isCapsLockOn && (
                  <span className="font-body text-[0.625rem] text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1 select-none" role="status">
                    <svg className="w-3.5 h-3.5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Caps lock on
                  </span>
                )}
              </div>
              <div className="relative group">
                <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-soft-lavender/40 transition-colors group-focus-within:text-brand-electric-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  aria-label="Secret password"
                  aria-required="true"
                  placeholder="Enter your secret password"
                  className="w-full bg-brand-deep-navy/40 border border-brand-electric-purple/15 hover:border-brand-electric-purple/30 text-brand-pure-white pl-11 pr-12 py-3.5 rounded-xl outline-none focus:border-brand-electric-purple focus:bg-brand-deep-navy/70 focus:ring-4 focus:ring-brand-electric-purple/15 transition-all font-body text-sm placeholder:text-brand-soft-lavender/30 select-text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-soft-lavender/40 hover:text-brand-pure-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-electric-purple/40 rounded-lg p-1 select-none"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5 text-brand-electric-purple" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-brand-soft-lavender/60 hover:text-brand-pure-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end select-none px-1">
              <button
                type="button"
                onClick={() => setIsForgotOpen(!isForgotOpen)}
                className="font-body text-xs text-brand-electric-purple hover:text-brand-soft-lavender transition-colors font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-brand-electric-purple/40 rounded-lg px-1.5"
              >
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              isLoading={isSubmitting}
              className="w-full py-4 mt-2 flex justify-center uppercase tracking-wider font-display font-bold text-xs"
              aria-label={isSubmitting ? "Accessing Secure Terminal..." : "Submit and login securely"}
            >
              {isSubmitting ? 'Accessing Secure Terminal...' : 'Login securely'}
            </Button>

            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/')}
              className="w-full py-4 mt-1 flex justify-center uppercase tracking-wider font-display font-bold text-xs bg-transparent border border-brand-electric-purple/20 hover:bg-brand-electric-purple/10 text-brand-soft-lavender hover:text-brand-pure-white transition-all select-none"
              aria-label="Go back to home page"
            >
              Go Back to Home
            </Button>
          </form>

          {isForgotOpen && (
            <div className="absolute inset-0 !mt-0 z-[100] flex items-center justify-center p-6 bg-[#0c0d1b] border border-brand-electric-purple/30 rounded-3xl backdrop-blur-md select-none overflow-hidden">
              <div className="absolute top-0 left-1/4 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-brand-electric-purple to-transparent" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm space-y-4 select-none"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-electric-purple/10 border border-brand-electric-purple/20 backdrop-blur-sm select-none">
                    <svg className="w-5 h-5 text-brand-electric-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-pure-white uppercase tracking-wider">
                    Reset Password
                  </h3>
                </div>

                <p className="font-body text-xs text-brand-soft-lavender/80 leading-relaxed mb-6 select-none">
                  To reset your credentials, please contact the Nexaar security team or your lead administrator.
                </p>

                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setIsForgotOpen(false)}
                  className="w-full py-3 tracking-wider font-display font-bold text-xs uppercase"
                >
                  Dismiss
                </Button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-deep-navy pt-12 md:pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-electric-purple/20 pb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-brand-pure-white mb-2 tracking-tight">
              NEXAAR TECH <span className="text-brand-electric-purple">DASHBOARD</span>
            </h1>
            <p className="font-body text-brand-soft-lavender opacity-70">
              Manage client consultation requests and digital vision submissions natively.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button 
              onClick={() => {
                setConfirmModal({
                  isOpen: true,
                  title: 'Logout',
                  message: 'Are you sure you want to sign out and leave the dashboard?',
                  onConfirm: () => {
                    setIsAuthenticated(false);
                    sessionStorage.removeItem('nexaar_auth');
                    setUsername('');
                    setPassword('');
                  }
                });
              }} 
              variant="secondary" 
              className="px-4 py-2 flex items-center gap-2 border-white/10 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 group transition-all duration-300"
            >
              <svg className="w-4 h-4 text-brand-electric-purple group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </Button>
          </div>
        </div>

        {/* Analytic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-brand-charcoal/30 border border-brand-electric-purple/15 backdrop-blur-xl rounded-2xl flex flex-col justify-between h-36"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-display text-xs uppercase tracking-widest text-brand-pure-white/50">Total Leads</span>
              <div className="w-8 h-8 rounded-full bg-brand-electric-purple/10 flex items-center justify-center border border-brand-electric-purple/20">
                <svg className="w-4 h-4 text-brand-electric-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="font-display font-extrabold text-4xl text-brand-pure-white leading-none">
              {totalLeads}
            </div>
            <div className="font-body text-xs text-brand-soft-lavender opacity-40">All received consultations</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-brand-charcoal/30 border border-brand-electric-purple/15 backdrop-blur-xl rounded-2xl flex flex-col justify-between h-36"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-display text-xs uppercase tracking-widest text-brand-pure-white/50">New Leads</span>
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
            <div className="font-display font-extrabold text-4xl text-emerald-400 leading-none">
              {newLeads}
            </div>
            <div className="font-body text-xs text-brand-soft-lavender opacity-40">Awaiting your response</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-brand-charcoal/30 border border-brand-electric-purple/15 backdrop-blur-xl rounded-2xl flex flex-col justify-between h-36"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-display text-xs uppercase tracking-widest text-brand-pure-white/50">Followed Up</span>
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="font-display font-extrabold text-4xl text-cyan-400 leading-none">
              {contactedLeads}
            </div>
            <div className="font-body text-xs text-brand-soft-lavender opacity-40">Clients successfully reached out</div>
          </motion.div>
        </div>

        {/* Filters and searching */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-brand-charcoal/20 border border-brand-electric-purple/10 p-5 rounded-2xl">
          <div className="relative md:col-span-2">
            <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-soft-lavender/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, company, or vision keywords..."
              className="w-full bg-brand-deep-navy/60 border border-brand-electric-purple/15 text-brand-pure-white pl-11 pr-4 py-3 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <CustomSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'new', label: 'New Leads' },
                { value: 'contacted', label: 'Contacted' },
                { value: 'archived', label: 'Archived' }
              ]}
            />
          </div>

          <div>
            <CustomSelect
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { value: 'all', label: 'All Project Types' },
                { value: 'Website Development', label: 'Website Development' },
                { value: 'Mobile App (iOS/Android)', label: 'Mobile App (iOS/Android)' },
                { value: 'Custom Platform / SaaS', label: 'Custom Platform / SaaS' },
                { value: 'UI/UX Design & Branding', label: 'UI/UX Design & Branding' }
              ]}
            />
          </div>
        </div>

        {/* Lead Details Card vs Leads List View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Leads list table/cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between font-display uppercase tracking-widest text-xs text-brand-pure-white/40 mb-2 pl-2">
              <span>{filteredLeads.length} Matching {filteredLeads.length === 1 ? 'Request' : 'Requests'}</span>
              <span>Showing sorted list</span>
            </div>
            
            {filteredLeads.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-brand-electric-purple/20 rounded-2xl bg-brand-charcoal/10">
                <p className="font-body text-brand-soft-lavender opacity-50 text-sm">
                  No consultation requests found for the selected filters.
                </p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1 custom-scrollbar">
                {filteredLeads.map((lead, idx) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.02 }}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-5 group relative overflow-hidden ${
                      selectedLead && selectedLead.id === lead.id
                        ? 'bg-brand-electric-purple/10 border-brand-electric-purple/50 shadow-elite-glow translate-y-[-2px]'
                        : 'bg-brand-charcoal/30 border-brand-electric-purple/15 hover:border-brand-electric-purple/40 hover:bg-brand-charcoal/50 hover:translate-y-[-2px]'
                    }`}
                  >
                    {/* Glowing card subtle ambient background accent */}
                    {selectedLead && selectedLead.id === lead.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-electric-purple/5 to-transparent pointer-events-none" />
                    )}

                    <div className="space-y-4 flex-1 min-w-0 z-10">
                      <div className="flex items-center gap-3">
                        {lead.status === 'contacted' ? (
                          <span className="px-3 py-1 rounded-full text-[0.625rem] font-display uppercase font-bold tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                            Contacted
                          </span>
                        ) : lead.status === 'archived' ? (
                          <span className="px-3 py-1 rounded-full text-[0.625rem] font-display uppercase font-bold tracking-wider bg-zinc-500/15 text-zinc-400 border border-zinc-500/30">
                            Archived
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-[0.625rem] font-display uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            New
                          </span>
                        )}
                        <span className="font-body text-xs text-brand-soft-lavender opacity-50 flex items-center gap-1 font-medium">
                          <svg className="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-xl md:text-2xl text-brand-pure-white group-hover:text-brand-electric-purple transition-colors tracking-tight flex items-center gap-2">
                          {lead.name}
                        </h3>
                        <div className="flex items-center gap-2 font-body text-xs text-brand-soft-lavender/60">
                          <span className="font-semibold text-brand-soft-lavender/80">
                            {lead.company || 'Direct Individual'}
                          </span>
                          {lead.sector && (
                            <>
                              <span className="opacity-30">•</span>
                              <span>{lead.sector}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-electric-purple/10 border border-brand-electric-purple/20 hover:border-brand-electric-purple/40 text-brand-soft-lavender/90 px-3 py-1 rounded-xl text-xs font-body transition-colors backdrop-blur-sm select-none">
                          {lead.projectType || 'General Consultation'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-3 justify-end z-10 flex-shrink-0">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          const txt = encodeURIComponent(`Hello ${lead.name}, thank you for reaching out to Nexaar. We received your consultation request about ${lead.projectType || 'your project'}!`);
                          window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${txt}`, '_blank');
                        }}
                        variant="secondary"
                        className="py-2.5 px-4 text-xs bg-emerald-500/10 border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-emerald-200 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all font-display uppercase tracking-widest font-bold flex items-center gap-2 rounded-xl flex-shrink-0"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.553 4.189 1.605 6.006L0 24l6.117-1.605a11.815 11.815 0 005.928 1.583h.005c6.635 0 12.03-5.396 12.033-12.03a11.817 11.817 0 00-3.51-8.413z"/>
                        </svg>
                        WhatsApp
                      </Button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLead(lead.id);
                        }}
                        className="text-brand-soft-lavender/30 hover:text-red-400 hover:bg-red-500/10 transition-all p-2.5 rounded-xl border border-transparent hover:border-red-500/20"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Details & Admin Control View */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedLead ? (
                <motion.div
                  key={selectedLead.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 md:p-8 bg-brand-charcoal/20 border border-brand-electric-purple/15 backdrop-blur-xl rounded-2xl space-y-6 lg:sticky lg:top-32"
                >
                  <div className="flex items-center justify-between border-b border-brand-electric-purple/15 pb-4">
                    <span className="font-display text-xs uppercase tracking-widest text-brand-pure-white/40 font-bold">
                      Consultation Overview
                    </span>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-brand-soft-lavender hover:text-brand-pure-white transition-colors"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-display font-extrabold text-2xl text-brand-pure-white leading-tight">
                      {selectedLead.name}
                    </h2>
                    <p className="font-body text-brand-soft-lavender opacity-60 text-sm">
                      Received {new Date(selectedLead.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-brand-deep-navy/40 p-4 rounded-xl border border-brand-electric-purple/10">
                    <div>
                      <div className="font-display text-[0.625rem] tracking-widest uppercase text-brand-pure-white/30">Company</div>
                      <div className="font-body font-medium text-sm text-brand-pure-white mt-0.5">{selectedLead.company || 'Individual'}</div>
                    </div>
                    <div>
                      <div className="font-display text-[0.625rem] tracking-widest uppercase text-brand-pure-white/30">Sector</div>
                      <div className="font-body font-medium text-sm text-brand-pure-white mt-0.5">{selectedLead.sector || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-brand-deep-navy/40 rounded-xl border border-brand-electric-purple/10 space-y-1">
                    <div className="font-display text-[0.625rem] tracking-widest uppercase text-brand-pure-white/30">WhatsApp / Phone</div>
                    <div className="font-body font-medium text-base text-brand-pure-white mt-0.5 select-all">{selectedLead.phone}</div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-display text-[0.625rem] tracking-widest uppercase text-brand-pure-white/30">Project Details / Vision</span>
                    <div className="p-4 bg-brand-deep-navy/40 border border-brand-electric-purple/10 rounded-xl font-body text-sm text-brand-soft-lavender/90 whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar">
                      {selectedLead.message}
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="space-y-3 pt-4 border-t border-brand-electric-purple/15">
                    <div className="font-display text-[0.625rem] tracking-widest uppercase text-brand-pure-white/30 mb-2">Change Lead Status</div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, 'new')}
                        className={`py-2 text-xs font-display font-semibold uppercase tracking-wider rounded-xl transition-all border ${
                          selectedLead.status === 'new'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                            : 'bg-brand-charcoal/40 text-brand-soft-lavender/60 border-brand-electric-purple/10 hover:border-brand-electric-purple/30'
                        }`}
                      >
                        New
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, 'contacted')}
                        className={`py-2 text-xs font-display font-semibold uppercase tracking-wider rounded-xl transition-all border ${
                          selectedLead.status === 'contacted'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                            : 'bg-brand-charcoal/40 text-brand-soft-lavender/60 border-brand-electric-purple/10 hover:border-brand-electric-purple/30'
                        }`}
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, 'archived')}
                        className={`py-2 text-xs font-display font-semibold uppercase tracking-wider rounded-xl transition-all border ${
                          selectedLead.status === 'archived'
                            ? 'bg-zinc-500/20 text-zinc-300 border-zinc-500/50'
                            : 'bg-brand-charcoal/40 text-brand-soft-lavender/60 border-brand-electric-purple/10 hover:border-brand-electric-purple/30'
                        }`}
                      >
                        Archive
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full border border-dashed border-brand-electric-purple/15 rounded-2xl flex flex-col justify-center items-center text-center p-8 bg-brand-charcoal/10 lg:sticky lg:top-32 min-h-[360px]">
                  <svg className="w-10 h-10 text-brand-soft-lavender/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <p className="font-body text-brand-soft-lavender opacity-40 text-sm max-w-xs leading-relaxed">
                    Select any matching consultation request on the left to view its exhaustive information and manage status.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-deep-navy/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-brand-charcoal/40 border border-brand-electric-purple/20 backdrop-blur-xl p-6 md:p-8 rounded-2xl max-w-sm w-full space-y-6 shadow-2xl relative"
            >
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl text-brand-pure-white uppercase tracking-wider">
                  {confirmModal.title}
                </h3>
                <p className="font-body text-brand-soft-lavender/80 text-sm">
                  {confirmModal.message}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  onClick={async () => {
                    if (confirmModal.onConfirm) await confirmModal.onConfirm();
                    setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
                  }}
                  variant="primary"
                  className="flex-1 py-2"
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null })}
                  variant="secondary"
                  className="flex-1 py-2 hover:bg-white/5 border-white/10"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
