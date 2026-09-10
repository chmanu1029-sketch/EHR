/**
 * CareFlow EHR - Reactive State Store with LocalStorage Persistence
 */

import {
  initialClinicians,
  initialPatients,
  initialAppointments,
  initialClinicalNotes,
  initialLabs,
  initialBillingClaims,
  clinicalTemplates,
  drugInteractionsDatabase
} from './data/initial-data.js';

const STORAGE_KEY = 'careflow_ehr_store_v1';
const SESSION_KEY = 'careflow_ehr_current_user_v1';

class EHRStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadState();
    this.currentClinicianId = this.loadSession();
    this.activePatientId = this.state.patients[0]?.id || null;
  }

  loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using default data:', e);
    }

    // Default state
    const defaultState = {
      patients: JSON.parse(JSON.stringify(initialPatients)),
      appointments: JSON.parse(JSON.stringify(initialAppointments)),
      notes: JSON.parse(JSON.stringify(initialClinicalNotes)),
      labs: JSON.parse(JSON.stringify(initialLabs)),
      claims: JSON.parse(JSON.stringify(initialBillingClaims)),
      clinicians: JSON.parse(JSON.stringify(initialClinicians)),
      templates: JSON.parse(JSON.stringify(clinicalTemplates)),
      interactionsDb: JSON.parse(JSON.stringify(drugInteractionsDatabase))
    };

    this.saveState(defaultState);
    return defaultState;
  }

  saveState(stateToSave = this.state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to persist state to localStorage:', e);
    }
  }

  loadSession() {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session && this.getClinicianById(session)) {
        return session;
      }
    } catch (e) {
      // ignore
    }
    return "doc-1"; // Default Dr. Sarah Lin
  }

  saveSession(clinicianId) {
    this.currentClinicianId = clinicianId;
    try {
      if (clinicianId) {
        localStorage.setItem(SESSION_KEY, clinicianId);
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch (e) {
      // ignore
    }
    this.notify();
  }

  // Reactive listeners
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (e) {
        console.error('Error in store subscriber:', e);
      }
    }
  }

  // Reset demo
  resetToDemoDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.loadState();
    this.notify();
  }

  // Clinician & Auth
  getCurrentClinician() {
    return this.getClinicianById(this.currentClinicianId) || this.state.clinicians[0];
  }

  getClinicians() {
    return this.state.clinicians;
  }

  getClinicianById(id) {
    return this.state.clinicians.find(c => c.id === id) || null;
  }

  login(clinicianId) {
    this.saveSession(clinicianId);
  }

  logout() {
    this.saveSession(null);
  }

  // Patients
  getPatients() {
    return this.state.patients;
  }

  getPatientById(id) {
    return this.state.patients.find(p => p.id === id) || null;
  }

  getActivePatient() {
    if (!this.activePatientId && this.state.patients.length > 0) {
      this.activePatientId = this.state.patients[0].id;
    }
    return this.getPatientById(this.activePatientId);
  }

  setActivePatient(patientId) {
    this.activePatientId = patientId;
    this.notify();
  }

  addPatient(patientData) {
    const newId = 'pat-' + Date.now().toString().slice(-5);
    const mrn = 'MRN-' + Math.floor(10000 + Math.random() * 90000);
    
    const newPatient = {
      id: newId,
      mrn,
      firstName: patientData.firstName.trim(),
      lastName: patientData.lastName.trim(),
      dob: patientData.dob,
      age: this.calculateAge(patientData.dob),
      gender: patientData.gender,
      bloodType: patientData.bloodType || 'O+',
      phone: patientData.phone,
      email: patientData.email,
      address: patientData.address || 'Address on file',
      emergencyContact: {
        name: patientData.emergencyName || 'Emergency contact',
        relation: patientData.emergencyRelation || 'Family',
        phone: patientData.emergencyPhone || patientData.phone
      },
      primaryProviderId: patientData.primaryProviderId || this.currentClinicianId,
      primaryProviderName: this.getClinicianById(patientData.primaryProviderId || this.currentClinicianId)?.name || 'Dr. Sarah Lin, MD',
      status: patientData.status || 'Active',
      insurance: {
        provider: patientData.insuranceProvider || 'Standard Health Network',
        policyNumber: patientData.policyNumber || 'POL-' + Math.floor(100000 + Math.random() * 900000),
        groupNumber: patientData.groupNumber || 'GRP-1001',
        copay: Number(patientData.copay) || 25,
        deductible: Number(patientData.deductible) || 1500,
        deductibleMet: 0,
        outOfPocketMax: 4000,
        outOfPocketMet: 0
      },
      allergies: [],
      medicalHistory: patientData.initialCondition ? [{
        id: 'mh-' + Date.now(),
        condition: patientData.initialCondition,
        icd10: patientData.initialIcd || 'R69',
        diagnosedDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        notes: 'Recorded at intake'
      }] : [],
      surgicalHistory: [],
      socialHistory: {
        smoking: patientData.smoking || 'Never smoker',
        alcohol: patientData.alcohol || 'None',
        exercise: patientData.exercise || 'Normal activity',
        occupation: patientData.occupation || 'Not specified'
      },
      vitals: [],
      medications: [],
      encounters: [{
        id: 'enc-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        type: 'New Patient Intake Registration',
        department: 'Primary Care',
        clinician: this.getCurrentClinician().name,
        reason: 'Patient onboarding and initial health profile establishment',
        summary: 'Electronic health record initialized with intake demographics.',
        status: 'Completed'
      }]
    };

    this.state.patients.unshift(newPatient);
    this.activePatientId = newPatient.id;
    this.saveState();
    this.notify();
    return newPatient;
  }

  calculateAge(dobString) {
    if (!dobString) return 0;
    const dob = new Date(dobString);
    const diff = Date.now() - dob.getTime();
    const ageDt = new Date(diff);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

  // Allergies
  addAllergy(patientId, allergyData) {
    const patient = this.getPatientById(patientId);
    if (!patient) return false;
    const newAllergy = {
      id: 'alg-' + Date.now(),
      allergen: allergyData.allergen.trim(),
      type: allergyData.type || 'Drug',
      severity: allergyData.severity || 'Moderate',
      reaction: allergyData.reaction.trim(),
      dateIdentified: allergyData.dateIdentified || new Date().toISOString().split('T')[0]
    };
    patient.allergies.unshift(newAllergy);
    this.saveState();
    this.notify();
    return newAllergy;
  }

  // Conditions
  addCondition(patientId, conditionData) {
    const patient = this.getPatientById(patientId);
    if (!patient) return false;
    const newCondition = {
      id: 'mh-' + Date.now(),
      condition: conditionData.condition.trim(),
      icd10: conditionData.icd10.trim(),
      diagnosedDate: conditionData.diagnosedDate || new Date().toISOString().split('T')[0],
      status: conditionData.status || 'Active',
      notes: conditionData.notes || ''
    };
    patient.medicalHistory.unshift(newCondition);
    this.saveState();
    this.notify();
    return newCondition;
  }

  // Vitals
  addVital(patientId, vitalsData) {
    const patient = this.getPatientById(patientId);
    if (!patient) return false;

    const weight = Number(vitalsData.weight);
    const height = Number(vitalsData.height);
    let bmi = vitalsData.bmi;
    if (!bmi && weight > 0 && height > 0) {
      bmi = Number(((weight / (height * height)) * 703).toFixed(1));
    }

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newVital = {
      id: 'vit-' + Date.now(),
      date: vitalsData.date || dateStr,
      bpSystolic: Number(vitalsData.bpSystolic),
      bpDiastolic: Number(vitalsData.bpDiastolic),
      heartRate: Number(vitalsData.heartRate),
      temp: Number(vitalsData.temp),
      respRate: Number(vitalsData.respRate),
      spO2: Number(vitalsData.spO2),
      weight: weight,
      height: height,
      bmi: Number(bmi),
      recordedBy: vitalsData.recordedBy || `${this.getCurrentClinician().name}`
    };

    if (!patient.vitals) patient.vitals = [];
    patient.vitals.unshift(newVital);

    this.saveState();
    this.notify();
    return newVital;
  }

  // Appointments
  getAppointments() {
    return this.state.appointments;
  }

  getAppointmentsForPatient(patientId) {
    return this.state.appointments.filter(a => a.patientId === patientId);
  }

  addAppointment(aptData) {
    const patient = this.getPatientById(aptData.patientId);
    const clinician = this.getClinicianById(aptData.clinicianId) || this.getCurrentClinician();

    const newApt = {
      id: 'apt-' + Date.now().toString().slice(-5),
      patientId: aptData.patientId,
      patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient',
      patientMrn: patient ? patient.mrn : 'MRN-00000',
      clinicianId: clinician.id,
      clinicianName: clinician.name,
      department: aptData.department || clinician.department,
      date: aptData.date,
      time: aptData.time,
      durationMinutes: Number(aptData.durationMinutes) || 30,
      type: aptData.type || 'In-Person',
      room: aptData.room || 'Clinic Suite',
      reason: aptData.reason,
      status: 'Confirmed',
      notes: aptData.notes || ''
    };

    this.state.appointments.unshift(newApt);
    this.saveState();
    this.notify();
    return newApt;
  }

  updateAppointmentStatus(aptId, newStatus) {
    const apt = this.state.appointments.find(a => a.id === aptId);
    if (apt) {
      apt.status = newStatus;
      this.saveState();
      this.notify();
      return true;
    }
    return false;
  }

  // Clinical SOAP Notes
  getNotes() {
    return this.state.notes;
  }

  getNotesForPatient(patientId) {
    return this.state.notes.filter(n => n.patientId === patientId);
  }

  getTemplates() {
    return this.state.templates;
  }

  addNote(noteData) {
    const patient = this.getPatientById(noteData.patientId);
    const clinician = this.getCurrentClinician();
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newNote = {
      id: 'note-' + Date.now().toString().slice(-5),
      patientId: noteData.patientId,
      patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown',
      patientMrn: patient ? patient.mrn : 'MRN-00000',
      clinicianId: clinician.id,
      clinicianName: clinician.name,
      encounterDate: noteData.encounterDate || dateStr,
      noteType: noteData.noteType || 'SOAP Progress Note',
      title: noteData.title || 'Clinical Encounter Note',
      subjective: noteData.subjective || '',
      objective: noteData.objective || '',
      assessment: noteData.assessment || '',
      plan: noteData.plan || '',
      isSigned: noteData.isSigned !== undefined ? noteData.isSigned : true,
      signedAt: noteData.isSigned ? `${dateStr} ${timeStr}` : null,
      signedBy: noteData.isSigned ? clinician.name : null,
      status: noteData.isSigned ? 'Finalized' : 'Draft'
    };

    this.state.notes.unshift(newNote);

    // Also append an encounter record to patient profile
    if (patient) {
      patient.encounters.unshift({
        id: 'enc-' + Date.now(),
        date: newNote.encounterDate,
        type: newNote.noteType,
        department: clinician.department,
        clinician: clinician.name,
        reason: newNote.title,
        summary: newNote.assessment.split('\n')[0] || 'Clinical note documented.',
        status: 'Completed'
      });
    }

    this.saveState();
    this.notify();
    return newNote;
  }

  // Labs
  getLabs() {
    return this.state.labs;
  }

  getLabsForPatient(patientId) {
    return this.state.labs.filter(l => l.patientId === patientId);
  }

  addLabOrder(labData) {
    const patient = this.getPatientById(labData.patientId);
    const clinician = this.getCurrentClinician();
    const now = new Date().toISOString().split('T')[0];

    const newLab = {
      id: 'lab-' + Date.now().toString().slice(-5),
      patientId: labData.patientId,
      patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown',
      patientMrn: patient ? patient.mrn : 'MRN-00000',
      panelName: labData.panelName,
      orderDate: now,
      resultDate: now + ' (Preliminary)',
      orderedBy: clinician.name,
      performingLab: labData.performingLab || 'CareFlow Central Diagnostic Core',
      status: labData.status || 'Final',
      isReviewed: false,
      reviewedBy: null,
      reviewedAt: null,
      tests: labData.tests || []
    };

    this.state.labs.unshift(newLab);
    this.saveState();
    this.notify();
    return newLab;
  }

  markLabReviewed(labId) {
    const lab = this.state.labs.find(l => l.id === labId);
    if (lab) {
      const now = new Date();
      lab.isReviewed = true;
      lab.reviewedBy = this.getCurrentClinician().name;
      lab.reviewedAt = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      this.saveState();
      this.notify();
      return true;
    }
    return false;
  }

  // Medications
  getAllMedications() {
    const meds = [];
    this.state.patients.forEach(p => {
      (p.medications || []).forEach(m => {
        meds.push({
          ...m,
          patientId: p.id,
          patientName: `${p.firstName} ${p.lastName}`,
          patientMrn: p.mrn
        });
      });
    });
    return meds;
  }

  getMedicationsForPatient(patientId) {
    const patient = this.getPatientById(patientId);
    return patient ? (patient.medications || []) : [];
  }

  addPrescription(patientId, medData) {
    const patient = this.getPatientById(patientId);
    if (!patient) return false;

    const newMed = {
      id: 'med-' + Date.now().toString().slice(-5),
      name: medData.name.trim(),
      dosage: medData.dosage.trim(),
      route: medData.route || 'Oral',
      frequency: medData.frequency.trim(),
      indication: medData.indication || 'Clinical indication',
      prescribedDate: new Date().toISOString().split('T')[0],
      refillsRemaining: Number(medData.refillsRemaining) || 3,
      prescriber: this.getCurrentClinician().name,
      pharmacy: medData.pharmacy || 'CareFlow Outpatient Pharmacy',
      status: 'Active'
    };

    if (!patient.medications) patient.medications = [];
    patient.medications.unshift(newMed);
    this.saveState();
    this.notify();
    return newMed;
  }

  discontinueMedication(patientId, medId) {
    const patient = this.getPatientById(patientId);
    if (!patient) return false;
    const med = (patient.medications || []).find(m => m.id === medId);
    if (med) {
      med.status = 'Discontinued';
      this.saveState();
      this.notify();
      return true;
    }
    return false;
  }

  renewRefill(patientId, medId) {
    const patient = this.getPatientById(patientId);
    if (!patient) return false;
    const med = (patient.medications || []).find(m => m.id === medId);
    if (med) {
      med.refillsRemaining = (Number(med.refillsRemaining) || 0) + 3;
      this.saveState();
      this.notify();
      return true;
    }
    return false;
  }

  // Drug-Drug and Allergy Interaction Checker
  checkDrugInteractions(patientId, newDrugName) {
    const alerts = [];
    const patient = this.getPatientById(patientId);
    if (!patient || !newDrugName) return alerts;

    const lowerNew = newDrugName.toLowerCase();

    // 1. Check patient allergies
    (patient.allergies || []).forEach(alg => {
      const allergenLower = alg.allergen.toLowerCase();
      // Match penicillin with amox, ampicillin, etc.
      let match = false;
      if (lowerNew.includes(allergenLower) || allergenLower.includes(lowerNew)) {
        match = true;
      } else if (allergenLower.includes('penicillin') && (lowerNew.includes('amoxicillin') || lowerNew.includes('ampicillin') || lowerNew.includes('augmentin'))) {
        match = true;
      } else if (allergenLower.includes('sulfa') && (lowerNew.includes('bactrim') || lowerNew.includes('sulfamethoxazole'))) {
        match = true;
      } else if (allergenLower.includes('aspirin') && (lowerNew.includes('ibuprofen') || lowerNew.includes('naproxen') || lowerNew.includes('nsaid'))) {
        match = true;
      }

      if (match) {
        alerts.push({
          type: 'Allergy Warning',
          severity: alg.severity || 'Severe',
          title: `Allergy Conflict: ${alg.allergen}`,
          details: `Patient has a documented ${alg.severity.toLowerCase()} allergy to ${alg.allergen}. Reaction: "${alg.reaction}".`,
          recommendation: 'Do not prescribe without clinical allergy specialist clearance.'
        });
      }
    });

    // 2. Check drug-drug interaction database against active medications
    const activeMeds = (patient.medications || []).filter(m => m.status === 'Active');
    
    this.state.interactionsDb.forEach(pair => {
      const a = pair.drugA.toLowerCase();
      const b = pair.drugB.toLowerCase();

      // Is new drug matching drugA?
      if (lowerNew.includes(a)) {
        const foundB = activeMeds.find(m => m.name.toLowerCase().includes(b));
        if (foundB) {
          alerts.push({
            type: 'Drug-Drug Interaction',
            severity: pair.severity,
            title: `Interaction: ${pair.drugA} + ${foundB.name}`,
            details: pair.warning,
            recommendation: pair.action
          });
        }
      } else if (lowerNew.includes(b)) {
        const foundA = activeMeds.find(m => m.name.toLowerCase().includes(a));
        if (foundA) {
          alerts.push({
            type: 'Drug-Drug Interaction',
            severity: pair.severity,
            title: `Interaction: ${foundA.name} + ${pair.drugB}`,
            details: pair.warning,
            recommendation: pair.action
          });
        }
      }
    });

    return alerts;
  }

  // Billing
  getBillingClaims() {
    return this.state.claims;
  }

  getClaimsForPatient(patientId) {
    return this.state.claims.filter(c => c.patientId === patientId);
  }

  addClaim(claimData) {
    const patient = this.getPatientById(claimData.patientId);
    const newClaim = {
      id: 'clm-' + Date.now().toString().slice(-5),
      patientId: claimData.patientId,
      patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown',
      patientMrn: patient ? patient.mrn : 'MRN-00000',
      dateOfService: claimData.dateOfService || new Date().toISOString().split('T')[0],
      claimNumber: 'CLM-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
      payer: claimData.payer || (patient?.insurance?.provider) || 'Standard Payer',
      cptCodes: claimData.cptCodes || [],
      icdCodes: claimData.icdCodes || [],
      totalCharged: Number(claimData.totalCharged) || 0,
      allowedAmount: Number(claimData.allowedAmount) || 0,
      insurancePaid: Number(claimData.insurancePaid) || 0,
      copayAmount: Number(claimData.copayAmount) || 0,
      patientBalance: Number(claimData.patientBalance) || 0,
      status: claimData.status || 'Submitted',
      billingNotes: claimData.billingNotes || 'Superbill generated'
    };

    this.state.claims.unshift(newClaim);
    this.saveState();
    this.notify();
    return newClaim;
  }

  recordPayment(claimId, paymentAmount) {
    const claim = this.state.claims.find(c => c.id === claimId);
    if (claim) {
      const amount = Number(paymentAmount);
      claim.patientBalance = Math.max(0, claim.patientBalance - amount);
      if (claim.patientBalance === 0) {
        claim.status = 'Paid';
      }
      this.saveState();
      this.notify();
      return true;
    }
    return false;
  }

  // Dashboard Aggregates
  getDashboardKPIs() {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = this.state.appointments.filter(a => a.date === today || a.date === '2026-09-10');
    const criticalOrAbnormalLabs = this.state.labs.filter(l => 
      !l.isReviewed && l.tests.some(t => t.flag === 'High' || t.flag === 'Critical High' || t.flag === 'Low')
    );
    const inpatientCount = this.state.patients.filter(p => p.status === 'Inpatient').length;
    const totalPatients = this.state.patients.length;
    
    // Active prescriptions needing refills (<= 1 refill remaining)
    let lowRefillCount = 0;
    this.state.patients.forEach(p => {
      (p.medications || []).forEach(m => {
        if (m.status === 'Active' && m.refillsRemaining <= 1) {
          lowRefillCount++;
        }
      });
    });

    return {
      todayAppointmentsCount: todayAppointments.length,
      pendingAbnormalLabsCount: criticalOrAbnormalLabs.length,
      lowRefillCount,
      inpatientCount,
      totalPatients,
      todayAppointments,
      criticalOrAbnormalLabs
    };
  }
}

export const store = new EHRStore();
