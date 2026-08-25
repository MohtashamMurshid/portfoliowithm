export type ArchiveProjectLanguage = {
  name: string;
  bytes: number;
};

export type ArchiveProjectFact = {
  value: string;
  label: string;
  note?: string;
};

export type ArchiveProjectFlowStep = {
  title: string;
  detail: string;
};

export type ArchiveProject = {
  slug: string;
  name: string;
  year: string;
  category: string;
  status: string;
  summary: string;
  introduction: string;
  notes: readonly string[];
  role: string;
  repositoryUrl?: string;
  repositoryLabel: string;
  facts: readonly ArchiveProjectFact[];
  flow: readonly ArchiveProjectFlowStep[];
  languages: readonly ArchiveProjectLanguage[];
};

export const archiveProjects: readonly ArchiveProject[] = [
  {
    slug: "checkmate",
    name: "Checkmate",
    year: "2025",
    category: "Fact-checking platform",
    status: "Hackathon build",
    summary:
      "A Malaysia-focused system for checking claims in TikToks, posts, articles, and uploaded media.",
    introduction:
      "Checkmate came out of ImagineHack 2025. Our team wanted to check the kind of content people actually pass around, instead of limiting fact-checking to a clean block of text.",
    notes: [
      "I led the three-person team and worked on the architecture, AI integration, frontend, and API design. Checkmate can pull content from TikTok, X, and the web, transcribe media, extract individual claims, and check those claims against sources.",
      "The result includes the evidence behind each check and a credibility record for the creator. We took second place at ImagineHack 2025, then reached the top 10 at AWS Malaysia's largest hackathon from a field of 1,700 participants.",
    ],
    role: "Team lead and full-stack developer",
    repositoryUrl: "https://github.com/MohtashamMurshid/checkmate",
    repositoryLabel: "Public GitHub repository",
    facts: [
      { value: "2nd", label: "ImagineHack 2025" },
      { value: "Top 10", label: "AWS Malaysia hackathon" },
      { value: "1,700", label: "AWS participants" },
    ],
    flow: [
      { title: "Bring content", detail: "Paste a social link, article, or media file." },
      { title: "Extract", detail: "Fetch the content and transcribe speech when needed." },
      { title: "Find claims", detail: "Separate checkable statements from the surrounding post." },
      { title: "Check sources", detail: "Search for evidence and compare it with each claim." },
      { title: "Read the record", detail: "Review the verdict, sources, and creator history." },
    ],
    languages: [
      { name: "TypeScript", bytes: 445262 },
      { name: "JavaScript", bytes: 18257 },
      { name: "Dart", bytes: 6949 },
      { name: "CSS", bytes: 6182 },
      { name: "Swift", bytes: 676 },
      { name: "Kotlin", bytes: 127 },
      { name: "Objective-C", bytes: 38 },
    ],
  },
  {
    slug: "agent-arena",
    name: "Agent Arena",
    year: "2026",
    category: "Agent game",
    status: "Open source",
    summary:
      "A deterministic tactics game where autonomous agents commit to blind move sequences and the server resolves the fight.",
    introduction:
      "Agent Arena gives coding agents a small competitive world with strict rules. Two agents each submit a hidden ten-move plan, then watch the same server resolve every turn.",
    notes: [
      "The move set is deliberately small: strike, heavy attack, guard, feint, recover, or wait. That makes the interesting part the plan, not a large command vocabulary.",
      "Matches can run for three rounds and finish with an immutable replay. A human console handles spectating, while agents join and play through an HTTP API. Elo tracks the results across matches.",
    ],
    role: "Independent build",
    repositoryUrl: "https://github.com/MohtashamMurshid/agent-arena",
    repositoryLabel: "Public GitHub repository",
    facts: [
      { value: "10", label: "Blind moves per plan" },
      { value: "6", label: "Available actions" },
      { value: "3", label: "Rounds at most" },
    ],
    flow: [
      { title: "Create match", detail: "The server opens an arena for two agents." },
      { title: "Commit plans", detail: "Both agents submit ten moves without seeing the other plan." },
      { title: "Resolve", detail: "The server applies the rules in a fixed order." },
      { title: "Replay", detail: "Every turn is stored as an immutable match record." },
      { title: "Rate", detail: "The result updates each agent's Elo." },
    ],
    languages: [
      { name: "TypeScript", bytes: 307575 },
      { name: "JavaScript", bytes: 60178 },
      { name: "CSS", bytes: 51511 },
      { name: "HTML", bytes: 21239 },
      { name: "Python", bytes: 5641 },
      { name: "PLpgSQL", bytes: 3405 },
      { name: "Dockerfile", bytes: 227 },
    ],
  },
  {
    slug: "shonen-math",
    name: "Shonen Math",
    year: "2026",
    category: "Research art",
    status: "Private project",
    summary:
      "Semi-serious LaTeX papers that treat anime powers as mathematical and scientific systems.",
    introduction:
      "Shonen Math is where I take anime abilities too seriously. Each paper starts with one power, gives it a compact technical model, and keeps the joke understandable in a sentence.",
    notes: [
      "The first volume models Domain Expansion as a bounded game, alchemy as constrained optimization, and shadow clones as parallel compute with delayed synchronization.",
      "The papers share one LaTeX style, notation file, and bibliography. TikZ diagrams carry the explanation, while a small Python check catches broken sources before pdflatex does.",
    ],
    role: "Writer and developer",
    repositoryLabel: "Private GitHub repository",
    facts: [
      { value: "3", label: "Finished papers" },
      { value: "3", label: "Anime systems modelled" },
      { value: "1", label: "Shared LaTeX style" },
    ],
    flow: [
      { title: "Pick a power", detail: "Start with an ability that has an interesting rule." },
      { title: "State the thesis", detail: "Reduce the idea to one technical claim." },
      { title: "Build the model", detail: "Define the variables, constraints, and diagrams." },
      { title: "Typeset", detail: "Write the paper in the shared LaTeX system." },
      { title: "Check", detail: "Run source checks and compile the final PDF." },
    ],
    languages: [
      { name: "TeX", bytes: 72901 },
      { name: "Python", bytes: 1975 },
      { name: "Makefile", bytes: 1544 },
    ],
  },
  {
    slug: "my-fairness-bench",
    name: "MY-FairnessBench",
    year: "2026",
    category: "LLM benchmark",
    status: "Research prototype",
    summary:
      "A command-line benchmark for testing model bias in a Malaysian cultural, linguistic, and legal context.",
    introduction:
      "Most fairness benchmarks flatten away the details that matter in Malaysia. MY-FairnessBench keeps ethnicity, socio-economic history, Manglish, and code-switching in the test instead.",
    notes: [
      "The CLI sends the same prompt through a set of international models and ILMU, Malaysia's first multimodal LLM. It then saves the responses to a timestamped Markdown report for comparison.",
      "This is still a research prototype. The useful part is the framing: local bias cannot be measured well with examples written for a different social and legal setting.",
    ],
    role: "Independent research build",
    repositoryLabel: "Private GitHub repository",
    facts: [
      { value: "5", label: "Model integrations listed" },
      { value: "MY", label: "Local evaluation context" },
      { value: ".md", label: "Timestamped reports" },
    ],
    flow: [
      { title: "Write a case", detail: "Frame a prompt around Malaysian context." },
      { title: "Run models", detail: "Send the same case through each configured provider." },
      { title: "Collect", detail: "Keep the raw responses together." },
      { title: "Compare", detail: "Look for differences in language and treatment." },
      { title: "Save", detail: "Write a dated Markdown report." },
    ],
    languages: [{ name: "TypeScript", bytes: 26805 }],
  },
  {
    slug: "factbench",
    name: "FactBench",
    year: "2025",
    category: "Factuality benchmark",
    status: "Open source",
    summary:
      "A CLI for measuring how consistently language models classify factual claims from the FEVER dataset.",
    introduction:
      "FactBench turns factuality testing into a repeatable run instead of a handful of cherry-picked questions. It evaluates the same FEVER claims across several models and keeps the raw predictions.",
    notes: [
      "Each answer must resolve to supports, refutes, or not enough info. The runner reports accuracy, invalid responses, latency, and a confusion matrix for every model.",
      "A local cache skips completed examples on later runs. Model lists, sample limits, output paths, and concurrency are all set from the command line.",
    ],
    role: "Independent build",
    repositoryUrl: "https://github.com/MohtashamMurshid/checkmate-factbench",
    repositoryLabel: "Public GitHub repository",
    facts: [
      { value: "3", label: "FEVER labels" },
      { value: "5", label: "Default models" },
      { value: "2", label: "Default concurrency" },
    ],
    flow: [
      { title: "Load FEVER", detail: "Read labelled claims from JSONL." },
      { title: "Check cache", detail: "Reuse predictions already completed." },
      { title: "Ask models", detail: "Run the remaining claims through OpenRouter." },
      { title: "Score", detail: "Compare predictions with the three gold labels." },
      { title: "Report", detail: "Write Markdown summaries and raw JSONL results." },
    ],
    languages: [{ name: "TypeScript", bytes: 37937 }],
  },
  {
    slug: "smart-tex",
    name: "Smart Tex",
    year: "2025",
    category: "Document generator",
    status: "Prototype",
    summary:
      "An AI writing workspace that builds long documents one section at a time and keeps their structure consistent.",
    introduction:
      "Smart Tex was an early attempt at making generated documents less chaotic. The user chooses the kind of document and its format before the model starts writing.",
    notes: [
      "It supports academic papers, blog posts, reports, and articles. Each type has its own section plan and style choices, including IEEE, ACM, APA, and MLA for academic work.",
      "Generation happens section by section so later parts can keep the earlier context. The result stays editable and can be downloaded as Markdown.",
    ],
    role: "Independent build",
    repositoryLabel: "Private GitHub repository",
    facts: [
      { value: "4", label: "Document types" },
      { value: "4", label: "Academic formats" },
      { value: ".md", label: "Editable output" },
    ],
    flow: [
      { title: "Add source", detail: "Paste text or upload a starting document." },
      { title: "Choose type", detail: "Pick a paper, blog, report, or article." },
      { title: "Set format", detail: "Choose the structure and writing style." },
      { title: "Generate", detail: "Build one section while keeping prior context." },
      { title: "Edit and export", detail: "Review the result and download Markdown." },
    ],
    languages: [
      { name: "TypeScript", bytes: 1274647 },
      { name: "CSS", bytes: 4110 },
      { name: "JavaScript", bytes: 528 },
    ],
  },
  {
    slug: "page-rush",
    name: "Page Rush",
    year: "2025",
    category: "Study tool",
    status: "Prototype",
    summary:
      "A PDF study app that turns course material into guides, flashcards, quizzes, and practice exams.",
    introduction:
      "Page Rush starts with the file students already have: a PDF. It extracts the text once, then reuses that material across several ways of studying.",
    notes: [
      "Focus mode tracks reading progress without adding another feed or chat window. The same source can become a study guide, flashcards, a quiz, a practice exam, or a shorter exam-cram breakdown.",
      "The dashboard also keeps performance history so weak topics do not disappear after one quiz. I built the interface to work on phones as well as laptops.",
    ],
    role: "Independent build",
    repositoryUrl: "https://github.com/MohtashamMurshid/mohtasham-pagerush",
    repositoryLabel: "Public GitHub repository",
    facts: [
      { value: "PDF", label: "Starting material" },
      { value: "5", label: "Generated study modes" },
      { value: "1", label: "Shared source document" },
    ],
    flow: [
      { title: "Upload", detail: "Add a course PDF." },
      { title: "Extract", detail: "Turn the pages into usable source text." },
      { title: "Choose a mode", detail: "Open a guide, cards, quiz, exam, or cram session." },
      { title: "Study", detail: "Work through material tied to the original file." },
      { title: "Review", detail: "Use the history to find weaker topics." },
    ],
    languages: [
      { name: "TypeScript", bytes: 129820 },
      { name: "CSS", bytes: 7619 },
      { name: "JavaScript", bytes: 4341 },
    ],
  },
  {
    slug: "speak-sql",
    name: "SpeakSQL",
    year: "2025",
    category: "Data interface",
    status: "Hackathon build",
    summary:
      "A text and voice interface that turns plain-language questions into SQL and runs them against imported data.",
    introduction:
      "SpeakSQL was built for FutureHack's natural-language data challenge. It lets someone explore a database without knowing the exact query they need to write first.",
    notes: [
      "Users can upload a CSV or connect PostgreSQL, MySQL, and SQLite. SpeakSQL reads the schema, accepts a typed or spoken question, and returns the generated query before execution.",
      "There is still a direct SQL editor for people who want it. Results appear in a table and can be exported as JSON, CSV, or Excel.",
    ],
    role: "Hackathon build",
    repositoryUrl: "https://github.com/MohtashamMurshid/speaksql",
    repositoryLabel: "Public GitHub repository",
    facts: [
      { value: "4", label: "Data-source options" },
      { value: "2", label: "Question inputs" },
      { value: "3", label: "Export formats" },
    ],
    flow: [
      { title: "Connect data", detail: "Upload CSV or choose a supported database." },
      { title: "Read schema", detail: "Map tables, columns, types, and relationships." },
      { title: "Ask", detail: "Type or speak a question in ordinary language." },
      { title: "Generate", detail: "Turn the request into visible SQL or Python." },
      { title: "Run and export", detail: "Execute, inspect the table, and save the result." },
    ],
    languages: [
      { name: "TypeScript", bytes: 193056 },
      { name: "CSS", bytes: 8686 },
      { name: "JavaScript", bytes: 474 },
    ],
  },
  {
    slug: "jarvis-ai",
    name: "Jarvis AI",
    year: "2025",
    category: "Voice assistant",
    status: "Prototype",
    summary:
      "A terminal-style personal assistant with voice input, spoken replies, search, weather, and command history.",
    introduction:
      "Jarvis AI puts a small personal assistant inside a terminal instead of a chat app. It accepts normal questions, but it also has explicit commands for the jobs that should be predictable.",
    notes: [
      "Holding the spacebar starts voice input. ElevenLabs reads answers aloud, with browser speech as a fallback, while separate services handle web search and weather.",
      "The terminal keeps command history and keyboard controls for clearing the screen or stopping an active response. New commands can be added without changing the rest of the interface.",
    ],
    role: "Independent build",
    repositoryUrl: "https://github.com/MohtashamMurshid/jarvis-ai",
    repositoryLabel: "Public GitHub repository",
    facts: [
      { value: "4", label: "Built-in command groups" },
      { value: "4", label: "Keyboard controls" },
      { value: "2", label: "Input modes" },
    ],
    flow: [
      { title: "Type or hold", detail: "Enter text or hold spacebar to speak." },
      { title: "Route", detail: "Match a command or pass the question to the model." },
      { title: "Fetch", detail: "Call search or weather services when needed." },
      { title: "Answer", detail: "Print the result in the terminal." },
      { title: "Speak", detail: "Read it aloud through ElevenLabs or browser speech." },
    ],
    languages: [
      { name: "TypeScript", bytes: 89407 },
      { name: "CSS", bytes: 4168 },
      { name: "JavaScript", bytes: 474 },
    ],
  },
  {
    slug: "credenza",
    name: "Credenza",
    year: "2024",
    category: "Service website",
    status: "Early web project",
    summary:
      "A service landing page for graduates who want help putting together a portfolio or resume.",
    introduction:
      "Credenza is a straightforward service site aimed at graduating students. It explains the portfolio and resume offer, then sends interested people to a request form.",
    notes: [
      "The page uses small animated pointers and cards to make the service feel like a collaborative design workspace. The offer itself stays narrow: portfolio creation, resume templates, and custom design.",
      "This was one of my earlier Next.js builds. The order dashboard never grew past a placeholder, so the useful record here is the landing page and its interaction work.",
    ],
    role: "Frontend development",
    repositoryUrl: "https://github.com/MohtashamMurshid/Credenza",
    repositoryLabel: "Public GitHub repository",
    facts: [
      { value: "2", label: "Core services" },
      { value: "1", label: "Request path" },
      { value: "2024", label: "First commit" },
    ],
    flow: [
      { title: "Arrive", detail: "Read the graduate-focused service pitch." },
      { title: "Browse", detail: "Compare portfolio and resume help." },
      { title: "Choose", detail: "Decide whether the service fits." },
      { title: "Request", detail: "Open the external order form." },
    ],
    languages: [
      { name: "TypeScript", bytes: 86115 },
      { name: "CSS", bytes: 2429 },
      { name: "JavaScript", bytes: 135 },
    ],
  },
  {
    slug: "bounty",
    name: "Bounty",
    year: "2025",
    category: "Local task marketplace",
    status: "Mobile prototype",
    summary:
      "An Expo app for posting small paid errands and finding nearby people willing to do them.",
    introduction:
      "Bounty treats the annoying jobs people put off as small local listings. A task has a place, category, reward, and enough detail for someone nearby to decide whether to take it.",
    notes: [
      "The mobile prototype can browse bounties by category and post a new one. Convex stores the listing, creator, assignee, location, reward, images, and current status.",
      "A bounty moves through open, in progress, and completed. The product did not get beyond a rough prototype, but the main marketplace loop is visible in the schema and screens.",
    ],
    role: "Mobile and backend prototype",
    repositoryUrl: "https://github.com/MohtashamMurshid/bounty",
    repositoryLabel: "Public GitHub repository",
    facts: [
      { value: "3", label: "Task states" },
      { value: "5", label: "Listing details" },
      { value: "Expo", label: "Mobile client" },
    ],
    flow: [
      { title: "Post", detail: "Add the task, place, category, and reward." },
      { title: "Browse", detail: "Find nearby work by category." },
      { title: "Assign", detail: "Connect a listing with the person doing it." },
      { title: "Track", detail: "Move the task from open to in progress." },
      { title: "Complete", detail: "Close the bounty when the errand is done." },
    ],
    languages: [
      { name: "TypeScript", bytes: 37228 },
      { name: "JavaScript", bytes: 7712 },
    ],
  },
];

export function getArchiveProject(slug: string): ArchiveProject | undefined {
  return archiveProjects.find((project) => project.slug === slug);
}
