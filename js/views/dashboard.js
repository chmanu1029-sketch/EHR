/**
 * CareFlow EHR - Executive Clinic Dashboard
 */

import { store } from '../store.js';

export function renderDashboardView() {
  const clinician = store.getCurrentClinician();
  const kpis = store.getDashboardKPIs();
  const todayApts = kpis.todayAppointments;

  return `
    <!-- Top View Header -->
    <div class="view-header">
      <div class="view-title-group">
        <h1>Clinical Dashboard</h1>
        <div class="view-subtitle">Welcome back, <strong>${clinician.name}</strong> • ${clinician.department} • St. Jude Medical Center</div>
      </div>
      <div class="view-actions">
        <button class="btn btn-secondary" id="btn-dash-new-patient">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          New Patient
        </button>
        <button class="btn btn-primary" id="btn-dash-new-apt">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg>
          Book Appointment
        </button>
      </div>
    </div>

    <!-- KPI Metric Cards -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-info">
          <h3>${kpis.todayAppointmentsCount}</h3>
          <p>Today's Appointments</p>
        </div>
        <div class="kpi-icon-wrap kpi-teal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-info">
          <h3>${kpis.pendingAbnormalLabsCount}</h3>
          <p>Pending Critical / Abnormal Labs</p>
        </div>
        <div class="kpi-icon-wrap kpi-red">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.31L4.62 19.38A2 2 0 0 0 6.35 22h11.3a2 2 0 0 0 1.73-2.62L14 9.31V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/></svg>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-info">
          <h3>${kpis.lowRefillCount}</h3>
          <p>Prescription Refill Requests</p>
        </div>
        <div class="kpi-icon-wrap kpi-amber">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-info">
          <h3>${kpis.inpatientCount}</h3>
          <p>Active Inpatient Census</p>
        </div>
        <div class="kpi-icon-wrap kpi-blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
        </div>
      </div>
    </div>

    <!-- Main Grid: Appointments & Clinical Alerts -->
    <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 20px;">
      
      <!-- Left Column: Today's Appointments -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Today's Clinical Encounters (${todayApts.length})
          </div>
          <a href="#appointments" class="btn btn-secondary btn-sm">Full Schedule →</a>
        </div>
        
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Patient</th>
                <th>Reason / Chief Complaint</th>
                <th>Type / Room</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${todayApts.length === 0 ? `
                <tr>
                  <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">
                    No encounters scheduled for today.
                  </td>
                </tr>
              ` : todayApts.map(apt => `
                <tr>
                  <td style="font-weight: 700; color: var(--primary-800); white-space: nowrap;">
                    ${apt.time}
                  </td>
                  <td>
                    <div style="font-weight: 700; color: var(--text-main); cursor: pointer;" class="btn-open-patient-chart" data-patient-id="${apt.patientId}">
                      ${apt.patientName}
                    </div>
                    <div style="font-size: 11px; color: var(--text-subtle);">${apt.patientMrn}</div>
                  </td>
                  <td style="max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${apt.reason}
                  </td>
                  <td>
                    <span class="badge badge-neutral">${apt.type}</span>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${apt.room}</div>
                  </td>
                  <td>
                    <span class="badge ${getStatusBadgeClass(apt.status)}">${apt.status}</span>
                  </td>
                  <td style="white-space: nowrap;">
                    <button class="btn btn-primary btn-sm btn-start-visit" data-patient-id="${apt.patientId}" data-apt-id="${apt.id}" title="Open SOAP Note for this patient">
                      Start Visit
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Column: Priority Clinical Alerts & Actions -->
      <div>
        <!-- Urgent Lab Alerts -->
        <div class="card">
          <div class="card-header">
            <div class="card-title" style="color: var(--danger-text);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--danger-primary);"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Unreviewed Lab Findings
            </div>
            <a href="#labs" class="btn btn-secondary btn-sm">All Labs</a>
          </div>
          <div class="card-body" style="padding: 12px 16px;">
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${store.getLabs().filter(l => !l.isReviewed).map(lab => `
                <div style="background-color: var(--danger-bg); border: 1px solid var(--danger-border); border-radius: var(--radius-md); padding: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <div style="font-weight: 700; font-size: 13px; color: var(--danger-text);">${lab.patientName}</div>
                      <div style="font-size: 11.5px; color: var(--text-muted);">${lab.panelName} • ${lab.resultDate}</div>
                    </div>
                    <span class="badge badge-danger">Unreviewed</span>
                  </div>
                  <div style="margin-top: 8px; font-size: 12px; color: #991b1b;">
                    ${lab.tests.filter(t => t.flag !== 'Normal').map(t => `
                      <span style="display: inline-block; background: white; border: 1px solid var(--danger-border); padding: 2px 6px; border-radius: 4px; margin-right: 4px; margin-bottom: 4px;">
                        <strong>${t.name}:</strong> ${t.value} ${t.unit} (<strong>${t.flag}</strong>)
                      </span>
                    `).join('')}
                  </div>
                  <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
                    <button class="btn btn-primary btn-sm btn-review-lab" data-lab-id="${lab.id}" style="font-size: 11px; padding: 4px 8px;">
                      Review & Sign Off
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Quick Clinic Actions -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Quick Clinical Actions
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 8px;">
            <button class="btn btn-secondary" id="btn-quick-new-soap" style="justify-content: flex-start; text-align: left; width: 100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <span>Author New SOAP Clinical Note</span>
            </button>
            <button class="btn btn-secondary" id="btn-quick-new-rx" style="justify-content: flex-start; text-align: left; width: 100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
              <span>E-Prescribe Medication & Check Safety</span>
            </button>
            <button class="btn btn-secondary" id="btn-quick-order-lab" style="justify-content: flex-start; text-align: left; width: 100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.31L4.62 19.38A2 2 0 0 0 6.35 22h11.3a2 2 0 0 0 1.73-2.62L14 9.31V2"/></svg>
              <span>Order Diagnostic Laboratory Panel</span>
            </button>
            <button class="btn btn-secondary" id="btn-quick-superbill" style="justify-content: flex-start; text-align: left; width: 100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              <span>Generate Billing Superbill</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  `;
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Checked-In': return 'badge-success';
    case 'Confirmed': return 'badge-info';
    case 'In Consultation': return 'badge-purple';
    case 'Completed': return 'badge-neutral';
    case 'Cancelled': return 'badge-danger';
    default: return 'badge-neutral';
  }
}

export function attachDashboardEvents(container, router) {
  // Start visit button -> set patient and jump to notes
  container.querySelectorAll('.btn-start-visit').forEach(btn => {
    btn.addEventListener('click', () => {
      const patientId = btn.getAttribute('data-patient-id');
      store.setActivePatient(patientId);
      router.navigate('notes');
    });
  });

  // Open patient chart button
  container.querySelectorAll('.btn-open-patient-chart').forEach(btn => {
    btn.addEventListener('click', () => {
      const patientId = btn.getAttribute('data-patient-id');
      store.setActivePatient(patientId);
      router.navigate('profile');
    });
  });

  // Review lab button
  container.querySelectorAll('.btn-review-lab').forEach(btn => {
    btn.addEventListener('click', () => {
      const labId = btn.getAttribute('data-lab-id');
      store.markLabReviewed(labId);
      router.showToast('Lab result reviewed and electronically signed.');
      router.render();
    });
  });

  // Quick action buttons
  const newPatientBtn = container.querySelector('#btn-dash-new-patient');
  if (newPatientBtn) {
    newPatientBtn.addEventListener('click', () => router.openModal('modal-new-patient'));
  }

  const newAptBtn = container.querySelector('#btn-dash-new-apt');
  if (newAptBtn) {
    newAptBtn.addEventListener('click', () => router.openModal('modal-new-apt'));
  }

  const newSoapBtn = container.querySelector('#btn-quick-new-soap');
  if (newSoapBtn) {
    newSoapBtn.addEventListener('click', () => router.navigate('notes'));
  }

  const newRxBtn = container.querySelector('#btn-quick-new-rx');
  if (newRxBtn) {
    newRxBtn.addEventListener('click', () => router.openModal('modal-new-prescription'));
  }

  const orderLabBtn = container.querySelector('#btn-quick-order-lab');
  if (orderLabBtn) {
    orderLabBtn.addEventListener('click', () => router.openModal('modal-order-lab'));
  }

  const superbillBtn = container.querySelector('#btn-quick-superbill');
  if (superbillBtn) {
    superbillBtn.addEventListener('click', () => router.openModal('modal-new-claim'));
  }
}
