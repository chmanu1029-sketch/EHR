# CareFlow EHR (Electronic Health Record) Demo Web Application

**CareFlow EHR** is a modern, responsive, zero-dependency Electronic Health Record (EHR) demo web application built for clinical documentation, patient charting, scheduling, diagnostics, pharmacotherapy, and revenue cycle management.

> ⚠️ **MEDICAL & DATA DISCLAIMER**  
> **CareFlow EHR is a software demonstration prototype utilizing 100% fictional sample patient records.**  
> It does **not** contain real Protected Health Information (PHI) and is **not** a medical device or certified diagnostic system. It must not be used to deliver clinical diagnosis, medical care, or treatment advice.

---

## 🩺 Key Features & Capabilities

### 1. Clinician Authentication & Demo Profiles
- Multi-provider support with fast one-click demo profile switching:
  - **Dr. Sarah Lin, MD** — Internal Medicine / Primary Care (Attending Physician)
  - **Dr. James Wilson, MD** — Cardiovascular Medicine (Cardiology Specialist)
  - **Dr. Maria Santos, MD** — Metabolic Health & Endocrinology
- Role badges, state medical license IDs, and NPI identifiers.
- Persistent session storage in `localStorage`.

### 2. Clinic Operations Dashboard
- Real-time clinical KPI overview:
  - Today's appointment volume
  - Pending critical and abnormal laboratory alerts
  - Prescription refill requests queue
  - Inpatient census tracking
- Interactive encounter agenda with direct **"Start Visit"** flow.
- Priority alert panel for unreviewed laboratory findings with one-click clinician review and electronic sign-off.
- Fast launchpad for rapid clinical actions.

### 3. Patient Directory & Smart Search
- Multi-attribute directory search by patient name, MRN, diagnosis, and phone number.
- Instant autocomplete global search dropdown accessible from any view.
- Filter by admission status (*Active*, *Inpatient*), gender, and age brackets.
- Grid Cards and Structured Table view modes.

### 4. Comprehensive Patient Chart (Profile)
- **Demographics Header**: MRN, Date of Birth, Age, Sex, Blood Type, Primary Care Provider, residential address, and emergency contacts.
- **High-Visibility Allergies Banner**: Red/amber alert banner highlighting documented allergens (*Penicillin*, *Sulfa*, *NSAIDs*, *Latex*, etc.), severity ratings (*Mild*, *Moderate*, *Severe*), and specific clinical reactions, with support for **NKDA** (No Known Drug Allergies).
- **Interactive Vitals Trend Tracker**:
  - Dials and ranges for Blood Pressure, Heart Rate, SpO2, Temperature, Respiration Rate, and automatic BMI computation.
  - Interactive Canvas trend chart illustrating longitudinal Systolic BP, Diastolic BP, and Heart Rate across visits.
  - "+ Log New Vitals" modal with immediate chart updates.
- **Problem List & History**: Chronic conditions with fictional ICD-10 codes, past surgeries, and detailed social history (smoking, alcohol, exercise, occupation).
- **Encounter Timeline**: Chronological log of past outpatient visits, inpatient admissions, and specialty consultations.

### 5. Clinical Appointments & Scheduling
- Calendar/agenda queue filtered by department (*Internal Medicine*, *Cardiology*, *Endocrinology*, *Primary Care*) and encounter status.
- Status management: *Confirmed*, *Checked-In*, *In Consultation*, *Completed*, *Cancelled*.
- "Book New Appointment" modal with encounter type (*In-Person*, *Telehealth*, *Inpatient Bedside*), room assignment, and chief complaints.

### 6. SOAP Clinical Documentation
- Structured 4-quadrant SOAP authoring interface:
  - **S (Subjective)**: Chief complaint, HPI, Review of Systems.
  - **O (Objective)**: Physical exam findings, vital sign observations.
  - **A (Assessment)**: Working diagnoses, clinical stability, ICD-10 impressions.
  - **P (Plan)**: Pharmacotherapy, diagnostic orders, follow-up schedule.
- Pre-built Clinical Templates that instantly pre-populate all 4 quadrants:
  - *General Adult Follow-up*
  - *Hypertension & Type 2 Diabetes Management*
  - *Acute Upper Respiratory Infection (URI)*
  - *Annual Wellness & Preventive Exam*
- Electronic clinician signature with audit timestamps and printable formatted output.

### 7. Laboratory Results & Diagnostic Panels
- Diagnostic panels:
  - Comprehensive Metabolic Panel (CMP)
  - Complete Blood Count (CBC) with Differential
  - Lipid Panel with Non-HDL
  - Glycated Hemoglobin A1c
  - Renal Function Panel
  - Iron & Ferritin Panel
- Flagging system (*Normal*, *High*, *Low*, *Critical High*).
- Visual **Reference Range Meters** graphically positioning results relative to normal clinical bounds.
- Clinician review and electronic sign-off workflow.

