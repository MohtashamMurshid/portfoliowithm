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
    dateLine: "July 2026 · Editorial Design, Development, AI Workflow",
    description:
      "An interactive visual field guide and artifact studio that turns software questions into structured, illustrated documents.",
    image: {
      src: "/projects/understanding-software-zine.png",
      alt: "A blue technical field guide titled Understanding Software",
      width: 1536,
      height: 1024,
    },
    introduction: [
      "Understanding Software is an interactive visual field guide for people who use, design, or build software. It starts from physical actions and follows them through interface, application, runtime, and data layers so a reader can see what the phrase 'the software did it' leaves out.",
      "The larger product is an Artifact Studio for software literacy. A reader asks about a concept, system, or line of code. The agent plans a complete field guide, writes its sections, creates explanatory figures when prose is not enough, and assembles a document the reader can revise and keep.",
    ],
    metadata: [
      { title: "My contributions", items: ["Editorial system", "Interaction design", "Full-stack development"] },
      { title: "Artifact output", items: ["2 to 8 sections", "Up to 4 figures", "Markdown and DOCX"] },
      { title: "Runtime", items: ["Next.js", "Vercel AI SDK", "OpenAI and Google"] },
    ],
    sections: [
      {
        title: "The field guide it is becoming",
        paragraphs: [
          "The authored field guide and the generative studio are meant to reinforce each other. Published chapters establish the visual grammar and teach durable mental models. The studio lets a reader bring the question the fixed chapters did not anticipate and receive an illustrated explanation in the same editorial form.",
          "The useful end state is a growing library of software explanations plus personal artifacts that can be revised, shared, cited, downloaded, and revisited. The product should help a curious non-specialist move from 'it just works' to a concrete picture of the layers and tradeoffs involved.",
        ],
      },
      {
        title: "What works now",
        paragraphs: [
          "The opening field guide is live with custom accessible SVG diagrams for a signal stack, software stack, key-switch cutaway, and system map. The Artifact Studio accepts a question and first produces a typed plan with two to eight sections, zero to four figures, reading time, section responsibilities, and stable IDs.",
          "Three section writers and two figure jobs can run concurrently. Progress streams into a live document canvas, and a revision keeps unaffected section and figure IDs instead of rebuilding everything. A finished artifact can be copied or downloaded as Markdown or an editable DOCX through @mohtasham/md-to-docx.",
        ],
      },
      {
        title: "What comes next",
        paragraphs: [
          "The next work turns a strong generation demo into a durable learning product. It needs more authored chapters, saved artifact history, shareable links, source and citation handling, and export tests that keep figures, captions, headings, and document structure intact.",
          "Generated diagrams also need evaluation, not only attractive output. The studio should check whether a figure explains the section, whether its labels and caption agree with the prose, and whether revisions preserve the right parts. Those checks matter more than increasing the number of models or decorative styles.",
        ],
      },
    ],
    mediaBlocks: [
      {
        afterSection: 0,
        items: [
          {
            type: "image",
            src: "/projects/case-studies/understanding-software-landing.png",
            alt: "The Understanding Software field guide with blue technical diagrams of software layers",
            width: 1440,
            height: 900,
            caption: "The live field guide establishes the visual language the Artifact Studio is meant to extend.",
          },
        ],
      },
    ],
    mappingFigure: {
      sourceLabel: "reader action",
      targetLabel: "studio mechanism",
      rows: [
        { source: "ask a question", target: "Structured artifact plan" },
        { source: "revise the outline", target: "Stable section and figure IDs" },
        { source: "generate", target: "Three writers and two figure jobs" },
        { source: "finish", target: "Copy, Markdown, or DOCX" },
      ],
      caption: "The studio keeps the document structure visible while the work runs.",
      afterSection: 1,
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
      statement: "A field guide should leave the reader with a model they can inspect, revise, download, and keep.",
      links: [
        { label: "Open the field guide ↗", href: "https://understanding-software.vercel.app" },
        { label: "View the source ↗", href: "https://github.com/MohtashamMurshid/understanding-software" },
      ],
    },
    pageUrl: `${siteUrl}/work/understanding-software`,
    repositoryUrl: "https://github.com/MohtashamMurshid/understanding-software",
    programmingLanguage: "TypeScript",
    dateCreated: "2026-07-29",
  },

  getdesign: {
    name: "getdesign",
    dateLine: "April to July 2026 · Product Design, Agent Engineering, Developer Tools",
    description:
      "A design-system extraction product that turns a public URL into a grounded design.md for people and coding agents, with web, skill, API, CLI, SDK, dashboard, and desktop entry points.",
    image: {
      src: "/projects/getdesign.png",
      alt: "A getdesign interface card with design tokens and a rendered page",
      width: 1448,
      height: 1086,
    },
    introduction: [
      "getdesign is becoming the design system for any public URL. It reads a real rendered page, finds the visual rules behind it, and turns that evidence into a predictable design.md that a person or coding agent can use to build something new without copying the original page blindly.",
      "The product is planned as one extraction engine with several ways in: a public web app, a portable agent skill, an API, a CLI, typed SDKs, a dashboard, and a desktop app. Each route should return the same grounded account of color, type, components, layout, depth, motion, responsive behavior, and implementation guidance.",
    ],
    metadata: [
      { title: "My contributions", items: ["Product design", "Agent pipeline", "Developer tooling"] },
      { title: "Grounding sources", items: ["Rendered page", "HTML and CSS", "Computed styles"] },
      { title: "Surface status", items: ["Public web and skill", "In-repo API, CLI, SDK", "Desktop work"] },
    ],
    sections: [
      {
        title: "The product getdesign is becoming",
        paragraphs: [
          "The finished product should let a designer paste a URL and inspect the result in the browser, let a developer run the same extraction in a terminal or application, and let an agent load the workflow as a skill. A shared schema keeps the result consistent across all of them.",
          "After the first release, the product plan adds conversational refinement, page comparisons, token exports, more model providers, and integrations for VS Code, Raycast, and Figma. Later work can handle multiple pages, signed-in products, and interactive states. Those jobs need stronger capture and evidence rules before they can be trusted.",
        ],
      },
      {
        title: "What works now",
        paragraphs: [
          "The public web app, documentation site, and portable agent skill work today. The agent validates the URL, fetches the page and linked stylesheets, checks available theme modes, captures what the browser renders, and extracts colors, type, spacing, radii, shadows, borders, and breakpoints. It then writes the same nine-section document every time.",
          "The default branch also has a Hono API with regular and streamed routes, a Bun CLI that writes local run folders, a TypeScript SDK, a dashboard, and an Electron app. Those are working beta implementations in the repository. They do not have GitHub releases yet, so I do not describe them as broadly shipped products.",
        ],
      },
      {
        title: "What comes next",
        paragraphs: [
          "The immediate work is to make the API, CLI, SDK, dashboard, and desktop app release-ready around the shared pipeline. That means stable package contracts, authentication and usage controls for hosted runs, reliable streaming, better failure recovery, versioned output, and documentation that matches the code.",
          "The extraction itself also needs broader site coverage and sharper proof. A concrete value belongs in design.md only when getdesign can trace it to CSS, a computed style, or a visible pixel. If there is no evidence for a hex value or measurement, the document should describe the pattern instead of inventing a token.",
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
            caption: "The public web app starts with a URL and produces a design system grounded in the inspected page.",
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
            caption: "The repository's launch film shows the product story and the design.md workflow.",
          },
        ],
      },
    ],
    mappingFigure: {
      sourceLabel: "source evidence",
      targetLabel: "pipeline result",
      rows: [
        { source: "URL + HTML + CSS", target: "Crawl summary and source inventory" },
        { source: "rendered page", target: "Screenshots and capture tiles" },
        { source: "rules + visible pixels", target: "Tokens and visual description" },
        { source: "grounded draft", target: "Nine-section design.md" },
      ],
      caption: "Concrete claims must survive the trip back to source evidence.",
      afterSection: 0,
    },
    codeFigure: {
      label: "Portable agent skill",
      fileName: "terminal",
      code: `# Install the skill into a supported coding agent
npx skills add MohtashamMurshid/getdesign

# Then ask:
Extract the design system from https://cursor.com into design.md`,
      command: "npx skills add MohtashamMurshid/getdesign",
      caption: "The public skill uses the host agent's browser and file tools.",
      afterSection: 1,
    },
    footer: {
      statement: "The promise is simple: turn a real page into design instructions that can show their work.",
      links: [
        { label: "Open getdesign ↗", href: "https://getdesign.app" },
        { label: "View the source ↗", href: "https://github.com/MohtashamMurshid/getdesign" },
      ],
    },
    pageUrl: `${siteUrl}/work/getdesign`,
    repositoryUrl: "https://github.com/MohtashamMurshid/getdesign",
    programmingLanguage: "TypeScript",
    dateCreated: "2026-04-20",
  },
};
