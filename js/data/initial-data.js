/**
 * CareFlow EHR - Fictional Medical Dataset
 * 
 * DISCLAIMER: This is strictly fictional mock data for software demonstration purposes only.
 * It does not contain Protected Health Information (PHI) and must not be used for diagnosis or treatment.
 */

export const initialClinicians = [
  {
    id: "doc-1",
    name: "Dr. Sarah Lin, MD",
    specialty: "Internal Medicine",
    department: "Primary Care",
    npi: "1849204812",
    license: "CA-MD-84920",
    avatar: "SL",
    email: "sarah.lin@careflow-demo.health",
    role: "Attending Physician"
  },
  {
    id: "doc-2",
    name: "Dr. James Wilson, MD",
    specialty: "Cardiology",
    department: "Cardiovascular Medicine",
    npi: "1928374651",
    license: "CA-MD-92831",
    avatar: "JW",
    email: "james.wilson@careflow-demo.health",
    role: "Cardiologist Specialist"
  },
  {
    id: "doc-3",
    name: "Dr. Maria Santos, MD",
    specialty: "Endocrinology",
    department: "Metabolic Health",
    npi: "1092837462",
    license: "CA-MD-73625",
    avatar: "MS",
    email: "maria.santos@careflow-demo.health",
    role: "Endocrinologist"
  }
];

