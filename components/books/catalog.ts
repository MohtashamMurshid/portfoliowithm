export type BookMotif =
  | "lattice"
  | "corrosion"
  | "efficiency"
  | "network"
  | "boom"
  | "organization"
  | "schematic"
  | "flight"
  | "circuit"
  | "orbit"
  | "branches"
  | "wave"
  | "runner"
  | "gather"
  | "maze"
  | "fracture"
  | "continuum"
  | "windows"
  | "steps";

export type CatalogBook = {
  id: string;
  title: string;
  shortTitle: string;
  author: string;
  description: string;
  quote: string;
  quoteBy: string;
  format: string;
  availability: string;
  url: string;
  cover: string;
  accent: string;
  ink: string;
  motif: BookMotif;
  height: number;
  thickness: number;
  /**
   * Optional browser URL for contributor-owned front-cover art. Put local
   * images under `public/books/<id>/` and use a URL such as
   * `/books/<id>/cover.webp`.
   */
  coverImage?: string;
  linkLabel?: string;
  living?: boolean;
};

/**
 * Personal shelf — order is intentional (source order, not height-sorted).
 * `description` = my review · `availability` = rating note · `quote` = takeaway.
 */
export const catalog: CatalogBook[] = [
  {
    id: "the-silent-patient",
    title: "The Silent Patient",
    shortTitle: "Silent Patient",
    author: "Alex Michaelides",
    description:
      "A psychological thriller that kept me guessing until the last act. Alicia’s silence is the real engine of the story — less about what happened in the studio, and more about who we trust to narrate the truth. Tight, propulsive, and a little cruel in the best way.",
    quote: "The endings we believe often say more about us than the story.",
    quoteBy: "My note",
    format: "Hardcover · thriller",
    availability: "★★★★☆ · Twist stays with you",
    url: "https://www.goodreads.com/book/show/40097951-the-silent-patient",
    linkLabel: "Open on Goodreads",
    cover: "#1f2430",
    accent: "#c45c4a",
    ink: "#f3ebe0",
    motif: "fracture",
    height: 2.08,
    thickness: 0.22,
  },
  {
    id: "the-alchemist",
    title: "The Alchemist",
    shortTitle: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A short fable I return to when life feels noisy. Santiago’s journey is simple on the surface, but the idea of a Personal Legend — choosing the path that keeps calling you — lands harder every time I re-read it. Soft, earnest, and oddly practical.",
    quote: "When you want something, all the universe conspires in helping you to achieve it.",
    quoteBy: "Paulo Coelho",
    format: "Hardcover · fable",
    availability: "★★★★★ · Comfort re-read",
    url: "https://www.goodreads.com/book/show/18144590-the-alchemist",
    linkLabel: "Open on Goodreads",
    cover: "#c4a35a",
    accent: "#2f5c4f",
    ink: "#1f1a14",
    motif: "continuum",
    height: 1.95,
    thickness: 0.17,
    living: true,
  },
  {
    id: "the-prince",
    title: "The Prince",
    shortTitle: "The Prince",
    author: "Niccolò Machiavelli",
    description:
      "Cold, clear, and still uncomfortable centuries later. I read it less as a villain’s handbook and more as a ruthless study of power — how perception, timing, and force shape outcomes. Dense for its length; every chapter feels like a warning dressed as advice.",
    quote: "It is better to be feared than loved, if you cannot be both.",
    quoteBy: "Niccolò Machiavelli",
    format: "Hardcover · political philosophy",
    availability: "★★★★☆ · Short, sharp, lasting",
    url: "https://www.goodreads.com/book/show/28862.The_Prince",
    linkLabel: "Open on Goodreads",
    cover: "#3a1f2b",
    accent: "#d4af6a",
    ink: "#f4ebe0",
    motif: "schematic",
    height: 1.92,
    thickness: 0.16,
  },
  {
    id: "harry-potter-1",
    title: "Harry Potter and the Philosopher’s Stone",
    shortTitle: "Philosopher’s Stone",
    author: "J. K. Rowling",
    description:
      "Where the whole world opens. The wonder still works — the letters, the castle, the first night in the Great Hall. I love how confidently it builds a home before it asks you to fight for it.",
    quote: "It does not do to dwell on dreams and forget to live.",
    quoteBy: "Albus Dumbledore",
    format: "Hardcover · Book 1 of 7",
    availability: "★★★★★ · Series opener",
    url: "https://www.goodreads.com/book/show/3.Harry_Potter_and_the_Sorcerer_s_Stone",
    linkLabel: "Open on Goodreads",
    cover: "#7a1f2a",
    accent: "#d4a84b",
    ink: "#f7efdf",
    motif: "windows",
    height: 2.02,
    thickness: 0.2,
  },
  {
    id: "harry-potter-2",
    title: "Harry Potter and the Chamber of Secrets",
    shortTitle: "Chamber of Secrets",
    author: "J. K. Rowling",
    description:
      "Darker corridors, stronger friendships. The diary plot still feels clever, and the basilisk arc taught me early that courage is often quieter than bravado — showing up for people when it costs you something.",
    quote: "It is our choices… that show what we truly are.",
    quoteBy: "Albus Dumbledore",
    format: "Hardcover · Book 2 of 7",
    availability: "★★★★☆ · Growing shadows",
    url: "https://www.goodreads.com/book/show/15881.Harry_Potter_and_the_Chamber_of_Secrets",
    linkLabel: "Open on Goodreads",
    cover: "#2f5f4a",
    accent: "#e0c56a",
    ink: "#f4efe3",
    motif: "maze",
    height: 2.04,
    thickness: 0.21,
  },
  {
    id: "harry-potter-3",
    title: "Harry Potter and the Prisoner of Azkaban",
    shortTitle: "Prisoner of Azkaban",
    author: "J. K. Rowling",
    description:
      "My favorite early book in the series. Time-turners, the Marauder’s Map, and a story about loyalty that refuses to stay simple. The tone shifts — more mystery than boarding-school comfort — and I was all in.",
    quote: "Happiness can be found even in the darkest of times.",
    quoteBy: "Albus Dumbledore",
    format: "Hardcover · Book 3 of 7",
    availability: "★★★★★ · Peak middle-magic",
    url: "https://www.goodreads.com/book/show/5.Harry_Potter_and_the_Prisoner_of_Azkaban",
    linkLabel: "Open on Goodreads",
    cover: "#1d3557",
    accent: "#c9a227",
    ink: "#f2ebe0",
    motif: "orbit",
    height: 2.08,
    thickness: 0.23,
    living: true,
  },
  {
    id: "harry-potter-4",
    title: "Harry Potter and the Goblet of Fire",
    shortTitle: "Goblet of Fire",
    author: "J. K. Rowling",
    description:
      "The series grows up in public. Triwizard spectacle, international wizarding life, and a ending that permanently raises the stakes. Long, but the tournament structure kept me turning pages deep into the night.",
    quote: "Dark and difficult times lie ahead.",
    quoteBy: "Albus Dumbledore",
    format: "Hardcover · Book 4 of 7",
    availability: "★★★★★ · The turn",
    url: "https://www.goodreads.com/book/show/6.Harry_Potter_and_the_Goblet_of_Fire",
    linkLabel: "Open on Goodreads",
    cover: "#4a2c6a",
    accent: "#e2b84a",
    ink: "#f6f0e4",
    motif: "boom",
    height: 2.16,
    thickness: 0.28,
  },
  {
    id: "harry-potter-5",
    title: "Harry Potter and the Order of the Phoenix",
    shortTitle: "Order of the Phoenix",
    author: "J. K. Rowling",
    description:
      "Anger, bureaucracy, and found family under pressure. Harry’s frustration is the point — adolescence colliding with a world that refuses to listen. Dense and emotional; the Department of Mysteries payoff still hits.",
    quote: "The ones that love us never really leave us.",
    quoteBy: "Sirius Black",
    format: "Hardcover · Book 5 of 7",
    availability: "★★★★☆ · Long, necessary storm",
    url: "https://www.goodreads.com/book/show/2.Harry_Potter_and_the_Order_of_the_Phoenix",
    linkLabel: "Open on Goodreads",
    cover: "#243447",
    accent: "#b85c38",
    ink: "#efe6d6",
    motif: "organization",
    height: 2.2,
    thickness: 0.3,
  },
  {
    id: "harry-potter-6",
    title: "Harry Potter and the Half-Blood Prince",
    shortTitle: "Half-Blood Prince",
    author: "J. K. Rowling",
    description:
      "Memory, mentorship, and dread braided together. The Horcrux lessons are fascinating, and the ending still feels like someone quietly closing a door you weren’t ready to leave. Elegant setup for the final war.",
    quote: "It is the unknown we fear when we look upon death and darkness.",
    quoteBy: "Albus Dumbledore",
    format: "Hardcover · Book 6 of 7",
    availability: "★★★★★ · Quiet devastation",
    url: "https://www.goodreads.com/book/show/1.Harry_Potter_and_the_Half_Blood_Prince",
    linkLabel: "Open on Goodreads",
    cover: "#5c6b3a",
    accent: "#d7b45a",
    ink: "#f3ecdf",
    motif: "corrosion",
    height: 2.12,
    thickness: 0.25,
  },
  {
    id: "harry-potter-7",
    title: "Harry Potter and the Deathly Hallows",
    shortTitle: "Deathly Hallows",
    author: "J. K. Rowling",
    description:
      "Camping, doubt, and the cost of finishing what childhood began. Not always tidy, but emotionally complete — especially the moments that choose love and ordinary courage over spectacle. A worthy close to a formative series.",
    quote: "Of course it is happening inside your head… but why on earth should that mean that it is not real?",
    quoteBy: "Albus Dumbledore",
    format: "Hardcover · Book 7 of 7",
    availability: "★★★★★ · Series finale",
    url: "https://www.goodreads.com/book/show/136251.Harry_Potter_and_the_Deathly_Hallows",
    linkLabel: "Open on Goodreads",
    cover: "#1a1a1a",
    accent: "#c9a44a",
    ink: "#f0e8da",
    motif: "lattice",
    height: 2.18,
    thickness: 0.29,
    living: true,
  },
  {
    id: "percy-jackson-1",
    title: "The Lightning Thief",
    shortTitle: "Lightning Thief",
    author: "Rick Riordan",
    description:
      "Greek myth with skateboard energy. Percy’s voice is funny without being empty, and Camp Half-Blood still feels like one of the best found-family setups in middle-grade fantasy. Pure momentum.",
    quote: "If my life is going to mean anything, I have to live it myself.",
    quoteBy: "Percy Jackson",
    format: "Hardcover · Book 1 of 5",
    availability: "★★★★★ · Instant favorite",
    url: "https://www.goodreads.com/book/show/28187.The_Lightning_Thief",
    linkLabel: "Open on Goodreads",
    cover: "#1f4d7a",
    accent: "#f0b429",
    ink: "#f7f2e8",
    motif: "flight",
    height: 2.0,
    thickness: 0.2,
  },
  {
    id: "percy-jackson-2",
    title: "The Sea of Monsters",
    shortTitle: "Sea of Monsters",
    author: "Rick Riordan",
    description:
      "Quests get messier, friendships get sharper. Tyson’s arc surprised me with how much heart sits under the jokes, and the Bermuda Triangle set pieces are peak Riordan chaos in the best sense.",
    quote: "Family isn’t about blood. It’s about who shows up.",
    quoteBy: "My note",
    format: "Hardcover · Book 2 of 5",
    availability: "★★★★☆ · Bigger sea, bigger stakes",
    url: "https://www.goodreads.com/book/show/28186.The_Sea_of_Monsters",
    linkLabel: "Open on Goodreads",
    cover: "#0f6a6a",
    accent: "#e07a3d",
    ink: "#f4efe6",
    motif: "wave",
    height: 1.98,
    thickness: 0.19,
  },
  {
    id: "percy-jackson-3",
    title: "The Titan’s Curse",
    shortTitle: "Titan’s Curse",
    author: "Rick Riordan",
    description:
      "Where the series starts carrying real weight. The prophecy threads tighten, Bianca’s choices hurt, and the hunt across America keeps the adventure wide without losing the emotional center.",
    quote: "Even heroes need people who refuse to leave.",
    quoteBy: "My note",
    format: "Hardcover · Book 3 of 5",
    availability: "★★★★★ · Emotional gear-shift",
    url: "https://www.goodreads.com/book/show/561456.The_Titan_s_Curse",
    linkLabel: "Open on Goodreads",
    cover: "#2b2b4a",
    accent: "#d9a441",
    ink: "#f2ebe0",
    motif: "runner",
    height: 2.01,
    thickness: 0.2,
  },
  {
    id: "percy-jackson-4",
    title: "The Battle of the Labyrinth",
    shortTitle: "Battle of the Labyrinth",
    author: "Rick Riordan",
    description:
      "The Labyrinth is a perfect metaphor for growing up sideways — wrong turns, sudden rooms, people you didn’t expect. Annabeth’s competence and Percy’s loyalty make this one of the strongest team books in the set.",
    quote: "The maze only wins if you stop moving.",
    quoteBy: "My note",
    format: "Hardcover · Book 4 of 5",
    availability: "★★★★★ · Best middle entry",
    url: "https://www.goodreads.com/book/show/2120932.The_Battle_of_the_Labyrinth",
    linkLabel: "Open on Goodreads",
    cover: "#5a3d2b",
    accent: "#7ec8c0",
    ink: "#f6f0e6",
    motif: "maze",
    height: 2.05,
    thickness: 0.22,
  },
  {
    id: "percy-jackson-5",
    title: "The Last Olympian",
    shortTitle: "Last Olympian",
    author: "Rick Riordan",
    description:
      "A finale that actually finishes. The war for Manhattan is loud and cinematic, but the quieter loyalty beats — prophecy, friendship, choosing what kind of hero to be — are why I still recommend the whole series.",
    quote: "The real power is deciding which prophecy you live by.",
    quoteBy: "My note",
    format: "Hardcover · Book 5 of 5",
    availability: "★★★★★ · Satisfying close",
    url: "https://www.goodreads.com/book/show/4556058.The_Last_Olympian",
    linkLabel: "Open on Goodreads",
    cover: "#12263a",
    accent: "#ef5b3c",
    ink: "#f3ebdf",
    motif: "steps",
    height: 2.1,
    thickness: 0.24,
    living: true,
  },
  {
    id: "nineteen-eighty-four",
    title: "1984",
    shortTitle: "1984",
    author: "George Orwell",
    description:
      "Bleak, precise, and still alarmingly useful as a lens. Beyond the slogans, what stayed with me is how language and memory get fenced until resistance feels almost unthinkable. Essential, uncomfortable reading.",
    quote: "Freedom is the freedom to say that two plus two make four.",
    quoteBy: "George Orwell",
    format: "Hardcover · dystopian classic",
    availability: "★★★★★ · Required re-read",
    url: "https://www.goodreads.com/book/show/61439040-1984",
    linkLabel: "Open on Goodreads",
    cover: "#222222",
    accent: "#c0392b",
    ink: "#ece6da",
    motif: "efficiency",
    height: 2.06,
    thickness: 0.21,
  },
] satisfies CatalogBook[];
