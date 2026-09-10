/**
 * CareFlow EHR - Main Application Controller & Router
 */

import { store } from './store.js';
import { renderLoginView, attachLoginEvents } from './views/login.js';
import { renderDashboardView, attachDashboardEvents } from './views/dashboard.js';
import { renderPatientsView, attachPatientsEvents } from './views/patients.js';
import { renderProfileView, attachProfileEvents } from './views/profile.js';
import { renderAppointmentsView, attachAppointmentsEvents } from './views/appointments.js';
import { renderNotesView, attachNotesEvents } from './views/notes.js';
import { renderLabsView, attachLabsEvents } from './views/labs.js';
import { renderMedicationsView, attachMedicationsEvents } from './views/medications.js';
import { renderBillingView, attachBillingEvents } from './views/billing.js';

class CareFlowApp {
  constructor() {
    this.currentRoute = 'dashboard';
    this.container = document.getElementById('view-content-root');
    this.sidebar = document.getElementById('app-sidebar');
    this.searchWrapper = document.getElementById('global-search-wrapper');
    this.searchInput = document.getElementById('global-search-input');
    this.searchDropdown = document.getElementById('global-search-dropdown');
    this.notifBtn = document.getElementById('btn-header-notifs');
    this.notifPopover = document.getElementById('header-notif-popover');
    this.mobileMenuBtn = document.getElementById('btn-mobile-menu');
    this.resetDemoBtn = document.getElementById('btn-reset-demo');

    this.init();
  }

  init() {
    // Hash routing
    window.addEventListener('hashchange', () => this.handleRouting());
    
    // Global search events
    this.setupGlobalSearch();

    // Notifications toggle
    this.setupNotifications();

    // Mobile menu toggle
    if (this.mobileMenuBtn && this.sidebar) {
      this.mobileMenuBtn.addEventListener('click', () => {
        this.sidebar.classList.toggle('mobile-open');
      });
    }

    // Reset demo button
    if (this.resetDemoBtn) {
      this.resetDemoBtn.addEventListener('click', () => {
        if (confirm('Reset all demo data back to baseline fictional records? Any edits or added patients will be restored to defaults.')) {
          store.resetToDemoDefaults();
          this.showToast('Demo data reset to baseline defaults.');
          this.render();
        }
      });
    }

    // Clinician sign-out button
    const signoutBtn = document.getElementById('btn-clinician-signout');
    if (signoutBtn) {
      signoutBtn.addEventListener('click', () => {
        store.logout();
        this.navigate('login');
      });
    }

    // Setup modal close events
    this.setupModalHandlers();

    // Store subscription
    store.subscribe(() => {
      this.updateSidebarClinician();
      this.updatePatientContext();
      this.updateBadges();
    });

    // Initial render
    this.updateSidebarClinician();
    this.updatePatientContext();
    this.updateBadges();
    this.handleRouting();
  }

