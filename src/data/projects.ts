export type ProjectCategory = "FYP" | "PhD Project" | "Professor Innovation" | "Student Startup";

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  department: string;
  leadName: string;
  leadRole: string;
  leadEmail?: string;
  summary: string;
  commercialPotential: string;
  stage: "Ideation" | "Prototype Ready" | "Field Validation" | "Ready for Incubation";
  tags: string[];
  hasCallForIntern: boolean;
  internshipRoles?: string[];
  hasCallForFunding: boolean;
  fundingStage?: "Pre-Seed" | "Seed" | "Grant / Prototype Funding";
  targetFunding?: string;
}

export const initialProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "AgroSense IoT: Hyperlocal Precision Soil & Crop Health Monitor",
    category: "FYP",
    department: "Electronics & Communication Engineering",
    leadName: "Ananya Sharma & Team",
    leadRole: "Final Year B.Tech",
    leadEmail: "ananya.ece@nits.ac.in",
    summary:
      "A solar-powered IoT node cluster transmitting real-time NPK, moisture, and pH telemetry to a low-latency edge gateway, cutting crop wastage by 32%.",
    commercialPotential:
      "Targeting tea estates across Assam and Northeast agrarian cooperatives with a scalable hardware-as-a-service (HaaS) subscription model.",
    stage: "Prototype Ready",
    tags: ["AgriTech", "IoT", "Embedded Systems", "Hardware"],
    hasCallForIntern: true,
    internshipRoles: ["Firmware Developer (ESP32/FreeRTOS)", "Flutter Mobile App Intern"],
    hasCallForFunding: true,
    fundingStage: "Grant / Prototype Funding",
    targetFunding: "₹3,50,000",
  },
  {
    id: "proj-2",
    title: "EcoResin: Biodegradable Cassava-Starch Bio-Composite Packaging",
    category: "PhD Project",
    department: "Chemistry & Chemical Engineering",
    leadName: "Dr. Debojit Barman (Research Scholar)",
    leadRole: "Doctoral Researcher",
    leadEmail: "debojit.phd@chem.nits.ac.in",
    summary:
      "High tensile-strength, 100% home-compostable film synthesized from agricultural biomass and non-edible plant starch that degrades completely in 60 days.",
    commercialPotential:
      "Direct replacement for single-use e-commerce mailers and food-grade packaging amid stringent plastic ban enforcements.",
    stage: "Field Validation",
    tags: ["Cleantech", "Materials Science", "Biotech", "Sustainability"],
    hasCallForIntern: true,
    internshipRoles: ["Polymer Testing Lab Assistant", "B2B Sales & Pilot Outreach"],
    hasCallForFunding: true,
    fundingStage: "Seed",
    targetFunding: "₹12,00,000",
  },
  {
    id: "proj-3",
    title: "VoltGrid AI: Smart Decentralized Microgrid Energy Router",
    category: "Professor Innovation",
    department: "Electrical Engineering",
    leadName: "Prof. S. Chakrabarti & Lab",
    leadRole: "Principal Investigator & Professor",
    leadEmail: "s.chakrabarti@ee.nits.ac.in",
    summary:
      "Autonomous peer-to-peer microgrid controller leveraging predictive reinforcement learning to route solar and micro-hydro power dynamically during grid instability.",
    commercialPotential:
      "Enterprise software licensing for rural microgrids, industrial campuses, and commercial solar parks across South Asia.",
    stage: "Ready for Incubation",
    tags: ["Clean Energy", "AI/ML", "Microgrids", "Industrial Tech"],
    hasCallForIntern: false,
    hasCallForFunding: true,
    fundingStage: "Pre-Seed",
    targetFunding: "₹25,00,000",
  },
  {
    id: "proj-4",
    title: "NeuroScan: Edge-AI Thermal Diagnostics for Veterinary Health",
    category: "FYP",
    department: "Computer Science & Engineering",
    leadName: "Rohit Singhania",
    leadRole: "Final Year B.Tech",
    leadEmail: "rohit.cs@nits.ac.in",
    summary:
      "Ultra-compact handheld FLIR thermal camera attachment with on-device computer vision to diagnose early bovine mastitis and joint inflammations before clinical symptoms arise.",
    commercialPotential:
      "Dairy cooperatives and veterinary clinics can prevent massive revenue losses through timely predictive interventions.",
    stage: "Prototype Ready",
    tags: ["HealthTech", "Computer Vision", "Edge AI", "AgriDairy"],
    hasCallForIntern: true,
    internshipRoles: ["Computer Vision Intern (PyTorch/ONNX)", "React Native Developer"],
    hasCallForFunding: false,
  },
];
