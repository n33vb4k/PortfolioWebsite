import ProjectCard from "../components/ProjectCard";
import AnimatedContent from "../components/ui/AnimatedContent";
import FadeContent from "../components/ui/FadeContent";

const featuredProject = {
  title: "LazyTrader",
  description:
    "End-to-end trading platform that copies live signals from Telegram channels across forex, crypto, and Polymarket, then layers on NLP-powered sentiment analysis, strategy back-testing & optimisation, real-time risk management, and ML scoring, all wired together with a React + TypeScript dashboard, Supabase auth & storage, a Python/Celery worker pipeline, Redis pub-sub, and MetaAPI execution. Currently a personal build with plans to expand into a SaaS product.",
  tags: ["React", "TypeScript", "Python", "Supabase", "PostgreSQL", "Redis", "Celery", "Telethon", "MetaAPI", "NLP"],
  link: "private",
};

const projectData = [
  {
    title: "Navaic",
    description:
      "AI-powered automation platform for small businesses. Connects CRMs, email, and third-party tools into intelligent n8n workflows with a custom Notion backend. Handles lead capture, nurturing sequences, and client onboarding, eliminating manual ops work for non-technical founders.",
    tags: ["n8n", "Notion", "Supabase", "AI Agents", "TypeScript"],
    link: "private",
  },
  {
    title: "Jarvis",
    description:
      "Self-hosted AI automation hub running as a Docker Compose stack. Orchestrates local LLMs via Ollama, n8n workflow pipelines, and PowerShell system scripts, a personal productivity layer with a ClawdBot agent integration and more on the roadmap.",
    tags: ["n8n", "Ollama", "Docker", "PowerShell"],
    link: "https://github.com/n33vb4k/Jarvis",
  },
  {
    title: "Telegram → MT5 Signals Copier",
    description:
      "Real-time trade signal copier: monitors Telegram channels via the Telethon MTProto API, parses signals with configurable keyword filters, and fires matching long/short positions on MetaTrader 5 with automatic lot-size calculation and push notifications.",
    tags: ["Python", "MetaTrader 5", "Telethon", "APIs"],
    link: "https://github.com/n33vb4k/TelegramSignalsBot",
  },
  {
    title: "MCP Chat",
    description:
      "Terminal chat client for the Anthropic API with @ mention document retrieval, tab-completable slash-command prompts, and plug-in tool support via the Model Context Protocol, essentially a lightweight local Claude interface.",
    tags: ["Python", "Anthropic API", "MCP", "CLI"],
    link: "https://github.com/n33vb4k/GitHub-MCP",
  },
  {
    title: "Console Pac-Man",
    description:
      "Fully playable Pac-Man in the Windows console, built from scratch in C#. Uses a multithreaded game loop to decouple rendering from input, and implements A* pathfinding for ghost AI, running at a stable 30 fps in a terminal window.",
    tags: ["C#", "Multithreading", "A* Pathfinding", ".NET"],
    link: "https://github.com/n33vb4k/ConsolePacManGame",
  },
  {
    title: "Email Spam Classifier",
    description:
      "Two-layer neural network implemented from scratch with NumPy (no ML frameworks). Classifies emails as spam or ham using 54-dimensional bag-of-words feature vectors, trained on 1,000 labelled samples with hand-rolled back-propagation and gradient descent.",
    tags: ["Python", "Neural Networks", "NLP", "NumPy"],
    link: "https://github.com/n33vb4k/NN-EmailSpamClassification",
  },
  {
    title: "Portfolio Website",
    description:
      "This site, a single-page React + TypeScript app with Tailwind CSS, ref-based smooth-scroll nav, dark/light theme, and animated UI components: WebGL aurora background, spotlight cards, per-word blur-in text, and magnetic hover effects.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://github.com/n33vb4k/PortfolioWebsite",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-8 font-sans">
      <FadeContent blur duration={0.8} threshold={0.2}>
        <h2 className="section-heading">My Projects</h2>
      </FadeContent>

      {/* Featured project - full-width card */}
      <AnimatedContent distance={60} duration={0.7} delay={0.1} className="w-full max-w-5xl mb-6">
        <ProjectCard
          title={featuredProject.title}
          description={featuredProject.description}
          tags={featuredProject.tags}
          link={featuredProject.link}
          featured
        />
      </AnimatedContent>

      {/* Remaining projects grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {projectData.map((project, index) => (
          <AnimatedContent
            key={index}
            distance={50}
            duration={0.6}
            delay={0.1 + index * 0.1}
            threshold={0.05}
            className="h-full"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
            />
          </AnimatedContent>
        ))}
      </div>
    </div>
  );
};

export default Projects;
