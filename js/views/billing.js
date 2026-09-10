/**
 * CareFlow EHR - Billing & Insurance View
 */

import { store } from '../store.js';

export function renderBillingView() {
  const claims = store.getBillingClaims();
  const activePatient = store.getActivePatient();

  // Compute financial totals
  let totalBilled = 0;
  let totalInsurancePaid = 0;
  let totalPatientBalance = 0;

  claims.forEach(c => {
    totalBilled += Number(c.totalCharged) || 0;
    totalInsurancePaid += Number(c.insurancePaid) || 0;
    totalPatientBalance += Number(c.patientBalance) || 0;
  });

  return `
    <div class="view-header">
      <div class="view-title-group">
        <h1>Medical Billing & Insurance Summary</h1>
        <div class="view-subtitle">Superbill creation, CPT procedure and ICD-10 coding, insurance claim adjudication, and copay management.</div>
      </div>
      <div class="view-actions">
        <button class="btn btn-primary" id="btn-open-new-claim-page">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          Create Superbill / Claim
        </button>
      </div>
    </div>

    <!-- KPI Financial Cards -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-info">
          <h3>$${totalBilled.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p>Total Billed Charges (YTD)</p>
        </div>
        <div class="kpi-icon-wrap kpi-blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-info">
          <h3>$${totalInsurancePaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p>Insurance Payments Remitted</p>
        </div>
        <div class="kpi-icon-wrap kpi-teal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-info">
          <h3>$${totalPatientBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p>Outstanding Patient Responsibility</p>
        </div>
        <div class="kpi-icon-wrap ${totalPatientBalance > 0 ? 'kpi-amber' : 'kpi-teal'}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-info">
          <h3>${claims.length}</h3>
          <p>Adjudicated Claims</p>
        </div>
        <div class="kpi-icon-wrap kpi-blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
      </div>
    </div>

    <!-- Active Patient Insurance Card Preview -->
    ${activePatient ? `
      <div class="card" style="margin-bottom: 20px; background: linear-gradient(135deg, #ffffff 0%, var(--primary-50) 100%);">
        <div class="card-header" style="background: transparent;">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            Active Coverage Verification: <strong>${activePatient.firstName} ${activePatient.lastName}</strong> (${activePatient.mrn})
          </div>
          <span class="badge badge-success">Active Commercial Policy</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; font-size: 13px;">
            <div>
              <div style="color: var(--text-muted); font-size: 11.5px; text-transform: uppercase; font-weight: 700;">Primary Payer</div>
              <div style="font-weight: 700; font-size: 15px; color: var(--text-main); margin-top: 2px;">${activePatient.insurance.provider}</div>
            </div>
            <div>
              <div style="color: var(--text-muted); font-size: 11.5px; text-transform: uppercase; font-weight: 700;">Policy & Group Numbers</div>
              <div style="font-family: var(--font-mono); font-weight: 600; margin-top: 2px;">
                ${activePatient.insurance.policyNumber} / ${activePatient.insurance.groupNumber}
              </div>
            </div>
            <div>
              <div style="color: var(--text-muted); font-size: 11.5px; text-transform: uppercase; font-weight: 700;">Copay / Office Visit</div>
              <div style="font-weight: 700; font-size: 15px; color: var(--primary-800); margin-top: 2px;">
                $${activePatient.insurance.copay}.00
              </div>
            </div>
            <div>
              <div style="color: var(--text-muted); font-size: 11.5px; text-transform: uppercase; font-weight: 700;">Deductible Accumulator</div>
              <div style="margin-top: 2px; font-weight: 600;">
                $${activePatient.insurance.deductibleMet} of $${activePatient.insurance.deductible} met
              </div>
              <div style="height: 6px; background: #cbd5e1; border-radius: 3px; overflow: hidden; margin-top: 4px;">
                <div style="height: 100%; width: ${(activePatient.insurance.deductibleMet / activePatient.insurance.deductible) * 100}%; background: var(--primary-600);"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Claims & Superbills Table -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Claims & Superbills Ledger
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date of Service</th>
              <th>Claim # / Patient</th>
              <th>Payer</th>
              <th>CPT Procedure Codes</th>
              <th>ICD-10 Diagnoses</th>
              <th>Billed</th>
              <th>Paid by Ins.</th>
              <th>Patient Balance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${claims.length === 0 ? `
              <tr><td colspan="10" style="text-align: center; color: var(--text-muted); padding: 40px;">No claims recorded.</td></tr>
            ` : claims.map(c => `
              <tr>
                <td style="font-weight: 600; white-space: nowrap;">${c.dateOfService}</td>
                <td>
                  <div style="font-weight: 700; font-family: var(--font-mono); color: var(--primary-900); font-size: 12px;">${c.claimNumber}</div>
                  <div style="font-size: 12.5px; font-weight: 600; color: var(--text-main); cursor: pointer;" class="btn-goto-patient" data-patient-id="${c.patientId}">
                    ${c.patientName}
                  </div>
                  <div style="font-size: 11px; color: var(--text-subtle);">${c.patientMrn}</div>
                </td>
                <td style="font-size: 12.5px;">${c.payer}</td>
                <td style="max-width: 240px;">
                  <div style="display: flex; flex-direction: column; gap: 3px;">
                    ${(c.cptCodes || []).map(code => `
                      <span style="font-size: 11.5px;">
                        <strong style="font-family: var(--font-mono); color: var(--primary-800);">${code.code}</strong>: ${code.description.length > 28 ? code.description.slice(0, 26) + '...' : code.description}
                      </span>
                    `).join('')}
                  </div>
                </td>
                <td>
                  <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                    ${(c.icdCodes || []).map(code => `
                      <span class="badge badge-neutral" style="font-family: var(--font-mono);">${code}</span>
                    `).join('')}
                  </div>
                </td>
                <td style="font-weight: 700; font-size: 13.5px;">$${Number(c.totalCharged).toFixed(2)}</td>
                <td style="color: var(--success-text); font-weight: 600;">$${Number(c.insurancePaid).toFixed(2)}</td>
                <td>
                  <strong style="${c.patientBalance > 0 ? 'color: var(--danger-text);' : 'color: var(--text-muted);'}">
                    $${Number(c.patientBalance).toFixed(2)}
                  </strong>
                </td>
                <td>
                  <span class="badge ${getClaimStatusBadge(c.status)}">${c.status}</span>
                </td>
                <td>
                  ${c.patientBalance > 0 ? `
                    <button class="btn btn-primary btn-sm btn-record-payment" data-claim-id="${c.id}" data-balance="${c.patientBalance}">
                      Collect $
                    </button>
                  ` : `
                    <span style="color: var(--success-text); font-size: 12px; font-weight: 700;">Paid in Full</span>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function getClaimStatusBadge(status) {
  switch (status) {
    case 'Paid': return 'badge-success';
    case 'Submitted': return 'badge-info';
    case 'Pending': return 'badge-warning';
    case 'Draft': return 'badge-neutral';
    case 'Denied': return 'badge-danger';
    default: return 'badge-neutral';
  }
}

export function attachBillingEvents(container, router) {
  // New Claim button
  const newClaimBtn = container.querySelector('#btn-open-new-claim-page');
  if (newClaimBtn) {
    newClaimBtn.addEventListener('click', () => router.openModal('modal-new-claim'));
  }

  // Record payment button
  container.querySelectorAll('.btn-record-payment').forEach(btn => {
    btn.addEventListener('click', () => {
      const claimId = btn.getAttribute('data-claim-id');
      const balance = btn.getAttribute('data-balance');
      const amount = prompt(`Enter payment amount to record for this claim (Balance: $${balance}):`, balance);
      if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
        store.recordPayment(claimId, Number(amount));
        router.showToast(`Payment of $${Number(amount).toFixed(2)} recorded.`);
        router.render();
      }
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