export const initialPatients = [
  {
    id: "pat-101",
    mrn: "MRN-94021",
    firstName: "Eleanor",
    lastName: "Vance",
    dob: "1958-04-12",
    age: 68,
    gender: "Female",
    bloodType: "A+",
    phone: "(555) 234-8901",
    email: "eleanor.vance@example.org",
    address: "742 Evergreen Terrace, Springfield, OR 97477",
    emergencyContact: {
      name: "Thomas Vance",
      relation: "Spouse",
      phone: "(555) 234-8902"
    },
    primaryProviderId: "doc-1",
    primaryProviderName: "Dr. Sarah Lin, MD",
    status: "Active",
    insurance: {
      provider: "BlueCross Health Advantage",
      policyNumber: "BCA-9842109",
      groupNumber: "GRP-40291",
      copay: 25,
      deductible: 2000,
      deductibleMet: 1650,
      outOfPocketMax: 5000,
      outOfPocketMet: 2400
    },
    allergies: [
      {
        id: "alg-1",
        allergen: "Penicillin",
        type: "Drug",
        severity: "Severe",
        reaction: "Urticaria, facial angioedema, wheezing",
        dateIdentified: "2015-08-14"
      },
      {
        id: "alg-2",
        allergen: "Sulfa Antibiotics",
        type: "Drug",
        severity: "Moderate",
        reaction: "Maculopapular cutaneous rash, pruritus",
        dateIdentified: "2019-02-11"
      }
    ],
    medicalHistory: [
      {
        id: "mh-1",
        condition: "Type 2 Diabetes Mellitus without complications",
        icd10: "E11.9",
        diagnosedDate: "2018-05-19",
        status: "Active",
        notes: "Managed with Metformin and lifestyle modification. HbA1c target < 7.0%."
      },
      {
        id: "mh-2",
        condition: "Essential (primary) Hypertension",
        icd10: "I10",
        diagnosedDate: "2014-11-03",
        status: "Active",
        notes: "Well-controlled on Lisinopril 20mg daily."
      },
      {
        id: "mh-3",
        condition: "Hyperlipidemia, unspecified",
        icd10: "E78.5",
        diagnosedDate: "2016-09-22",
        status: "Active",
        notes: "On Atorvastatin 20mg nightly."
      }
    ],
    surgicalHistory: [
      {
        id: "sh-1",
        procedure: "Laparoscopic Cholecystectomy",
        date: "2012-06-15",
        facility: "Springfield General Hospital",
        surgeon: "Dr. Robert King, MD"
      },
      {
        id: "sh-2",
        procedure: "Cataract Extraction, Left Eye",
        date: "2023-01-20",
        facility: "Valley Eye Surgery Center",
        surgeon: "Dr. Helen Zhao, MD"
      }
    ],
    socialHistory: {
      smoking: "Former smoker (Quit 2010, 15 pack-years)",
      alcohol: "Occasional (1-2 glasses of wine / week)",
      exercise: "Moderate walking, 30 min 4x/week",
      occupation: "Retired School Librarian"
    },
    vitals: [
      {
        id: "vit-101-1",
        date: "2026-09-02 09:30",
        bpSystolic: 128,
        bpDiastolic: 82,
        heartRate: 72,
        temp: 98.4,
        respRate: 16,
        spO2: 98,
        weight: 154,
        height: 64,
        bmi: 26.4,
        recordedBy: "Nurse Jackie Flores, RN"
      },
      {
        id: "vit-101-2",
        date: "2026-06-14 10:15",
        bpSystolic: 134,
        bpDiastolic: 86,
        heartRate: 76,
        temp: 98.6,
        respRate: 16,
        spO2: 97,
        weight: 156,
        height: 64,
        bmi: 26.8,
        recordedBy: "Nurse Jackie Flores, RN"
      },
      {
        id: "vit-101-3",
        date: "2026-03-10 14:00",
        bpSystolic: 138,
        bpDiastolic: 88,
        heartRate: 74,
        temp: 98.2,
        respRate: 18,
        spO2: 98,
        weight: 158,
        height: 64,
        bmi: 27.1,
        recordedBy: "Nurse Jackie Flores, RN"
      },
      {
        id: "vit-101-4",
        date: "2025-11-18 11:20",
        bpSystolic: 142,
        bpDiastolic: 90,
        heartRate: 80,
        temp: 98.7,
        respRate: 18,
        spO2: 97,
        weight: 160,
        height: 64,
        bmi: 27.5,
        recordedBy: "Nurse Alex Kim, RN"
      }
    ],
    medications: [
      {
        id: "med-1",
        name: "Metformin HCl",
        dosage: "1000 mg",
        route: "Oral",
        frequency: "Twice daily with meals",
        indication: "Type 2 Diabetes Mellitus",
        prescribedDate: "2024-03-15",
        refillsRemaining: 3,
        prescriber: "Dr. Sarah Lin, MD",
        pharmacy: "CareFlow Outpatient Pharmacy",
        status: "Active"
      },
      {
        id: "med-2",
        name: "Lisinopril",
        dosage: "20 mg",
        route: "Oral",
        frequency: "Once daily in morning",
        indication: "Hypertension",
        prescribedDate: "2024-03-15",
        refillsRemaining: 2,
        prescriber: "Dr. Sarah Lin, MD",
        pharmacy: "CareFlow Outpatient Pharmacy",
        status: "Active"
      },
      {
        id: "med-3",
        name: "Atorvastatin Calcium",
        dosage: "20 mg",
        route: "Oral",
        frequency: "Once daily at bedtime",
        indication: "Hyperlipidemia",
        prescribedDate: "2024-03-15",
        refillsRemaining: 4,
        prescriber: "Dr. Sarah Lin, MD",
        pharmacy: "CareFlow Outpatient Pharmacy",
        status: "Active"
      }
    ],
    encounters: [
      {
        id: "enc-101",
        date: "2026-09-02",
        type: "Routine Outpatient Follow-up",
        department: "Internal Medicine",
        clinician: "Dr. Sarah Lin, MD",
        reason: "Routine chronic disease management (DM2, HTN)",
        summary: "Patient reports stable blood glucose logs (110-135 mg/dL). Tolerating Metformin and Lisinopril without side effects. Blood pressure slightly elevated at 128/82 mmHg. Routine labs ordered.",
        status: "Completed"
      },
      {
        id: "enc-102",
        date: "2026-06-14",
        type: "Outpatient Follow-up",
        department: "Internal Medicine",
        clinician: "Dr. Sarah Lin, MD",
        reason: "Semi-annual diabetic foot check & HbA1c review",
        summary: "HbA1c was 6.8%. Foot examination intact with bilateral 2+ pedal pulses and normal monofilament sensation.",
        status: "Completed"
      }
    ]
  },
  {
    id: "pat-102",
    mrn: "MRN-83194",
    firstName: "Marcus",
    lastName: "Chen",
    dob: "1984-09-28",
    age: 42,
    gender: "Male",
    bloodType: "O+",
    phone: "(555) 345-6789",
    email: "marcus.chen@example.org",
    address: "128 Willow Creek Lane, Portland, OR 97201",
    emergencyContact: {
      name: "Lily Chen",
      relation: "Spouse",
      phone: "(555) 345-6780"
    },
    primaryProviderId: "doc-1",
    primaryProviderName: "Dr. Sarah Lin, MD",
    status: "Active",
    insurance: {
      provider: "Kaiser Permanente Choice",
      policyNumber: "KP-7839210",
      groupNumber: "GRP-88219",
      copay: 20,
      deductible: 1500,
      deductibleMet: 1500,
      outOfPocketMax: 4000,
      outOfPocketMet: 1950
    },
    allergies: [
      {
        id: "alg-3",
        allergen: "Aspirin / NSAIDs",
        type: "Drug",
        severity: "Moderate",
        reaction: "Bronchospasm and facial flushing",
        dateIdentified: "2020-04-18"
      }
    ],
    medicalHistory: [
      {
        id: "mh-4",
        condition: "Moderate Persistent Asthma",
        icd10: "J45.40",
        diagnosedDate: "2002-07-10",
        status: "Active",
        notes: "Triggered by cold weather and pollen. Uses ICS/LABA controller daily."
      },
      {
        id: "mh-5",
        condition: "Allergic Rhinitis, unspecified",
        icd10: "J30.9",
        diagnosedDate: "2010-03-12",
        status: "Active",
        notes: "Seasonal exacerbations during spring."
      }
    ],
    surgicalHistory: [
      {
        id: "sh-3",
        procedure: "Appendectomy (Open)",
        date: "2005-11-04",
        facility: "Portland Community Hospital",
        surgeon: "Dr. Arthur Vance, MD"
      }
    ],
    socialHistory: {
      smoking: "Never smoker",
      alcohol: "Social (1 drink per week)",
      exercise: "Runs 5k 3x/week",
      occupation: "Software Engineer"
    },
    vitals: [
      {
        id: "vit-102-1",
        date: "2026-09-08 14:15",
        bpSystolic: 118,
        bpDiastolic: 76,
        heartRate: 64,
        temp: 98.6,
        respRate: 14,
        spO2: 99,
        weight: 172,
        height: 70,
        bmi: 24.7,
        recordedBy: "Nurse Jackie Flores, RN"
      },
      {
        id: "vit-102-2",
        date: "2026-05-20 11:00",
        bpSystolic: 122,
        bpDiastolic: 78,
        heartRate: 68,
        temp: 98.4,
        respRate: 16,
        spO2: 98,
        weight: 174,
        height: 70,
        bmi: 25.0,
        recordedBy: "Nurse Jackie Flores, RN"
      }
    ],
    medications: [
      {
        id: "med-4",
        name: "Fluticasone/Salmeterol (Advair Diskus)",
        dosage: "250/50 mcg",
        route: "Inhalation",
        frequency: "1 puff twice daily",
        indication: "Asthma Controller",
        prescribedDate: "2024-05-10",
        refillsRemaining: 4,
        prescriber: "Dr. Sarah Lin, MD",
        pharmacy: "Portland Heights Pharmacy",
        status: "Active"
      },
      {
        id: "med-5",
        name: "Albuterol Sulfate HFA",
        dosage: "90 mcg/actuation",
        route: "Inhalation",
        frequency: "1-2 puffs q4-6h prn shortness of breath",
        indication: "Asthma Rescue",
        prescribedDate: "2024-05-10",
        refillsRemaining: 2,
        prescriber: "Dr. Sarah Lin, MD",
        pharmacy: "Portland Heights Pharmacy",
        status: "Active"
      }
    ],
    encounters: [
      {
        id: "enc-103",
        date: "2026-09-08",
        type: "Asthma Action Plan Review",
        department: "Pulmonary Medicine",
        clinician: "Dr. Sarah Lin, MD",
        reason: "Mild increase in nocturnal cough over the last 2 weeks",
        summary: "Lungs clear bilaterally without wheezing on exam. Peak flow 85% of personal best. Refilled maintenance inhaler and updated asthma action plan.",
        status: "Completed"
      }
    ]
  },
  {
    id: "pat-103",
    mrn: "MRN-67290",
    firstName: "Sophia",
    lastName: "Rodriguez",
    dob: "1997-02-14",
    age: 29,
    gender: "Female",
    bloodType: "B+",
    phone: "(555) 456-7890",
    email: "sophia.rodriguez@example.org",
    address: "415 Mission Street, Apt 8B, San Francisco, CA 94105",
    emergencyContact: {
      name: "Carlos Rodriguez",
      relation: "Brother",
      phone: "(555) 456-7899"
    },
    primaryProviderId: "doc-1",
    primaryProviderName: "Dr. Sarah Lin, MD",
    status: "Active",
    insurance: {
      provider: "Aetna Choice POS II",
      policyNumber: "AET-5510294",
      groupNumber: "GRP-33100",
      copay: 30,
      deductible: 2500,
      deductibleMet: 800,
      outOfPocketMax: 6000,
      outOfPocketMet: 1100
    },
    allergies: [],
    medicalHistory: [
      {
        id: "mh-6",
        condition: "Iron Deficiency Anemia",
        icd10: "D50.9",
        diagnosedDate: "2025-08-14",
        status: "Active",
        notes: "On oral Ferrous Sulfate supplementation with Vitamin C."
      },
      {
        id: "mh-7",
        condition: "Migraine without aura",
        icd10: "G43.009",
        diagnosedDate: "2021-03-20",
        status: "Active",
        notes: "Episodic, responsive to Sumatriptan."
      }
    ],
    surgicalHistory: [],
    socialHistory: {
      smoking: "Never smoker",
      alcohol: "Occasional (1 drink / month)",
      exercise: "Pilates and cycling 3x/week",
      occupation: "UX Designer"
    },
    vitals: [
      {
        id: "vit-103-1",
        date: "2026-08-25 10:45",
        bpSystolic: 112,
        bpDiastolic: 72,
        heartRate: 78,
        temp: 98.7,
        respRate: 14,
        spO2: 99,
        weight: 132,
        height: 65,
        bmi: 22.0,
        recordedBy: "Nurse Jackie Flores, RN"
      }
    ],
    medications: [
      {
        id: "med-6",
        name: "Ferrous Sulfate",
        dosage: "325 mg (65 mg elemental iron)",
        route: "Oral",
        frequency: "Once daily with food",
        indication: "Iron Deficiency Anemia",
        prescribedDate: "2025-08-14",
        refillsRemaining: 1,
        prescriber: "Dr. Sarah Lin, MD",
        pharmacy: "Mission Bay Pharmacy",
        status: "Active"
      },
      {
        id: "med-7",
        name: "Sumatriptan Succinate",
        dosage: "50 mg",
        route: "Oral",
        frequency: "1 tablet at onset of migraine headache",
        indication: "Acute Migraine Treatment",
        prescribedDate: "2025-08-14",
        refillsRemaining: 5,
        prescriber: "Dr. Sarah Lin, MD",
        pharmacy: "Mission Bay Pharmacy",
        status: "Active"
      }
    ],
    encounters: [
      {
        id: "enc-104",
        date: "2026-08-25",
        type: "Follow-up",
        department: "Internal Medicine",
        clinician: "Dr. Sarah Lin, MD",
        reason: "Fatigue check and repeat Ferritin level",
        summary: "Energy levels improved on iron supplement. Ferritin up from 8 to 28 ng/mL. Continue current dose for 3 more months.",
        status: "Completed"
      }
    ]
  },
  {
    id: "pat-104",
    mrn: "MRN-51928",
    firstName: "David",
    lastName: "Miller",
    dob: "1971-06-03",
    age: 55,
    gender: "Male",
    bloodType: "AB+",
    phone: "(555) 567-8901",
    email: "david.miller@example.org",
    address: "89 Crestline Blvd, Seattle, WA 98101",
    emergencyContact: {
      name: "Karen Miller",
      relation: "Spouse",
      phone: "(555) 567-8902"
    },
    primaryProviderId: "doc-2",
    primaryProviderName: "Dr. James Wilson, MD",
    status: "Active",
    insurance: {
      provider: "UnitedHealthcare Choice Plus",
      policyNumber: "UHC-9921471",
      groupNumber: "GRP-77210",
      copay: 35,
      deductible: 3000,
      deductibleMet: 2400,
      outOfPocketMax: 6500,
      outOfPocketMet: 3800
    },
    allergies: [
      {
        id: "alg-4",
        allergen: "Iodinated Contrast Media",
        type: "Radiologic Agent",
        severity: "Moderate",
        reaction: "Diffuse hives, nausea",
        dateIdentified: "2018-09-04"
      }
    ],
    medicalHistory: [
      {
        id: "mh-8",
        condition: "Coronary Artery Disease (CAD)",
        icd10: "I25.10",
        diagnosedDate: "2019-11-12",
        status: "Active",
        notes: "Post-PCI to LAD with drug-eluting stent. Followed by Dr. James Wilson."
      },
      {
        id: "mh-9",
        condition: "Hypercholesterolemia",
        icd10: "E78.00",
        diagnosedDate: "2015-04-10",
        status: "Active",
        notes: "On Rosuvastatin 40mg daily."
      }
    ],
    surgicalHistory: [
      {
        id: "sh-4",
        procedure: "Percutaneous Coronary Intervention (PCI) with DES to LAD",
        date: "2019-11-15",
        facility: "Seattle Heart & Vascular Institute",
        surgeon: "Dr. James Wilson, MD"
      }
    ],
    socialHistory: {
      smoking: "Former smoker (Quit 2019, 20 pack-years)",
      alcohol: "Rare",
      exercise: "Cardiac rehab grad, walks 40 min daily",
      occupation: "Civil Engineer"
    },
    vitals: [
      {
        id: "vit-104-1",
        date: "2026-09-05 15:30",
        bpSystolic: 124,
        bpDiastolic: 78,
        heartRate: 58,
        temp: 98.3,
        respRate: 14,
        spO2: 99,
        weight: 188,
        height: 71,
        bmi: 26.2,
        recordedBy: "Nurse Alex Kim, RN"
      }
    ],
    medications: [
      {
        id: "med-8",
        name: "Rosuvastatin Calcium",
        dosage: "40 mg",
        route: "Oral",
        frequency: "Once daily at bedtime",
        indication: "Secondary Prevention CAD",
        prescribedDate: "2024-02-12",
        refillsRemaining: 3,
        prescriber: "Dr. James Wilson, MD",
        pharmacy: "Downtown Seattle Pharmacy",
        status: "Active"
      },
      {
        id: "med-9",
        name: "Metoprolol Succinate ER",
        dosage: "50 mg",
        route: "Oral",
        frequency: "Once daily in morning",
        indication: "CAD / Rate Control",
        prescribedDate: "2024-02-12",
        refillsRemaining: 2,
        prescriber: "Dr. James Wilson, MD",
        pharmacy: "Downtown Seattle Pharmacy",
        status: "Active"
      },
      {
        id: "med-10",
        name: "Aspirin (Enteric-coated)",
        dosage: "81 mg",
        route: "Oral",
        frequency: "Once daily with food",
        indication: "Antiplatelet Therapy",
        prescribedDate: "2024-02-12",
        refillsRemaining: 5,
        prescriber: "Dr. James Wilson, MD",
        pharmacy: "Downtown Seattle Pharmacy",
        status: "Active"
      }
    ],
    encounters: [
      {
        id: "enc-105",
        date: "2026-09-05",
        type: "Cardiology Consult",
        department: "Cardiovascular Medicine",
        clinician: "Dr. James Wilson, MD",
        reason: "Annual post-stent evaluation and stress echocardiogram review",
        summary: "Asymptomatic. Exercise tolerance good without chest pressure or dyspnea. Echocardiogram shows preserved LVEF 60% with normal wall motion.",
        status: "Completed"
      }
    ]
  },
  {
    id: "pat-105",
    mrn: "MRN-38291",
    firstName: "Aisha",
    lastName: "Patel",
    dob: "1992-11-19",
    age: 33,
    gender: "Female",
    bloodType: "O-",
    phone: "(555) 678-9012",
    email: "aisha.patel@example.org",
    address: "520 West End Avenue, Austin, TX 78701",
    emergencyContact: {
      name: "Farhan Patel",
      relation: "Spouse",
      phone: "(555) 678-9019"
    },
    primaryProviderId: "doc-3",
    primaryProviderName: "Dr. Maria Santos, MD",
    status: "Active",
    insurance: {
      provider: "Cigna Health Care",
      policyNumber: "CGN-4429184",
      groupNumber: "GRP-66012",
      copay: 25,
      deductible: 1200,
      deductibleMet: 1200,
      outOfPocketMax: 3500,
      outOfPocketMet: 1750
    },
    allergies: [
      {
        id: "alg-5",
        allergen: "Latex",
        type: "Environmental",
        severity: "Mild",
        reaction: "Contact dermatitis, erythema",
        dateIdentified: "2017-05-19"
      }
    ],
    medicalHistory: [
      {
        id: "mh-10",
        condition: "Hashimoto Thyroiditis / Hypothyroidism",
        icd10: "E06.3",
        diagnosedDate: "2021-08-10",
        status: "Active",
        notes: "TSH monitored every 6 months. Maintained on Levothyroxine 75mcg."
      }
    ],
    surgicalHistory: [],
    socialHistory: {
      smoking: "Never smoker",
      alcohol: "None",
      exercise: "Yoga and brisk walking daily",
      occupation: "Data Analyst"
    },
    vitals: [
      {
        id: "vit-105-1",
        date: "2026-08-19 11:30",
        bpSystolic: 114,
        bpDiastolic: 74,
        heartRate: 70,
        temp: 98.2,
        respRate: 14,
        spO2: 99,
        weight: 136,
        height: 63,
        bmi: 24.1,
        recordedBy: "Nurse Alex Kim, RN"
      }
    ],
    medications: [
      {
        id: "med-11",
        name: "Levothyroxine Sodium",
        dosage: "75 mcg",
        route: "Oral",
        frequency: "Once daily on empty stomach 30 min before breakfast",
        indication: "Primary Hypothyroidism",
        prescribedDate: "2024-01-15",
        refillsRemaining: 3,
        prescriber: "Dr. Maria Santos, MD",
        pharmacy: "Austin Health Rx",
        status: "Active"
      }
    ],
    encounters: [
      {
        id: "enc-106",
        date: "2026-08-19",
        type: "Endocrinology Visit",
        department: "Metabolic Health",
        clinician: "Dr. Maria Santos, MD",
        reason: "TSH check and medication refill",
        summary: "Patient feels well with no cold intolerance, constipation, or sluggishness. TSH euthyroid at 1.82 mIU/L. Keep dosage at 75 mcg.",
        status: "Completed"
      }
    ]
  },
  {
    id: "pat-106",
    mrn: "MRN-29104",
    firstName: "Robert",
    lastName: "Taylor",
    dob: "1954-03-08",
    age: 72,
    gender: "Male",
    bloodType: "A-",
    phone: "(555) 789-0123",
    email: "robert.taylor@example.org",
    address: "310 Pinecrest Lane, Denver, CO 80202",
    emergencyContact: {
      name: "Laura Taylor",
      relation: "Daughter",
      phone: "(555) 789-0129"
    },
    primaryProviderId: "doc-1",
    primaryProviderName: "Dr. Sarah Lin, MD",
    status: "Inpatient",
    insurance: {
      provider: "Medicare Part B + Humana Advantage",
      policyNumber: "MED-8819204",
      groupNumber: "GRP-10029",
      copay: 15,
      deductible: 500,
      deductibleMet: 500,
      outOfPocketMax: 3000,
      outOfPocketMet: 2900
    },
    allergies: [
      {
        id: "alg-6",
        allergen: "Cephalexin (Keflex)",
        type: "Drug",
        severity: "Severe",
        reaction: "Anaphylactoid dyspnea and widespread hives",
        dateIdentified: "2013-10-09"
      }
    ],
    medicalHistory: [
      {
        id: "mh-11",
        condition: "Chronic Kidney Disease, Stage 3a",
        icd10: "N18.31",
        diagnosedDate: "2022-04-14",
        status: "Active",
        notes: "Baseline eGFR 52 mL/min/1.73m2. Avoid NSAIDs."
      },
      {
        id: "mh-12",
        condition: "Benign Prostatic Hyperplasia (BPH)",
        icd10: "N40.0",
        diagnosedDate: "2017-08-20",
        status: "Active",
        notes: "Tamsulosin 0.4mg nightly."
      },
      {
        id: "mh-13",
        condition: "Gout, unspecified",
        icd10: "M10.9",
        diagnosedDate: "2019-01-15",
        status: "Active",
        notes: "On Allopurinol maintenance."
      }
    ],
    surgicalHistory: [
      {
        id: "sh-5",
        procedure: "Total Hip Arthroplasty, Right",
        date: "2021-09-12",
        facility: "Rocky Mountain Orthopedic Center",
        surgeon: "Dr. Gregory House, MD"
      }
    ],
    socialHistory: {
      smoking: "Never smoker",
      alcohol: "Rare",
      exercise: "Light gardening",
      occupation: "Retired Geologist"
    },
    vitals: [
      {
        id: "vit-106-1",
        date: "2026-09-10 08:00",
        bpSystolic: 136,
        bpDiastolic: 84,
        heartRate: 74,
        temp: 98.8,
        respRate: 16,
        spO2: 96,
        weight: 178,
        height: 69,
        bmi: 26.3,
        recordedBy: "Nurse Jackie Flores, RN"
      },
      {
        id: "vit-106-2",
        date: "2026-09-09 20:00",
        bpSystolic: 140,
        bpDiastolic: 86,
        heartRate: 78,
        temp: 99.1,
        respRate: 18,
        spO2: 96,
        weight: 178,
        height: 69,
        bmi: 26.3,
        recordedBy: "Nurse Alex Kim, RN"
      }
    ],
    medications: [
      {
        id: "med-12",
        name: "Allopurinol",
        dosage: "100 mg",
        route: "Oral",
        frequency: "Once daily with food",
        indication: "Chronic Gout Prophylaxis",
        prescribedDate: "2024-04-18",
        refillsRemaining: 2,
        prescriber: "Dr. Sarah Lin, MD",
        pharmacy: "CareFlow Inpatient Pharmacy",
        status: "Active"
      },
      {
        id: "med-13",
        name: "Tamsulosin HCl",
        dosage: "0.4 mg",
        route: "Oral",
        frequency: "Once daily 30 minutes after the same meal",
        indication: "BPH Symptoms",
        prescribedDate: "2024-04-18",
        refillsRemaining: 3,
        prescriber: "Dr. Sarah Lin, MD",
        pharmacy: "CareFlow Inpatient Pharmacy",
        status: "Active"
      },
      {
        id: "med-14",
        name: "Amlodipine Besylate",
        dosage: "5 mg",
        route: "Oral",
        frequency: "Once daily",
        indication: "Hypertension",
        prescribedDate: "2024-04-18",
        refillsRemaining: 4,
        prescriber: "Dr. Sarah Lin, MD",
        pharmacy: "CareFlow Inpatient Pharmacy",
        status: "Active"
      }
    ],
    encounters: [
      {
        id: "enc-107",
        date: "2026-09-09",
        type: "Inpatient Admission",
        department: "Internal Medicine / Nephrology",
        clinician: "Dr. Sarah Lin, MD",
        reason: "Acute on chronic kidney injury evaluation with mild dehydration",
        summary: "Admitted for IV hydration and medication reconciliation. Serum creatinine improved from 1.9 to 1.6 mg/dL over 24 hours.",
        status: "In Progress"
      }
    ]
  }
];

