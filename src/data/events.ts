export interface EventItem {
  id: string;
  title: string;
  fest: "EMINENCE" | "EMPRESARIO" | "ENGENIUS" | "EIC" | "SUMMIT";
  date: string;
  time: string;
  venue: string;
  mode: "Offline (Campus)" | "Hybrid" | "Online";
  banner: string;
  description: string;
  status: "Upcoming" | "Active Registration" | "Completed";
  prizePool?: string;
  registrationOpen: boolean;
  coordinatorName: string;
  coordinatorContact: string;
}

export const eventsList: EventItem[] = [
  {
    id: "evt-eic-2026",
    title: "Entrepreneurship & Innovation Challenge (EIC 2026)",
    fest: "EIC",
    date: "March 15-17, 2026",
    time: "10:00 AM IST",
    venue: "Main Auditorium, NIT Silchar",
    mode: "Hybrid",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
    description: "Flagship multi-track innovation challenge featuring Case Competitions, The Deal Room, Boardroom Trivia, and Startup Expo.",
    status: "Active Registration",
    prizePool: "₹2,50,000",
    registrationOpen: true,
    coordinatorName: "Event Management Head & POC",
    coordinatorContact: "eic.ecell@nits.ac.in",
  },
  {
    id: "evt-empresario-2026",
    title: "EMPRESARIO: The National B-Plan Pitching Conclave",
    fest: "EMPRESARIO",
    date: "April 04-05, 2026",
    time: "11:00 AM IST",
    venue: "Senate Hall & Virtual Meeting",
    mode: "Hybrid",
    banner: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
    description: "Pan-India pitch competition bringing seed-stage angel syndicates and prominent Northeast venture mentors face-to-face with campus founders.",
    status: "Upcoming",
    prizePool: "₹5,00,000 + Incubation Grant",
    registrationOpen: true,
    coordinatorName: "Technical Head & Event Lead",
    coordinatorContact: "empresario@nits.ac.in",
  },
  {
    id: "evt-eminence-2025",
    title: "EMINENCE: Annual Entrepreneurship Summit",
    fest: "EMINENCE",
    date: "November 22-24, 2025",
    time: "09:30 AM IST",
    venue: "New Gallery Complex, NIT Silchar",
    mode: "Offline (Campus)",
    banner: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200",
    description: "North-East India's premier annual entrepreneurial gathering uniting startup luminaries, industry CXOs, and student innovators.",
    status: "Completed",
    prizePool: "₹3,00,000",
    registrationOpen: false,
    coordinatorName: "Vice President & General Secretary",
    coordinatorContact: "eminence@nits.ac.in",
  },
  {
    id: "evt-engenius-2025",
    title: "ENGENIUS: 36-Hour Hardware & DeepTech Hackathon",
    fest: "ENGENIUS",
    date: "October 10-12, 2025",
    time: "06:00 PM IST",
    venue: "Start-Up Centre, NIT Silchar",
    mode: "Offline (Campus)",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    description: "High-intensity hackathon building sustainable hardware, IoT agri-tech devices, and embedded edge solutions.",
    status: "Completed",
    prizePool: "₹1,50,000",
    registrationOpen: false,
    coordinatorName: "Technical Head",
    coordinatorContact: "engenius@nits.ac.in",
  },
];

export const authorizedRoles = [
  "President",
  "Vice President",
  "General Secretary",
  "Executive Head",
  "Event Management Head",
  "Technical Head",
  "Respective Event Head",
  "POC",
] as const;

export type AuthorizedRole = (typeof authorizedRoles)[number];
