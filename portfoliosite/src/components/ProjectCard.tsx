import { FiExternalLink } from 'react-icons/fi';
import SpotlightCard from './ui/SpotlightCard';

type ProjectCardProps = {
  imageSrc?: string;
  title: string;
  description: string;
  tags?: string[];
  link?: string;
};

const ProjectCard = ({ title, description, tags = [], link }: ProjectCardProps) => (
  <SpotlightCard
    className="flex flex-col gap-3 p-6 h-full"
    spotlightColor="rgba(99, 102, 241, 0.2)"
  >
    <h3 className="font-bold text-lg leading-snug text-gray-900 dark:text-gray-100">
      {title}
    </h3>
    <p className="text-sm leading-relaxed text-gray-600 dark:text-neutral-400 flex-1">
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
    {link && (
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
  </SpotlightCard>
);

export default ProjectCard;
