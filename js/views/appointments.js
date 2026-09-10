/**
 * CareFlow EHR - Appointments & Scheduling View
 */

import { store } from '../store.js';

let aptFilter = {
  department: 'All',
  status: 'All'
};

export function renderAppointmentsView() {
  const appointments = store.getAppointments();
  const departments = ['All', 'Internal Medicine', 'Cardiovascular Medicine', 'Metabolic Health', 'Primary Care'];

  const filtered = appointments.filter(a => {
    if (aptFilter.department !== 'All' && a.department !== aptFilter.department) return false;
    if (aptFilter.status !== 'All' && a.status !== aptFilter.status) return false;
    return true;
  });

  return `
    <div class="view-header">
      <div class="view-title-group">
        <h1>Clinical Appointments & Scheduling</h1>
        <div class="view-subtitle">Manage patient arrivals, outpatient consultation queues, and telehealth visits.</div>
      </div>
      <div class="view-actions">
        <button class="btn btn-primary" id="btn-open-new-apt-modal">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg>
          Book New Appointment
        </button>
      </div>
    </div>

    <!-- Filter Card -->
    <div class="card" style="margin-bottom: 20px;">
      <div class="card-body" style="padding: 14px 20px;">
        <div style="display: flex; gap: 14px; flex-wrap: wrap; align-items: center; justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <label style="font-size: 13px; font-weight: 600; color: var(--text-muted);">Department:</label>
            <select id="filter-apt-dept" class="form-control" style="width: 200px;">
              ${departments.map(d => `
                <option value="${d}" ${aptFilter.department === d ? 'selected' : ''}>${d}</option>
              `).join('')}
            </select>

            <label style="font-size: 13px; font-weight: 600; color: var(--text-muted); margin-left: 8px;">Status:</label>
            <select id="filter-apt-status" class="form-control" style="width: 160px;">
              <option value="All" ${aptFilter.status === 'All' ? 'selected' : ''}>All Statuses</option>
              <option value="Confirmed" ${aptFilter.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="Checked-In" ${aptFilter.status === 'Checked-In' ? 'selected' : ''}>Checked-In</option>
              <option value="In Consultation" ${aptFilter.status === 'In Consultation' ? 'selected' : ''}>In Consultation</option>
              <option value="Completed" ${aptFilter.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${aptFilter.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </div>

          <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">
            Showing <strong>${filtered.length}</strong> appointments
          </span>
        </div>
      </div>
    </div>

    <!-- Appointments Agenda Table Card -->
    <div class="card">
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Patient</th>
              <th>Reason for Visit</th>
              <th>Provider & Dept</th>
              <th>Type / Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px;">No appointments matching the selected filters.</td></tr>
            ` : filtered.map(apt => `
              <tr>
                <td>
                  <div style="font-weight: 700; color: var(--primary-900); font-size: 13.5px;">${apt.time}</div>
                  <div style="font-size: 11.5px; color: var(--text-muted);">${apt.date} (${apt.durationMinutes} min)</div>
                </td>
                <td>
                  <div style="font-weight: 700; color: var(--text-main); cursor: pointer;" class="btn-goto-patient" data-patient-id="${apt.patientId}">
                    ${apt.patientName}
                  </div>
                  <div style="font-size: 11px; color: var(--text-subtle); font-family: var(--font-mono);">${apt.patientMrn}</div>
                </td>
                <td style="max-width: 220px;">
                  <div style="font-weight: 500;">${apt.reason}</div>
                  ${apt.notes ? `<div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Note: ${apt.notes}</div>` : ''}
                </td>
                <td>
                  <div style="font-weight: 600;">${apt.clinicianName}</div>
                  <div style="font-size: 11px; color: var(--text-muted);">${apt.department}</div>
                </td>
                <td>
                  <span class="badge badge-neutral">${apt.type}</span>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${apt.room}</div>
                </td>
                <td>
                  <span class="badge ${getStatusBadge(apt.status)}">${apt.status}</span>
                </td>
                <td>
                  <div style="display: flex; gap: 6px; align-items: center;">
                    ${apt.status === 'Confirmed' ? `
                      <button class="btn btn-secondary btn-sm btn-change-status" data-apt-id="${apt.id}" data-status="Checked-In">
                        Check In
                      </button>
                    ` : ''}
                    ${apt.status === 'Checked-In' ? `
                      <button class="btn btn-primary btn-sm btn-apt-start-visit" data-patient-id="${apt.patientId}">
                        Start Visit
                      </button>
                    ` : ''}
                    ${apt.status !== 'Completed' && apt.status !== 'Cancelled' ? `
                      <button class="btn btn-secondary btn-sm btn-change-status" data-apt-id="${apt.id}" data-status="Completed" title="Mark Visit Completed">
                        ✓
                      </button>
                      <button class="btn btn-secondary btn-sm btn-change-status" data-apt-id="${apt.id}" data-status="Cancelled" style="color: var(--danger-text);" title="Cancel Appointment">
                        ✕
                      </button>
                    ` : ''}
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function getStatusBadge(status) {
  switch (status) {
    case 'Checked-In': return 'badge-success';
    case 'Confirmed': return 'badge-info';
    case 'In Consultation': return 'badge-purple';
    case 'Completed': return 'badge-neutral';
    case 'Cancelled': return 'badge-danger';
    default: return 'badge-neutral';
  }
}

export function attachAppointmentsEvents(container, router) {
  // Department filter
  const deptSelect = container.querySelector('#filter-apt-dept');
  if (deptSelect) {
    deptSelect.addEventListener('change', (e) => {
      aptFilter.department = e.target.value;
      router.render();
    });
  }

  // Status filter
  const statusSelect = container.querySelector('#filter-apt-status');
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      aptFilter.status = e.target.value;
      router.render();
    });
  }

  // New Appointment modal trigger
  const newAptBtn = container.querySelector('#btn-open-new-apt-modal');
  if (newAptBtn) {
    newAptBtn.addEventListener('click', () => router.openModal('modal-new-apt'));
  }

  // Click patient name -> profile
  container.querySelectorAll('.btn-goto-patient').forEach(el => {
    el.addEventListener('click', () => {
      const patientId = el.getAttribute('data-patient-id');
      store.setActivePatient(patientId);
      router.navigate('profile');
    });
  });

  // Start Visit button -> notes
  container.querySelectorAll('.btn-apt-start-visit').forEach(btn => {
    btn.addEventListener('click', () => {
      const patientId = btn.getAttribute('data-patient-id');
      store.setActivePatient(patientId);
      router.navigate('notes');
    });
  });

  // Change status buttons
  container.querySelectorAll('.btn-change-status').forEach(btn => {
    btn.addEventListener('click', () => {
      const aptId = btn.getAttribute('data-apt-id');
      const newStatus = btn.getAttribute('data-status');
      store.updateAppointmentStatus(aptId, newStatus);
      router.showToast(`Appointment marked as ${newStatus}.`);
      router.render();
    });
  });
}
