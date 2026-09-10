/**
 * CareFlow EHR - Patient Directory View
 */

import { store } from '../store.js';

let currentFilter = {
  search: '',
  status: 'All',
  gender: 'All',
  viewMode: 'table' // 'table' | 'grid'
};

export function renderPatientsView() {
  const patients = store.getPatients();
  
  // Filter logic
  const filtered = patients.filter(p => {
    // Search
    if (currentFilter.search) {
      const q = currentFilter.search.toLowerCase();
      const matchName = `${p.firstName} ${p.lastName}`.toLowerCase().includes(q);
      const matchMrn = p.mrn.toLowerCase().includes(q);
      const matchPhone = p.phone.toLowerCase().includes(q);
      const matchCondition = (p.medicalHistory || []).some(m => m.condition.toLowerCase().includes(q));
      if (!matchName && !matchMrn && !matchPhone && !matchCondition) return false;
    }

    // Status
    if (currentFilter.status !== 'All' && p.status !== currentFilter.status) {
      return false;
    }

    // Gender
    if (currentFilter.gender !== 'All' && p.gender !== currentFilter.gender) {
      return false;
    }

    return true;
  });

  return `
    <div class="view-header">
      <div class="view-title-group">
        <h1>Patient Directory</h1>
        <div class="view-subtitle">Search, filter, and inspect comprehensive medical charts across active clinic census.</div>
      </div>
      <div class="view-actions">
        <button class="btn btn-primary" id="btn-add-patient-directory">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          Register New Patient
        </button>
      </div>
    </div>

    <!-- Filter & Search Toolbar Card -->
    <div class="card" style="margin-bottom: 20px;">
      <div class="card-body" style="padding: 14px 20px;">
        <div style="display: flex; gap: 14px; flex-wrap: wrap; align-items: center; justify-content: space-between;">
          
          <div style="display: flex; gap: 12px; flex: 1; min-width: 280px; align-items: center;">
            <div style="position: relative; flex: 1;">
              <input type="text" id="dir-search-input" class="form-control" placeholder="Search by name, MRN, phone, diagnosis..." value="${escapeHtml(currentFilter.search)}" style="padding-left: 36px; height: 38px;">
              <svg style="position: absolute; left: 12px; top: 11px; width: 16px; height: 16px; color: var(--text-muted);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            
            <select id="dir-filter-status" class="form-control" style="width: 140px; height: 38px;">
              <option value="All" ${currentFilter.status === 'All' ? 'selected' : ''}>Status: All</option>
              <option value="Active" ${currentFilter.status === 'Active' ? 'selected' : ''}>Active</option>
              <option value="Inpatient" ${currentFilter.status === 'Inpatient' ? 'selected' : ''}>Inpatient</option>
            </select>

            <select id="dir-filter-gender" class="form-control" style="width: 140px; height: 38px;">
              <option value="All" ${currentFilter.gender === 'All' ? 'selected' : ''}>Gender: All</option>
              <option value="Female" ${currentFilter.gender === 'Female' ? 'selected' : ''}>Female</option>
              <option value="Male" ${currentFilter.gender === 'Male' ? 'selected' : ''}>Male</option>
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Showing <strong>${filtered.length}</strong> of ${patients.length} patients</span>
            <div style="display: flex; border: 1px solid var(--border-light); border-radius: var(--radius-md); overflow: hidden;">
              <button class="btn-view-mode ${currentFilter.viewMode === 'table' ? 'active' : ''}" data-mode="table" style="background: ${currentFilter.viewMode === 'table' ? 'var(--primary-700)' : 'white'}; color: ${currentFilter.viewMode === 'table' ? 'white' : 'var(--text-muted)'}; border: none; padding: 7px 10px; cursor: pointer;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </button>
              <button class="btn-view-mode ${currentFilter.viewMode === 'grid' ? 'active' : ''}" data-mode="grid" style="background: ${currentFilter.viewMode === 'grid' ? 'var(--primary-700)' : 'white'}; color: ${currentFilter.viewMode === 'grid' ? 'white' : 'var(--text-muted)'}; border: none; padding: 7px 10px; cursor: pointer;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Patients Results Content -->
    ${filtered.length === 0 ? `
      <div class="card" style="padding: 50px 20px; text-align: center;">
        <svg style="width: 48px; height: 48px; color: var(--text-subtle); margin-bottom: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main);">No patients found</h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Try modifying your search keywords or filter criteria.</p>
      </div>
    ` : currentFilter.viewMode === 'table' ? renderTableView(filtered) : renderGridView(filtered)}
  `;
}

