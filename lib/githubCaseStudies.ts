import type { GitHubProjectCaseStudyData } from "@/components/work/GitHubProjectCaseStudy";

const siteUrl = "https://www.mohtasham.dev";

export const githubCaseStudies: Record<string, GitHubProjectCaseStudyData> = {
  oikina: {
    name: "Oikina",
    dateLine: "Building now · Solo project · Product and infrastructure",
    description:
      "A small cloud for deploying apps built by people and coding agents.",
    image: {
      src: "/projects/oikina-pass.png",
      alt: "An Oikina deployment pass on a dark product card",
      width: 1536,
      height: 1024,
    },
    introduction: [
      "Oikina is my startup. I started it because coding agents could build most of a small app, but they could not finish deploying it. I still had to open several dashboards, create a database, configure authentication, set up storage, and move credentials between services. A quick one-off app kept turning into an infrastructure job.",
      "I wanted one opinionated place where an agent could deploy the app for me. Oikina works from a project folder. Its CLI builds the app, checks its configuration, uploads it, and publishes it to an Oikina subdomain. In my current beta tests, a normal deployment finishes in under ten seconds.",
    ],
    metadata: [
      { title: "My work", items: ["Product design", "CLI", "Runtime and infrastructure"] },
      { title: "Current beta", items: ["Built independently", "5+ testers", "Under 10-second deploys"] },
      { title: "Working today", items: ["Full-stack apps", "Persistent SQLite", "Releases and rollback"] },
    ],
    sections: [
      {
        title: "Why I call it a small cloud",
        paragraphs: [
          "Small apps should not require a collection of accounts and credentials before anyone can use them. Most of the apps I build are tools for a handful of people. They need somewhere to run, a database, a little server code, and a safe way to update them. They do not need an open-ended cloud setup.",
          "Oikina is deliberately narrow. It is not another tool that generates the app. The coding agent remains the place where the app is created. Oikina gives that agent a predictable way to develop, validate, and deploy it. The current beta does not replace every dashboard yet, but it proves that deployment can become one short command instead of a manual setup session.",
        ],
      },
      {
        title: "What works in the beta",
        paragraphs: [
          "Oikina currently deploys static sites and constrained full-stack React apps. A full-stack app can include declared server actions, migrations, persistent SQLite data, reactive queries, and encrypted server secrets. Every release is kept as an immutable version, and an earlier release can be restored through rollback.",
          "Server actions run inside fresh, networkless workers. The worker can disappear after the request without taking the app's data with it. SQLite belongs to the app rather than the release, so its data survives new deployments, rollbacks, and worker restarts. Five-plus friends and colleagues are testing the beta. App-user authentication, file storage, background jobs, arbitrary backend servers, and customer-hosted runtimes are not available yet.",
        ],
      },
      {
        title: "The part I had to learn",
        paragraphs: [
          "I had deployed plenty of apps before Oikina. I had never built the system doing the deployment. This was my first time going this deeply into packaging applications, checking uploads, isolating private server code, preserving data, switching releases, and operating the infrastructure underneath it.",
          "There was no single difficult piece. The whole path had to work together. An upload could not escape its project folder. Private server code could not become a public file. A failed release could not replace the working one. SQLite had to survive while workers and releases came and went. Rollback had to restore verified code without rolling back the user's data. Getting all of that working was the hardest part of the project, and the reason I learned so much from building it.",
        ],
      },
    ],
    mediaBlocks: [
      {
        afterSection: 0,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/oikina-landing.png",
            alt: "The Oikina landing page introducing the small cloud",
            width: 1440,
            height: 900,
            caption: "The public Oikina site introduces the small-cloud idea and its opinionated deployment model.",
          },
        ],
      },
    ],
    flowFigure: {
      title: "From an idea to a running app",
      steps: [
        { title: "Describe the app", detail: "A person asks a coding agent to build a small tool." },
        { title: "Build locally", detail: "The agent writes the interface, actions, and data model." },
        { title: "Validate", detail: "The CLI checks the manifest, build, routes, and migrations." },
        { title: "Deploy", detail: "Oikina uploads and publishes an immutable release." },
        { title: "Share the URL", detail: "The running app receives its Oikina subdomain." },
      ],
      caption: "The agent stays in the development loop and uses Oikina as the deploy target.",
      afterSection: 0,
    },
    architectureFigure: {
      title: "Current hosted architecture",
      stages: [
        {
          label: "Build",
          nodes: [
            { title: "Person + coding agent", detail: "Create the app in a local project folder" },
          ],
        },
        {
          label: "Prepare",
          nodes: [
            { title: "Oikina CLI", detail: "Build, validate, bundle, and upload" },
          ],
        },
        {
          label: "Publish",
          nodes: [
            { title: "Hosted Runtime", detail: "Authenticate and install the release" },
            { title: "Release registry", detail: "Keep immutable versions and the active pointer" },
          ],
        },
        {
          label: "Run",
          nodes: [
            { title: "Static gateway", detail: "Serve the active public files" },
            { title: "Isolated action worker", detail: "Run one declared server action" },
            { title: "Persistent SQLite", detail: "Keep app data across releases and workers" },
          ],
        },
      ],
      caption: "Public files and server actions resolve from the same active release. App data lives separately so deployment and rollback do not replace it.",
      afterSection: 1,
    },
    mappingFigure: {
      sourceLabel: "project folder",
      targetLabel: "hosted result",
      rows: [
        {
          source: "oikina.json",
          target: "Validated app contract",
          detail: "Identity, build output, action routes, and migrations",
        },
        {
          source: "dist/",
          target: "Immutable public artifact",
          detail: "Bounded regular files with unsafe paths and symlinks rejected",
        },
        {
          source: "server/actions.ts",
          target: "Private server bundle",
          detail: "Stored separately and run only for declared routes",
        },
        {
          source: "migrations",
          target: "Persistent app SQLite",
          detail: "Ordered changes bound to one stable app identity",
        },
        {
          source: ".env.production",
          target: "Public and private values split",
          detail: "Server values are encrypted and injected into workers",
        },
        {
          source: "deployment",
          target: "Release history and rollback",
          detail: "A verified active pointer selects the version being served",
        },
      ],
      caption: "The project folder becomes a release, while the app's data remains independent from that release.",
      afterSection: 1,
    },
    codeFigure: {
      label: "Deployment flow",
      fileName: "terminal",
      code: `$ npx oikina new incident-tracker
$ cd incident-tracker
$ npx oikina dev
$ npx oikina validate
$ npx oikina login <deploy-token>
$ npx oikina deploy`,
      command: "npx oikina deploy",
      caption: "Develop locally, validate the project, and deploy it through the same CLI.",
      afterSection: 1,
    },
    footer: {
      statement: "I built Oikina so the agent can finish the job instead of handing me a list of dashboards to configure.",
      links: [{ label: "Visit Oikina ↗", href: "https://oikina.com" }],
    },
    pageUrl: `${siteUrl}/work/oikina`,
    programmingLanguage: ["TypeScript", "JavaScript"],
    dateCreated: "2026-07-24",
  },

  iris: {
    name: "Iris",
    dateLine: "August 2026 · Solo project · Product, interface, and development",
    description:
      "A free, open-source iPhone camera for people who want control over their photographs.",
    compactImages: true,
    image: {
      src: "/projects/iris-camera.png",
      alt: "A compact black Iris camera concept",
      width: 1086,
      height: 1448,
    },
    introduction: [
      "I started Iris because the manual camera apps I found for iPhone were expensive. Paying for another app or subscription should not be the only way to control shutter speed, ISO, focus, white balance, exposure, and RAW capture.",
      "Iris is my attempt to build a free alternative. The first release is planned as an iPhone still camera with automatic capture when you want it and full manual controls when you do not. I designed and built the current prototype alone. Its interface takes inspiration from Halide 3, but Iris uses its own branding, controls, icons, and visual system.",
    ],
    metadata: [
      { title: "My work", items: ["Product design", "Interface design", "Development"] },
      { title: "Current build", items: ["Expo SDK 57 prototype", "Browser demo", "No released camera app"] },
      { title: "First release", items: ["Free and open source", "iPhone stills", "Offline without an account"] },
    ],
    sections: [
      {
        title: "Why I want it to be open source",
        paragraphs: [
          "Open-source software is how I learned much of what I know about building products. I could inspect real projects, understand how they worked, change things, break them, and try again. Iris should offer that same opportunity to someone else.",
          "The app will be free and open source. It is for anyone who wants more control over an iPhone photograph without paying for a professional camera app. Someone should be able to use it as a simple automatic camera, then move into shutter speed, ISO, manual focus, white balance, exposure compensation, zoom, and DNG capture as they learn.",
        ],
      },
      {
        title: "What works in the prototype",
        paragraphs: [
          "The mobile app is currently an interactive interface prototype. It has Auto and Manual modes, control dials, RAW and aspect-ratio controls, composition guides, zoom shortcuts, haptics, a Look selector, and Photo Lab editing screens. It does not yet connect those controls to a production iPhone camera pipeline, and it cannot take a real photograph today.",
          "The public website has a browser demo built around a sample image. Visitors can move the focus point, change the crop, select a Look, adjust simulated exposure, and render a JPEG or PNG through canvas. I used AI to draft the current Look recipes. They are prototype starting points, not copied camera profiles, and they still need device testing so the live preview and saved photograph produce the same result.",
        ],
      },
      {
        title: "Turning the prototype into a camera",
        paragraphs: [
          "The hardest part is the iPhone camera API. Iris uses Expo SDK 57, but the App Store version of Expo Go available when I tested it did not accept the project during the SDK transition. Expo Go is useful for interface work, but the complete manual-control and image-processing stack needs a custom Expo development build and testing on a physical iPhone.",
          "The next milestone is a signed build with camera permissions, a stable live preview, one reliable capture per shutter tap, camera switching, orientation handling, save recovery, and a recent-photo thumbnail. After a 100-shot reliability test, I can add hardware-derived manual ranges, locked controls, DNG capture, GPU-rendered Looks, and preview-to-export color checks. I plan to release Iris through TestFlight and eventually the App Store, but neither exists today.",
        ],
      },
    ],
    mediaBlocks: [
      {
        afterSection: 0,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/iris-viewfinder.png",
            alt: "The Iris automatic camera viewfinder prototype with RAW, autofocus, zoom, Look, and shutter controls",
            width: 780,
            height: 1688,
            caption: "The Expo prototype tests how camera controls can stay close without covering the frame.",
          },
          {
            type: "image",
            src: "/projects/case-studies/iris-photo-lab.png",
            alt: "The Iris Photo Lab prototype showing five Looks and an exposure dial",
            width: 780,
            height: 1688,
            caption: "The Photo Lab prototype explores Look selection, intensity, and direct editing controls.",
          },
        ],
      },
    ],
    flowFigure: {
      title: "Planned first-release flow",
      steps: [
        { title: "Open the camera", detail: "Grant camera access and enter the viewfinder without an account." },
        { title: "Choose a mode", detail: "Shoot in Auto or open the manual control tray." },
        { title: "Set the photograph", detail: "Adjust focus, exposure, white balance, format, zoom, and Look." },
        { title: "Capture", detail: "Create one processed photo or supported DNG per shutter tap." },
        { title: "Review and save", detail: "Keep the original, change the Look, share, or save to Photos." },
      ],
      caption: "This is the intended v1 path. The current app implements the interface, not the native capture pipeline.",
      afterSection: 0,
    },
    architectureFigure: {
      title: "Prototype today and the native path ahead",
      stages: [
        {
          label: "Interface now",
          nodes: [
            { title: "Expo camera shell", detail: "Modes, dials, grids, zoom, haptics, and Looks" },
            { title: "Photo Lab", detail: "Look and editing panels around a mock image" },
          ],
        },
        {
          label: "Simulation now",
          nodes: [
            { title: "Viewfinder mock", detail: "Supplied image behind the mobile controls" },
            { title: "Browser canvas", detail: "CSS preview and JPEG or PNG rendering" },
          ],
        },
        {
          label: "Native foundation next",
          nodes: [
            { title: "Custom Expo build", detail: "Signed development client on a physical iPhone" },
            { title: "Camera capability report", detail: "Device formats, lenses, ISO, focus, and RAW support" },
          ],
        },
        {
          label: "Capture pipeline later",
          nodes: [
            { title: "Live camera preview", detail: "Capability-aware Auto and Manual controls" },
            { title: "Processed or RAW file", detail: "HEIC or JPEG plus DNG where supported" },
            { title: "iOS Photos", detail: "Reliable save, retry, and recent-capture review" },
          ],
        },
      ],
      caption: "The first two columns exist as prototypes. The native foundation and capture pipeline remain development work.",
      afterSection: 1,
    },
    mappingFigure: {
      sourceLabel: "demo action",
      targetLabel: "current behavior",
      rows: [
        {
          source: "tap viewfinder",
          target: "Move the focus marker",
          detail: "The demo changes the visual focus point and crop anchor",
        },
        {
          source: "choose a lens",
          target: "Change the crop",
          detail: "CSS scale and canvas coordinates simulate a focal-length change",
        },
        {
          source: "select a Look",
          target: "Apply a color recipe",
          detail: "The same filter values feed the preview and canvas export",
        },
        {
          source: "adjust exposure",
          target: "Change brightness",
          detail: "A browser filter simulates the visible exposure response",
        },
        {
          source: "choose RAW",
          target: "Render a PNG",
          detail: "This is a demo stand-in and not real sensor DNG data",
        },
        {
          source: "press shutter",
          target: "Rasterize the sample image",
          detail: "Canvas produces a downloadable JPEG or PNG",
        },
      ],
      caption: "The browser demo tests the interaction model without claiming a phone capture pipeline.",
      afterSection: 1,
    },
    codeFigure: {
      label: "Repository",
      fileName: "workspaces",
      code: `apps/
  mobile/   # Expo interface prototype
  web/      # Astro product site and canvas demo
docs/       # Product and contributor documentation`,
      command: "npm install && npm run mobile",
      caption: "The camera interface and product site live in one workspace.",
      afterSection: 1,
    },
    footer: {
      statement: "Iris will be free and open source because open-source projects taught me how to build. I want this camera to give someone else the same chance.",
      links: [
        { label: "Open the product site ↗", href: "https://iris.mohtasham.dev" },
        { label: "View the source ↗", href: "https://github.com/MohtashamMurshid/iris" },
      ],
    },
    pageUrl: `${siteUrl}/work/iris`,
    repositoryUrl: "https://github.com/MohtashamMurshid/iris",
    programmingLanguage: ["TypeScript", "Astro"],
    dateCreated: "2026-08-05",
  },

  skills: {
    name: "Skills",
    dateLine: "August 2026 · Solo project · Instruction design and developer tooling",
    description:
      "Six reusable workflows that help coding agents repeat the way I approach specific kinds of work.",
    image: {
      src: "/projects/agent-skills.png",
      alt: "A set of labeled folders representing reusable agent skills",
      width: 1536,
      height: 1024,
    },
    introduction: [
      "I started packaging my workflows so friends could use them without needing me to explain the same process each time. Some of them were running into problems I had already dealt with, so I turned my instructions, references, scripts, and design material into reusable skills.",
      "A skill is closer to a specification than a prompt. It tells the agent when to use it, what process to follow, which material to load, and what a finished result should include. The same package can work across coding agents instead of living inside one conversation.",
    ],
    metadata: [
      { title: "My work", items: ["Instruction design", "References and templates", "Scripts and validation"] },
      { title: "Collection", items: ["Six public skills", "Built independently", "Published through skills.sh"] },
      { title: "Used by friends", items: ["I Have ADHD", "Presentation", "Editorial Report"] },
    ],
    sections: [
      {
        title: "Why I packaged my workflows",
        paragraphs: [
          "A long prompt can describe what you want, but it often leaves the process open to interpretation. The agent may skip an important check, use a different method each time, or produce something that looks finished without completing the actual work.",
          "My skills narrow that space. Each one handles a specific job and carries the instructions and supporting files needed to do it repeatedly. I built them from workflows I use myself, while also studying and adapting useful ideas from other public skills.",
        ],
      },
      {
        title: "The six skills",
        paragraphs: [
          "The collection covers ADHD-friendly communication, presentations, editorial reports, launch films, technical diagrams, and reliable agent design. Friends use the ADHD, Presentation, and Editorial Report skills most often. I use the ADHD skill myself, especially in Codex with GPT models.",
          "My I Have ADHD skill is adapted from Ayoub Ghriss's open-source project. It keeps responses short, leads with the action, replaces jargon with plain language, and breaks work into small steps. I removed the forced time estimates because I found them distracting. The other five packages turn my working methods into repeatable instructions with the files and checks each job needs.",
        ],
      },
      {
        title: "What makes a skill different",
        paragraphs: [
          "Every skill begins with a SKILL.md file that defines its trigger and workflow. More involved skills also include references, reusable assets, starter files, scripts, and checks. The agent loads the detailed material only when the job needs it.",
          "The packages use the shared agent-skills format, so they can move between compatible coding agents. I do not have a growth target for the collection. I want it to remain useful. If one of my workflows saves someone from solving the same problem again, the package has done its job.",
        ],
      },
    ],
    mediaBlocks: [
      {
        afterSection: 1,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/skills-github.png",
            alt: "The public GitHub repository for Mohtasham's reusable agent skills",
            width: 1440,
            height: 900,
            caption: "The public repository keeps every skill, its supporting files, and validation workflow inspectable.",
          },
        ],
      },
    ],
    flowFigure: {
      title: "From my workflow to an installable skill",
      steps: [
        { title: "Repeat the work", detail: "Use the same method often enough to know which parts matter." },
        { title: "Write the contract", detail: "Define when the skill runs, what it does, and what finished means." },
        { title: "Package the material", detail: "Add only the references, assets, scripts, and starters the job needs." },
        { title: "Validate", detail: "Check the folder, frontmatter, name, description, and registry entry." },
        { title: "Share", detail: "Publish through GitHub and install through the skills CLI." },
      ],
      caption: "The package begins with a workflow I already use, not an abstract prompt idea.",
      afterSection: 0,
    },
    architectureFigure: {
      title: "What lives inside a skill",
      stages: [
        {
          label: "Trigger",
          nodes: [
            { title: "Name and description", detail: "Tell the agent when this skill applies" },
          ],
        },
        {
          label: "Method",
          nodes: [
            { title: "SKILL.md", detail: "Workflow, constraints, and completion rules" },
          ],
        },
        {
          label: "Working material",
          nodes: [
            { title: "references/", detail: "Detailed guidance loaded only when needed" },
            { title: "assets/", detail: "Design systems, starters, and reusable files" },
            { title: "scripts/", detail: "Rendering, automation, and repeatable checks" },
          ],
        },
        {
          label: "Result",
          nodes: [
            { title: "Finished artifact", detail: "The requested output, not only advice or an outline" },
            { title: "Validation", detail: "Evidence that the package and its output still work" },
          ],
        },
      ],
      caption: "Simple skills may need only SKILL.md. Larger jobs carry the material required to produce and check the result.",
      afterSection: 2,
    },
    mappingFigure: {
      sourceLabel: "skill",
      targetLabel: "what it helps an agent do",
      rows: [
        {
          source: "i-have-adhd",
          target: "Communicate clearly",
          detail: "Short answers, plain language, small actions, and visible progress",
        },
        {
          source: "presentation",
          target: "Build complete decks",
          detail: "Narrative, slide design, output files, and rendered-slide checks",
        },
        {
          source: "generate-editorial-report",
          target: "Create evidence-led reports",
          detail: "Fact gathering, editorial structure, figures, web, and PDF output",
        },
        {
          source: "render-launch-film",
          target: "Render launch videos",
          detail: "A deterministic web timeline, MP4 renderer, stills, and contact sheets",
        },
        {
          source: "draw-technical-diagrams",
          target: "Draw precise SVG figures",
          detail: "Computed geometry, cutaways, callouts, hatching, and interaction",
        },
        {
          source: "build-reliable-agents",
          target: "Stop agent loops and stalls",
          detail: "Smaller tool payloads, bounded retries, clear delegation, and probes",
        },
      ],
      caption: "Each skill stays narrow enough to describe one job and the method for completing it.",
      afterSection: 1,
    },
    codeFigure: {
      label: "Installation",
      fileName: "terminal",
      code: `# Discover the collection
npx skills add mohtashammurshid/skills --list

# Check a local clone
python3 scripts/validate-skills.py`,
      command: "npx skills add mohtashammurshid/skills --skill presentation",
      caption: "Discover the packages, then install one skill or the full collection.",
      afterSection: 1,
    },
    footer: {
      statement: "I made these skills so other people could reuse the workflows my friends kept asking me to share.",
      links: [
        { label: "Browse the collection ↗", href: "https://skills.sh/mohtashammurshid/skills" },
        { label: "View the source ↗", href: "https://github.com/MohtashamMurshid/skills" },
        { label: "Original ADHD skill ↗", href: "https://github.com/ayghri/i-have-adhd" },
      ],
    },
    pageUrl: `${siteUrl}/work/skills`,
    repositoryUrl: "https://github.com/MohtashamMurshid/skills",
    programmingLanguage: ["Markdown", "Python", "CSS", "JavaScript"],
    dateCreated: "2026-07-22",
  },

  "eikon-studio": {
    name: "Eikon Studio",
    dateLine: "November 2025 to August 2026 · Solo project · Product design, full-stack development, and API",
    description:
      "An open-source, self-hostable image platform for people who want a better interface without paying another company for every generation.",
    image: {
      src: "/projects/eikon-studio.png",
      alt: "An Eikon Studio image workspace card",
      width: 1536,
      height: 1024,
    },
    introduction: [
      "I started Eikon because I hated the existing image-generation platforms. Some were too expensive. Others had terrible interfaces. Most would not let me use my own provider keys.",
      "The first version only supported Nano Banana. At the time, it was the only image model I actually liked using. I started with Vercel's Nano Banana Starter template, which was little more than a simple generation screen. Most of Eikon has been built beyond that starting point.",
    ],
    metadata: [
      { title: "My work", items: ["Built alone", "Product design", "Full-stack development"] },
      { title: "Current status", items: ["Open source", "Self-hostable", "Actively developed"] },
      { title: "Ready models", items: ["Nano Banana 2", "Nano Banana Pro", "GPT Image 2"] },
    ],
    sections: [
      {
        title: "Why bring your own key",
        paragraphs: [
          "I do not want to resell generations or add another markup. People already have access to Google and OpenAI. Eikon should make those models easier to use, not become another company selling the same inference through a different screen.",
          "A creator can use the studio without learning a provider API. A developer can send the same request through Eikon's REST API. AI agents will eventually use the CLI and SDK without touching the dashboard. The web interface and REST API work today. The CLI and TypeScript and Python SDKs are still in development.",
        ],
      },
      {
        title: "The hardest part was making generations persist",
        paragraphs: [
          "An image generation should not belong to an open browser tab. A user might change pages, close the app, or return later while the provider is still working. Eikon creates the generation record in Convex before starting the provider request. Convex keeps the work running, saves the completed output, and updates the user's history.",
          "Building this was the hardest part of the project. Provider calls can take time, fail halfway through, or finish after the user has left. The system has to know whether it is safe to retry without accidentally creating another paid generation.",
        ],
      },
      {
        title: "What works now and where I want to take it",
        paragraphs: [
          "The current release handles text-to-image generation, image editing, references, reusable prompt skills, folders, history, a personal gallery, usage analytics, Google sign-in, provider credentials, platform API keys, and a public REST endpoint. A couple of my friends and colleagues use it. Anyone can run the hosted version or self-host the project.",
          "The useful breadth of fal.ai is the long-term reference point, not its branding or payment model. I want Eikon to provide a visual studio and one consistent way to call image and video models. More provider adapters, runnable models, comparison tools, model playgrounds, a CLI, and typed SDKs are still ahead.",
        ],
      },
    ],
    mediaBlocks: [
      {
        afterSection: 0,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/eikon-landing.png",
            alt: "The Eikon Studio landing page showing its bring-your-own-key media pipeline and dashboard",
            width: 1440,
            height: 900,
            caption: "The live Eikon site presents one workspace for provider keys, model access, media, and usage.",
          },
        ],
      },
    ],
    flowFigure: {
      title: "A generation can outlive the browser",
      steps: [
        { title: "Connect a key", detail: "Save a Google or OpenAI credential." },
        { title: "Choose a model", detail: "Select one of the three ready image models." },
        { title: "Add the input", detail: "Write a prompt or attach reference images." },
        { title: "Start the job", detail: "Convex records the generation before provider work begins." },
        { title: "Leave if needed", detail: "Navigation or closing the app does not cancel the work." },
        { title: "Return later", detail: "The result appears in generation history when it finishes." },
        { title: "Keep the image", detail: "Download it or organize it in the gallery." },
      ],
      caption: "The browser starts the job, but Convex owns its progress and result.",
      afterSection: 0,
    },
    architectureFigure: {
      title: "How Eikon connects the interface to the provider",
      stages: [
        {
          label: "Ways in",
          nodes: [
            { title: "Web studio", detail: "Available now" },
            { title: "REST API", detail: "Available now" },
            { title: "CLI and SDKs", detail: "In development" },
          ],
        },
        {
          label: "Eikon",
          nodes: [
            { title: "Model registry", detail: "Capabilities and readiness" },
            { title: "Generation contract", detail: "One request shape and job lifecycle" },
            { title: "Credential boundary", detail: "Server-side provider-key access" },
          ],
        },
        {
          label: "Providers",
          nodes: [
            { title: "Google", detail: "Nano Banana models" },
            { title: "OpenAI", detail: "GPT Image" },
          ],
        },
        {
          label: "Convex",
          nodes: [
            { title: "Background work", detail: "Continues after the browser leaves" },
            { title: "Database and storage", detail: "Keeps the record and returned media" },
          ],
        },
        {
          label: "Back to the user",
          nodes: [
            { title: "History", detail: "Status and past generations" },
            { title: "Gallery", detail: "Folders, saved media, and downloads" },
            { title: "Analytics", detail: "Usage and estimated cost" },
          ],
        },
      ],
      caption: "The interface and API share the same model registry, provider path, and stored result.",
      afterSection: 1,
    },
    mappingFigure: {
      sourceLabel: "what the user does",
      targetLabel: "what Eikon keeps",
      rows: [
        { source: "connect provider key", target: "Encrypted credential", detail: "Only server-side code can resolve it" },
        { source: "choose a model", target: "Ready catalog entry", detail: "Unavailable models stay out of the selector" },
        { source: "prompt + references", target: "Validated request", detail: "Saved before provider work starts" },
        { source: "start generation", target: "Persistent Convex record", detail: "Work continues after navigation or close" },
        { source: "provider returns media", target: "Stored output", detail: "Copied into Convex storage" },
        { source: "generation completes", target: "History and analytics", detail: "The result returns to the account" },
      ],
      caption: "The prompt, job, and returned image stay connected after the browser leaves.",
      afterSection: 2,
    },
    codeFigure: {
      label: "Public REST API",
      fileName: "request.json",
      code: `{
  "prompt": "An isometric keyboard switch cutaway",
  "provider": "openai",
  "imageSize": "2K",
  "aspectRatio": "landscape"
}`,
      command: "curl -X POST https://eikonstudio.xyz/api/v1/generate -H 'Authorization: Bearer eik_...'",
      caption: "The current REST API sends a generation through the same account-scoped path as the studio.",
      afterSection: 1,
    },
    footer: {
      statement: "I built Eikon because using an image model should not require choosing between a bad interface and another expensive subscription.",
      links: [
        { label: "Open Eikon Studio ↗", href: "https://eikonstudio.xyz" },
        { label: "View the source ↗", href: "https://github.com/MohtashamMurshid/eikonstudio" },
      ],
    },
    pageUrl: `${siteUrl}/work/eikon-studio`,
    repositoryUrl: "https://github.com/MohtashamMurshid/eikonstudio",
    programmingLanguage: "TypeScript",
    dateCreated: "2025-11-04",
  },

  "understanding-software": {
    name: "Understanding Software",
    dateLine: "July 2026 · Weekend project · Design, development, and AI workflow",
    description:
      "A landing-page clone that turned into an AI-assisted platform for making software explanations easier to understand.",
    image: {
      src: "/projects/understanding-software-zine.png",
      alt: "A blue technical field guide titled Understanding Software",
      width: 1536,
      height: 1024,
    },
    introduction: [
      "Understanding Software started as a weekend clone of Dan Hollick's Making Software website. I loved his work and wanted to see whether I could recreate that technical field-guide style myself.",
      "There was no larger product idea at first. It was a design problem. I worked closely with an AI agent, gave it very specific visual instructions, reviewed what it produced, and kept iterating until the page felt right.",
    ],
    metadata: [
      { title: "Project type", items: ["Weekend project", "Design experiment", "AI collaboration"] },
      { title: "What it became", items: ["Visual field guide", "Artifact Studio"] },
      { title: "Artifact output", items: ["2 to 8 sections", "Up to 4 figures", "Markdown and DOCX"] },
    ],
    sections: [
      {
        title: "It started as a clone",
        paragraphs: [
          "Making Software gave me the basic reference: dense editorial layouts, blue technical drawings, grid paper, numbered figures, and explanations that treat diagrams as part of the writing.",
          "I did not begin by trying to invent another educational platform. I wanted to understand how that visual system worked by rebuilding something similar. The clone was the exercise.",
        ],
      },
      {
        title: "The design was the hardest part",
        paragraphs: [
          "The design is still the part I am most proud of. Getting the page to feel technical without becoming unreadable took a lot of iteration. The typography, spacing, diagrams, borders, labels, and small annotations all had to work together.",
          "My agent wrote much of the implementation, but it was not a one-prompt build. I directed the work, pointed out what felt wrong, and asked for specific changes. We kept going back and forth until the page matched the idea in my head. A lot of designers I know have seen or used the landing page, and the design is usually what they respond to first.",
        ],
      },
      {
        title: "Then the clone became a product idea",
        paragraphs: [
          "While building the clone, I realized the format could explain more than one fixed set of topics. That became the Artifact Studio. A reader asks a software question. The agent plans a field guide with two to eight sections, decides whether diagrams would help, writes the sections, generates the figures, and assembles everything into one live document.",
          "Revisions preserve sections and figures that still work instead of rebuilding the entire guide. Three section writers and two figure jobs can run at the same time. The finished artifact can be copied or downloaded as Markdown or an editable Word document.",
          "The exports are useful if someone wants to keep or change the guide. They are also a marketing experiment for my Markdown-to-Docx package. This is not a startup or a finished educational product. It is a weekend project I made for my own satisfaction.",
        ],
      },
    ],
    mediaBlocks: [
      {
        afterSection: 0,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/making-software-reference.jpg",
            alt: "The Making Software website by Dan Hollick with blue technical diagrams and editorial columns",
            width: 1280,
            height: 720,
            caption: "Making Software by Dan Hollick was the design reference for the original clone.",
          },
          {
            type: "image",
            src: "/projects/case-studies/understanding-software-landing.png",
            alt: "The Understanding Software field guide with blue technical diagrams of software layers",
            width: 1440,
            height: 900,
            caption: "My version began as an attempt to rebuild the same technical field-guide feeling.",
          },
        ],
      },
      {
        afterSection: 1,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/making-software-reference-detail.jpg",
            alt: "Making Software diagrams explaining Gaussian blur, Bezier curves, and rasterisation",
            width: 1280,
            height: 720,
            caption: "The reference mixes dense prose with diagrams that carry part of the explanation. Screenshot from Making Software by Dan Hollick.",
          },
        ],
      },
    ],
    flowFigure: {
      title: "From one question to a finished field guide",
      steps: [
        { title: "Ask", detail: "The reader brings a software question." },
        { title: "Plan", detail: "The agent defines the sections and useful figures." },
        { title: "Write and draw", detail: "Section writers and figure jobs run together." },
        { title: "Stream", detail: "The document assembles while the work finishes." },
        { title: "Review", detail: "The reader inspects the prose, structure, and diagrams." },
        { title: "Revise", detail: "Useful sections and figures keep their stable IDs." },
        { title: "Export", detail: "Copy it or download Markdown or DOCX." },
      ],
      caption: "The studio keeps the document visible instead of hiding the work behind a loading screen.",
      afterSection: 2,
    },
    architectureFigure: {
      title: "How I worked with the agent on the original clone",
      stages: [
        {
          label: "Reference",
          nodes: [
            { title: "Making Software", detail: "Layout, typography, diagrams, and annotations" },
          ],
        },
        {
          label: "Direction",
          nodes: [
            { title: "Specific instructions", detail: "What to reproduce and what felt wrong" },
            { title: "Visual review", detail: "Spacing, hierarchy, labels, and density" },
          ],
        },
        {
          label: "Agent work",
          nodes: [
            { title: "Page implementation", detail: "Next.js, React, and CSS" },
            { title: "Technical diagrams", detail: "Custom SVG figures and annotations" },
          ],
        },
        {
          label: "Iteration",
          nodes: [
            { title: "Compare and correct", detail: "Repeat until the page matched the intended feeling" },
          ],
        },
      ],
      caption: "The agent produced much of the code. I directed the visual decisions and the repeated corrections.",
      afterSection: 1,
    },
    mappingFigure: {
      sourceLabel: "reader action",
      targetLabel: "studio mechanism",
      rows: [
        { source: "ask a question", target: "Structured artifact plan", detail: "Two to eight sections and up to four figures" },
        { source: "approve the plan", target: "Parallel generation", detail: "Three section writers and two figure jobs" },
        { source: "watch the document", target: "Streamed artifact state", detail: "Sections appear while other jobs continue" },
        { source: "request a revision", target: "Stable section and figure IDs", detail: "Unaffected work does not regenerate" },
        { source: "finish", target: "Copy, Markdown, or DOCX", detail: "The document can leave the site" },
      ],
      caption: "The studio keeps the document structure visible while the work runs.",
      afterSection: 2,
    },
    codeFigure: {
      label: "DOCX export",
      fileName: "route.ts",
      code: `const buffer = await convertMarkdownToArrayBuffer(markdown, {
  documentType: "document",
  imageHandling: {
    dataUrls: { enabled: true },
    maxImageBytes: 10_485_760
  }
});`,
      command: "npm run dev",
      caption: "The final artifact can leave the site as an editable Word document.",
      afterSection: 2,
    },
    footer: {
      statement: "I started by cloning a website I loved. Somewhere along the way, it became a way for me and an AI agent to design explanations together.",
      links: [
        { label: "Open the field guide ↗", href: "https://understanding-software.vercel.app" },
        { label: "View the source ↗", href: "https://github.com/MohtashamMurshid/understanding-software" },
        { label: "View Making Software ↗", href: "https://www.makingsoftware.com" },
      ],
    },
    pageUrl: `${siteUrl}/work/understanding-software`,
    repositoryUrl: "https://github.com/MohtashamMurshid/understanding-software",
    programmingLanguage: "TypeScript",
    dateCreated: "2026-07-29",
  },

  getdesign: {
    name: "getdesign",
    dateLine: "April 2026 to present · Founder · Solo project with AI agents",
    description:
      "An agent that screenshots a live site and writes design.md, so coding agents can copy designs from the best designers in the world.",
    image: {
      src: "/projects/getdesign.png",
      alt: "A getdesign interface card with design tokens and a rendered page",
      width: 1448,
      height: 1086,
    },
    introduction: [
      "I am not a strong designer, so most of my design work starts with references. I would give an agent a screenshot and ask it to build something similar. It could usually copy the big decisions, but it missed the details that made the original work: the exact colors, border radii, spacing, typography, shadows, and component proportions.",
      "I built getdesign to give the agent both sides of the reference. Hand it a URL. It screenshots the live page in a real browser and writes a structured design.md grounded in that page's actual CSS.",
    ],
    metadata: [
      { title: "My work", items: ["Founder", "Built alone", "AI agent collaboration"] },
      { title: "Current access", items: ["Public beta", "Web, API, CLI, SDK, Skill", "BYOK"] },
      { title: "September 2026", items: ["Public beta live", "Hosted cursor.com extract", "51 GitHub stars"] },
    ],
    sections: [
      {
        title: "Why a screenshot was not enough",
        paragraphs: [
          "Coding agents invent mediocre UI when they only have a picture. A screenshot tells them what the page looks like. It does not reliably tell them whether a card uses a 12px or 16px radius, which gray belongs to a border, or how the spacing changes between sections.",
          "getdesign collects the page's HTML and stylesheets, renders it in a real browser, and extracts colors, typography, spacing, radii, borders, shadows, and responsive rules. It then combines that evidence with screenshots instead of asking the model to guess everything from pixels.",
          "I based the file format on Google Labs Code's DESIGN.md idea, then made getdesign's own fixed nine-section contract. Every run returns the same order, including components, layout, depth, interactions, responsive behavior, and an agent prompt guide.",
        ],
      },
      {
        title: "From a URL to design.md",
        paragraphs: [
          "The path is short. You paste a public URL. getdesign opens the page in a sandbox browser, captures what actually rendered, and returns a full-page screenshot with a CSS-backed design.md.",
          "The Daytona capture system was the hardest part to build, and it is the part I am most proud of. Each run creates a temporary Daytona sandbox and launches Chromium inside it. getdesign measures the rendered page, captures it in viewport-sized tiles, scrolls through the full page, and stitches those tiles into one screenshot. The sandbox is deleted after the run.",
          "This took far more work than calling a screenshot API. Pages load at different speeds, some continue growing as they scroll, fixed headers appear in every tile, and the browser can report a page as ready before the visual layout has settled. The same agent core now sits behind five surfaces: the web app, a hosted API, a CLI, a TypeScript SDK, and an agent skill.",
        ],
      },
      {
        title: "What works today and what still breaks",
        paragraphs: [
          "The public beta is live, including the hosted web product. Sign in at dashboard.getdesign.app with WorkOS, add your own Daytona and OpenAI keys, and run a URL. I used that path to extract cursor.com. getdesign does not bill those runs yet. Pricing is coming. Until then the product is BYOK: you pay Daytona and OpenAI directly.",
          "The weakest part is still fetching the page source and CSS. Some sites render most of their interface on the server. Others inject styles after JavaScript runs, lazy-load assets, hide files behind authentication, or ship more CSS than the fetcher can reasonably process. Complex pages can stall the capture. The screenshot shows what appeared, but the crawler may still miss the rule that produced it.",
          "I announced the public beta on LinkedIn, X, and Show HN, and I sent the first waitlist emails. getdesign stays open source. Oikina still gets most of my time.",
        ],
      },
    ],
    mediaBlocks: [
      {
        afterSection: 0,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/getdesign-landing.png",
            alt: "The getdesign landing page with a URL input and an example design document",
            width: 1440,
            height: 900,
            caption: "The public-beta product starts with a URL and returns a screenshot plus design.md.",
          },
        ],
      },
      {
        afterSection: 1,
        items: [
          {
            type: "video",
            src: "/projects/case-studies/getdesign-launch.mp4",
            poster: "/projects/case-studies/getdesign-landing.png",
            label: "getdesign launch film",
            caption: "The launch film shows the URL-to-design.md product story.",
          },
        ],
      },
    ],
    flowFigure: {
      title: "How getdesign captures a full page",
      steps: [
        { title: "Paste a URL", detail: "Start a run from the web, API, CLI, SDK, or skill." },
        { title: "Open a sandbox browser", detail: "Launch Chromium inside a short-lived Daytona environment." },
        { title: "Capture the page", detail: "Measure height, screenshot viewport tiles, and stitch them." },
        { title: "Read the CSS", detail: "Collect HTML, stylesheets, and rendered tokens." },
        { title: "Write design.md", detail: "Return the screenshot and the nine-section document." },
        { title: "Delete the sandbox", detail: "Remove the temporary environment after the run." },
      ],
      caption: "The screenshot comes from a real browser session, not a static HTML preview.",
      afterSection: 1,
    },
    architectureFigure: {
      title: "Five surfaces, one agent core",
      stages: [
        {
          label: "Entry points",
          nodes: [
            { title: "Web", detail: "Public beta at getdesign.app" },
            { title: "API", detail: "Hosted runs for scripts and agents" },
            { title: "CLI", detail: "Published npx package" },
            { title: "SDK", detail: "Published TypeScript client" },
            { title: "Skill", detail: "Runs inside coding agents" },
          ],
        },
        {
          label: "Evidence",
          nodes: [
            { title: "Crawler", detail: "HTML, stylesheets, fonts, and CSS rules" },
            { title: "Daytona", detail: "Rendered page and ordered screenshot tiles" },
          ],
        },
        {
          label: "Analysis",
          nodes: [
            { title: "Token extraction", detail: "Colors, type, spacing, radii, borders, and shadows" },
            { title: "Visual description", detail: "What the full rendered page actually shows" },
            { title: "Structured synthesis", detail: "Validated nine-section document" },
          ],
        },
        {
          label: "Output",
          nodes: [
            { title: "Full-page screenshot", detail: "The visual reference" },
            { title: "design.md", detail: "Exact values and instructions for the coding agent" },
          ],
        },
      ],
      caption: "The screenshot and CSS evidence meet in the same structured result.",
      afterSection: 1,
    },
    mappingFigure: {
      sourceLabel: "what the agent misses",
      targetLabel: "what getdesign adds",
      rows: [
        { source: "exact colors", target: "CSS-backed palette", detail: "Values come from fetched and rendered styles" },
        { source: "border radius", target: "Radius scale", detail: "Repeated values become usable rules" },
        { source: "spacing rhythm", target: "Layout guidance", detail: "Section and component spacing are recorded" },
        { source: "type hierarchy", target: "Typography roles", detail: "Family, size, weight, and line height" },
        { source: "below-the-fold design", target: "Full-page capture", detail: "Ordered tiles cover the complete landing page" },
        { source: "how to apply it", target: "Agent prompt guide", detail: "The last section turns evidence into instructions" },
      ],
      caption: "The document carries the small decisions that a screenshot leaves ambiguous.",
      afterSection: 0,
    },
    codeFigure: {
      label: "Published CLI and SDK",
      fileName: "terminal + app.ts",
      code: `# CLI
npx @getdesign/cli https://cursor.com --out design.md

# TypeScript SDK
import { getDesign } from "@getdesign/sdk";
const result = await getDesign("https://cursor.com");`,
      command: "npx @getdesign/cli https://cursor.com --out design.md",
      caption: "The CLI and TypeScript SDK share the same agent core as the web app, API, and skill. Public beta is BYOK.",
      afterSection: 2,
    },
    footer: {
      statement: "I built getdesign because 'make it look like this screenshot' was never enough. The agent needed the page and the small design decisions hiding behind it.",
      links: [
        { label: "Open getdesign ↗", href: "https://www.getdesign.app" },
        { label: "View the source ↗", href: "https://github.com/MohtashamMurshid/getdesign" },
        { label: "Show HN ↗", href: "https://news.ycombinator.com/item?id=49686413" },
        { label: "Google DESIGN.md spec ↗", href: "https://github.com/google-labs-code/design.md" },
      ],
    },
    pageUrl: `${siteUrl}/work/getdesign`,
    repositoryUrl: "https://github.com/MohtashamMurshid/getdesign",
    programmingLanguage: "TypeScript",
    dateCreated: "2026-04-20",
  },
  hazemonitor: {
    name: "Haze Monitor",
    dateLine: "August 2026 to present · Co-built with Isaac Tan · Search, AI answers and design",
    description:
      "A free, ad-free haze site for Malaysia and Singapore. 18K people used it in four weeks, most of them sent by Bing, Google and ChatGPT.",
    image: {
      src: "/projects/hazemonitor.png",
      alt: "A glass dome over a hazy miniature Kuala Lumpur skyline, on a worn blue base with an AQI dial",
      width: 1536,
      height: 1024,
    },
    introduction: [
      "I started Haze Monitor at the end of August 2026, just before haze season, and built it with Isaac Tan. It reads DOE Malaysia's live station feed and Singapore's NEA readings, then shows the nearest reading over an illustrated picture of your city. The haze in the picture thickens with the number. It is free and has no ads.",
      "From October 2 to 29, 18K people used it. Bing sent 5.3K first-time visitors, more than Google's 3.9K, and ChatGPT sent 2.7K. This page is about the search and AI-answer work behind those numbers.",
    ],
    metadata: [
      { title: "My work", items: ["Started the project", "Design and city artwork", "Search and AI answers"] },
      { title: "Oct 2 to 29, 2026", items: ["18K active users", "155K events", "Visitors from 76 countries"] },
      { title: "First visits by source", items: ["Bing 5.3K", "Google 3.9K", "ChatGPT 2.7K"] },
    ],
    sections: [
      {
        title: "Pages that answer in the HTML",
        paragraphs: [
          "The first version fetched every reading in the browser. A crawler got a page title, a heading and a dash where the number should be. Isaac fixed that first. He moved the readings to the server so the number arrives in the HTML, then added a short summary under each city in English and Malay. Malaysians search in both languages, with words like 'jerebu', 'IPU' and 'indeks pencemaran udara'.",
          "He also gave every place its own page. Fourteen city pages had left most of the country with nothing to land on, so he added one for each of the 68 DOE stations and 16 states. The URLs use the names people type, so Penang is /state/penang, not pulau-pinang. The sitemap grew from 17 URLs to 101. It has 272 now.",
          "My part was matching each page to the words people use. Malaysia's official index is called API, the Air Pollutant Index. Searchers also type AQI. We calculate a US AQI from DOE's PM2.5 readings, show it next to the official API, and put both terms in the titles, as in 'Malaysia AQI & Haze Today (API/IPU)'. The Malaysia and Singapore reports also have Malay and Simplified Chinese versions linked with hreflang. The Chinese Malaysia report is one of the three most-viewed pages on the site.",
        ],
      },
      {
        title: "Making it easy for AI assistants to quote",
        paragraphs: [
          "I wanted ChatGPT to cite Haze Monitor when someone asked it about the haze. I ran the site through is-agentic.com, which scores how well AI agents can read and use a website, and worked through what it flagged.",
          "Every public page now returns clean Markdown when a client sends Accept: text/markdown, and has a matching .md URL. llms.txt tells an assistant which page answers which question and how to read the numbers. It explains that Malaysia's API is not the US AQI and that every reading has an observation time to check. Missing pages return a real 404 with links back. An OpenAPI 3.1 file describes the six public JSON endpoints. They need no key and return errors with a stable code and a hint for recovering.",
          "hazemonitor.com scores 97 out of 100 on is-agentic, with all eight essential checks passing. In four weeks ChatGPT sent 2.7K first-time visitors, more than Yahoo and DuckDuckGo combined. Bing surprised me more. The only search tool I used was Google Search Console, to submit the sitemap. Bing found the site on its own and still sent more first visits than Google.",
        ],
      },
      {
        title: "Numbers people can trust",
        paragraphs: [
          "A haze site that shows the wrong number is worse than none. Every reading keeps its station name and observation time. If a station stops reporting, the page keeps its last reading and labels it as old. It never borrows a reading from a station farther away. A D1 archive on Cloudflare fills gaps when the DOE or NEA feed fails, and it keeps the original timestamps.",
          "The AQI conversion needed the most care. On September 21 I found we were still using DOE's 2021 PM2.5 formula. For Cheras, it turned an official API of 139 into a US AQI of 185. The current formula gives 147, which matches DOE's own 24-hour PM2.5 figure. I checked the corrected table against all 67 stations that report both values, and every one agreed within one index point.",
          "Weekly reports give people and search engines something new each week. Malaysia, Singapore, Thailand, Indonesia and Vietnam each have one, with archives by ISO week. The Thailand, Indonesia and Vietnam reports use CAMS model estimates. They are labelled as estimates and never enter the archive of measured readings.",
        ],
      },
    ],
    mediaBlocks: [
      {
        afterSection: 0,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/hazemonitor-kuala-lumpur.jpg",
            alt: "Haze Monitor's Kuala Lumpur view with a US AQI of 101 over an illustration of the Petronas Towers",
            width: 1440,
            height: 900,
            caption: "The Kuala Lumpur page on November 1. The reading, its station and its age sit over the city artwork, and the haze in the picture follows the number.",
          },
        ],
      },
      {
        afterSection: 1,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/hazemonitor-analytics.png",
            alt: "Google Analytics for hazemonitor.com from October 2 to 29, 2026, showing 18K active users and Bing as the top first-user source",
            width: 1600,
            height: 999,
            caption: "Google Analytics, October 2 to 29. Bing is the top source of first visits, and chatgpt.com is fourth.",
          },
        ],
      },
      {
        afterSection: 2,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/hazemonitor-weekly-report.png",
            alt: "The Haze Monitor Malaysia weekly report for October 21 to 27, 2026, with a weekly mean US AQI of 94.1",
            width: 1440,
            height: 900,
            caption: "The Malaysia weekly report for October 21 to 27, built from 11,303 hourly observations.",
          },
        ],
      },
    ],
    flowFigure: {
      title: "How a question reaches a reading",
      steps: [
        { title: "Someone asks", detail: "They search 'jerebu KL' or ask ChatGPT about the haze." },
        { title: "A page matches", detail: "Every station, city and state has its own URL in the sitemap." },
        { title: "The HTML answers", detail: "The reading, category and time are rendered on the server." },
        { title: "Assistants get Markdown", detail: "llms.txt and Accept: text/markdown give them a clean copy to quote." },
        { title: "The page stays fresh", detail: "Pages rebuild every five minutes from DOE and NEA." },
      ],
      caption: "Crawlers and assistants get the reading without running any JavaScript.",
      afterSection: 1,
    },
    architectureFigure: {
      title: "Where the numbers come from",
      stages: [
        {
          label: "Sources",
          nodes: [
            { title: "DOE Malaysia", detail: "68 stations, hourly API and PM2.5" },
            { title: "NEA Singapore", detail: "PSI and PM2.5 for five regions" },
            { title: "Open-Meteo CAMS", detail: "Model estimates for Thailand, Indonesia and Vietnam" },
          ],
        },
        {
          label: "Store",
          nodes: [
            { title: "Collector Worker", detail: "Saves readings on a schedule" },
            { title: "D1 archive", detail: "Fills gaps and keeps original timestamps" },
          ],
        },
        {
          label: "Serve",
          nodes: [
            { title: "Cloudflare Worker", detail: "Pages rebuilt every five minutes" },
            { title: "Public API", detail: "Six read-only JSON endpoints with OpenAPI 3.1" },
          ],
        },
        {
          label: "Read",
          nodes: [
            { title: "People", detail: "Illustrated city pages" },
            { title: "Search engines", detail: "Server-rendered HTML and a 272-URL sitemap" },
            { title: "AI assistants", detail: "llms.txt and Markdown versions" },
          ],
        },
      ],
      caption: "When a feed fails, the archive supplies the last known reading with its original time.",
      afterSection: 2,
    },
    mappingFigure: {
      sourceLabel: "what people search",
      targetLabel: "what Haze Monitor answers with",
      rows: [
        { source: "jerebu hari ini", target: "A Malay summary on every city page", detail: "With API/IPU facts and DOE health guidance" },
        { source: "Malaysia AQI", target: "US AQI next to the official API", detail: "Calculated from DOE PM2.5, with the method shown" },
        { source: "马来西亚 烟霾", target: "A Simplified Chinese country report", detail: "Linked to the English and Malay versions with hreflang" },
        { source: "air quality Petaling Jaya", target: "A page for every station, city and state", detail: "68 stations and 16 states, named the way people type them" },
        { source: "Singapore PSI today", target: "A Singapore report with PSI and PM2.5", detail: "Five regions, each with its own observation time" },
        { source: "haze last week", target: "Weekly reports", detail: "Five countries, with archives by ISO week" },
      ],
      caption: "Most of the ranking work was matching pages to the words people already use.",
      afterSection: 0,
    },
    codeFigure: {
      label: "Read it like an assistant",
      fileName: "terminal",
      code: `# The Malaysia report as Markdown
curl -H 'Accept: text/markdown' https://hazemonitor.com/malaysia

# Which page answers which question
curl https://hazemonitor.com/llms.txt

# Six read-only JSON endpoints, no key needed
curl https://hazemonitor.com/openapi.json`,
      command: "curl -H 'Accept: text/markdown' https://hazemonitor.com/malaysia",
      caption: "Every public page has a Markdown version, and llms.txt points assistants to the right one.",
      afterSection: 1,
    },
    footer: {
      statement: "Isaac and I made a haze site people could read at a glance. The traffic came from making it just as easy for search engines and AI assistants to read.",
      links: [
        { label: "Open Haze Monitor ↗", href: "https://hazemonitor.com" },
        { label: "Read llms.txt ↗", href: "https://hazemonitor.com/llms.txt" },
        { label: "Developer guide ↗", href: "https://hazemonitor.com/developers" },
        { label: "is-agentic report ↗", href: "https://is-agentic.com/scan/hazemonitor.com" },
      ],
    },
    pageUrl: `${siteUrl}/work/hazemonitor`,
    programmingLanguage: "TypeScript",
    dateCreated: "2026-08-30",
  },
  "kelas-ai": {
    name: "Kelas AI",
    dateLine: "September 2026 to present · Contract engineer, one of two · Voice tutor and onboarding",
    description:
      "An app that teaches people who have never built anything to make their first website, with a tutor that talks, points and draws on the screen.",
    image: {
      src: "/projects/kelas-ai.png",
      alt: "A wooden school slate with a chalk website sketch and Spark, Kelas AI's golden star guide",
      width: 1536,
      height: 1024,
    },
    introduction: [
      "Kelas Sekejap is a Malaysian learning site for English, money and careers. Kelas AI is its app for people who have never built an app or website. A learner describes an idea in chat, and an AI builder turns it into a website. I worked on it under contract as one of two engineers, starting with the first commit in September.",
      "Generating a website is the easy part now. The hard part is the learner looking at a screen full of buttons with no idea which one to press. Most of my work went into Spark, the tutor. Spark talks with the learner by voice or text, reads what is on the screen, points at the right control and draws on the page while it explains.",
    ],
    metadata: [
      { title: "My work", items: ["Voice tutor", "On-screen drawing", "Onboarding and Lesson 1"] },
      { title: "Engagement", items: ["Contract", "One of two engineers", "September 2026 to present"] },
      { title: "Built with", items: ["Next.js and React", "Gemini and Gemini Live", "Mastra builder agent"] },
    ],
    sections: [
      {
        title: "A tutor that can see the page",
        paragraphs: [
          "The first version I built was a chat that shaped an idea into a brief the learner could copy. Live voice came a few days later. The browser asks our server for a short-lived, single-use Gemini Live token, so the real API key never leaves the server, and then streams 16 kHz microphone audio straight to Gemini. Learners can cut Spark off mid-sentence. Calls end after nine minutes and offer to reconnect.",
          "Spark never sees a screenshot. When it needs to act, it reads a summary of the page instead: the visible controls with their positions and shapes, the question on screen, the build step, and any errors. It can only point at controls that are on the screen right now. If a control has gone, the tool call fails and Spark has to say so instead of pointing at nothing.",
        ],
      },
      {
        title: "Drawing on the screen",
        paragraphs: [
          "Pointing was not enough for someone who has never heard the word 'composer'. I built a drawing layer the tutor controls. It can draw outlines that match a button's real corner radius, circles, arrows, underlines, labels, and spotlights that dim the rest of the page. A drawing can attach to an element and follow it as the page scrolls. The page stays clickable underneath, and Escape clears everything.",
          "Spark also reacts to what the learner does. Picking a starter, sending a message, pressing Build or opening the preview each gets a reply in about half a second. A small policy stops it from talking too much. It merges events that land within 0.4 seconds, gives each kind of event a cooldown, and allows six reactions a minute. In a voice call, an urgent reaction can interrupt Spark's own sentence but never the learner's.",
        ],
      },
      {
        title: "From first visit to first website",
        paragraphs: [
          "In October I rebuilt the first few minutes. On a new learner's first visit, Spark fills the screen to say hello, flies to its corner and offers to talk, type or be skipped. After sign-up it asks four questions and fills each answer into the form itself. Then it opens Lesson 1 and walks the learner through what the site is for, who it is for and how it should look. Spark pastes the finished prompt into the main box and leaves Enter to the learner, so the first website is one they started.",
          "I also set up the Turborepo monorepo and the one-command local stack, streamed chat replies, showed the builder agent's steps live, and added image and document attachments, image generation in chat, an Astro landing page, and the Settings and Lessons pages. My teammate built most of the hosted builder, the browser sandbox and preview hosting.",
        ],
      },
    ],
    mediaBlocks: [
      {
        afterSection: 1,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/kelas-ai-highlight.png",
            alt: "The Kelas AI chat screen with the message box outlined by the tutor's drawing layer and voice call controls open above it",
            width: 1280,
            height: 1000,
            caption: "An earlier build, with the robot guide that came before Spark. During a voice call the tutor has outlined the message box. Clear at the top removes its drawings.",
          },
        ],
      },
      {
        afterSection: 2,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/kelas-ai-sign-in.png",
            alt: "The Kelas AI sign-in page with Spark, a small golden star, pointing at Create an account",
            width: 1440,
            height: 900,
            caption: "Spark on the sign-in page, pointing new learners at Create an account.",
          },
        ],
      },
    ],
    flowFigure: {
      title: "From hello to a first website",
      steps: [
        { title: "Meet Spark", detail: "A full-screen hello, then talk, type or skip." },
        { title: "Four questions", detail: "Spark asks, then fills each answer into the form." },
        { title: "Lesson 1", detail: "What the site is for, who it serves and how it looks." },
        { title: "Press Enter", detail: "Spark pastes the prompt. The learner sends it." },
        { title: "Watch the build", detail: "The builder agent's steps appear as they happen." },
        { title: "Spark reacts", detail: "It comments on the build and the preview." },
      ],
      caption: "Spark fills in forms, but the learner sends the prompt that starts the build.",
      afterSection: 2,
    },
    architectureFigure: {
      title: "How Spark sees and acts",
      stages: [
        {
          label: "Learner",
          nodes: [
            { title: "Voice", detail: "Microphone audio as 16 kHz PCM" },
            { title: "Actions", detail: "Clicks, messages, builds and previews" },
          ],
        },
        {
          label: "Browser",
          nodes: [
            { title: "Screen summary", detail: "Controls, bounds and shapes. No screenshots" },
            { title: "Activity policy", detail: "Merging, cooldowns and a rate cap" },
          ],
        },
        {
          label: "Models",
          nodes: [
            { title: "Gemini Live", detail: "Voice, with a single-use token" },
            { title: "Text Support", detail: "Typed replies with the same tools" },
          ],
        },
        {
          label: "On screen",
          nodes: [
            { title: "Drawing layer", detail: "Outlines, arrows, labels and spotlights" },
            { title: "UI actions", detail: "Point, fill a field, send, copy" },
          ],
        },
      ],
      caption: "Voice and typed Support share one set of tools, and the browser checks every call against what is on the screen.",
      afterSection: 0,
    },
    mappingFigure: {
      sourceLabel: "what the learner says or does",
      targetLabel: "what Spark does",
      rows: [
        { source: "\"What's happening?\"", target: "Explains the current step", detail: "From the stage, layout, question on screen and build step" },
        { source: "\"Where is my website?\"", target: "Answers from the screen summary", detail: "Build state, preview and version" },
        { source: "\"What does it do?\"", target: "Explains and outlines the control", detail: "The outline matches the control's shape" },
        { source: "Presses Build", target: "Comments right away", detail: "About half a second, within the rate cap" },
      ],
      caption: "Spark answers about the screen in front of the learner.",
      afterSection: 1,
    },
    codeFigure: {
      label: "A drawing tool call",
      fileName: "updateOverlay",
      code: `// Spark outlines Build, then labels it
updateOverlay({
  mode: "replace",
  objects: [
    { id: "build", type: "outline", targetId: "build-website-button" },
    { id: "tip", type: "label", targetId: "build-website-button",
      text: "Press this when your idea is ready", placement: "above" },
  ],
});`,
      command: "npm run dev:all",
      caption: "Voice and typed Support send the same tool calls, and the browser rejects a target that is not on screen. Locally, npm run dev:all starts the app, database, builder worker and previews.",
      afterSection: 1,
    },
    footer: {
      statement: "Kelas AI's builder makes the website. My job was the tutor that gets a first-timer from a blank screen to pressing Enter.",
      links: [
        { label: "Open Kelas AI ↗", href: "https://ai.kelassekejap.com" },
        { label: "Kelas Sekejap ↗", href: "https://kelassekejap.com" },
      ],
    },
    pageUrl: `${siteUrl}/work/kelas-ai`,
    programmingLanguage: "TypeScript",
    dateCreated: "2026-09-02",
  },
};
