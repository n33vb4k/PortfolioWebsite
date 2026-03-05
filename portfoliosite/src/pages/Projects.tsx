import ProjectCard from "../components/ProjectCard";

const projectData = [
  {
    imageSrc: "/images/teletradingcopier.png",
    title: "Telegram to MT5 Trading Signals Copier",
    description:
      "Reads trading signals from Telegram channels via the Telethon API and automatically executes them on MetaTrader 5, with configurable keywords and user notifications.",
    tags: ["Python", "MetaTrader 5", "Telethon", "APIs"],
    link: "https://github.com/n33vb4k/TelegramSignalsBot",
  },
  {
    imageSrc: "",
    title: "Portfolio Website",
    description:
      "This site — a single-page portfolio built with React, TypeScript, and Tailwind CSS, featuring smooth-scroll navigation and a dark mode toggle.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://github.com/n33vb4k/PortfolioWebsite",
  },
  {
    imageSrc: "",
    title: "Algorithmic Strategy Backtester",
    description:
      "A Python framework for backtesting custom trading strategies on historical OHLCV data, with performance metrics and matplotlib equity-curve charts.",
    tags: ["Python", "pandas", "matplotlib", "Finance"],
    link: "https://github.com/n33vb4k/AlgorithmicStrategyBacktester",
  },
  {
    imageSrc: "",
    title: "Market Sentiment Analyser",
    description:
      "Aggregates tweets and Reddit posts about a given ticker, runs NLP sentiment scoring, and produces a daily bull/bear sentiment dashboard.",
    tags: ["Python", "NLP", "Twitter API", "VADER"],
    link: "https://github.com/n33vb4k/MarketSentimentAnalyser",
  },
  {
    imageSrc: "",
    title: "Expense Tracker",
    description:
      "A React web app for tracking personal expenses by category, with Chart.js visualisations and LocalStorage persistence — no backend required.",
    tags: ["React", "Chart.js", "LocalStorage", "CSS"],
    link: "https://github.com/n33vb4k/ExpenseTracker",
  },
  {
    imageSrc: "",
    title: "Weather CLI",
    description:
      "A command-line weather tool powered by the OpenWeatherMap API, with rich terminal output including forecasts, wind, and humidity data.",
    tags: ["Python", "OpenWeatherMap", "Rich", "CLI"],
    link: "https://github.com/n33vb4k/WeatherCLI",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-16 px-8 font-sans">
      <h2 className="section-heading">My Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            imageSrc={project.imageSrc}
            title={project.title}
            description={project.description}
            tags={project.tags}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
