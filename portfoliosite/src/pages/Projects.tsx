import ProjectCard from "../components/ProjectCard";

const projectData = [
  {
    imageSrc: "/images/teletradingcopier.png",
    title: "Telegram to MT5 Trading Signals Copier",
    description:
      "This project used the MetaTrader 5 API, and Telethon API to read messages from selected channels, and after user configuration of keywords, copy and exectute these trades on the MT5 platform, while notifying the user through a telegram message",
  },
  {
    imageSrc: "",
    title: "Project 2",
    description: "Description for project 2",
  },
  {
    imageSrc: "",
    title: "Project 3",
    description: "Description for project 3",
  },
  {
    imageSrc: "",
    title: "Project 4",
    description: "Description for project 4",
  },
  {
    imageSrc: "",
    title: "Project 5",
    description: "Description for project 5",
  },
  {
    imageSrc: "",
    title: "Project 6",
    description: "Description for project 6",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 pt-4">
      <div className="grid grid-cols-3 gap-5">
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            imageSrc={project.imageSrc}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
};

// const Projects = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 pt-4">
//       <div className="grid grid-cols-3 gap-5">
//         <div className="project_card group">
//           <img className="h-1/3 rounded-2xl p-2" src={'/images/teletradingcopier.png'} alt={'Telegram Trading Signals Copier'} />
//           <h2 className="text-center text-lg text-indigo-500 font-bold group-hover:text-white transition-all duration-300 ease-linear bg-transparent p-2">
//             {'Telegram to MT5 Trading Signals Copier'}</h2>
//           <p className="text-center text-sm text-black dark:text-white group-hover:bg-gray-800 group-hover:text-white rounded-lg p-2 transition-all duration-300 ease-linear">{
//           'This project used the MetaTrader 5 API, and Telethon API to read messages from selected channels, and after user configuration of keywords, copy and exectute these trades on the MT5 platform, while notifying the user through a telegram message'}
//           </p>
//         </div>
//         <div className="project_card">2</div>
//         <div className="project_card">3</div>
//         <div className="project_card">4</div>
//         <div className="project_card">5</div>
//         <div className="project_card">6</div>
//       </div>
//     </div>
//   );
// };

export default Projects;
