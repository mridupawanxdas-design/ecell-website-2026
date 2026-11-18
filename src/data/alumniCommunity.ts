export interface AlumniCommunityMember {
  id: string;
  name: string;
  passoutYear: string;
  branch: string;
  formerRoleAtEcell: string;
  currentCompany: string;
  currentRole: string;
  linkedinUrl: string;
  domainsOfExpertise: string[];
  openToMentor: boolean;
  openToHire: boolean;
  messageForNewcomers: string;
  avatarUrl?: string;
}

export const initialAlumniCommunityMembers: AlumniCommunityMember[] = [
  {
    id: "alum-1",
    name: "Aditya Singh",
    passoutYear: "2023",
    branch: "Computer Science & Engineering",
    formerRoleAtEcell: "Executive Head & Tech Lead",
    currentCompany: "Ziostech Solutions Pvt. Ltd.",
    currentRole: "Founder & CEO",
    linkedinUrl: "https://www.linkedin.com/in/aditya-singh-9966311a0/",
    domainsOfExpertise: ["Product Strategy", "B2B SaaS", "Tech Architecture", "Bootstrapping"],
    openToMentor: true,
    openToHire: true,
    messageForNewcomers:
      "Don't wait for the perfect idea or venture funding. Build small, talk to 10 customers every single week, and iterate persistently.",
    avatarUrl:
      "https://res.cloudinary.com/dgbovmxah/image/upload/v1772720282/1727878994804_y6blyc.jpg",
  },
  {
    id: "alum-2",
    name: "Subhasish Saha",
    passoutYear: "2022",
    branch: "Electrical Engineering",
    formerRoleAtEcell: "President (2021-22)",
    currentCompany: "Venture Catalyst Partners",
    currentRole: "Associate & Growth Strategist",
    linkedinUrl: "https://www.linkedin.com/in/",
    domainsOfExpertise: ["Venture Capital", "Fundraising Pitch", "Market Sizing", "Legal & IP"],
    openToMentor: true,
    openToHire: false,
    messageForNewcomers:
      "E-Cell gives you the rarest superpower in engineering: empathy for distribution and business fundamentals. Cherish the grit you develop here.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "alum-3",
    name: "Priyanka Kashyap",
    passoutYear: "2024",
    branch: "Electronics & Communication Engineering",
    formerRoleAtEcell: "General Secretary (2023-24)",
    currentCompany: "Razorpay",
    currentRole: "Product Manager (Payments)",
    linkedinUrl: "https://www.linkedin.com/in/",
    domainsOfExpertise: ["Product Management", "FinTech", "User Experience", "Metrics & KPIs"],
    openToMentor: true,
    openToHire: true,
    messageForNewcomers:
      "Focus intensely on solving real pain points. Even a modest product with razor-sharp execution beats an over-engineered complex vision.",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  },
];
