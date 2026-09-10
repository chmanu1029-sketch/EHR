/**
 * CareFlow EHR - Login View
 */

import { store } from '../store.js';

export function renderLoginView() {
  const clinicians = store.getClinicians();

  return `
    <div style="min-height: calc(100vh - 120px); display: flex; align-items: center; justify-content: center; padding: 20px;">
      <div style="background: white; border: 1px solid var(--border-light); border-radius: var(--radius-lg); box-shadow: var(--shadow-modal); max-width: 480px; width: 100%; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0f766e 0%, #0f172a 100%); color: white; padding: 28px 24px; text-align: center;">
          <div style="width: 52px; height: 52px; background: rgba(255,255,255,0.15); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <h2 style="font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">CareFlow EHR</h2>
          <p style="font-size: 13px; color: #99f6e4; margin-top: 4px;">Clinical Workflow & Patient Management System</p>
        </div>

        <!-- Body -->
        <div style="padding: 24px;">
          <!-- Demo Notice -->
          <div style="background-color: var(--warning-bg); border: 1px solid var(--warning-border); border-radius: var(--radius-md); padding: 12px; margin-bottom: 20px; font-size: 12px; color: var(--warning-text); display: flex; gap: 10px;">
            <svg style="flex-shrink:0; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            <div>
              <strong>Demonstration Prototype</strong><br>
              Select a demo clinician account below to enter the simulation. All medical data is fictional.
            </div>
          </div>

          <label class="form-label" style="margin-bottom: 8px;">Select Clinician Profile to Sign In:</label>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
            ${clinicians.map((c, i) => `
              <div class="clinician-select-card ${i === 0 ? 'selected' : ''}" data-clinician-id="${c.id}" style="
                border: 2px solid ${i === 0 ? 'var(--primary-600)' : 'var(--border-light)'};
                border-radius: var(--radius-md);
                padding: 12px 14px;
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                background-color: ${i === 0 ? 'var(--primary-50)' : 'white'};
                transition: all 0.15s ease;
              ">
                <div style="width: 40px; height: 40px; border-radius: 50%; background-color: var(--primary-700); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">
                  ${c.avatar}
                </div>
                <div style="flex: 1;">
                  <div style="font-weight: 700; font-size: 14px; color: var(--text-main);">${c.name}</div>
                  <div style="font-size: 12px; color: var(--text-muted);">${c.specialty} • ${c.department}</div>
                  <div style="font-size: 11px; color: var(--text-subtle);">NPI: ${c.npi} | Lic: ${c.license}</div>
                </div>
                <div class="check-indicator" style="color: var(--primary-600); display: ${i === 0 ? 'block' : 'none'};">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
            `).join('')}
          </div>

          <button id="btn-login-submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 700; border-radius: var(--radius-md);">
            Enter CareFlow EHR Dashboard →
          </button>

          <div style="text-align: center; margin-top: 16px; font-size: 11.5px; color: var(--text-subtle);">
            CareFlow Health Systems v2.4-demo • Secure HIPAA-Compliant Mock Mode
          </div>
        </div>

      </div>
    </div>
  `;
}

export function attachLoginEvents(container, onLoginSuccess) {
  let selectedId = store.getClinicians()[0]?.id || 'doc-1';

  const cards = container.querySelectorAll('.clinician-select-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => {
        c.style.borderColor = 'var(--border-light)';
        c.style.backgroundColor = 'white';
        const check = c.querySelector('.check-indicator');
        if (check) check.style.display = 'none';
      });
      card.style.borderColor = 'var(--primary-600)';
      card.style.backgroundColor = 'var(--primary-50)';
      const check = card.querySelector('.check-indicator');
      if (check) check.style.display = 'block';

      selectedId = card.getAttribute('data-clinician-id');
    });
  });

  const submitBtn = container.querySelector('#btn-login-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      store.login(selectedId);
      if (onLoginSuccess) onLoginSuccess();
    });
  }
}
