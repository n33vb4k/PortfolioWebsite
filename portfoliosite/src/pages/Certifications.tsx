import AnimatedContent from "../components/ui/AnimatedContent";
import FadeContent from "../components/ui/FadeContent";
import SpotlightCard from "../components/ui/SpotlightCard";
import { FiExternalLink } from "react-icons/fi";

type Cert = {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
};

const microsoftCerts: Cert[] = [
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "June 2025",
    badgeText: "AI-900",
    badgeBg: "#0078d4",
    badgeColor: "white",
    link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/",
  },
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "June 2025",
    badgeText: "AZ-900",
    badgeBg: "#0078d4",
    badgeColor: "white",
    link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
  },
];

const otherCerts: Cert[] = [
  {
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "Nov 2024",
    badgeText: "MCP",
    badgeBg: "#cc785c",
    badgeColor: "white",
    link: "https://lnkd.in/ejsCeJuS",
  },
  {
    title: "Spring Framework for Java Development",
    issuer: "SkillUp EdTech",
    date: "Aug 2024",
    badgeText: "Java",
    badgeBg: "#e76f00",
    badgeColor: "white",
  },
  {
    title: "Software Engineering Virtual Experience",
    issuer: "JPMorgan Chase (Forage)",
    date: "2023",
    badgeText: "JPM",
    badgeBg: "#002d72",
    badgeColor: "white",
  },
];

const hackerrankCerts: Cert[] = [
  // Add your HackerRank cert details here: title, credentialId, and link from hackerrank.com/certificates/...
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "2024",
    badgeText: "HR",
    badgeBg: "#00ea64",
    badgeColor: "#1a1a1a",
  },
  {
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "2024",
    badgeText: "HR",
    badgeBg: "#00ea64",
    badgeColor: "#1a1a1a",
  },
];

const CertCard = ({ cert }: { cert: Cert }) => (
  <SpotlightCard className="p-5 rounded-xl h-full" spotlightColor="rgba(79, 70, 229, 0.12)">
    <div className="flex items-start gap-4 h-full">
      <div
        className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center font-bold text-xs tracking-wider"
        style={{ backgroundColor: cert.badgeBg, color: cert.badgeColor }}
      >
        {cert.badgeText}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug">{cert.title}</h3>
        <p className="text-xs text-indigo-400 mt-1">{cert.issuer}</p>
        <p className="text-xs text-gray-500 mt-0.5">{cert.date}</p>
        {cert.credentialId && (
          <p className="text-xs text-gray-600 mt-0.5 truncate font-mono">
            {cert.credentialId}
          </p>
        )}
        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View credential <FiExternalLink size={11} />
          </a>
        )}
      </div>
    </div>
  </SpotlightCard>
);

const CertSection = ({
  title,
  certs,
  delay,
}: {
  title: string;
  certs: Cert[];
  delay: number;
}) => (
  <div className="w-full max-w-5xl mb-10">
    <AnimatedContent distance={40} duration={0.6} delay={delay}>
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
        {title}
      </h3>
    </AnimatedContent>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {certs.map((cert, i) => (
        <AnimatedContent
          key={i}
          distance={40}
          duration={0.5}
          delay={delay + 0.1 + i * 0.08}
          threshold={0.05}
          className="h-full"
        >
          <CertCard cert={cert} />
        </AnimatedContent>
      ))}
    </div>
  </div>
);

const Certifications = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-8 font-sans">
      <FadeContent blur duration={0.8} threshold={0.2}>
        <h2 className="section-heading">Certifications</h2>
      </FadeContent>

      <CertSection title="Microsoft Azure" certs={microsoftCerts} delay={0.1} />
      <CertSection title="Other" certs={otherCerts} delay={0.35} />
      <CertSection title="HackerRank" certs={hackerrankCerts} delay={0.6} />
    </div>
  );
};

export default Certifications;
