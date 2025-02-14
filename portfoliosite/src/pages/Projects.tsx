

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 pt-4">
      <div className="grid grid-cols-3 gap-5">
        <div className="project_card group">
          <img className="h-1/3 rounded-xl" src={'/images/teletradingcopier.png'} alt={'Telegram Trading Signals Copier'} />
          <h2 className="text-center text-lg text-indigo-500 font-bold group-hover:text-white transition-all duration-300 ease-linear bg-transparent">
            {'Telegram Trading Signals Copier'}</h2>
          <p>{
          'This project used the MetaTrader 5 API, and Telethon API to read messages from selected channels, and after user configuration of keywords, copy and exectute these trades on the MT5 platform, while notifying the user through a telegram message'}
          </p>
        </div>
        <div className="project_card">2</div>
        <div className="project_card">3</div>
        <div className="project_card">4</div>
        <div className="project_card">5</div>
        <div className="project_card">6</div>
      </div>
    </div>
  );
};

export default Projects;