  handleRouting() {
    const rawHash = window.location.hash.replace('#', '').trim();
    const route = rawHash || 'dashboard';

    // If logged out and trying to access internal routes, force login
    if (!store.currentClinicianId && route !== 'login') {
      this.navigate('login');
      return;
    }

    // If logged in and at #login, redirect to dashboard
    if (store.currentClinicianId && route === 'login') {
      this.navigate('dashboard');
      return;
    }

    this.currentRoute = route;

    // Update active class on sidebar links
    document.querySelectorAll('.nav-link').forEach(link => {
      const target = link.getAttribute('href')?.replace('#', '');
      if (target === route) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile drawer on route change
    if (this.sidebar) {
      this.sidebar.classList.remove('mobile-open');
    }

    this.render();
  }

  navigate(route) {
    window.location.hash = '#' + route;
  }

  render() {
    if (!this.container) return;

    // Route rendering
    switch (this.currentRoute) {
      case 'login':
        this.container.innerHTML = renderLoginView();
        attachLoginEvents(this.container, () => this.navigate('dashboard'));
        break;

      case 'dashboard':
        this.container.innerHTML = renderDashboardView();
        attachDashboardEvents(this.container, this);
        break;

      case 'patients':
        this.container.innerHTML = renderPatientsView();
        attachPatientsEvents(this.container, this);
        break;

      case 'profile':
        this.container.innerHTML = renderProfileView();
        attachProfileEvents(this.container, this);
        break;

      case 'appointments':
        this.container.innerHTML = renderAppointmentsView();
        attachAppointmentsEvents(this.container, this);
        break;

      case 'notes':
        this.container.innerHTML = renderNotesView();
        attachNotesEvents(this.container, this);
        break;

      case 'labs':
        this.container.innerHTML = renderLabsView();
        attachLabsEvents(this.container, this);
        break;

      case 'medications':
        this.container.innerHTML = renderMedicationsView();
        attachMedicationsEvents(this.container, this);
        break;

      case 'billing':
        this.container.innerHTML = renderBillingView();
        attachBillingEvents(this.container, this);
        break;

      default:
        this.container.innerHTML = renderDashboardView();
        attachDashboardEvents(this.container, this);
        break;
    }

    // Scroll to top
    this.container.scrollTop = 0;
  }

  updateSidebarClinician() {
    const clinician = store.getCurrentClinician();
    const nameEl = document.getElementById('sidebar-clinician-name');
    const roleEl = document.getElementById('sidebar-clinician-role');
    const avatarEl = document.getElementById('sidebar-clinician-avatar');

    if (nameEl) nameEl.textContent = clinician ? clinician.name : 'Not Signed In';
    if (roleEl) roleEl.textContent = clinician ? `${clinician.specialty} • ${clinician.department}` : 'Demo Clinician';
    if (avatarEl && clinician) avatarEl.textContent = clinician.avatar;
  }

  updatePatientContext() {
    const activePatient = store.getActivePatient();
    const nameEl = document.getElementById('sidebar-context-name');
    const metaEl = document.getElementById('sidebar-context-meta');

    if (activePatient) {
      if (nameEl) nameEl.textContent = `${activePatient.firstName} ${activePatient.lastName}`;
      if (metaEl) metaEl.textContent = `${activePatient.mrn} • ${activePatient.age}y ${activePatient.gender[0]}`;
    } else {
      if (nameEl) nameEl.textContent = 'None selected';
      if (metaEl) metaEl.textContent = 'Select a patient';
    }
  }

  updateBadges() {
    const kpis = store.getDashboardKPIs();
    const aptBadge = document.getElementById('badge-apt-count');
    const labBadge = document.getElementById('badge-lab-count');
    const rxBadge = document.getElementById('badge-rx-count');

    if (aptBadge) aptBadge.textContent = kpis.todayAppointmentsCount.toString();
    if (labBadge) {
      labBadge.textContent = kpis.pendingAbnormalLabsCount.toString();
      if (kpis.pendingAbnormalLabsCount > 0) {
        labBadge.classList.add('alert');
      } else {
        labBadge.classList.remove('alert');
      }
    }
    if (rxBadge) rxBadge.textContent = kpis.lowRefillCount.toString();
  }

  // Global search
  setupGlobalSearch() {
    if (!this.searchInput || !this.searchDropdown) return;

    this.searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (q.length < 1) {
        this.searchDropdown.classList.remove('open');
        this.searchDropdown.innerHTML = '';
        return;
      }

      const patients = store.getPatients();
      const matches = patients.filter(p => {
        return `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
          p.mrn.toLowerCase().includes(q) ||
          p.phone.toLowerCase().includes(q) ||
          (p.medicalHistory || []).some(m => m.condition.toLowerCase().includes(q));
      });

      if (matches.length === 0) {
        this.searchDropdown.innerHTML = `
          <div style="padding: 14px; color: var(--text-muted); text-align: center; font-size: 12.5px;">
            No patient charts matching "<strong>${escapeHtml(q)}</strong>"
          </div>
        `;
      } else {
        this.searchDropdown.innerHTML = matches.map(p => `
          <div class="search-item" data-patient-id="${p.id}">
            <div>
              <div style="font-weight: 700; color: var(--text-main); font-size: 13.5px;">
                ${p.firstName} ${p.lastName}
              </div>
              <div style="font-size: 11px; color: var(--text-muted);">
                ${p.mrn} • ${p.age}y ${p.gender} • DOB: ${p.dob}
              </div>
            </div>
            <span class="badge ${p.status === 'Inpatient' ? 'badge-purple' : 'badge-success'}">${p.status}</span>
          </div>
        `).join('');

        this.searchDropdown.querySelectorAll('.search-item').forEach(item => {
          item.addEventListener('click', () => {
            const id = item.getAttribute('data-patient-id');
            store.setActivePatient(id);
            this.searchDropdown.classList.remove('open');
            this.searchInput.value = '';
            this.navigate('profile');
          });
        });
      }

      this.searchDropdown.classList.add('open');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (this.searchWrapper && !this.searchWrapper.contains(e.target)) {
        this.searchDropdown.classList.remove('open');
      }
    });
  }

  // Notifications Popover
  setupNotifications() {
    if (!this.notifBtn || !this.notifPopover) return;

    this.notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.notifPopover.classList.toggle('open');
      this.populateNotifications();
    });

    document.addEventListener('click', (e) => {
      if (this.notifPopover && !this.notifPopover.contains(e.target) && e.target !== this.notifBtn) {
        this.notifPopover.classList.remove('open');
      }
    });
  }

  populateNotifications() {
    const list = document.getElementById('notif-items-list');
    if (!list) return;

    const kpis = store.getDashboardKPIs();
    const items = [];

    // Critical Labs
    kpis.criticalOrAbnormalLabs.forEach(lab => {
      items.push(`
        <div class="notif-item urgent">
          <svg style="width: 18px; height: 18px; color: var(--danger-primary); flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <div>
            <strong>Critical Lab Alert:</strong> ${lab.patientName} (${lab.panelName}) has abnormal unreviewed parameters.
          </div>
        </div>
      `);
    });

    // Today's appointments
    kpis.todayAppointments.forEach(apt => {
      items.push(`
        <div class="notif-item">
          <svg style="width: 18px; height: 18px; color: var(--primary-600); flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <div>
            <strong>${apt.time}:</strong> Encounter scheduled for <strong>${apt.patientName}</strong> (${apt.type}).
          </div>
        </div>
      `);
    });

    if (items.length === 0) {
      list.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 12px;">No active alerts.</div>`;
    } else {
      list.innerHTML = items.join('');
    }
  }

  // Toast Notification System
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // Modals Manager
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      // Pre-fill dropdowns if relevant
      this.populateModalPatientSelects(modal);
      modal.classList.add('open');
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
    }
  }

  populateModalPatientSelects(modal) {
    const selects = modal.querySelectorAll('.modal-patient-select');
    const patients = store.getPatients();
    const active = store.getActivePatient();

    selects.forEach(sel => {
      sel.innerHTML = patients.map(p => `
        <option value="${p.id}" ${active && p.id === active.id ? 'selected' : ''}>
          ${p.firstName} ${p.lastName} (${p.mrn})
        </option>
      `).join('');
    });
  }

  setupModalHandlers() {
    // Universal close buttons
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.querySelectorAll('.btn-close-modal, .btn-cancel-modal').forEach(btn => {
        btn.addEventListener('click', () => {
          modal.classList.remove('open');
        });
      });

      // Click outside dialog to close
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    });