export const initialAppointments = [
  {
    id: "apt-201",
    patientId: "pat-101",
    patientName: "Eleanor Vance",
    patientMrn: "MRN-94021",
    clinicianId: "doc-1",
    clinicianName: "Dr. Sarah Lin, MD",
    department: "Internal Medicine",
    date: "2026-09-10",
    time: "09:00 AM",
    durationMinutes: 30,
    type: "In-Person",
    room: "Exam Room 3B",
    reason: "Diabetes & Hypertension Follow-up + Lab Review",
    status: "Checked-In",
    notes: "Patient waiting in Exam Room 3B. Fasting labs completed yesterday."
  },
  {
    id: "apt-202",
    patientId: "pat-102",
    patientName: "Marcus Chen",
    patientMrn: "MRN-83194",
    clinicianId: "doc-1",
    clinicianName: "Dr. Sarah Lin, MD",
    department: "Internal Medicine",
    date: "2026-09-10",
    time: "10:30 AM",
    durationMinutes: 30,
    type: "In-Person",
    room: "Exam Room 2A",
    reason: "Annual Comprehensive Wellness Exam",
    status: "Confirmed",
    notes: "Needs routine health maintenance updates and spirometry check."
  },
  {
    id: "apt-203",
    patientId: "pat-103",
    patientName: "Sophia Rodriguez",
    patientMrn: "MRN-67290",
    clinicianId: "doc-1",
    clinicianName: "Dr. Sarah Lin, MD",
    department: "Internal Medicine",
    date: "2026-09-10",
    time: "01:15 PM",
    durationMinutes: 20,
    type: "Telehealth",
    room: "Virtual Visit Room #4",
    reason: "Iron Anemia Symptoms & Blood Work Consultation",
    status: "Confirmed",
    notes: "Telehealth link dispatched to patient email."
  },
  {
    id: "apt-204",
    patientId: "pat-104",
    patientName: "David Miller",
    patientMrn: "MRN-51928",
    clinicianId: "doc-2",
    clinicianName: "Dr. James Wilson, MD",
    department: "Cardiovascular Medicine",
    date: "2026-09-10",
    time: "02:30 PM",
    durationMinutes: 45,
    type: "In-Person",
    room: "Cardiology Suite 101",
    reason: "Post-PCI 5-Year Surveillance Consult & Lipid Management",
    status: "Confirmed",
    notes: "Repeat lipid profile and EKG ordered before visit."
  },
  {
    id: "apt-205",
    patientId: "pat-105",
    patientName: "Aisha Patel",
    patientMrn: "MRN-38291",
    clinicianId: "doc-3",
    clinicianName: "Dr. Maria Santos, MD",
    department: "Metabolic Health",
    date: "2026-09-11",
    time: "11:00 AM",
    durationMinutes: 30,
    type: "In-Person",
    room: "Endocrine Clinic Room 1",
    reason: "Hashimoto Thyroiditis 6-Month Protocol",
    status: "Confirmed",
    notes: "Review recent free T4 and TSH values."
  },
  {
    id: "apt-206",
    patientId: "pat-106",
    patientName: "Robert Taylor",
    patientMrn: "MRN-29104",
    clinicianId: "doc-1",
    clinicianName: "Dr. Sarah Lin, MD",
    department: "Internal Medicine",
    date: "2026-09-10",
    time: "04:00 PM",
    durationMinutes: 20,
    type: "Inpatient Bedside",
    room: "Floor 4, Bed 412",
    reason: "Inpatient Bedside Rounding & Discharge Planning",
    status: "Scheduled",
    notes: "Evaluate IV fluid weaning and oral transition."
  }
];

