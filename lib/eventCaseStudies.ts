export type EventFact = {
  label: string;
  value: string;
  note: string;
};

export type EventStorySection = {
  title: string;
  paragraphs: readonly string[];
};

export type EventFlowStep = {
  title: string;
  detail: string;
};

export type EventLink = {
  label: string;
  href: string;
};

export type EventHighlight = {
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly string[];
  href?: string;
  linkLabel?: string;
};

export type EventCaseStudy = {
  slug: string;
  title: string;
  label: string;
  dateDisplay: string;
  startDate: string;
  endDate: string;
  datePublished: string;
  dateModified: string;
  place: string;
  summary: string;
  seoDescription: string;
  introduction: string;
  image: string;
  imageAlt: string;
  role: string;
  facts: readonly EventFact[];
  roles: readonly string[];
  sections: readonly EventStorySection[];
  flowTitle: string;
  flowCaption: string;
  flow: readonly EventFlowStep[];
  highlight?: EventHighlight;
  links: readonly EventLink[];
};

export const eventCaseStudies: readonly EventCaseStudy[] = [
  {
    slug: "supabase-first-move",
    title: "Supabase's First Move: Malaysian AI Show & Tell",
    label: "Community event",
    dateDisplay: "11 August 2026",
    startDate: "2026-08-11T17:00:00+08:00",
    endDate: "2026-08-11T20:00:00+08:00",
    datePublished: "2026-08-27",
    dateModified: "2026-08-27",
    place: "500 Social House, Kuala Lumpur",
    summary:
      "Paul Copplestone was already coming to Malaysia for AIMTO. We had less than two weeks to turn that visit into a Supabase conversation and a proper Malaysian.AI show-and-tell.",
    seoDescription:
      "How Malaysian.AI organized a Supabase show-and-tell with Paul Copplestone in under two weeks. I selected speakers, ran logistics, and hosted it.",
    introduction:
      "I planned the event, ran registration, chose the builders who would present, handled logistics, and hosted the night. I introduced Paul and every participant who took the stage.",
    image: "/events/supabase-first-move.webp",
    imageAlt: "A full room at Supabase's Malaysian AI Show and Tell event.",
    role: "Organizer, curator, and host",
    facts: [
      { label: "Registered", value: "300+", note: "Applications received" },
      { label: "Attended", value: "118", note: "Recorded on Luma" },
      { label: "Planning", value: "<2 weeks", note: "From idea to event night" },
    ],
    roles: [
      "Planned the event with Malaysian.AI and its partners",
      "Managed registration and attendee logistics",
      "Reviewed applications and selected the presenters",
      "MCed the event and introduced Paul and each builder",
    ],
    sections: [
      {
        title: "A Thursday format in a much bigger room",
        paragraphs: [
          "Malaysian.AI normally runs a show-and-tell every Thursday. People share the workflow, experiment, or project they are working on. It is deliberately not a pitch night. There are no market-size slides and no pressure to make an unfinished idea sound like a company.",
          "Paul's visit gave us a chance to keep that format while opening it to a much larger audience. He spoke about the path that led to Supabase, then roughly ten Malaysian builders showed what they were making.",
        ],
      },
      {
        title: "Choosing who got the microphone",
        paragraphs: [
          "The hardest part was selecting the presenters. More than 300 people registered, but the show-and-tell only worked if every demo gave the room something concrete to learn from. I reviewed the applications and chose a small group with real products, experiments, and technical stories.",
          "The audience noticed the difference. People were surprised by how little it felt like a pitch event, and several wanted to join the smaller Thursday sessions afterward.",
        ],
      },
    ],
    flowTitle: "Two weeks from idea to room",
    flowCaption: "The organizing sequence behind the event.",
    flow: [
      { title: "Opportunity", detail: "Paul Copplestone was in Malaysia for AIMTO." },
      { title: "Registration", detail: "More than 300 people applied to attend or demo." },
      { title: "Curation", detail: "I selected roughly ten builders for the stage." },
      { title: "Show", detail: "Paul's conversation led into rapid builder demos." },
      { title: "After", detail: "New people asked to join the weekly show-and-tell." },
    ],
    highlight: {
      eyebrow: "The demo I still remember",
      title: "An AI agent inside a music plugin",
      body:
        "One Japanese builder showed an AI agent built into a music plugin. It was the kind of demo the format was made for: specific, working, and interesting before anyone tried to sell it.",
    },
    links: [
      { label: "Event page", href: "https://luma.com/zkxj8z7b" },
      { label: "AI Malaysia Takeover", href: "https://aimto.my/" },
      { label: "Malaysian.AI", href: "https://www.malaysian.ai/" },
    ],
  },
  {
    slug: "cursor-hackathon-kashmir",
    title: "Cursor Hackathon Kashmir",
    label: "48-hour hackathon",
    dateDisplay: "28–29 March 2026",
    startDate: "2026-03-28T09:00:00+05:30",
    endDate: "2026-03-29T18:00:00+05:30",
    datePublished: "2026-08-27",
    dateModified: "2026-08-27",
    place: "NIT Srinagar, Kashmir",
    summary:
      "I had seen what large builder events could do in Malaysia. I wanted to take that culture home, so we spent more than two months organizing India's first Cursor Hackathon in Kashmir.",
    seoDescription:
      "How I organized Kashmir's first Cursor Hackathon at NIT Srinagar for 130 teams, with help from sponsors, volunteers, and local builders.",
    introduction:
      "I led the event with friends, student volunteers from NIT Srinagar, and people from IUST. We brought in seven sponsor tracks, filled the room with builders, and asked every team to build for people that large technology companies often overlook.",
    image: "/events/cursor-hackathon-kashmir.webp",
    imageAlt: "Builders gathered for Cursor Hackathon Kashmir at NIT Srinagar.",
    role: "Lead organizer and Cursor Ambassador",
    facts: [
      { label: "Registered", value: "650+", note: "Builders from across India" },
      { label: "Teams", value: "130", note: "Upper count from event records" },
      { label: "Projects", value: "80", note: "Submitted during the weekend" },
    ],
    roles: [
      "Created the event and the Build for the Next Billion theme",
      "Coordinated NIT Srinagar, volunteers, judges, and seven sponsor tracks",
      "Brought sponsor relationships from the Malaysia hackathon to Kashmir",
      "Ran a Cursor workshop and helped judge the final projects",
    ],
    sections: [
      {
        title: "Taking builder culture back home",
        paragraphs: [
          "I had not seen a national-scale hackathon in Kashmir while I was growing up there. After moving to Malaysia, I kept seeing rooms full of people building together. I wanted people back home to have that same experience.",
          "The theme, Build for the Next Billion, came from a larger frustration. Kashmir has talented builders, but no major technology company has emerged from the region yet. The theme asked teams to picture that future and make software for users outside the usual Silicon Valley assumptions.",
        ],
      },
      {
        title: "Two months of moving parts",
        paragraphs: [
          "NIT Srinagar became the venue partner. Cursor support came through my ambassador role. OpenAI came through relationships I had built in Malaysia, and several other sponsors had already worked with me during Cursor Hackathon Malaysia.",
          "The difficult part was not one technical problem. It was keeping the venue, volunteers, participants, judges, food, sponsor tracks, prizes, and reporting moving at the same time. We nearly started without the main hall for the opening ceremony. It came together just in time.",
        ],
      },
      {
        title: "The room became the evidence",
        paragraphs: [
          "The final fifteen teams pitched working prototypes after an overnight build. The event was covered by local newspapers, and participants kept sharing what they had made after the weekend ended.",
          "I plan to run it again next year. Bringing events like this back to Kashmir is now something I want to keep doing, not a one-off experiment.",
        ],
      },
    ],
    flowTitle: "How the hackathon came together",
    flowCaption: "From a personal idea to a 48-hour event with 130 teams.",
    flow: [
      { title: "Theme", detail: "Build for the Next Billion gave the weekend a reason." },
      { title: "Partners", detail: "NIT, Cursor, and sponsors made the scale possible." },
      { title: "Build", detail: "Teams worked through the night across seven tracks." },
      { title: "Finals", detail: "Fifteen teams presented working prototypes." },
      { title: "Return", detail: "The next Kashmir edition is already part of the plan." },
    ],
    highlight: {
      eyebrow: "First place",
      title: "UncDoIt was a GPS for the web",
      body:
        "The winning team built a browser extension for people who struggle with complex websites, especially first-time and older internet users. It gave step-by-step visual and voice guidance in 11 Indian languages, including on government portals.",
      points: [
        "First overall and a ₹20,000 prize",
        "Visual and voice guidance across websites",
        "Support for 11 Indian languages",
      ],
      href: "https://in.linkedin.com/in/harshita-bb9168286",
      linkLabel: "Read the team's description",
    },
    links: [
      { label: "Official event page", href: "https://luma.com/za5937hy" },
      { label: "HackHQ case study", href: "https://hackhq.io/customers/cursor-hackathon-kashmir" },
      {
        label: "NIT Srinagar results",
        href: "https://www.linkedin.com/posts/nitsriofficial_nitsrinagar-cursorhackathon-bis-activity-7444068294979923968-k4hE",
      },
      {
        label: "Greater Kashmir coverage",
        href: "https://www.scribd.com/document/1019987509/31-March-2026-Greater-Kashmir",
      },
      {
        label: "Kashmir Reader coverage",
        href: "https://kashmirreader.com/2026/03/29/two-day-cursor-hackathon-kashmir-kicks-off-at-nit-srinagar/",
      },
    ],
  },
  {
    slug: "ai-hackerdorm-builder-summit",
    title: "AI Hackerdorm Student Builder Summit",
    label: "Student builder summit",
    dateDisplay: "22 November 2025",
    startDate: "2025-11-22T12:00:00+08:00",
    endDate: "2025-11-22T18:00:00+08:00",
    datePublished: "2026-08-27",
    dateModified: "2026-08-27",
    place: "Taylor's University Lakeside Campus",
    summary:
      "AI Hackerdorm started because we wanted to bring the builder culture around Malaysian.AI to students. The Student Builder Summit was our first attempt to put that community into one full-day event.",
    seoDescription:
      "How we organized AI Hackerdorm's first Student Builder Summit at Taylor's University and built one of Malaysia's largest student AI communities.",
    introduction:
      "I joined as a co-founder and Head of Tech because the team wanted someone with experience in both technology and community work. The summit was also the first event I officially hosted.",
    image: "/events/ai-hackerdorm-builder-summit.webp",
    imageAlt: "Organizers and builders at the AI Hackerdorm Student Builder Summit.",
    role: "Co-founder, Head of Tech, and host",
    facts: [
      { label: "Program", value: "6 hours", note: "12 PM to 6 PM" },
      { label: "Access", value: "Free", note: "Built for students" },
      { label: "Community", value: "Weekly", note: "Showcase and co-building sessions" },
    ],
    roles: [
      "Helped shape AI Hackerdorm as a student builder community",
      "Owned the technical side as co-founder and Head of Tech",
      "Helped market the summit and bring students into the room",
      "Hosted the event and joined a fireside conversation",
    ],
    sections: [
      {
        title: "Taking the community to students",
        paragraphs: [
          "I was already part of Malaysian.AI when the idea started. We wanted students to have a place where showing unfinished work was normal and where building mattered more than polishing a pitch.",
          "AI Hackerdorm grew around weekly sessions with one hour for project updates and another for building together. The summit opened that format for a full day, with a main builder room and optional conversations about jobs, startups, research, and student projects.",
        ],
      },
      {
        title: "My first event as an official host",
        paragraphs: [
          "My fireside conversation was about balancing building with classes, work, and the rest of life. Behind the stage, I was also dealing with the less visible parts of a first event: marketing it, convincing people to come, and making sure the technical side held together.",
          "That made hosting feel different from simply attending or helping in the background. I had to be responsible for the energy in the room as well as the program.",
        ],
      },
      {
        title: "When the community felt real",
        paragraphs: [
          "My favorite part was meeting attendees who already knew who I was even though I had never met them. It was a strange but useful signal that the community had started to exist beyond the organizing team.",
          "AI Hackerdorm continued after the summit and has grown into one of the larger student builder communities in Malaysia. The summit was not the finish. It gave the regular sessions more people and a stronger identity.",
        ],
      },
    ],
    flowTitle: "The summit format",
    flowCaption: "A full-day version of AI Hackerdorm's regular builder sessions.",
    flow: [
      { title: "Arrive", detail: "Students found collaborators and picked what to build." },
      { title: "Build", detail: "The main builder room stayed open through the day." },
      { title: "Listen", detail: "Optional sessions covered work, startups, and research." },
      { title: "Talk", detail: "Student builders shared honest stories in a fireside chat." },
      { title: "Continue", detail: "The community returned to weekly building sessions." },
    ],
    links: [
      {
        label: "Summit page",
        href: "https://www.aihackerdorm.com/events/ai-hackerdorm-student-builder-summit",
      },
      { label: "Luma event page", href: "https://luma.com/zimvn6fu" },
      { label: "AI Hackerdorm", href: "https://www.aihackerdorm.com/" },
    ],
  },
] as const;

export function getEventCaseStudy(slug: string): EventCaseStudy | undefined {
  return eventCaseStudies.find((event) => event.slug === slug);
}