function renderTableView(patients) {
  return `
    <div class="card">
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Patient / MRN</th>
              <th>Demographics</th>
              <th>Primary Provider</th>
              <th>Active Diagnoses</th>
              <th>Allergies</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${patients.map(p => `
              <tr class="patient-row" data-patient-id="${p.id}" style="cursor: pointer;">
                <td>
                  <div style="font-weight: 700; color: var(--primary-900); font-size: 13.5px;">${p.firstName} ${p.lastName}</div>
                  <div style="font-size: 11px; color: var(--text-subtle); font-family: var(--font-mono);">${p.mrn}</div>
                </td>
                <td>
                  <div>${p.age} yrs • ${p.gender}</div>
                  <div style="font-size: 11px; color: var(--text-muted);">DOB: ${p.dob} (Blood: ${p.bloodType})</div>
                </td>
                <td>
                  <div style="font-weight: 500;">${p.primaryProviderName}</div>
                </td>
                <td style="max-width: 260px;">
                  <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                    ${(p.medicalHistory || []).slice(0, 2).map(m => `
                      <span class="badge badge-neutral" style="font-size: 11px;" title="${m.condition}">
                        ${m.icd10}: ${m.condition.length > 25 ? m.condition.slice(0, 23) + '...' : m.condition}
                      </span>
                    `).join('')}
                    ${(p.medicalHistory || []).length > 2 ? `
                      <span class="badge badge-neutral">+${(p.medicalHistory || []).length - 2} more</span>
                    ` : ''}
                  </div>
                </td>
                <td>
                  ${(p.allergies || []).length === 0 ? `
                    <span style="color: var(--text-subtle); font-size: 12px;">NKDA</span>
                  ` : `
                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                      ${p.allergies.map(a => `
                        <span class="badge badge-danger" title="${a.reaction}">
                          ${a.allergen}
                        </span>
                      `).join('')}
                    </div>
                  `}
                </td>
                <td>
                  <span class="badge ${p.status === 'Inpatient' ? 'badge-purple' : 'badge-success'}">${p.status}</span>
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm btn-open-chart" data-patient-id="${p.id}">
                    Open Chart →
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderGridView(patients) {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
      ${patients.map(p => `
        <div class="card patient-card-grid" data-patient-id="${p.id}" style="margin-bottom: 0; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease;">
          <div class="card-body" style="padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--primary-700); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;">
                  ${p.firstName[0]}${p.lastName[0]}
                </div>
                <div>
                  <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">${p.firstName} ${p.lastName}</div>
                  <div style="font-size: 11.5px; color: var(--text-subtle); font-family: var(--font-mono);">${p.mrn}</div>
                </div>
              </div>
              <span class="badge ${p.status === 'Inpatient' ? 'badge-purple' : 'badge-success'}">${p.status}</span>
            </div>

            <div style="font-size: 12.5px; color: var(--text-muted); display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 12px; background: var(--bg-subtle); padding: 8px 10px; border-radius: var(--radius-sm);">
              <div>Age / Sex: <strong>${p.age}y / ${p.gender[0]}</strong></div>
              <div>Blood: <strong>${p.bloodType}</strong></div>
              <div>Phone: <strong>${p.phone}</strong></div>
              <div>DOB: <strong>${p.dob}</strong></div>
            </div>

            <!-- Conditions & Allergies Preview -->
            <div style="margin-bottom: 12px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-subtle); margin-bottom: 4px;">Conditions:</div>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${(p.medicalHistory || []).slice(0, 2).map(m => `
                  <span class="badge badge-neutral" style="font-size: 10.5px;">${m.icd10}: ${m.condition.slice(0, 18)}...</span>
                `).join('')}
              </div>
            </div>

            <div style="border-top: 1px solid var(--border-light); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11.5px; color: var(--text-muted);">PCP: ${p.primaryProviderName.split(',')[0]}</span>
              <button class="btn btn-primary btn-sm btn-open-chart" data-patient-id="${p.id}">
                Open Chart →
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function attachPatientsEvents(container, router) {
  // Search input
  const searchInput = container.querySelector('#dir-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilter.search = e.target.value;
      router.render();
    });
  }

  // Filter status
  const statusFilter = container.querySelector('#dir-filter-status');
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      currentFilter.status = e.target.value;
      router.render();
    });
  }

  // Filter gender
  const genderFilter = container.querySelector('#dir-filter-gender');
  if (genderFilter) {
    genderFilter.addEventListener('change', (e) => {
      currentFilter.gender = e.target.value;
      router.render();
    });
  }

  // View mode switcher
  container.querySelectorAll('.btn-view-mode').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter.viewMode = btn.getAttribute('data-mode');
      router.render();
    });
  });

  // Open Chart buttons
  container.querySelectorAll('.btn-open-chart, .patient-row, .patient-card-grid').forEach(el => {
    el.addEventListener('click', (e) => {
      // Don't double trigger if clicking button inside row
      const patientId = el.getAttribute('data-patient-id');
      if (patientId) {
        store.setActivePatient(patientId);
        router.navigate('profile');
      }
    });
  });

  // Add Patient button
  const addBtn = container.querySelector('#btn-add-patient-directory');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      router.openModal('modal-new-patient');
    });
  }
}
