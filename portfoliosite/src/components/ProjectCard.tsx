import { FiExternalLink, FiLock } from 'react-icons/fi';
import SpotlightCard from './ui/SpotlightCard';

type ProjectCardProps = {
  title: string;
  description: string;
  tags?: string[];
  link?: string;
  featured?: boolean;
};

const isUrl = (str: string) => str.startsWith('http');

const ProjectCard = ({ title, description, tags = [], link, featured }: ProjectCardProps) => (
  <SpotlightCard
    className={`flex flex-col gap-3 ${featured ? 'p-8' : 'p-6'} h-full`}
    spotlightColor="rgba(99, 102, 241, 0.2)"
  >
    {featured && (
      <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white mb-1">
        ★ Featured Project
      </span>
    )}
    <h3 className={`font-bold leading-snug text-gray-900 dark:text-gray-100 ${featured ? 'text-xl' : 'text-lg'}`}>
      {title}
    </h3>
    <p className={`leading-relaxed text-gray-600 dark:text-neutral-400 flex-1 ${featured ? 'text-base' : 'text-sm'}`}>
      {description}
    </p>
    <div className="flex flex-wrap gap-1.5">
      {tags.map(tag => (
        <span
          key={tag}
          className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
        >
          {tag}
        </span>
      ))}
    </div>
    {link && isUrl(link) && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="flex items-center gap-1.5 text-indigo-500 hover:text-indigo-400 text-sm font-medium transition-colors mt-1"
      >
        View on GitHub <FiExternalLink size={14} />
      </a>
    )}
    {link && !isUrl(link) && (
      <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
        <FiLock size={14} /> Private repo
      </span>
    )}
  </SpotlightCard>
);

export default ProjectCard;
