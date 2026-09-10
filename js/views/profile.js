/**
 * CareFlow EHR - Detailed Patient Chart View
 */

import { store } from '../store.js';

let activeProfileTab = 'overview'; // 'overview' | 'vitals' | 'allergies-history' | 'medications' | 'notes' | 'timeline'

export function renderProfileView() {
  const patient = store.getActivePatient();
  if (!patient) {
    return `
      <div class="card" style="padding: 40px; text-align: center;">
        <h3>No patient selected</h3>
        <p style="color: var(--text-muted); margin-top: 6px;">Please choose a patient from the directory.</p>
        <a href="#patients" class="btn btn-primary" style="margin-top: 14px;">Open Patient Directory</a>
      </div>
    `;
  }

  const latestVital = (patient.vitals && patient.vitals[0]) || null;
  const allergies = patient.allergies || [];
  const conditions = patient.medicalHistory || [];
  const medications = (patient.medications || []).filter(m => m.status === 'Active');

  return `
    <!-- Top Patient Demographics Header Banner -->
    <div class="patient-profile-header">
      <div class="patient-header-left">
        <div class="patient-avatar-large">
          ${patient.firstName[0]}${patient.lastName[0]}
        </div>
        <div>
          <div class="patient-name-title">
            ${patient.firstName} ${patient.lastName}
            <span class="badge ${patient.status === 'Inpatient' ? 'badge-purple' : 'badge-success'}">${patient.status}</span>
          </div>
          <div class="patient-header-meta">
            <span>MRN: <strong style="font-family: var(--font-mono);">${patient.mrn}</strong></span>
            <span>DOB: <strong>${patient.dob} (${patient.age} yrs)</strong></span>
            <span>Sex: <strong>${patient.gender}</strong></span>
            <span>Blood Type: <strong>${patient.bloodType}</strong></span>
            <span>Primary Care: <strong>${patient.primaryProviderName}</strong></span>
          </div>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 4px;">
            📞 ${patient.phone} • ✉️ ${patient.email} • 📍 ${patient.address}
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <button class="btn btn-secondary" id="btn-chart-book-apt">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Schedule Visit
        </button>
        <button class="btn btn-primary" id="btn-chart-new-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          New SOAP Note
        </button>
      </div>
    </div>

    <!-- Prominent Allergies Alert Bar -->
    <div style="margin-bottom: 20px;">
      ${allergies.length === 0 ? `
        <div style="background-color: var(--success-bg); border: 1px solid var(--success-border); padding: 10px 16px; border-radius: var(--radius-md); font-size: 12.5px; color: var(--success-text); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <strong>NKDA</strong> — No Known Drug Allergies documented for this patient.
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-add-allergy-top" style="font-size: 11px; padding: 3px 8px;">+ Add Allergy</button>
        </div>
      ` : `
        <div class="allergies-banner">
          <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; color: var(--danger-text);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--danger-primary);"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            ALLERGY WARNING:
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; flex: 1;">
            ${allergies.map(a => `
              <span class="badge badge-danger" style="font-size: 12px; padding: 4px 8px;">
                <strong>${a.allergen}</strong> (${a.severity}) — ${a.reaction}
              </span>
            `).join('')}
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-add-allergy-top" style="font-size: 11px; padding: 3px 8px;">+ Add Allergy</button>
        </div>
      `}
    </div>

    <!-- Chart Navigation Tabs -->
    <div class="tabs-header">
      <button class="tab-btn ${activeProfileTab === 'overview' ? 'active' : ''}" data-tab="overview">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Overview
      </button>
      <button class="tab-btn ${activeProfileTab === 'vitals' ? 'active' : ''}" data-tab="vitals">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        Vitals & Trends
      </button>
      <button class="tab-btn ${activeProfileTab === 'allergies-history' ? 'active' : ''}" data-tab="allergies-history">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        History & Allergies
      </button>
      <button class="tab-btn ${activeProfileTab === 'medications' ? 'active' : ''}" data-tab="medications">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
        Medications (${medications.length})
      </button>
      <button class="tab-btn ${activeProfileTab === 'notes' ? 'active' : ''}" data-tab="notes">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        SOAP Notes
      </button>
      <button class="tab-btn ${activeProfileTab === 'timeline' ? 'active' : ''}" data-tab="timeline">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Visit Timeline
      </button>
    </div>

    <!-- Active Tab Content Area -->
    <div id="profile-tab-content">
      ${renderActiveTabContent(patient, activeProfileTab, latestVital, conditions, medications)}
    </div>
  `;
}

