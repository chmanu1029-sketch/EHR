/**
 * CareFlow EHR - Prescriptions & Medications View
 */

import { store } from '../store.js';

let selectedMedPatientId = 'All';

export function renderMedicationsView() {
  const patients = store.getPatients();
  const allMeds = store.getAllMedications();

  const filteredMeds = allMeds.filter(m => {
    if (selectedMedPatientId !== 'All' && m.patientId !== selectedMedPatientId) return false;
    return true;
  });

  return `
    <div class="view-header">
      <div class="view-title-group">
        <h1>Prescriptions & Medication Management</h1>
        <div class="view-subtitle">E-Prescribe medications, track dosage regimens, and simulate drug-drug & allergy contraindication safety alerts.</div>
      </div>
      <div class="view-actions">
        <button class="btn btn-primary" id="btn-open-new-prescription-page">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
          Write New Prescription
        </button>
      </div>
    </div>

    <!-- Drug Interaction & Safety Simulator Card -->
    <div class="card" style="border-left: 4px solid var(--primary-600);">
      <div class="card-header">
        <div class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Interactive Drug Interaction & Allergy Checker Simulator
        </div>
      </div>
      <div class="card-body">
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">
          Test potential drug-drug interactions or allergen contraindications against a patient's active chart in real-time.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 12px; align-items: flex-end;">
          <div>
            <label class="form-label">Select Target Patient:</label>
            <select id="sim-patient-select" class="form-control">
              ${patients.map(p => `
                <option value="${p.id}">${p.firstName} ${p.lastName} (${p.mrn})</option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="form-label">Medication to Evaluate:</label>
            <input type="text" id="sim-drug-input" class="form-control" placeholder="e.g. Spironolactone, Amoxicillin, Warfarin..." value="Spironolactone">
          </div>

          <div>
            <button class="btn btn-primary" id="btn-run-simulation">Check Safety & Interactions</button>
          </div>
        </div>

        <!-- Simulation Output Box -->
        <div id="simulation-results-container" style="margin-top: 14px;"></div>
      </div>
    </div>

    <!-- Active Prescriptions Filter & Table -->
    <div class="card">
      <div class="card-header" style="flex-wrap: wrap; gap: 12px;">
        <div class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
          Active Prescriptions Roster (${filteredMeds.length})
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <label style="font-size: 12.5px; font-weight: 600; color: var(--text-muted);">Patient Filter:</label>
          <select id="med-patient-filter" class="form-control" style="width: 220px; height: 34px; font-size: 12.5px;">
            <option value="All" ${selectedMedPatientId === 'All' ? 'selected' : ''}>All Patients</option>
            ${patients.map(p => `
              <option value="${p.id}" ${selectedMedPatientId === p.id ? 'selected' : ''}>${p.firstName} ${p.lastName}</option>
            `).join('')}
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Patient</th>
              <th>Dosage & Route</th>
              <th>Frequency / Regimen</th>
              <th>Indication</th>
              <th>Prescriber</th>
              <th>Pharmacy</th>
              <th>Refills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filteredMeds.length === 0 ? `
              <tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 30px;">No medications found.</td></tr>
            ` : filteredMeds.map(m => `
              <tr>
                <td>
                  <div style="font-weight: 700; color: var(--text-main); font-size: 13.5px;">${m.name}</div>
                  <div style="font-size: 11px; color: var(--text-subtle);">Started: ${m.prescribedDate}</div>
                </td>
                <td>
                  <div style="font-weight: 600; color: var(--primary-800); cursor: pointer;" class="btn-goto-patient" data-patient-id="${m.patientId}">
                    ${m.patientName}
                  </div>
                  <div style="font-size: 11px; color: var(--text-subtle);">${m.patientMrn}</div>
                </td>
                <td>${m.dosage} • ${m.route}</td>
                <td style="font-size: 12.5px;">${m.frequency}</td>
                <td style="font-size: 12px; color: var(--text-muted);">${m.indication}</td>
                <td style="font-size: 12px;">${m.prescriber}</td>
                <td style="font-size: 11.5px; color: var(--text-muted);">${m.pharmacy}</td>
                <td>
                  <span class="badge ${m.refillsRemaining <= 1 ? 'badge-warning' : 'badge-neutral'}">
                    ${m.refillsRemaining} remaining
                  </span>
                </td>
                <td>
                  <div style="display: flex; gap: 4px;">
                    <button class="btn btn-secondary btn-sm btn-renew-refill-page" data-patient-id="${m.patientId}" data-med-id="${m.id}" title="Authorize refills">Renew</button>
                    <button class="btn btn-secondary btn-sm btn-discontinue-med-page" data-patient-id="${m.patientId}" data-med-id="${m.id}" style="color: var(--danger-text);" title="Discontinue medication">Discontinue</button>
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

export function attachMedicationsEvents(container, router) {
  // New Prescription modal trigger
  const newRxBtn = container.querySelector('#btn-open-new-prescription-page');
  if (newRxBtn) {
    newRxBtn.addEventListener('click', () => router.openModal('modal-new-prescription'));
  }

  // Patient filter
  const filterSelect = container.querySelector('#med-patient-filter');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      selectedMedPatientId = e.target.value;
      router.render();
    });
  }

  // Simulation test button
  const simBtn = container.querySelector('#btn-run-simulation');
  const simPatient = container.querySelector('#sim-patient-select');
  const simDrug = container.querySelector('#sim-drug-input');
  const simResults = container.querySelector('#simulation-results-container');

  const runSim = () => {
    const patientId = simPatient.value;
    const drugName = simDrug.value.trim();
    if (!drugName) {
      simResults.innerHTML = `<div style="color: var(--danger-text); font-size: 12px;">Please enter a drug name to test.</div>`;
      return;
    }

    const alerts = store.checkDrugInteractions(patientId, drugName);
    const patient = store.getPatientById(patientId);

    if (alerts.length === 0) {
      simResults.innerHTML = `
        <div style="background-color: var(--success-bg); border: 1px solid var(--success-border); padding: 12px 16px; border-radius: var(--radius-md); color: var(--success-text); font-size: 13px; display: flex; align-items: center; gap: 10px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <div>
            <strong>No Interaction or Allergy Conflicts Detected</strong> for <strong>${drugName}</strong> with ${patient.firstName} ${patient.lastName}'s current regimen.
          </div>
        </div>
      `;
    } else {
      simResults.innerHTML = alerts.map(a => `
        <div class="drug-alert-card">
          <div class="drug-alert-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div>
            <div class="drug-alert-title">
              ⚠️ ${a.type.toUpperCase()}: ${a.title} (${a.severity} Severity)
            </div>
            <div class="drug-alert-body">
              ${a.details}
            </div>
            <div style="font-size: 12px; color: #991b1b; font-weight: 700; margin-top: 6px;">
              Clinical Guidance: ${a.recommendation}
            </div>
          </div>
        </div>
      `).join('');
    }
  };

  if (simBtn) {
    simBtn.addEventListener('click', runSim);
    // Run initial simulation
    runSim();
  }

  // Renew refill button
  container.querySelectorAll('.btn-renew-refill-page').forEach(btn => {
    btn.addEventListener('click', () => {
      const patientId = btn.getAttribute('data-patient-id');
      const medId = btn.getAttribute('data-med-id');
      store.renewRefill(patientId, medId);
      router.showToast('Refills renewed (+3 refills).');
      router.render();
    });
  });

  // Discontinue medication button
  container.querySelectorAll('.btn-discontinue-med-page').forEach(btn => {
    btn.addEventListener('click', () => {
      const patientId = btn.getAttribute('data-patient-id');
      const medId = btn.getAttribute('data-med-id');
      store.discontinueMedication(patientId, medId);
      router.showToast('Medication marked as discontinued.');
      router.render();
    });
  });

  // Patient link
  container.querySelectorAll('.btn-goto-patient').forEach(el => {
    el.addEventListener('click', () => {
      const patientId = el.getAttribute('data-patient-id');
      store.setActivePatient(patientId);
      router.navigate('profile');
    });
  });
}