    // 1. Submit New Patient Form
    const newPatForm = document.getElementById('form-new-patient');
    if (newPatForm) {
      newPatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(newPatForm);
        const data = Object.fromEntries(fd.entries());

        const newPat = store.addPatient(data);
        this.closeModal('modal-new-patient');
        newPatForm.reset();
        this.showToast(`New patient chart created for ${newPat.firstName} ${newPat.lastName}.`);
        this.navigate('profile');
      });
    }

    // 2. Submit New Appointment Form
    const newAptForm = document.getElementById('form-new-apt');
    if (newAptForm) {
      newAptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(newAptForm);
        const data = Object.fromEntries(fd.entries());

        store.addAppointment(data);
        this.closeModal('modal-new-apt');
        newAptForm.reset();
        this.showToast('Appointment booked successfully.');
        this.render();
      });
    }

    // 3. Submit Log Vitals Form
    const vitalsForm = document.getElementById('form-log-vitals');
    if (vitalsForm) {
      vitalsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(vitalsForm);
        const data = Object.fromEntries(fd.entries());
        const patientId = data.patientId || store.getActivePatient()?.id;

        if (patientId) {
          store.addVital(patientId, data);
          this.closeModal('modal-log-vitals');
          vitalsForm.reset();
          this.showToast('Vital signs recorded and trend updated.');
          this.render();
        }
      });
    }

    // 4. Submit Add Allergy Form
    const allergyForm = document.getElementById('form-add-allergy');
    if (allergyForm) {
      allergyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(allergyForm);
        const data = Object.fromEntries(fd.entries());
        const patientId = data.patientId || store.getActivePatient()?.id;

        if (patientId) {
          store.addAllergy(patientId, data);
          this.closeModal('modal-add-allergy');
          allergyForm.reset();
          this.showToast(`Allergy alert added for ${data.allergen}.`, 'warning');
          this.render();
        }
      });
    }

    // 5. Submit Add Condition Form
    const condForm = document.getElementById('form-add-condition');
    if (condForm) {
      condForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(condForm);
        const data = Object.fromEntries(fd.entries());
        const patientId = data.patientId || store.getActivePatient()?.id;

        if (patientId) {
          store.addCondition(patientId, data);
          this.closeModal('modal-add-condition');
          condForm.reset();
          this.showToast(`Condition ${data.condition} (${data.icd10}) added to chart.`);
          this.render();
        }
      });
    }

    // 6. Submit Prescription Form (with real-time safety warning modal check)
    const rxForm = document.getElementById('form-new-prescription');
    if (rxForm) {
      rxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(rxForm);
        const data = Object.fromEntries(fd.entries());
        const patientId = data.patientId || store.getActivePatient()?.id;

        // Check for safety warning first
        const alerts = store.checkDrugInteractions(patientId, data.name);
        if (alerts.length > 0 && !data.overrideAcknowledged) {
          const alertMsg = alerts.map(a => `• ${a.type.toUpperCase()}: ${a.title}\n${a.details}`).join('\n\n');
          if (!confirm(`⚠️ CLINICAL SAFETY ALERT DETECTED:\n\n${alertMsg}\n\nDo you wish to override this safety alert and proceed with prescription?`)) {
            return;
          }
        }

        store.addPrescription(patientId, data);
        this.closeModal('modal-new-prescription');
        rxForm.reset();
        this.showToast(`Prescription for ${data.name} transmitted.`);
        this.render();
      });
    }

    // 7. Submit Lab Order Form
    const labOrderForm = document.getElementById('form-order-lab');
    if (labOrderForm) {
      labOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(labOrderForm);
        const data = Object.fromEntries(fd.entries());
        const patientId = data.patientId || store.getActivePatient()?.id;

        // Generate mock standard test suite for panel
        const testSuite = generateMockTestsForPanel(data.panelName);

        store.addLabOrder({
          patientId,
          panelName: data.panelName,
          tests: testSuite
        });

        this.closeModal('modal-order-lab');
        labOrderForm.reset();
        this.showToast(`Diagnostic order submitted for ${data.panelName}.`);
        this.navigate('labs');
      });
    }

    // 8. Submit Superbill / Claim Form
    const claimForm = document.getElementById('form-new-claim');
    if (claimForm) {
      claimForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(claimForm);
        const data = Object.fromEntries(fd.entries());
        const patientId = data.patientId || store.getActivePatient()?.id;

        const charge = Number(data.chargeAmount) || 185;
        store.addClaim({
          patientId,
          dateOfService: data.dateOfService || new Date().toISOString().split('T')[0],
          cptCodes: [{ code: data.cptCode || '99214', description: data.cptDescription || 'Office visit established', charge }],
          icdCodes: [data.icdCode || 'R69'],
          totalCharged: charge,
          allowedAmount: charge * 0.8,
          insurancePaid: charge * 0.7,
          copayAmount: 25,
          patientBalance: Math.max(0, charge * 0.1),
          status: 'Submitted',
          billingNotes: data.notes || 'Routine encounter claim'
        });

        this.closeModal('modal-new-claim');
        claimForm.reset();
        this.showToast('Billing superbill generated and submitted.');
        this.navigate('billing');
      });
    }
  }
}

