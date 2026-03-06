import ProjectCard from "../components/ProjectCard";

const featuredProject = {
  title: "LazyTrader",
  description:
    "End-to-end trading platform that copies live signals from Telegram channels across forex, crypto, and Polymarket, then layers on NLP-powered sentiment analysis, strategy back-testing & optimisation, real-time risk management, and ML scoring — all wired together with a React + TypeScript dashboard, Supabase auth & storage, a Python/Celery worker pipeline, Redis pub-sub, and MetaAPI execution. Currently a personal build with plans to expand into a SaaS product.",
  tags: ["React", "TypeScript", "Python", "Supabase", "PostgreSQL", "Redis", "Celery", "Telethon", "MetaAPI", "NLP"],
  link: "private",
};

const projectData = [
  {
    title: "Jarvis",
    description:
      "Personal AI automation hub that orchestrates local LLMs, n8n workflow pipelines, and system-level scripts inside a single Docker Compose stack. Includes Ollama for model inference, PowerShell automation scripts, and ClawdBot — with more agent integrations on the roadmap.",
    tags: ["n8n", "Ollama", "Docker", "PowerShell"],
    link: "https://github.com/n33vb4k/Jarvis",
  },
  {
    title: "Telegram → MT5 Signals Copier",
    description:
      "Listens to multiple Telegram channels via the Telethon API in real time, parses incoming trade signals with configurable keyword filters, and automatically opens matching positions on MetaTrader 5 — complete with lot-size calculation and user-facing notifications.",
    tags: ["Python", "MetaTrader 5", "Telethon", "APIs"],
    link: "https://github.com/n33vb4k/TelegramSignalsBot",
  },
  {
    title: "Portfolio Website",
    description:
      "This site — a single-page React + TypeScript portfolio with Tailwind CSS, ref-based smooth-scroll navigation, dark/light theme toggle, and animated UI components including a WebGL aurora background and spotlight cards.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://github.com/n33vb4k/PortfolioWebsite",
  },
  {
    title: "MCP Chat",
    description:
      "Interactive CLI chat client powered by the Anthropic API that supports document retrieval via @ mentions, slash-command prompts with tab-completion, and extensible tool integrations through the Model Context Protocol architecture.",
    tags: ["Python", "Anthropic API", "MCP", "CLI"],
    link: "https://github.com/n33vb4k/GitHub-MCP",
  },
  {
    title: "Console Pac-Man",
    description:
      "A fully playable Pac-Man clone rendered in the Windows console, built from scratch in C#. Features multithreaded game-loop architecture for smooth rendering and input handling, plus A* pathfinding for ghost AI behaviour.",
    tags: ["C#", "Multithreading", "A* Pathfinding", ".NET"],
    link: "https://github.com/n33vb4k/ConsolePacManGame",
  },
  {
    title: "Email Spam Classifier",
    description:
      "Neural network built from scratch with NumPy that classifies emails as spam or ham using 54-dimensional keyword-feature vectors, trained and evaluated on a 1,000-row labelled dataset with custom back-propagation.",
    tags: ["Python", "Neural Networks", "NLP", "NumPy"],
    link: "https://github.com/n33vb4k/NN-EmailSpamClassification",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-16 px-8 font-sans">
      <h2 className="section-heading">My Projects</h2>

      {/* Featured project — full-width card */}
      <div className="w-full max-w-5xl mb-6">
        <ProjectCard
          title={featuredProject.title}
          description={featuredProject.description}
          tags={featuredProject.tags}
          link={featuredProject.link}
          featured
        />
      </div>

      {/* Remaining projects grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
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