export const initialClinicalNotes = [
  {
    id: "note-301",
    patientId: "pat-101",
    patientName: "Eleanor Vance",
    patientMrn: "MRN-94021",
    clinicianId: "doc-1",
    clinicianName: "Dr. Sarah Lin, MD",
    encounterDate: "2026-09-02",
    noteType: "SOAP Progress Note",
    title: "Routine Chronic Disease Management (DM2 & HTN)",
    subjective: "Patient is a 68-year-old female with long-standing Type 2 Diabetes Mellitus and Essential Hypertension presenting for routine follow-up. Reports feeling well overall without polydipsia, polyuria, chest pain, shortness of breath, orthopnea, or lower extremity swelling. Self-monitoring fasting glucose logs average 110-130 mg/dL. Reports taking Metformin 1000mg BID and Lisinopril 20mg QD with good adherence. Denies dizziness or lightheadedness upon standing.",
    objective: "Vitals: BP 128/82 mmHg | HR 72 bpm | Temp 98.4 F | RR 16 bpm | SpO2 98% on room air | BMI 26.4.\n\nConstitutional: Alert, oriented x4, pleasant, in no acute distress.\nHEENT: Normocephalic, atraumatic. PERRL, EOMI. Oropharynx clear.\nCardiovascular: Regular rate and rhythm. S1 and S2 present. No murmurs, gallops, or friction rubs. Peripheral pulses 2+ symmetric.\nPulmonary: Clear to auscultation bilaterally. No wheezes, rales, or rhonchi.\nAbdomen: Soft, non-tender, non-distended. Normal active bowel sounds. Well-healed laparoscopic port scars.\nExtremities: No clubbing, cyanosis, or pedal edema. Monofilament examination demonstrates intact sensation on plantar surfaces bilaterally.",
    assessment: "1. Type 2 Diabetes Mellitus (E11.9) - Stable on oral monotherapy. Glycemic control acceptable based on home logs.\n2. Essential Hypertension (I10) - Controlled on Lisinopril 20mg.\n3. Hyperlipidemia (E78.5) - Stable on Atorvastatin 20mg nightly.\n4. Health Maintenance - Up to date on influenza vaccine; due for repeat HbA1c, CMP, and lipid panel.",
    plan: "1. Continue Metformin 1000 mg PO BID with meals.\n2. Continue Lisinopril 20 mg PO daily in the morning.\n3. Continue Atorvastatin 20 mg PO QHS.\n4. Labs ordered: Comprehensive Metabolic Panel (CMP), HbA1c, Lipid Panel, and spot urine Albumin/Creatinine ratio.\n5. Follow-up: Clinic visit scheduled in 1 week to review laboratory results.",
    isSigned: true,
    signedAt: "2026-09-02 11:45 AM",
    signedBy: "Dr. Sarah Lin, MD",
    status: "Finalized"
  },
  {
    id: "note-302",
    patientId: "pat-102",
    patientName: "Marcus Chen",
    patientMrn: "MRN-83194",
    clinicianId: "doc-1",
    clinicianName: "Dr. Sarah Lin, MD",
    encounterDate: "2026-09-08",
    noteType: "SOAP Progress Note",
    title: "Asthma Action Plan Update & Pollen Flare",
    subjective: "Marcus Chen is a 42-year-old male with moderate persistent asthma presenting with 2-week history of nocturnal dry coughing and occasional chest tightness following outdoor running. He has been using his Albuterol rescue inhaler 3-4 times per week (increased from baseline of once every 2 weeks). No fever, chills, purulent sputum, or hemoptysis.",
    objective: "Vitals: BP 118/76 mmHg | HR 64 bpm | Temp 98.6 F | RR 14 bpm | SpO2 99% on RA | BMI 24.7.\n\nGeneral: Well-nourished, comfortable, conversing in full sentences without respiratory struggle.\nLungs: Clear to auscultation throughout all lung fields. No inspiratory or expiratory wheezes at rest. Forced exhalation produces faint end-expiratory musical wheeze at right lung base.\nPeak Expiratory Flow Rate (PEFR): 520 L/min (baseline 610 L/min, ~85% of predicted).\nNose: Pale, mildly edematous nasal turbinates consistent with allergic rhinitis.",
    assessment: "1. Moderate Persistent Asthma with mild exacerbation triggered by allergic rhinitis (J45.40).\n2. Allergic Rhinitis (J30.9) - Mild seasonal exacerbation.\n3. Aspirin-exacerbated respiratory disease awareness documented in allergy file.",
    plan: "1. Step up controller: Reinforce adherence to Advair Diskus (Fluticasone/Salmeterol 250/50 mcg) 1 puff BID, ensuring mouth rinsing after each dose.\n2. Albuterol HFA 90 mcg 2 puffs 15 minutes prior to outdoor athletic workouts.\n3. Add Fluticasone nasal spray 50 mcg 1 spray each nostril daily for allergic rhinitis.\n4. Re-check in clinic in 4-6 weeks if symptoms fail to return to baseline.",
    isSigned: true,
    signedAt: "2026-09-08 03:20 PM",
    signedBy: "Dr. Sarah Lin, MD",
    status: "Finalized"
  }
];