function generateMockTestsForPanel(panelName) {
  if (panelName.includes('Lipid')) {
    return [
      { name: 'Cholesterol, Total', value: 184, unit: 'mg/dL', refRange: '< 200', flag: 'Normal' },
      { name: 'Triglycerides', value: 142, unit: 'mg/dL', refRange: '< 150', flag: 'Normal' },
      { name: 'HDL Cholesterol', value: 52, unit: 'mg/dL', refRange: '> 40', flag: 'Normal' },
      { name: 'LDL Cholesterol', value: 104, unit: 'mg/dL', refRange: '< 100', flag: 'High' }
    ];
  } else if (panelName.includes('Complete Blood Count') || panelName.includes('CBC')) {
    return [
      { name: 'White Blood Cell (WBC)', value: 6.8, unit: 'K/uL', refRange: '4.0 - 11.0', flag: 'Normal' },
      { name: 'Red Blood Cell (RBC)', value: 4.52, unit: 'M/uL', refRange: '4.20 - 5.80', flag: 'Normal' },
      { name: 'Hemoglobin (Hgb)', value: 14.1, unit: 'g/dL', refRange: '13.0 - 17.5', flag: 'Normal' },
      { name: 'Hematocrit (Hct)', value: 42.4, unit: '%', refRange: '38.0 - 50.0', flag: 'Normal' },
      { name: 'Platelets', value: 245, unit: 'K/uL', refRange: '150 - 450', flag: 'Normal' }
    ];
  } else if (panelName.includes('A1c')) {
    return [
      { name: 'Hemoglobin A1c', value: 6.7, unit: '%', refRange: '< 5.7 (Normal), < 7.0 (Target DM)', flag: 'High' }
    ];
  }
  // Default Comprehensive Metabolic Panel
  return [
    { name: 'Sodium', value: 140, unit: 'mmol/L', refRange: '135 - 145', flag: 'Normal' },
    { name: 'Potassium', value: 4.3, unit: 'mmol/L', refRange: '3.5 - 5.1', flag: 'Normal' },
    { name: 'Chloride', value: 104, unit: 'mmol/L', refRange: '98 - 107', flag: 'Normal' },
    { name: 'CO2', value: 26, unit: 'mmol/L', refRange: '22 - 29', flag: 'Normal' },
    { name: 'BUN', value: 16, unit: 'mg/dL', refRange: '7 - 20', flag: 'Normal' },
    { name: 'Creatinine', value: 0.88, unit: 'mg/dL', refRange: '0.50 - 1.10', flag: 'Normal' },
    { name: 'Glucose Fasting', value: 112, unit: 'mg/dL', refRange: '70 - 99', flag: 'High' }
  ];
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Bootstrap application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.careFlowApp = new CareFlowApp();
});