function renderActiveTabContent(patient, tab, latestVital, conditions, medications) {
  switch (tab) {
    case 'overview':
      return renderOverviewTab(patient, latestVital, conditions, medications);
    case 'vitals':
      return renderVitalsTab(patient);
    case 'allergies-history':
      return renderHistoryTab(patient);
    case 'medications':
      return renderMedicationsTab(patient, medications);
    case 'notes':
      return renderNotesTab(patient);
    case 'timeline':
      return renderTimelineTab(patient);
    default:
      return renderOverviewTab(patient, latestVital, conditions, medications);
  }
}

// 1. Overview Tab
function renderOverviewTab(patient, latestVital, conditions, medications) {
  return `
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
      
      <div>
        <!-- Vitals Snapshot -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              Latest Vital Signs Snapshot
            </div>
            ${latestVital ? `<span style="font-size: 11.5px; color: var(--text-muted);">${latestVital.date}</span>` : ''}
          </div>
          <div class="card-body">
            ${latestVital ? `
              <div class="vitals-grid" style="margin-bottom: 0;">
                <div class="vital-box ${latestVital.bpSystolic >= 130 ? 'alert-high' : ''}">
                  <div class="vital-title">Blood Pressure</div>
                  <div class="vital-value">${latestVital.bpSystolic}/${latestVital.bpDiastolic} <span class="vital-unit">mmHg</span></div>
                  <div class="vital-status ${latestVital.bpSystolic >= 130 ? 'elevated' : 'normal'}">
                    ${latestVital.bpSystolic >= 130 ? 'Stage 1 HTN Range' : 'Normal'}
                  </div>
                </div>

                <div class="vital-box">
                  <div class="vital-title">Heart Rate</div>
                  <div class="vital-value">${latestVital.heartRate} <span class="vital-unit">bpm</span></div>
                  <div class="vital-status normal">Regular Rhythm</div>
                </div>

                <div class="vital-box">
                  <div class="vital-title">Oxygen Sat (SpO2)</div>
                  <div class="vital-value">${latestVital.spO2}%</div>
                  <div class="vital-status normal">Room Air</div>
                </div>

                <div class="vital-box">
                  <div class="vital-title">Body Temp</div>
                  <div class="vital-value">${latestVital.temp}° <span class="vital-unit">F</span></div>
                  <div class="vital-status normal">Oral / Afebrile</div>
                </div>

                <div class="vital-box">
                  <div class="vital-title">BMI / Weight</div>
                  <div class="vital-value">${latestVital.bmi} <span class="vital-unit">kg/m²</span></div>
                  <div class="vital-status ${latestVital.bmi >= 25 ? 'elevated' : 'normal'}">${latestVital.weight} lbs (${latestVital.height} in)</div>
                </div>
              </div>
            ` : `
              <div style="text-align: center; color: var(--text-muted); padding: 20px;">
                No vitals recorded yet.
              </div>
            `}
          </div>
        </div>

        <!-- Active Chronic Conditions -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Active Medical Conditions (ICD-10)
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-add-condition-tab">+ Add Condition</button>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ICD-10 Code</th>
                  <th>Condition Name</th>
                  <th>Diagnosed</th>
                  <th>Status</th>
                  <th>Clinical Notes</th>
                </tr>
              </thead>
              <tbody>
                ${conditions.length === 0 ? `
                  <tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No chronic conditions documented.</td></tr>
                ` : conditions.map(c => `
                  <tr>
                    <td style="font-family: var(--font-mono); font-weight: 700; color: var(--primary-800);">${c.icd10}</td>
                    <td style="font-weight: 600;">${c.condition}</td>
                    <td style="color: var(--text-muted); font-size: 12px;">${c.diagnosedDate}</td>
                    <td><span class="badge badge-success">${c.status}</span></td>
                    <td style="font-size: 12px; color: var(--text-muted);">${c.notes || '—'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Current Medications Summary -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
              Current Active Medications (${medications.length})
            </div>
            <button class="btn btn-primary btn-sm" id="btn-new-prescription-tab">+ Prescribe Med</button>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dosage / Route</th>
                  <th>Frequency</th>
                  <th>Indication</th>
                  <th>Refills</th>
                </tr>
              </thead>
              <tbody>
                ${medications.length === 0 ? `
                  <tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No active medications prescribed.</td></tr>
                ` : medications.map(m => `
                  <tr>
                    <td style="font-weight: 700; color: var(--text-main);">${m.name}</td>
                    <td>${m.dosage} (${m.route})</td>
                    <td>${m.frequency}</td>
                    <td style="color: var(--text-muted); font-size: 12px;">${m.indication}</td>
                    <td><span class="badge ${m.refillsRemaining <= 1 ? 'badge-warning' : 'badge-neutral'}">${m.refillsRemaining} left</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Column: Patient Social, Insurance, Emergency Contacts -->
      <div>
        <!-- Insurance Card -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              Insurance & Coverage
            </div>
          </div>
          <div class="card-body" style="font-size: 13px;">
            <div style="font-weight: 700; font-size: 15px; color: var(--text-main);">${patient.insurance.provider}</div>
            <div style="color: var(--text-muted); margin-top: 4px;">Policy #: <strong style="font-family: var(--font-mono); color: var(--text-main);">${patient.insurance.policyNumber}</strong></div>
            <div style="color: var(--text-muted);">Group #: <strong style="font-family: var(--font-mono); color: var(--text-main);">${patient.insurance.groupNumber}</strong></div>
            <div style="color: var(--text-muted); margin-top: 6px;">Office Visit Copay: <strong>$${patient.insurance.copay}.00</strong></div>

            <!-- Deductible Progress Bar -->
            <div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border-light);">
              <div style="display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 600; margin-bottom: 4px;">
                <span>Deductible Met</span>
                <span>$${patient.insurance.deductibleMet} / $${patient.insurance.deductible}</span>
              </div>
              <div style="height: 8px; background: var(--bg-subtle); border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: ${(patient.insurance.deductibleMet / patient.insurance.deductible) * 100}%; background: var(--primary-600); border-radius: 4px;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Emergency Contact -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Emergency Contact
            </div>
          </div>
          <div class="card-body" style="font-size: 13px;">
            <div style="font-weight: 700; color: var(--text-main);">${patient.emergencyContact.name}</div>
            <div style="color: var(--text-muted); font-size: 12px;">Relation: ${patient.emergencyContact.relation}</div>
            <div style="color: var(--primary-700); font-weight: 600; margin-top: 4px;">📞 ${patient.emergencyContact.phone}</div>
          </div>
        </div>

        <!-- Social History -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Social History
            </div>
          </div>
          <div class="card-body" style="font-size: 12.5px; display: flex; flex-direction: column; gap: 8px;">
            <div><strong>Smoking:</strong> <span style="color: var(--text-muted);">${patient.socialHistory.smoking}</span></div>
            <div><strong>Alcohol:</strong> <span style="color: var(--text-muted);">${patient.socialHistory.alcohol}</span></div>
            <div><strong>Exercise:</strong> <span style="color: var(--text-muted);">${patient.socialHistory.exercise}</span></div>
            <div><strong>Occupation:</strong> <span style="color: var(--text-muted);">${patient.socialHistory.occupation}</span></div>
          </div>
        </div>

      </div>

    </div>
  `;
}

// 2. Vitals & Trends Tab
function renderVitalsTab(patient) {
  const vitals = patient.vitals || [];

  return `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <div>
        <h2 style="font-size: 16px; font-weight: 700;">Vital Signs Trend & Longitudinal Record</h2>
        <p style="font-size: 12.5px; color: var(--text-muted);">Tracking systolic/diastolic blood pressure and heart rate over encounters.</p>
      </div>
      <button class="btn btn-primary" id="btn-log-new-vitals">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Log New Vitals
      </button>
    </div>

    <!-- Interactive Canvas Chart -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          Blood Pressure & Heart Rate Longitudinal Trend
        </div>
        <div style="display: flex; gap: 14px; font-size: 12px; font-weight: 600;">
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: #0d9488; border-radius: 50%;"></span> Systolic BP</span>
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: #0284c7; border-radius: 50%;"></span> Diastolic BP</span>
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: #ef4444; border-radius: 50%;"></span> Heart Rate</span>
        </div>
      </div>
      <div class="card-body">
        <div class="chart-container">
          <canvas id="vitalsChartCanvas" width="800" height="200" style="width: 100%; height: 100%;"></canvas>
        </div>
      </div>
    </div>

    <!-- Vitals History Table -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">Recorded Observations Log</div>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>BP (mmHg)</th>
              <th>Heart Rate</th>
              <th>SpO2</th>
              <th>Temp</th>
              <th>Resp Rate</th>
              <th>Weight / BMI</th>
              <th>Recorded By</th>
            </tr>
          </thead>
          <tbody>
            ${vitals.length === 0 ? `
              <tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">No vitals recorded. Click "Log New Vitals" to add.</td></tr>
            ` : vitals.map(v => `
              <tr>
                <td style="font-weight: 600; color: var(--primary-900);">${v.date}</td>
                <td>
                  <span style="font-weight: 700; ${v.bpSystolic >= 130 ? 'color: var(--danger-text);' : ''}">${v.bpSystolic}/${v.bpDiastolic}</span>
                  ${v.bpSystolic >= 130 ? '<span class="badge badge-warning" style="font-size: 10px; margin-left: 4px;">Elevated</span>' : ''}
                </td>
                <td>${v.heartRate} bpm</td>
                <td>${v.spO2}%</td>
                <td>${v.temp} °F</td>
                <td>${v.respRate} /min</td>
                <td>${v.weight} lbs (BMI ${v.bmi})</td>
                <td style="font-size: 12px; color: var(--text-muted);">${v.recordedBy}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 3. Allergies & History Tab
function renderHistoryTab(patient) {
  const allergies = patient.allergies || [];
  const conditions = patient.medicalHistory || [];
  const surgeries = patient.surgicalHistory || [];

  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      
      <!-- Allergies List -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--danger-primary);"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Allergy & Adverse Drug Reactions
          </div>
          <button class="btn btn-danger btn-sm" id="btn-add-allergy-modal">+ Add Allergy</button>
        </div>
        <div class="card-body">
          ${allergies.length === 0 ? `
            <div style="text-align: center; color: var(--text-muted); padding: 20px;">No documented allergies.</div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${allergies.map(a => `
                <div style="background: var(--danger-bg); border: 1px solid var(--danger-border); border-radius: var(--radius-md); padding: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 800; font-size: 14px; color: var(--danger-text);">${a.allergen}</span>
                    <span class="badge badge-danger">${a.severity} Severity</span>
                  </div>
                  <div style="font-size: 12.5px; color: #7f1d1d; margin-top: 4px;">
                    <strong>Reaction:</strong> ${a.reaction}
                  </div>
                  <div style="font-size: 11px; color: var(--text-subtle); margin-top: 4px;">
                    Type: ${a.type} • Identified: ${a.dateIdentified}
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>

      <!-- Past Surgeries & Procedures -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><circle cx="12" cy="12" r="10"/><line x1="14.31" y1="8" x2="20.05" y2="17.94"/><line x1="9.69" y1="8" x2="21.17" y2="8"/><line x1="7.38" y1="12" x2="13.12" y2="2.06"/><line x1="9.69" y1="16" x2="3.95" y2="6.06"/><line x1="14.31" y1="16" x2="2.83" y2="16"/><line x1="16.62" y1="12" x2="10.88" y2="21.94"/></svg>
            Surgical & Procedural History
          </div>
        </div>
        <div class="card-body">
          ${surgeries.length === 0 ? `
            <div style="text-align: center; color: var(--text-muted); padding: 20px;">No prior surgeries on file.</div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${surgeries.map(s => `
                <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px;">
                  <div style="font-weight: 700; color: var(--text-main);">${s.procedure}</div>
                  <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                    Date: ${s.date} • Facility: ${s.facility}
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-subtle);">Surgeon: ${s.surgeon}</div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>

    </div>
  `;
}

// 4. Medications Tab
function renderMedicationsTab(patient, medications) {
  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title">Active Outpatient & Inpatient Pharmacotherapy</div>
        <button class="btn btn-primary btn-sm" id="btn-meds-new-rx">+ E-Prescribe Medication</button>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Strength & Route</th>
              <th>Dosing Regimen</th>
              <th>Clinical Indication</th>
              <th>Prescribed By</th>
              <th>Refills Remaining</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${medications.length === 0 ? `
              <tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">No active medications.</td></tr>
            ` : medications.map(m => `
              <tr>
                <td style="font-weight: 700; color: var(--text-main); font-size: 14px;">${m.name}</td>
                <td>${m.dosage} • ${m.route}</td>
                <td>${m.frequency}</td>
                <td style="color: var(--text-muted);">${m.indication}</td>
                <td style="font-size: 12px;">${m.prescriber}</td>
                <td>
                  <span class="badge ${m.refillsRemaining <= 1 ? 'badge-warning' : 'badge-neutral'}">${m.refillsRemaining} Refills</span>
                </td>
                <td><span class="badge badge-success">Active</span></td>
                <td>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn btn-secondary btn-sm btn-renew-refill" data-med-id="${m.id}" title="Add 3 refills">Renew</button>
                    <button class="btn btn-secondary btn-sm btn-discontinue-med" data-med-id="${m.id}" style="color: var(--danger-text);">Discontinue</button>
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

// 5. Clinical Notes Tab
function renderNotesTab(patient) {
  const notes = store.getNotesForPatient(patient.id);

  return `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <div>
        <h2 style="font-size: 16px; font-weight: 700;">SOAP Progress Notes Archive</h2>
        <p style="font-size: 12.5px; color: var(--text-muted);">Signed clinical encounter documentation for ${patient.firstName} ${patient.lastName}.</p>
      </div>
      <button class="btn btn-primary" id="btn-chart-add-soap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Write New SOAP Note
      </button>
    </div>

    ${notes.length === 0 ? `
      <div class="card" style="padding: 40px; text-align: center; color: var(--text-muted);">
        No SOAP notes authored for this patient yet. Click "+ Write New SOAP Note" to begin.
      </div>
    ` : notes.map(n => `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header" style="background-color: var(--bg-subtle);">
          <div>
            <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">${n.title}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
              Encounter Date: <strong>${n.encounterDate}</strong> • Author: <strong>${n.clinicianName}</strong>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-success">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              Signed
            </span>
            <button class="btn btn-secondary btn-sm" onclick="window.print()">Print Note</button>
          </div>
        </div>
        <div class="card-body">
          <div class="soap-grid">
            <div class="soap-quadrant">
              <div class="soap-header">
                <span><span class="soap-letter-badge">S</span> Subjective</span>
              </div>
              <div style="font-size: 13px; color: var(--text-main); line-height: 1.6; white-space: pre-line;">${n.subjective}</div>
            </div>

            <div class="soap-quadrant">
              <div class="soap-header">
                <span><span class="soap-letter-badge">O</span> Objective</span>
              </div>
              <div style="font-size: 13px; color: var(--text-main); line-height: 1.6; white-space: pre-line;">${n.objective}</div>
            </div>

            <div class="soap-quadrant">
              <div class="soap-header">
                <span><span class="soap-letter-badge">A</span> Assessment</span>
              </div>
              <div style="font-size: 13px; color: var(--text-main); line-height: 1.6; white-space: pre-line;">${n.assessment}</div>
            </div>

            <div class="soap-quadrant">
              <div class="soap-header">
                <span><span class="soap-letter-badge">P</span> Plan</span>
              </div>
              <div style="font-size: 13px; color: var(--text-main); line-height: 1.6; white-space: pre-line;">${n.plan}</div>
            </div>
          </div>
          
          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed var(--border-light); font-size: 11.5px; color: var(--text-subtle); display: flex; justify-content: space-between;">
            <span>Electronically Signed by: <strong>${n.signedBy}</strong> on ${n.signedAt}</span>
            <span>Authentication ID: CF-${n.id}</span>
          </div>
        </div>
      </div>
    `).join('')}
  `;
}

// 6. Timeline Tab
function renderTimelineTab(patient) {
  const encounters = patient.encounters || [];

  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title">Encounter History & Clinical Event Timeline</div>
      </div>
      <div class="card-body">
        ${encounters.length === 0 ? `
          <div style="text-align: center; color: var(--text-muted); padding: 30px;">No encounter history documented.</div>
        ` : `
          <div class="timeline">
            ${encounters.map(e => `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${e.date} • ${e.type}</div>
                <div class="timeline-title">${e.reason}</div>
                <div class="timeline-desc">
                  ${e.summary}
                  <div style="font-size: 11.5px; color: var(--primary-700); margin-top: 4px; font-weight: 600;">
                    Attending: ${e.clinician} (${e.department})
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

// Chart Drawing Utility (Canvas-based, pure zero dependencies)
function drawVitalsChart(vitals) {
  const canvas = document.getElementById('vitalsChartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Adapt for canvas high DPI
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const width = rect.width;
  const height = rect.height;
  const padding = { top: 20, right: 30, bottom: 30, left: 45 };

  ctx.clearRect(0, 0, width, height);

  if (!vitals || vitals.length === 0) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No vitals data points to plot.', width / 2, height / 2);
    return;
  }

  // Points ordered chronologically (oldest to newest for plotting)
  const pts = [...vitals].reverse();

  const minVal = 40;
  const maxVal = 180;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const getX = (index) => {
    if (pts.length === 1) return padding.left + chartW / 2;
    return padding.left + (index / (pts.length - 1)) * chartW;
  };

  const getY = (val) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    return padding.top + chartH - ((clamped - minVal) / (maxVal - minVal)) * chartH;
  };

  // Grid lines
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  [60, 80, 100, 120, 140, 160].forEach(level => {
    const y = getY(level);
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(level.toString(), padding.left - 8, y + 3);
  });
  ctx.stroke();

  // Draw series helper
  const drawSeries = (color, getter, label) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    pts.forEach((p, idx) => {
      const x = getX(idx);
      const y = getY(getter(p));
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw dots
    pts.forEach((p, idx) => {
      const x = getX(idx);
      const y = getY(getter(p));
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label on point
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(getter(p).toString(), x, y - 8);
    });
  };

  // Draw lines
  drawSeries('#0d9488', p => p.bpSystolic, 'Systolic');
  drawSeries('#0284c7', p => p.bpDiastolic, 'Diastolic');
  drawSeries('#ef4444', p => p.heartRate, 'HR');

  // Dates on X Axis
  ctx.fillStyle = '#64748b';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  pts.forEach((p, idx) => {
    const x = getX(idx);
    const dateLabel = p.date.split(' ')[0].slice(5); // MM-DD
    ctx.fillText(dateLabel, x, height - 8);
  });
}

export function attachProfileEvents(container, router) {
  const patient = store.getActivePatient();
  if (!patient) return;

  // Tabs switching
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeProfileTab = btn.getAttribute('data-tab');
      router.render();
      if (activeProfileTab === 'vitals') {
        setTimeout(() => drawVitalsChart(patient.vitals), 50);
      }
    });
  });

  // If vitals tab is currently active, draw canvas
  if (activeProfileTab === 'vitals') {
    setTimeout(() => drawVitalsChart(patient.vitals), 50);
  }

  // Add Allergy modal trigger
  const addAllergyBtn = container.querySelector('#btn-add-allergy-top') || container.querySelector('#btn-add-allergy-modal');
  if (addAllergyBtn) {
    addAllergyBtn.addEventListener('click', () => router.openModal('modal-add-allergy'));
  }

  // Add Condition modal trigger
  const addConditionBtn = container.querySelector('#btn-add-condition-tab');
  if (addConditionBtn) {
    addConditionBtn.addEventListener('click', () => router.openModal('modal-add-condition'));
  }

  // Log new vitals modal trigger
  const logVitalsBtn = container.querySelector('#btn-log-new-vitals');
  if (logVitalsBtn) {
    logVitalsBtn.addEventListener('click', () => router.openModal('modal-log-vitals'));
  }

  // Book appointment trigger
  const bookAptBtn = container.querySelector('#btn-chart-book-apt');
  if (bookAptBtn) {
    bookAptBtn.addEventListener('click', () => router.openModal('modal-new-apt'));
  }

  // New Note trigger
  const newNoteBtn = container.querySelector('#btn-chart-new-note') || container.querySelector('#btn-chart-add-soap');
  if (newNoteBtn) {
    newNoteBtn.addEventListener('click', () => router.navigate('notes'));
  }

  // New Prescription trigger
  const newRxBtn = container.querySelector('#btn-new-prescription-tab') || container.querySelector('#btn-meds-new-rx');
  if (newRxBtn) {
    newRxBtn.addEventListener('click', () => router.openModal('modal-new-prescription'));
  }

  // Discontinue medication button
  container.querySelectorAll('.btn-discontinue-med').forEach(btn => {
    btn.addEventListener('click', () => {
      const medId = btn.getAttribute('data-med-id');
      store.discontinueMedication(patient.id, medId);
      router.showToast('Medication marked as discontinued.');
      router.render();
    });
  });

  // Renew refill button
  container.querySelectorAll('.btn-renew-refill').forEach(btn => {
    btn.addEventListener('click', () => {
      const medId = btn.getAttribute('data-med-id');
      store.renewRefill(patient.id, medId);
      router.showToast('Refills authorized (+3 refills).');
      router.render();
    });
  });
}