export const initialLabs = [
  {
    id: "lab-401",
    patientId: "pat-101",
    patientName: "Eleanor Vance",
    patientMrn: "MRN-94021",
    panelName: "Comprehensive Metabolic Panel (CMP)",
    orderDate: "2026-09-02",
    resultDate: "2026-09-03 14:10",
    orderedBy: "Dr. Sarah Lin, MD",
    performingLab: "CareFlow Central Diagnostic Core",
    status: "Final",
    isReviewed: true,
    reviewedBy: "Dr. Sarah Lin, MD",
    reviewedAt: "2026-09-04 08:30 AM",
    tests: [
      { name: "Sodium", value: 139, unit: "mmol/L", refRange: "135 - 145", flag: "Normal" },
      { name: "Potassium", value: 4.6, unit: "mmol/L", refRange: "3.5 - 5.1", flag: "Normal" },
      { name: "Chloride", value: 102, unit: "mmol/L", refRange: "98 - 107", flag: "Normal" },
      { name: "Carbon Dioxide (CO2)", value: 25, unit: "mmol/L", refRange: "22 - 29", flag: "Normal" },
      { name: "Blood Urea Nitrogen (BUN)", value: 18, unit: "mg/dL", refRange: "7 - 20", flag: "Normal" },
      { name: "Creatinine", value: 0.92, unit: "mg/dL", refRange: "0.50 - 1.10", flag: "Normal" },
      { name: "eGFR (CKD-EPI)", value: 74, unit: "mL/min/1.73m2", refRange: "> 60", flag: "Normal" },
      { name: "Glucose, Fasting", value: 126, unit: "mg/dL", refRange: "70 - 99", flag: "High" },
      { name: "Calcium", value: 9.4, unit: "mg/dL", refRange: "8.6 - 10.2", flag: "Normal" },
      { name: "Total Protein", value: 7.1, unit: "g/dL", refRange: "6.3 - 8.2", flag: "Normal" },
      { name: "Albumin", value: 4.2, unit: "g/dL", refRange: "3.5 - 5.0", flag: "Normal" },
      { name: "Bilirubin, Total", value: 0.6, unit: "mg/dL", refRange: "0.2 - 1.2", flag: "Normal" },
      { name: "Alkaline Phosphatase (ALP)", value: 68, unit: "U/L", refRange: "35 - 104", flag: "Normal" },
      { name: "AST (SGOT)", value: 22, unit: "U/L", refRange: "10 - 35", flag: "Normal" },
      { name: "ALT (SGPT)", value: 24, unit: "U/L", refRange: "9 - 36", flag: "Normal" }
    ]
  },
  {
    id: "lab-402",
    patientId: "pat-101",
    patientName: "Eleanor Vance",
    patientMrn: "MRN-94021",
    panelName: "Hemoglobin A1c Glycated",
    orderDate: "2026-09-02",
    resultDate: "2026-09-03 14:15",
    orderedBy: "Dr. Sarah Lin, MD",
    performingLab: "CareFlow Central Diagnostic Core",
    status: "Final",
    isReviewed: true,
    reviewedBy: "Dr. Sarah Lin, MD",
    reviewedAt: "2026-09-04 08:30 AM",
    tests: [
      { name: "Hemoglobin A1c", value: 6.9, unit: "%", refRange: "< 5.7 (Normal), < 7.0 (Target DM)", flag: "High" },
      { name: "Estimated Avg Glucose (eAG)", value: 151, unit: "mg/dL", refRange: "70 - 126", flag: "High" }
    ]
  },
  {
    id: "lab-403",
    patientId: "pat-101",
    patientName: "Eleanor Vance",
    patientMrn: "MRN-94021",
    panelName: "Lipid Panel with Non-HDL",
    orderDate: "2026-09-02",
    resultDate: "2026-09-03 14:20",
    orderedBy: "Dr. Sarah Lin, MD",
    performingLab: "CareFlow Central Diagnostic Core",
    status: "Final",
    isReviewed: true,
    reviewedBy: "Dr. Sarah Lin, MD",
    reviewedAt: "2026-09-04 08:30 AM",
    tests: [
      { name: "Cholesterol, Total", value: 172, unit: "mg/dL", refRange: "< 200", flag: "Normal" },
      { name: "Triglycerides", value: 148, unit: "mg/dL", refRange: "< 150", flag: "Normal" },
      { name: "HDL Cholesterol", value: 54, unit: "mg/dL", refRange: "> 50 (Female)", flag: "Normal" },
      { name: "LDL Cholesterol (Calculated)", value: 88, unit: "mg/dL", refRange: "< 100 (Optimal)", flag: "Normal" },
      { name: "Non-HDL Cholesterol", value: 118, unit: "mg/dL", refRange: "< 130", flag: "Normal" }
    ]
  },
  {
    id: "lab-404",
    patientId: "pat-103",
    patientName: "Sophia Rodriguez",
    patientMrn: "MRN-67290",
    panelName: "Iron & Ferritin Panel",
    orderDate: "2026-08-25",
    resultDate: "2026-08-26 11:30",
    orderedBy: "Dr. Sarah Lin, MD",
    performingLab: "CareFlow Central Diagnostic Core",
    status: "Final",
    isReviewed: true,
    reviewedBy: "Dr. Sarah Lin, MD",
    reviewedAt: "2026-08-26 04:00 PM",
    tests: [
      { name: "Ferritin, Serum", value: 28, unit: "ng/mL", refRange: "13 - 150", flag: "Normal" },
      { name: "Iron, Total", value: 62, unit: "mcg/dL", refRange: "50 - 170", flag: "Normal" },
      { name: "Total Iron Binding Capacity (TIBC)", value: 340, unit: "mcg/dL", refRange: "250 - 450", flag: "Normal" },
      { name: "Transferrin Saturation", value: 18.2, unit: "%", refRange: "15 - 50", flag: "Normal" }
    ]
  },
  {
    id: "lab-405",
    patientId: "pat-106",
    patientName: "Robert Taylor",
    patientMrn: "MRN-29104",
    panelName: "Renal Function Panel (Inpatient Day 2)",
    orderDate: "2026-09-10",
    resultDate: "2026-09-10 07:15",
    orderedBy: "Dr. Sarah Lin, MD",
    performingLab: "CareFlow Stat Laboratory",
    status: "Final",
    isReviewed: false,
    reviewedBy: null,
    reviewedAt: null,
    tests: [
      { name: "Sodium", value: 137, unit: "mmol/L", refRange: "135 - 145", flag: "Normal" },
      { name: "Potassium", value: 5.4, unit: "mmol/L", refRange: "3.5 - 5.1", flag: "High" },
      { name: "Chloride", value: 101, unit: "mmol/L", refRange: "98 - 107", flag: "Normal" },
      { name: "BUN", value: 28, unit: "mg/dL", refRange: "7 - 20", flag: "High" },
      { name: "Creatinine", value: 1.62, unit: "mg/dL", refRange: "0.70 - 1.30", flag: "High" },
      { name: "eGFR", value: 44, unit: "mL/min/1.73m2", refRange: "> 60", flag: "Low" }
    ]
  }
];

