import { FiCode, FiExternalLink } from 'react-icons/fi';

type ProjectCardProps = {
  imageSrc?: string;
  title: string;
  description: string;
  tags?: string[];
  link?: string;
};

const ProjectCard = ({ imageSrc, title, description, tags = [], link }: ProjectCardProps) => {
  return (
    <div className="project_card group">
      {/* Image or placeholder */}
      <div className="h-32 w-full rounded-lg overflow-hidden mb-3 flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 group-hover:bg-indigo-500 transition-colors duration-300">
        {imageSrc ? (
          <img className="h-full w-full object-cover" src={imageSrc} alt={title + " preview"} />
        ) : (
          <FiCode size={40} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
        )}
      </div>

      {/* Title */}
      <h2 className="text-base font-semibold text-indigo-500 group-hover:text-white transition-colors duration-300 leading-snug mb-1">
        {title}
      </h2>

      {/* Description */}
      <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-indigo-100 transition-colors duration-300 leading-relaxed flex-1 overflow-hidden line-clamp-3">
        {description}
      </p>

      {/* Footer: tags + link */}
      <div className="mt-3 flex flex-col gap-2">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium
                  bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300
                  group-hover:bg-white/20 group-hover:text-white
                  transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-500 group-hover:text-white transition-colors duration-300"
          >
            View Project <FiExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