### 8. Prescription & Medication Management
- Master medication inventory across patients with dosage, route, frequency, refills remaining, and pharmacy routing.
- **Simulated Drug-Drug & Allergy Interaction Checker**:
  - Evaluates prospective drugs against active patient medications and documented allergies.
  - Example tests:
    - *Spironolactone* on a patient taking *Lisinopril* triggers a High-Severity hyperkalemia alert.
    - *Amoxicillin* on a patient with *Penicillin* allergy triggers a Severe Allergy Conflict alert.
  - Clinician override confirmation dialog.

### 9. Medical Billing & Insurance Summary
- Coverage accumulator meter tracking in-network deductible progress ($1,650 of $2,000 met) and copay requirements.
- Claims ledger featuring CPT procedure codes (e.g. 99214, 80053, 93306), ICD-10 diagnosis codes, charges, insurance reimbursements, and patient responsibility.
- "Generate Superbill" and "Collect Payment" modals.

### 10. Data Persistence & Reset
- Built-in reactive state engine backed by browser `localStorage`.
- All added patients, vital signs, appointments, notes, prescriptions, and payments persist across browser sessions.
- One-click **"Reset Demo Data"** button in the top banner to restore baseline demo records anytime.

---

## 🚀 How to Run the Project Locally

CareFlow EHR is self-contained with **zero external dependencies** (no `npm install`, no external CDNs required).

### Option 1: Using Python's Built-in HTTP Server (Recommended)
Open a terminal in the project directory (`/Users/pc/EHR`):

```bash
python3 -m http.server 8000
```

Then open your browser and navigate to:
```
http://localhost:8000/
```

### Option 2: Direct File Open
You can also directly open `index.html` in any modern web browser:
```bash
open index.html
```

---

## 👥 Sample Patient Personas for Testing

| Patient Name | MRN | Age/Sex | Primary Conditions | Key Testing Scenario |
| :--- | :--- | :--- | :--- | :--- |
| **Eleanor Vance** | `MRN-94021` | 68F | T2D (E11.9), HTN (I10), HLD (E78.5) | Penicillin allergy, Lisinopril interaction test, CMP/A1c review, vital signs trend chart |
| **Marcus Chen** | `MRN-83194` | 42M | Asthma (J45.40), Allergic Rhinitis (J30.9) | Aspirin/NSAID allergy, asthma action plan SOAP note, spirometry billing |
| **Sophia Rodriguez** | `MRN-67290` | 29F | Iron Deficiency Anemia (D50.9), Migraine | Iron panel labs, Telehealth consult schedule |
| **David Miller** | `MRN-51928` | 55M | CAD Post-PCI (I25.10), Statin therapy | Contrast allergy, stress echo claim adjudication |
| **Aisha Patel** | `MRN-38291` | 33F | Hashimoto Thyroiditis (E06.3) | Levothyroxine therapy, endocrine lab monitoring |
| **Robert Taylor** | `MRN-29104` | 72M | CKD Stage 3a (N18.31), BPH, Gout | Inpatient admission status, elevated creatinine/BUN labs |

---

## 📁 Project Architecture

```
/Users/pc/EHR/
├── index.html              # Main HTML shell, accessible modals, and layout structure
├── README.md               # Project documentation and local running guide
├── css/
│   ├── main.css            # Medical design tokens, typography, layout, responsive styles
│   ├── components.css      # Reusable cards, tables, badges, SOAP quadrants, vitals canvas
│   └── print.css           # Print stylesheet for clinical notes and patient charts
└── js/
    ├── app.js              # Application controller, hash router, global search, modals
    ├── store.js            # Reactive state management and localStorage persistence
    ├── data/
    │   └── initial-data.js # Rich fictional clinical dataset (patients, labs, vitals, claims)
    └── views/
        ├── login.js        # Clinician authentication & demo profile switcher
        ├── dashboard.js    # Clinic overview, KPI widgets, priority alerts
        ├── patients.js     # Patient directory with filters and view toggles
        ├── profile.js      # Patient chart view, vitals canvas chart, allergies & history
        ├── appointments.js # Schedule calendar, queue management, status workflow
        ├── notes.js        # Clinical SOAP note authoring, templates & e-signatures
        ├── labs.js         # Lab panels, reference ranges, and physician sign-off
        ├── medications.js  # Active prescriptions & drug interaction simulator
        └── billing.js      # Superbills, CPT/ICD claims, deductible tracker
```

---

## 🔒 Standards & Browser Support

- **Browser Compatibility**: Safari, Chrome, Edge, Firefox (Desktop & Mobile).
- **Offline & Sandbox Ready**: Zero remote network requests or CDNs; all SVG icons and charts are natively rendered.
- **Accessibility & UX**: Clean typography, high-contrast clinical color palette, semantic HTML elements, keyboard navigation, and responsive drawer for small screens.