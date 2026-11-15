import type { PreviewKind } from '../components/Previews'

export type Project = {
  title: string
  preview: PreviewKind
  what: string
  description: string
  stack: string[]
  source?: string
  sourceLabel?: string
}

export const projects: Project[] = [
  {
    title: 'Jarvis',
    preview: 'llm',
    what: 'Self-hosted AI assistant',
    description:
      'Local language models through Ollama, wired to n8n pipelines and system scripts in one Docker Compose stack. A personal assistant that runs without sending data anywhere.',
    stack: ['Ollama', 'n8n', 'Docker', 'PowerShell'],
    source: 'https://github.com/n33vb4k/Jarvis',
  },
  {
    title: 'MCP Chat',
    preview: 'terminal',
    what: 'Terminal client for Claude',
    description:
      'A command-line client for the Anthropic API. Pull files into context with @ mentions, tab-complete slash commands, and plug in tools through the Model Context Protocol.',
    stack: ['Python', 'Anthropic API', 'MCP'],
    source: 'https://github.com/n33vb4k/GitHub-MCP',
  },
  {
    title: 'LazyTrader',
    preview: 'trade',
    what: 'AI trading platform, in development',
    description:
      'Reads trade signals from Telegram channels across forex, crypto and Polymarket. An NLP layer extracts each order, sentiment analysis over the news filters out contradictions, and an ML model scores it before risk rules size it.',
    stack: ['Python', 'NLP', 'Celery', 'Redis', 'Supabase', 'React'],
    source: 'https://github.com/n33vb4k/TelegramSignalsBot',
    sourceLabel: 'View the open-source signal copier it grew from',
  },
  {
    title: 'Spam classifier',
    preview: 'classifier',
    what: 'Neural network without a framework',
    description:
      'A feed-forward network in plain NumPy with hand-written backpropagation. It reaches 94.8% accuracy on 54 word-frequency features, 2.3 points above Naive Bayes.',
    stack: ['Python', 'NumPy'],
    source: 'https://github.com/n33vb4k/NN-EmailSpamClassification',
  },
  {
    title: 'Navaic',
    preview: 'workflow',
    what: 'Small AI automation agency, side venture',
    description: 'n8n workflows and AI agents that handle lead capture, follow-ups and onboarding for small businesses.',
    stack: ['n8n', 'AI agents', 'Notion'],
    source: 'https://www.navaic.com',
    sourceLabel: 'Visit navaic.com',
  },
  {
    title: 'Console Pac-Man',
    preview: 'maze',
    what: 'Game engine in a terminal',
    description:
      'Pac-Man from scratch in C# for the Windows console, with a multithreaded game loop and ghosts that hunt using A* search, at a steady 30 frames per second.',
    stack: ['C#', '.NET'],
    source: 'https://github.com/n33vb4k/ConsolePacManGame',
  },
  {
    title: 'This website',
    preview: 'type',
    what: 'Designed and built from scratch',
    description: 'Every demo on the page is drawn live in the browser, and one variable typeface carries the motion.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    source: 'https://github.com/n33vb4k/PortfolioWebsite',
  },
]

export const toolkit = [
  { name: 'AI and ML', items: ['LangChain', 'LangGraph', 'Google ADK', 'PyTorch', 'MCP'] },
  { name: 'Languages', items: ['Python', 'Rust', 'TypeScript', 'C++', 'Java', 'SQL'] },
  { name: 'Backend and product', items: ['FastAPI', 'React', 'PostgreSQL', 'Kafka', 'Supabase'] },
  { name: 'Infrastructure', items: ['Docker', 'Kubernetes', 'KServe', 'Azure', 'GitLab CI'] },
]

export const education = {
  degree: 'BSc Computer Science and Artificial Intelligence',
  school: 'University of Bath, 2023 to 2027',
  detail: 'On track for a First, with 76.3% and 77.5% in years one and two.',
  school2: 'A levels: Maths A*, Computer Science A*, Physics A, AS Further Maths A',
}

export const cv = '/Neev-Bakshi-CV.pdf'

export type Credential = { title: string; issuer: string; year: string; link?: string }

export const credentials: Credential[] = [
  {
    title: 'Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    year: '2025',
    link: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
  },
  {
    title: 'Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    year: '2025',
    link: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
  },
  { title: 'Introduction to Model Context Protocol', issuer: 'Anthropic', year: '2024', link: 'https://lnkd.in/ejsCeJuS' },
  { title: 'Spring Framework for Java Development', issuer: 'SkillUp EdTech', year: '2024' },
  { title: 'Python (Basic)', issuer: 'HackerRank', year: '2024' },
  { title: 'Problem Solving (Basic)', issuer: 'HackerRank', year: '2024' },
  { title: 'Software Engineering Virtual Experience', issuer: 'JPMorgan Chase, via Forage', year: '2023' },
]

export const email = 'bakshi.neev@gmail.com'

export const socials = [
  { label: 'GitHub', handle: 'n33vb4k', href: 'https://github.com/n33vb4k' },
  { label: 'LinkedIn', handle: 'neev-bakshi', href: 'https://linkedin.com/in/neev-bakshi' },
]
