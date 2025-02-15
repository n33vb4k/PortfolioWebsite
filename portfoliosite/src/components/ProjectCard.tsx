type projectCardProps = {
  imageSrc: string;
  title: string;
  description: string;
};

const ProjectCard = ({ imageSrc, title, description }: projectCardProps) => {
  return (
    <div className="project_card group">
      <img className="h-1/3 rounded-2xl p-2" src={imageSrc} alt={title + " image"} />
      <h2
        className="text-center text-lg text-indigo-500 font-bold 
            group-hover:text-white transition-all duration-300 ease-linear 
            bg-transparent p-2"
      >
        {title}
      </h2>
      <p
        className="text-center text-sm 
        text-black group-hover:bg-white
        dark:text-white dark:group-hover:bg-gray-800 
        rounded-lg p-2 ransition-all duration-300 ease-linear"
      >
        {description}
      </p>
    </div>
  );
};

export default ProjectCard;