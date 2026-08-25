import type { GitHubProjectCaseStudyData } from "@/components/work/GitHubProjectCaseStudy";

const siteUrl = "https://www.mohtasham.dev";

export const githubCaseStudies: Record<string, GitHubProjectCaseStudyData> = {
  oikina: {
    name: "Oikina",
    dateLine: "Building now · Product, Infrastructure, Developer Experience",
    description:
      "Deployment and runtime infrastructure for static sites and constrained full-stack apps, with immutable releases, per-app SQLite, and rollback.",
    image: {
      src: "/projects/oikina-pass.png",
      alt: "An Oikina deployment pass on a dark product card",
      width: 1536,
      height: 1024,
    },
    introduction: [
      "Oikina is the enterprise small cloud for software made by agents and developers. It is the runtime and governance system underneath an internal app, not another prompt-to-app builder. The goal is to make small software as easy to share as a document while keeping identity, data, policy, versions, cost, and retirement visible to IT.",
      "The product is larger than static hosting. An Oikina App is meant to carry its interface, server actions, database, files, identity rules, secret references, jobs, webhooks, releases, logs, and audit history through one narrow TypeScript contract.",
    ],
    metadata: [
      { title: "My contributions", items: ["Product design", "Full-stack development", "Infrastructure"] },
      { title: "Current interfaces", items: ["CLI", "Hosted Runtime", "Operator Console"] },
      { title: "Current status", items: ["Hosted beta", "Scoped credentials", "Rollback"] },
    ],
    sections: [
      {
        title: "The product Oikina is becoming",
        paragraphs: [
          "An employee should be able to have Codex, Claude Code, Cursor, or another agent build a five-person operations tool, preview it, deploy it, and share it with named colleagues. Oikina supplies the application contract and becomes the deploy target. The agent remains the creation interface.",
          "The complete product joins a cloud-neutral control plane to an Oikina Private Runtime inside a customer's AWS, Azure, or Google Cloud account. The control plane owns apps, versions, policy, approvals, audit, and deployment orchestration. The private runtime executes isolated app capsules beside approved identity systems, secret managers, databases, files, and internal APIs.",
        ],
      },
      {
        title: "What works now",
        paragraphs: [
          "The Hosted Runtime already serves static apps and constrained full-stack React apps. Every deployment declares its identity, build output, migrations, and allowed server routes in oikina.json. The CLI validates that file before upload, and the runtime sends only declared method and path pairs to private code running in a fresh networkless worker.",
          "Each app has stable SQLite data, server-only secret sync, scoped deploy credentials, immutable release history, and rollback. The Operator Console can issue and revoke credentials, inspect releases, and move the active filesystem pointer back to an installed artifact. That is a real working slice of the larger small-cloud idea.",
        ],
      },
      {
        title: "What comes next",
        paragraphs: [
          "The next product work fills the gap between the Hosted Runtime and the enterprise small cloud. That includes app-user identity, organization membership, Google and Microsoft sign-in, sharing roles, file storage, jobs, webhooks, secret-manager references, policy templates, approvals, cost limits, app ownership transfer, and retirement.",
          "Private Runtime then moves the same Oikina App contract into a customer's cloud account, starting with enterprise identity, private Postgres and storage, one internal API, and a notification action. The public site describes this destination. The case study now keeps the current hosted slice and that longer plan separate.",
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
            alt: "The Oikina landing page introducing the enterprise small cloud",
            width: 1440,
            height: 900,
            caption: "The public Oikina site frames the product as a home for small software inside a company's cloud.",
          },
        ],
      },
    ],
    mappingFigure: {
      sourceLabel: "project input",
      targetLabel: "runtime result",
      rows: [
        { source: "oikina.json", target: "Validated identity, build, and routes" },
        { source: "dist/", target: "Immutable public artifact" },
        { source: "server bundle", target: "Fresh one-shot worker" },
        { source: "migration contract", target: "App-scoped SQLite schema" },
      ],
      caption: "The deployed app can do only what its manifest declares.",
      afterSection: 1,
    },
    codeFigure: {
      label: "Application contract",
      fileName: "oikina.json",
      code: `{
  "name": "incident-tracker",
  "build": { "output": "dist" },
  "actions": [
    { "method": "POST", "path": "/api/incidents" }
  ]
}`,
      command: "npx oikina validate && npx oikina deploy",
      caption: "Validate the contract before uploading an immutable release.",
      afterSection: 1,
    },
    footer: {
      statement: "Agents can build the app. Oikina is where that app becomes deployable, shareable, and governable.",
      links: [{ label: "Visit Oikina ↗", href: "https://oikina.com" }],
    },
    pageUrl: `${siteUrl}/work/oikina`,
    programmingLanguage: ["TypeScript", "JavaScript"],
    dateCreated: "2026-07-24",
  },

  iris: {
    name: "Iris",
    dateLine: "August 2026 · Product, Interface Design, Development",
    description:
      "An open-source iPhone camera project currently represented by an interactive Expo interface prototype and an Astro product site.",
    compactImages: true,
    image: {
      src: "/projects/iris-camera.png",
      alt: "A compact black Iris camera concept",
      width: 1086,
      height: 1448,
    },
    introduction: [
      "Iris is an open-source iPhone camera for photographers who want immediate automatic capture, understandable manual camera controls, and a small set of live photographic Looks in the same viewfinder. The product is designed for still photography, offline use, and direct control without requiring an account.",
      "The aim is a camera that starts fast but grows with the photographer. Auto mode should be dependable. Manual mode should expose the shutter, ISO, focus, white balance, exposure compensation, and zoom ranges the active iPhone actually supports. A locked value stays locked.",
    ],
    metadata: [
      { title: "My contributions", items: ["Product design", "Interface design", "Development"] },
      { title: "Current builds", items: ["Expo prototype", "Astro site", "Canvas demo"] },
      { title: "Release status", items: ["In development", "No TestFlight", "No App Store build"] },
    ],
    sections: [
      {
        title: "The camera Iris is becoming",
        paragraphs: [
          "The first release is planned as an iPhone-only still camera. It combines HEIC or JPEG capture with DNG where the device supports RAW. Five original Looks appear in the live preview and should match the saved processed photograph. Video, Android, social feeds, cloud backup, and a desktop editor stay outside the first release.",
          "The Photo Lab will let a photographer revisit the latest capture, change the Look and its intensity, inspect metadata, and export a new version without losing the original. Later research may explore simulated aperture, but only if subject edges, latency, and device coverage meet a separate quality bar.",
        ],
      },
      {
        title: "What works now",
        paragraphs: [
          "The Expo app is an interactive interface prototype. It has the viewfinder shell, Auto and Manual modes, five Looks, composition guides, zoom controls, haptics, and Photo Lab editing panels. The screen captures below come from that prototype, not a finished App Store build.",
          "The Astro site adds a browser camera simulation around a supplied image. Tapping the frame moves a focus point, lens controls change the crop, Looks apply a shared recipe, and the shutter renders a JPEG or PNG through canvas. The demo tests the interaction and processing model without claiming access to the iPhone sensor.",
        ],
      },
      {
        title: "What comes next",
        paragraphs: [
          "The next milestone is the native camera foundation in a custom Expo development build on a physical iPhone. That work covers permissions, a stable live preview, tap focus and exposure, orientation, save recovery, recent-capture thumbnails, and a 100-shot reliability test.",
          "After that come hardware-derived manual ranges, locked ISO and exposure duration, focus and white-balance control, DNG capture, GPU-rendered Looks, and preview-to-export color tests. TestFlight starts only after capture reliability, device compatibility, accessibility, and photo-loss safeguards pass. There is no public app, TestFlight build, or App Store listing today.",
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
            caption: "The current Expo viewfinder prototype keeps capture controls around the frame.",
          },
          {
            type: "image",
            src: "/projects/case-studies/iris-photo-lab.png",
            alt: "The Iris Photo Lab prototype showing five Looks and an exposure dial",
            width: 780,
            height: 1688,
            caption: "The Photo Lab prototype explores Looks and direct editing controls.",
          },
        ],
      },
    ],
    mappingFigure: {
      sourceLabel: "demo action",
      targetLabel: "current behavior",
      rows: [
        { source: "tap viewfinder", target: "Move focus point and crop anchor" },
        { source: "choose a lens", target: "Change CSS scale and canvas crop" },
        { source: "select a Look", target: "Apply one preview and export recipe" },
        { source: "press shutter", target: "Rasterize the sample image" },
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
      statement: "The interface already has a point of view. The next job is making the camera underneath it trustworthy.",
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
    dateLine: "August 2026 · Agent Design, Tooling, Documentation",
    description:
      "Six reusable skill packages for coding agents, with the instructions, references, assets, scripts, and validation needed to complete the work.",
    image: {
      src: "/projects/agent-skills.png",
      alt: "A set of labeled folders representing reusable agent skills",
      width: 1536,
      height: 1024,
    },
    introduction: [
      "Skills is a public library of reusable work packages for coding agents. It is meant to make a capable workflow portable across Codex, Claude Code, Cursor, and other agents that support the skills.sh format. Each package includes the instructions and, when the job needs them, references, scripts, assets, and starters.",
      "The collection currently covers presentations, editorial reports, launch films, technical diagrams, reliable agent design, and ADHD-friendly communication. I built it because a reusable workflow needs more than a polished prompt. The package should carry the material and checks that make the result repeatable.",
    ],
    metadata: [
      { title: "My contributions", items: ["Instruction design", "Developer tooling", "Documentation"] },
      { title: "Package shape", items: ["SKILL.md", "References and assets", "Scripts"] },
      { title: "Distribution", items: ["skills.sh", "npx installer", "MIT"] },
    ],
    sections: [
      {
        title: "What the collection is becoming",
        paragraphs: [
          "The long-term shape is a versioned library of narrow, tested workflows. A skill should name the requests that trigger it, define a sequence the agent can follow, carry the working material the job needs, and say what completion means. That turns a one-off method into something another agent can install and repeat.",
          "The library is intentionally not a hosted agent or a bag of generic prompts. It is a place for jobs with enough craft and machinery to deserve a package, such as rendering a deck, validating a film encode, computing an isometric diagram, or writing a report with its source trail intact.",
        ],
      },
      {
        title: "What works now",
        paragraphs: [
          "Six installable skill directories live in the repository. Presentation has three HTML design starters. Editorial reports include a reference implementation and figure assets. Launch films include a deterministic timeline engine and renderer. Technical diagrams include an isometric geometry module, CSS vocabulary, and SVG scaffolds.",
          "The collection installs through skills.sh and the npx skills CLI. Its validator checks YAML frontmatter, folder and skill-name agreement, lowercase hyphenated names, useful descriptions, and the skills.sh.json registry. GitHub Actions runs the same checks on pushes and pull requests.",
        ],
      },
      {
        title: "What comes next",
        paragraphs: [
          "There is no fixed promise to add skills on a schedule. The next package should appear only when its workflow has been used enough to separate durable instructions from one-project preferences. Existing packages also need to keep working as agent tools, document formats, and rendering dependencies change.",
          "The next quality step is deeper cross-agent verification: install the same package into supported agents, run its reference task, inspect the artifact, and keep the evidence beside the skill. More packages are useful only if the collection remains readable and trustworthy.",
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
    mappingFigure: {
      sourceLabel: "repository part",
      targetLabel: "job",
      rows: [
        { source: "SKILL.md", target: "Trigger, workflow, completion contract" },
        { source: "references/", target: "Detailed guidance loaded when needed" },
        { source: "assets/", target: "Starters, design systems, and geometry" },
        { source: "scripts/", target: "Validation and rendering automation" },
      ],
      caption: "Each package carries the material needed to do the work, not only the prompt.",
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
      statement: "A useful skill combines instructions, working materials, and a check for broken packages.",
      links: [
        { label: "Browse the collection ↗", href: "https://skills.sh/mohtashammurshid/skills" },
        { label: "View the source ↗", href: "https://github.com/MohtashamMurshid/skills" },
      ],
    },
    pageUrl: `${siteUrl}/work/skills`,
    repositoryUrl: "https://github.com/MohtashamMurshid/skills",
    programmingLanguage: ["Markdown", "Python", "CSS", "JavaScript"],
    dateCreated: "2026-07-22",
  },

  "eikon-studio": {
    name: "Eikon Studio",
    dateLine: "November 2025 to August 2026 · Product Design, Full-stack Development, API",
    description:
      "An open-source workspace for generating, editing, organizing, and accessing images through Google and OpenAI models.",
    image: {
      src: "/projects/eikon-studio.png",
      alt: "An Eikon Studio image workspace card",
      width: 1536,
      height: 1024,
    },
    introduction: [
      "Eikon Studio is an open-source, self-hostable image and video generation platform built around bring-your-own provider keys. The product is meant to put model discovery, visual creation, developer APIs, durable jobs, media storage, usage, and approximate cost behind one Eikon contract without reselling inference.",
      "A creator should be able to move a prompt and its references between supported models without rebuilding the rest of the workflow. A developer should be able to call the same models through one API and typed SDKs while keeping provider-native capabilities visible.",
    ],
    metadata: [
      { title: "My contributions", items: ["Product design", "Full-stack development", "API and docs"] },
      { title: "Current interfaces", items: ["Web studio", "Personal gallery", "REST API"] },
      { title: "Ready models", items: ["Nano Banana 2", "Nano Banana Pro", "GPT Image 2"] },
    ],
    sections: [
      {
        title: "The platform Eikon is becoming",
        paragraphs: [
          "The full V1 plan covers ten image and video model families across OpenAI, Google, Black Forest Labs, BytePlus, Kling, and xAI. A public catalog explains models and capabilities. Signed-in users connect their own first-party credentials, generate or edit media, compare models, monitor asynchronous jobs, keep outputs, inspect usage, and create Eikon API keys.",
          "Creator and Developer views organize the same registry, jobs, assets, and account. The Creator gets common controls, advanced provider fields, history, gallery, and comparisons. The Developer gets schemas, raw JSON, logs, webhooks, copyable examples, and TypeScript and Python SDKs.",
        ],
      },
      {
        title: "What works now",
        paragraphs: [
          "The current web product handles text-to-image and image editing, reference images, reusable prompt skills, folders, generation history, usage analytics, Google sign-in, and a public REST endpoint. Three image variants can run today: Nano Banana 2, Nano Banana Pro, and GPT Image 2.",
          "The source-backed catalog already covers ten model families and records provider IDs, tasks, lifecycle, readiness, sources, and checked dates. It deliberately separates discovery from execution. Preview, deprecated, entitlement-restricted, and not-yet-integrated entries remain visible but cannot enter the generation selector.",
        ],
      },
      {
        title: "What comes next",
        paragraphs: [
          "The next engineering work completes the durable job system before adding more provider transports. That includes bounded retries, idempotent submissions, webhook or polling completion, cancellation, reconciliation, verified storage ownership, and cleanup that never guesses whether an object is safe to delete.",
          "After the image cutover is accepted, Eikon can add video execution and the remaining provider adapters, then comparison runs, model playgrounds, SDKs, webhooks, logs, and self-hosting documentation. The catalog may describe those families now, but each one becomes runnable only after its adapter, credential boundary, schema, storage path, and failure behavior are tested.",
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
    mappingFigure: {
      sourceLabel: "input or event",
      targetLabel: "Eikon mechanism",
      rows: [
        { source: "prompt + references", target: "Validated generation request" },
        { source: "provider + model", target: "Ready catalog entry and adapter" },
        { source: "returned bytes", target: "Convex storage and generation record" },
        { source: "completed job", target: "Gallery, history, and analytics" },
      ],
      caption: "One record follows the image from request through storage.",
      afterSection: 1,
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
      command: "curl -X POST https://eikonstudio.xyz/api/v1/generate -H 'Authorization: Bearer eik_…'",
      caption: "The API uses the same account-scoped generation path as the studio.",
      afterSection: 1,
    },
    footer: {
      statement: "One contract for the model catalog, the provider call, the job, and the media that comes back.",
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