export const initialBillingClaims = [
  {
    id: "clm-501",
    patientId: "pat-101",
    patientName: "Eleanor Vance",
    patientMrn: "MRN-94021",
    dateOfService: "2026-09-02",
    claimNumber: "CLM-2026-0941",
    payer: "BlueCross Health Advantage",
    cptCodes: [
      { code: "99214", description: "Office visit, established patient, level 4 (moderate complexity)", charge: 195.00 },
      { code: "80053", description: "Comprehensive Metabolic Panel (CMP)", charge: 45.00 },
      { code: "83036", description: "Hemoglobin A1c assay", charge: 35.00 },
      { code: "80061", description: "Lipid Panel", charge: 40.00 }
    ],
    icdCodes: ["E11.9", "I10", "E78.5"],
    totalCharged: 315.00,
    allowedAmount: 240.00,
    insurancePaid: 215.00,
    copayAmount: 25.00,
    patientBalance: 0.00,
    status: "Paid",
    billingNotes: "Claim adjudicated and paid by primary payer. Patient copay collected at time of service."
  },
  {
    id: "clm-502",
    patientId: "pat-102",
    patientName: "Marcus Chen",
    patientMrn: "MRN-83194",
    dateOfService: "2026-09-08",
    claimNumber: "CLM-2026-0978",
    payer: "Kaiser Permanente Choice",
    cptCodes: [
      { code: "99213", description: "Office visit, established patient, level 3 (low complexity)", charge: 140.00 },
      { code: "94010", description: "Spirometry with graphic record", charge: 75.00 }
    ],
    icdCodes: ["J45.40", "J30.9"],
    totalCharged: 215.00,
    allowedAmount: 180.00,
    insurancePaid: 160.00,
    copayAmount: 20.00,
    patientBalance: 0.00,
    status: "Submitted",
    billingNotes: "Claim queued for electronic clearinghouse EDI transmission."
  },
  {
    id: "clm-503",
    patientId: "pat-104",
    patientName: "David Miller",
    patientMrn: "MRN-51928",
    dateOfService: "2026-09-05",
    claimNumber: "CLM-2026-0952",
    payer: "UnitedHealthcare Choice Plus",
    cptCodes: [
      { code: "99215", description: "Office visit, established patient, level 5 (high complexity)", charge: 260.00 },
      { code: "93306", description: "Echocardiography, transthoracic, real-time with image documentation", charge: 650.00 },
      { code: "93000", description: "Electrocardiogram (ECG/EKG) 12-lead with interpretation", charge: 55.00 }
    ],
    icdCodes: ["I25.10", "E78.00"],
    totalCharged: 965.00,
    allowedAmount: 780.00,
    insurancePaid: 600.00,
    copayAmount: 35.00,
    patientBalance: 145.00,
    status: "Pending",
    billingNotes: "Insurance deductible coinsurance processing. Statement sent to patient for balance."
  },
  {
    id: "clm-504",
    patientId: "pat-106",
    patientName: "Robert Taylor",
    patientMrn: "MRN-29104",
    dateOfService: "2026-09-09",
    claimNumber: "CLM-2026-1002",
    payer: "Medicare Part B + Humana",
    cptCodes: [
      { code: "99222", description: "Initial hospital inpatient care, moderate complexity", charge: 310.00 },
      { code: "80069", description: "Renal Function Panel", charge: 48.00 },
      { code: "96360", description: "Intravenous hydration infusion, initial 1 hour", charge: 125.00 }
    ],
    icdCodes: ["N18.31", "E86.0", "M10.9"],
    totalCharged: 483.00,
    allowedAmount: 0.00,
    insurancePaid: 0.00,
    copayAmount: 15.00,
    patientBalance: 483.00,
    status: "Draft",
    billingNotes: "Inpatient stay ongoing. Interim bill in preparation."
  }
];

