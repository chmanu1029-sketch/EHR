/**
 * CareFlow EHR - Laboratory Results View
 */

import { store } from '../store.js';

let selectedLabPatientId = 'All';

export function renderLabsView() {
  const patients = store.getPatients();
  const allLabs = store.getLabs();

  const filteredLabs = allLabs.filter(lab => {
    if (selectedLabPatientId !== 'All' && lab.patientId !== selectedLabPatientId) return false;
    return true;
  });

  return `
    <div class="view-header">
      <div class="view-title-group">
        <h1>Diagnostic Laboratory Results</h1>
        <div class="view-subtitle">Review chemistry panels, metabolic assays, reference ranges, and abnormal flag values.</div>
      </div>
      <div class="view-actions">
        <button class="btn btn-primary" id="btn-order-lab-page">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 2v7.31L4.62 19.38A2 2 0 0 0 6.35 22h11.3a2 2 0 0 0 1.73-2.62L14 9.31V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/></svg>
          Order Diagnostic Lab
        </button>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="card" style="margin-bottom: 20px;">
      <div class="card-body" style="padding: 14px 20px;">
        <div style="display: flex; gap: 14px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <label style="font-size: 13px; font-weight: 600; color: var(--text-muted);">Filter Patient:</label>
            <select id="select-lab-patient" class="form-control" style="width: 240px; height: 38px;">
              <option value="All" ${selectedLabPatientId === 'All' ? 'selected' : ''}>All Patients</option>
              ${patients.map(p => `
                <option value="${p.id}" ${selectedLabPatientId === p.id ? 'selected' : ''}>
                  ${p.firstName} ${p.lastName} (${p.mrn})
                </option>
              `).join('')}
            </select>
          </div>

          <div style="display: flex; gap: 8px;">
            <span class="badge badge-danger">High / Low Flags</span>
            <span class="badge badge-success">Within Normal Limits</span>
            <span class="badge badge-warning">Pending Review</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Labs Panels List -->
    <div style="display: flex; flex-direction: column; gap: 20px;">
      ${filteredLabs.length === 0 ? `
        <div class="card" style="padding: 40px; text-align: center; color: var(--text-muted);">
          No laboratory results found for selected filter.
        </div>
      ` : filteredLabs.map(lab => `
        <div class="card">
          <div class="card-header" style="background-color: var(--bg-subtle); flex-wrap: wrap; gap: 10px;">
            <div>
              <div style="font-weight: 800; font-size: 16px; color: var(--text-main); display: flex; align-items: center; gap: 10px;">
                ${lab.panelName}
                <span class="badge ${lab.status === 'Final' ? 'badge-success' : 'badge-warning'}">${lab.status}</span>
                ${!lab.isReviewed ? `<span class="badge badge-danger">Requires Review</span>` : ''}
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                Patient: <strong style="color: var(--text-main); cursor: pointer;" class="btn-goto-patient" data-patient-id="${lab.patientId}">${lab.patientName} (${lab.patientMrn})</strong> • 
                Ordered By: ${lab.orderedBy} • Resulted: ${lab.resultDate} • Lab: ${lab.performingLab}
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              ${lab.isReviewed ? `
                <div style="font-size: 11.5px; color: var(--success-text); text-align: right;">
                  <div>✓ Reviewed by <strong>${lab.reviewedBy}</strong></div>
                  <div style="color: var(--text-subtle); font-size: 10.5px;">${lab.reviewedAt}</div>
                </div>
              ` : `
                <button class="btn btn-primary btn-sm btn-mark-lab-reviewed" data-lab-id="${lab.id}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Sign & Acknowledge Results
                </button>
              `}
            </div>
          </div>

          <!-- Individual Tests in Panel -->
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 25%;">Analyte / Component</th>
                  <th style="width: 15%;">Result Value</th>
                  <th style="width: 15%;">Standard Ref Range</th>
                  <th style="width: 15%;">Status / Flag</th>
                  <th style="width: 30%;">Visual Normal Band</th>
                </tr>
              </thead>
              <tbody>
                ${lab.tests.map(t => {
                  const flagBadge = t.flag === 'High' ? 'badge-danger' : t.flag === 'Low' ? 'badge-warning' : 'badge-success';
                  const percentPos = calculateRangePosition(t.value, t.refRange);

                  return `
                    <tr style="${t.flag !== 'Normal' ? 'background-color: rgba(254, 242, 242, 0.4);' : ''}">
                      <td style="font-weight: 600;">${t.name}</td>
                      <td>
                        <strong style="font-size: 14px; ${t.flag !== 'Normal' ? 'color: var(--danger-text);' : ''}">${t.value}</strong> 
                        <span style="font-size: 11px; color: var(--text-muted);">${t.unit}</span>
                      </td>
                      <td style="font-size: 12px; color: var(--text-muted); font-family: var(--font-mono);">
                        ${t.refRange}
                      </td>
                      <td>
                        <span class="badge ${flagBadge}">${t.flag}</span>
                      </td>
                      <td>
                        <!-- Visual Range Bar -->
                        <div class="lab-range-meter" title="Result ${t.value} ${t.unit} against ref range ${t.refRange}">
                          <div class="lab-range-optimal" style="left: 20%; width: 60%;"></div>
                          <div class="lab-range-marker" style="left: ${percentPos}%;"></div>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function calculateRangePosition(val, rangeStr) {
  // Approximate percentage position on visual bar
  const num = Number(val);
  if (isNaN(num)) return 50;

  if (rangeStr.includes('-')) {
    const parts = rangeStr.split('-').map(p => parseFloat(p.trim())).filter(n => !isNaN(n));
    if (parts.length >= 2) {
      const [low, high] = parts;
      const span = high - low;
      const pos = 20 + ((num - low) / span) * 60;
      return Math.max(5, Math.min(95, pos));
    }
  } else if (rangeStr.includes('<')) {
    const threshold = parseFloat(rangeStr.replace('<', '').trim());
    if (!isNaN(threshold)) {
      const pos = (num / threshold) * 70;
      return Math.max(5, Math.min(95, pos));
    }
  } else if (rangeStr.includes('>')) {
    const threshold = parseFloat(rangeStr.replace('>', '').trim());
    if (!isNaN(threshold)) {
      const pos = 30 + ((num - threshold) / threshold) * 40;
      return Math.max(5, Math.min(95, pos));
    }
  }

  return 50;
}

export function attachLabsEvents(container, router) {
  const patientSelect = container.querySelector('#select-lab-patient');
  if (patientSelect) {
    patientSelect.addEventListener('change', (e) => {
      selectedLabPatientId = e.target.value;
      router.render();
    });
  }

  // Order Lab button
  const orderLabBtn = container.querySelector('#btn-order-lab-page');
  if (orderLabBtn) {
    orderLabBtn.addEventListener('click', () => router.openModal('modal-order-lab'));
  }

  // Mark reviewed button
  container.querySelectorAll('.btn-mark-lab-reviewed').forEach(btn => {
    btn.addEventListener('click', () => {
      const labId = btn.getAttribute('data-lab-id');
      store.markLabReviewed(labId);
      router.showToast('Lab result reviewed and electronically signed.');
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
