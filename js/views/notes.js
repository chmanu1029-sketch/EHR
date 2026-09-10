/**
 * CareFlow EHR - Clinical SOAP Notes View
 */

import { store } from '../store.js';

export function renderNotesView() {
  const clinician = store.getCurrentClinician();
  const patients = store.getPatients();
  const activePatient = store.getActivePatient() || patients[0];
  const templates = store.getTemplates();
  const allNotes = store.getNotes();

  return `
    <div class="view-header">
      <div class="view-title-group">
        <h1>Clinical Documentation (SOAP Notes)</h1>
        <div class="view-subtitle">Author, template, electronically sign, and archive clinical encounter records.</div>
      </div>
      <div class="view-actions">
        <button class="btn btn-secondary" onclick="window.print()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print Note
        </button>
      </div>
    </div>

    <!-- Main SOAP Authoring Card -->
    <div class="card">
      <div class="card-header" style="flex-wrap: wrap; gap: 12px;">
        <div class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          SOAP Progress Note Editor
        </div>
        
        <!-- Pre-built Template Selector -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <label style="font-size: 12.5px; font-weight: 600; color: var(--text-muted);">Insert Template:</label>
          <select id="soap-template-select" class="form-control" style="width: 240px; height: 34px; font-size: 12.5px;">
            <option value="">-- Choose Clinical Template --</option>
            ${templates.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="card-body">
        <!-- Metadata row: Patient selector & Note title -->
        <div style="display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 14px; margin-bottom: 20px;">
          <div>
            <label class="form-label">Patient <span class="required">*</span></label>
            <select id="soap-patient-select" class="form-control">
              ${patients.map(p => `
                <option value="${p.id}" ${activePatient && p.id === activePatient.id ? 'selected' : ''}>
                  ${p.firstName} ${p.lastName} (${p.mrn})
                </option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="form-label">Encounter / Note Title <span class="required">*</span></label>
            <input type="text" id="soap-title-input" class="form-control" placeholder="e.g. Routine Chronic Disease Follow-up" value="Outpatient Follow-up Consultation">
          </div>

          <div>
            <label class="form-label">Attending Provider</label>
            <input type="text" class="form-control" value="${clinician.name} (${clinician.specialty})" disabled style="background-color: var(--bg-subtle);">
          </div>
        </div>

        <!-- 4 Quadrants: SOAP -->
        <div class="soap-grid">
          
          <!-- Subjective -->
          <div class="soap-quadrant">
            <div class="soap-header">
              <span><span class="soap-letter-badge">S</span> Subjective</span>
              <span style="font-size: 11px; color: var(--text-muted);">HPI, Chief Complaint, ROS</span>
            </div>
            <textarea id="soap-subj" class="soap-textarea" placeholder="Describe chief complaint, onset, duration, patient-reported symptoms, compliance with therapy..."></textarea>
          </div>

          <!-- Objective -->
          <div class="soap-quadrant">
            <div class="soap-header">
              <span><span class="soap-letter-badge">O</span> Objective</span>
              <span style="font-size: 11px; color: var(--text-muted);">Physical Exam, Vitals, Findings</span>
            </div>
            <textarea id="soap-obj" class="soap-textarea" placeholder="Physical exam findings, cardiovascular, pulmonary, abdominal, neurological observations..."></textarea>
          </div>

          <!-- Assessment -->
          <div class="soap-quadrant">
            <div class="soap-header">
              <span><span class="soap-letter-badge">A</span> Assessment</span>
              <span style="font-size: 11px; color: var(--text-muted);">Clinical Impression, ICD-10 codes</span>
            </div>
            <textarea id="soap-assess" class="soap-textarea" placeholder="Working diagnoses, clinical impressions, disease status, stability..."></textarea>
          </div>

          <!-- Plan -->
          <div class="soap-quadrant">
            <div class="soap-header">
              <span><span class="soap-letter-badge">P</span> Plan</span>
              <span style="font-size: 11px; color: var(--text-muted);">Medications, Orders, Follow-up</span>
            </div>
            <textarea id="soap-plan" class="soap-textarea" placeholder="Medication adjustments, diagnostic test orders, lifestyle counseling, return instructions..."></textarea>
          </div>

        </div>
      </div>

      <div class="card-footer" style="justify-content: space-between;">
        <button class="btn btn-secondary btn-sm" id="btn-soap-clear">Clear Quadrants</button>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary" id="btn-soap-draft">Save as Draft</button>
          <button class="btn btn-primary" id="btn-soap-sign">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Sign & Finalize Note (${clinician.name})
          </button>
        </div>
      </div>
    </div>

    <!-- Past Signed Notes Log -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-600);"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Past Signed Clinical Notes Archive (${allNotes.length})
        </div>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Patient / MRN</th>
              <th>Title / Note Type</th>
              <th>Assessment Summary</th>
              <th>Clinician Signature</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${allNotes.map(n => `
              <tr>
                <td style="font-weight: 600; white-space: nowrap;">${n.encounterDate}</td>
                <td>
                  <div style="font-weight: 700; color: var(--text-main); cursor: pointer;" class="btn-goto-patient" data-patient-id="${n.patientId}">
                    ${n.patientName}
                  </div>
                  <div style="font-size: 11px; color: var(--text-subtle);">${n.patientMrn}</div>
                </td>
                <td>
                  <div style="font-weight: 600;">${n.title}</div>
                  <div style="font-size: 11px; color: var(--text-muted);">${n.noteType}</div>
                </td>
                <td style="max-width: 280px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 12px; color: var(--text-muted);">
                  ${n.assessment.split('\n')[0] || 'Clinical note documented.'}
                </td>
                <td style="font-size: 11.5px;">
                  ${n.isSigned ? `
                    <div style="color: var(--success-text); font-weight: 600;">✓ ${n.signedBy}</div>
                    <div style="font-size: 10.5px; color: var(--text-subtle);">${n.signedAt}</div>
                  ` : `<span class="badge badge-warning">Draft</span>`}
                </td>
                <td>
                  <span class="badge ${n.isSigned ? 'badge-success' : 'badge-warning'}">${n.status}</span>
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm btn-view-note-modal" data-note-id="${n.id}">
                    View Full Note
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

export function attachNotesEvents(container, router) {
  const patientSelect = container.querySelector('#soap-patient-select');
  const templateSelect = container.querySelector('#soap-template-select');
  const titleInput = container.querySelector('#soap-title-input');
  const subjInput = container.querySelector('#soap-subj');
  const objInput = container.querySelector('#soap-obj');
  const assessInput = container.querySelector('#soap-assess');
  const planInput = container.querySelector('#soap-plan');

  // Change patient -> update store active patient
  if (patientSelect) {
    patientSelect.addEventListener('change', (e) => {
      store.setActivePatient(e.target.value);
    });
  }

  // Template select -> populate fields
  if (templateSelect) {
    templateSelect.addEventListener('change', (e) => {
      const templateId = e.target.value;
      if (!templateId) return;
      const tmpl = store.getTemplates().find(t => t.id === templateId);
      if (tmpl) {
        titleInput.value = tmpl.name;
        subjInput.value = tmpl.subjective;
        objInput.value = tmpl.objective;
        assessInput.value = tmpl.assessment;
        planInput.value = tmpl.plan;
        router.showToast(`Loaded clinical template: "${tmpl.name}"`);
      }
    });
  }

  // Clear fields
  const clearBtn = container.querySelector('#btn-soap-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all SOAP quadrants?')) {
        subjInput.value = '';
        objInput.value = '';
        assessInput.value = '';
        planInput.value = '';
      }
    });
  }

  // Sign & Finalize Note
  const signBtn = container.querySelector('#btn-soap-sign');
  if (signBtn) {
    signBtn.addEventListener('click', () => {
      if (!subjInput.value.trim() && !assessInput.value.trim()) {
        alert('Please enter clinical documentation in the Subjective and Assessment sections before signing.');
        return;
      }

      const patientId = patientSelect.value;
      const title = titleInput.value.trim() || 'Clinical Encounter Note';

      store.addNote({
        patientId,
        title,
        subjective: subjInput.value.trim(),
        objective: objInput.value.trim(),
        assessment: assessInput.value.trim(),
        plan: planInput.value.trim(),
        isSigned: true
      });

      router.showToast('Clinical SOAP Note successfully signed & saved to patient chart.');
      subjInput.value = '';
      objInput.value = '';
      assessInput.value = '';
      planInput.value = '';
      router.render();
    });
  }

  // Save as Draft
  const draftBtn = container.querySelector('#btn-soap-draft');
  if (draftBtn) {
    draftBtn.addEventListener('click', () => {
      const patientId = patientSelect.value;
      const title = titleInput.value.trim() || 'Draft Clinical Note';

      store.addNote({
        patientId,
        title: `[DRAFT] ${title}`,
        subjective: subjInput.value.trim(),
        objective: objInput.value.trim(),
        assessment: assessInput.value.trim(),
        plan: planInput.value.trim(),
        isSigned: false
      });

      router.showToast('Draft clinical note saved.');
      router.render();
    });
  }

  // View note modal / preview
  container.querySelectorAll('.btn-view-note-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const noteId = btn.getAttribute('data-note-id');
      const note = store.getNotes().find(n => n.id === noteId);
      if (note) {
        showNoteModal(note, router);
      }
    });
  });

  // Patient link click
  container.querySelectorAll('.btn-goto-patient').forEach(el => {
    el.addEventListener('click', () => {
      const patientId = el.getAttribute('data-patient-id');
      store.setActivePatient(patientId);
      router.navigate('profile');
    });
  });
}

function showNoteModal(note, router) {
  const modalHtml = `
    <div class="modal-overlay open" id="modal-view-note-overlay">
      <div class="modal-dialog modal-lg">
        <div class="modal-header">
          <div class="modal-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            ${note.title}
          </div>
          <button class="btn-close-modal" id="btn-close-note-view">✕</button>
        </div>
        <div class="modal-body">
          <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 13px; background: var(--bg-subtle); padding: 12px 16px; border-radius: var(--radius-md);">
            <div>Patient: <strong>${note.patientName}</strong> (${note.patientMrn})</div>
            <div>Date: <strong>${note.encounterDate}</strong></div>
            <div>Provider: <strong>${note.clinicianName}</strong></div>
          </div>
          
          <div class="soap-grid">
            <div class="soap-quadrant">
              <div class="soap-header"><span><span class="soap-letter-badge">S</span> Subjective</span></div>
              <div style="font-size: 13px; line-height: 1.6; white-space: pre-line;">${note.subjective}</div>
            </div>
            <div class="soap-quadrant">
              <div class="soap-header"><span><span class="soap-letter-badge">O</span> Objective</span></div>
              <div style="font-size: 13px; line-height: 1.6; white-space: pre-line;">${note.objective}</div>
            </div>
            <div class="soap-quadrant">
              <div class="soap-header"><span><span class="soap-letter-badge">A</span> Assessment</span></div>
              <div style="font-size: 13px; line-height: 1.6; white-space: pre-line;">${note.assessment}</div>
            </div>
            <div class="soap-quadrant">
              <div class="soap-header"><span><span class="soap-letter-badge">P</span> Plan</span></div>
              <div style="font-size: 13px; line-height: 1.6; white-space: pre-line;">${note.plan}</div>
            </div>
          </div>

          <div style="margin-top: 16px; font-size: 12px; color: var(--text-muted); border-top: 1px solid var(--border-light); padding-top: 10px;">
            Signature: <strong>${note.signedBy || 'Unsigned Draft'}</strong> • ${note.signedAt || 'Draft status'}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="window.print()">Print Note</button>
          <button class="btn btn-primary" id="btn-done-note-view">Done</button>
        </div>
      </div>
    </div>
  `;

  const div = document.createElement('div');
  div.innerHTML = modalHtml;
  document.body.appendChild(div.firstElementChild);

  const overlay = document.getElementById('modal-view-note-overlay');
  const close = () => { if (overlay) overlay.remove(); };
  overlay.querySelector('#btn-close-note-view').addEventListener('click', close);
  overlay.querySelector('#btn-done-note-view').addEventListener('click', close);
}