export const clinicalTemplates = [
  {
    id: "tmpl-1",
    name: "General Adult Follow-up",
    subjective: "Patient presents for routine follow-up. Reports overall condition is stable. Adherence to prescribed medications is confirmed without intolerable side effects. Denies acute chest pain, shortness of breath, fever, chills, or new focal neurologic deficits.",
    objective: "Constitutional: Well-appearing, alert and oriented x4, in no acute distress.\nCardiovascular: Regular rate and rhythm, S1/S2 present, no murmurs.\nRespiratory: Clear to auscultation bilaterally, unlabored respirations.\nAbdomen: Soft, non-tender, non-distended with normal bowel sounds.\nExtremities: Warm and well-perfused, no peripheral edema.",
    assessment: "1. Chronic conditions stable on current medical regimen.\n2. Preventive screening and health maintenance reviewed.",
    plan: "1. Continue current maintenance medications.\n2. Routine safety and disease-specific monitoring labs ordered.\n3. Return to clinic in 3 to 6 months, or sooner if symptoms worsen."
  },
  {
    id: "tmpl-2",
    name: "Hypertension & Type 2 Diabetes Management",
    subjective: "Patient presents for chronic disease management of Hypertension and Type 2 Diabetes Mellitus. Reports blood glucose levels checked via home glucometer with average fasting readings within target range. Denies hypoglycemic episodes (shakiness, diaphoresis, confusion). Denies chest pain, orthopnea, or lower extremity swelling.",
    objective: "Constitutional: Alert, oriented, pleasant.\nCardiovascular: Regular rate, rhythm. No S3/S4 or murmurs. Peripheral pulses 2+ symmetric.\nExtremities: Bilateral lower extremities examined. No pitting edema. Monofilament exam confirms intact protective sensation on bilateral plantar surfaces.",
    assessment: "1. Type 2 Diabetes Mellitus (E11.9) - Fairly controlled, glycemic goals discussed.\n2. Essential Hypertension (I10) - Blood pressure reviewed.",
    plan: "1. Continue antidiabetic therapy and antihypertensive regimen as prescribed.\n2. Ordered: HbA1c, Comprehensive Metabolic Panel, Urine microalbumin/creatinine ratio.\n3. Reinforce DASH dietary guidelines, salt restriction, and daily foot self-inspection.\n4. Follow-up in 3 months with updated lab results."
  },
  {
    id: "tmpl-3",
    name: "Acute Upper Respiratory Infection (URI)",
    subjective: "Patient presents with a 4-day history of nasal congestion, rhinorrhea, mild sore throat, and low-grade subjective fevers. Denies severe shortness of breath, wheezing, ear pain, or facial pressure. No known sick contacts.",
    objective: "Vitals: Afebrile or low-grade. SpO2 > 97% on room air.\nHEENT: Conjunctivae clear. Nasal mucosa mildly erythematous with clear mucoid discharge. Oropharynx: Mild posterior pharyngeal erythema without tonsillar exudates. Tympanic membranes clear.\nNeck: Supple, mild anterior cervical lymphadenopathy, non-tender.\nLungs: Clear to auscultation bilaterally, good air movement throughout, no wheezing or crackles.",
    assessment: "1. Acute viral upper respiratory infection (J06.9).\n2. No clinical evidence of bacterial sinusitis, pharyngitis, or lower respiratory tract involvement at this time.",
    plan: "1. Supportive symptomatic care: Rest, hydration, saline nasal irrigation.\n2. OTC Acetaminophen or Ibuprofen as needed for fever and discomfort.\n3. Avoid unindicated antibiotic use.\n4. Red flag precautions discussed: Seek prompt evaluation for high fever >102F, worsening dyspnea, or symptoms persisting >10 days."
  },
  {
    id: "tmpl-4",
    name: "Annual Wellness & Preventive Exam",
    subjective: "Patient presents for annual comprehensive preventive health exam. No acute concerns reported today. Reviews lifestyle habits including diet, physical activity, sleep hygiene, and stress levels. Age-appropriate cancer screenings and vaccination history reviewed.",
    objective: "Vitals: Stable.\nGeneral: Alert, oriented x4, well-nourished.\nSkin: Full skin survey negative for suspicious nevi or dysplastic lesions.\nCardiovascular/Pulmonary/Abdomen: Within normal limits.\nNeurologic: Cranial nerves II-XII grossly intact. Gait steady.",
    assessment: "1. Annual wellness examination, adult.\n2. Health maintenance and primary prevention counseling completed.",
    plan: "1. Routine screening laboratory orders submitted.\n2. Administered indicated seasonal vaccinations.\n3. Return in 12 months for routine annual checkup."
  }
];

export const drugInteractionsDatabase = [
  {
    drugA: "Lisinopril",
    drugB: "Spironolactone",
    severity: "High",
    warning: "Co-administration of ACE inhibitors (Lisinopril) and Potassium-sparing diuretics (Spironolactone) significantly increases the risk of severe hyperkalemia and renal impairment.",
    action: "Monitor serum potassium and renal function closely or consider alternative diuretic."
  },
  {
    drugA: "Aspirin",
    drugB: "Warfarin",
    severity: "Critical",
    warning: "Concomitant use of antiplatelet and anticoagulant agents substantially increases the risk of major gastrointestinal and systemic hemorrhage.",
    action: "Carefully assess indication, target INR, and use gastroprotective therapy if dual therapy is required."
  },
  {
    drugA: "Metformin",
    drugB: "Iodinated Contrast Media",
    severity: "Moderate",
    warning: "Intravascular administration of iodinated contrast media in patients taking Metformin may lead to acute renal failure and subsequent lactic acidosis.",
    action: "Temporarily withhold Metformin 48 hours prior to procedure and verify normal renal function before resuming."
  },
  {
    drugA: "Simvastatin",
    drugB: "Amiodarone",
    severity: "High",
    warning: "Concomitant use increases the risk of myopathy and rhabdomyolysis due to CYP3A4 inhibition.",
    action: "Do not exceed Simvastatin 20mg daily or switch to Rosuvastatin or Pravastatin."
  },
  {
    drugA: "Allopurinol",
    drugB: "Azathioprine",
    severity: "Critical",
    warning: "Allopurinol inhibits xanthine oxidase, leading to severe accumulation of 6-mercaptopurine and life-threatening myelosuppression.",
    action: "Reduce Azathioprine dose to 25-33% of normal dose and monitor complete blood count weekly."
  }
];
