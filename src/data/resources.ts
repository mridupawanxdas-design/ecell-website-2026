export interface BookResource {
  id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  synopsis: string;
  keyTakeaway: string;
  link: string;
}

export interface PodcastResource {
  id: string;
  title: string;
  host: string;
  category: string;
  coverImage: string;
  description: string;
  highlightEpisode: string;
  spotifyUrl: string;
  youtubeUrl?: string;
}

export interface VideoResource {
  id: string;
  title: string;
  channel: string;
  category: "E-Cell NITS Official" | "Masterclass" | "Case Study";
  thumbnail: string;
  duration: string;
  videoUrl: string;
  description: string;
}

export interface InstagramResource {
  id: string;
  title: string;
  handle: string;
  category: "Infographic" | "Reel" | "Case Study";
  thumbnail: string;
  summary: string;
  postUrl: string;
  likesCount?: string;
}

export const booksData: BookResource[] = [
  {
    id: "b-1",
    title: "Zero to One: Notes on Startups, or How to Build the Future",
    author: "Peter Thiel & Blake Masters",
    category: "Venture & Innovation",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    synopsis: "Explores how to create original technological progress—moving from 0 to 1—rather than copying existing models from 1 to n.",
    keyTakeaway: "Monopoly over a small niche market is the key foundation for enduring competitive advantage.",
    link: "https://www.goodreads.com/book/show/18050143-zero-to-one",
  },
  {
    id: "b-2",
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Product & Execution",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    synopsis: "The quintessential framework for building Minimum Viable Products (MVPs), validated learning, and rapid feedback loops.",
    keyTakeaway: "Build-Measure-Learn cycle drastically shortens time-to-product-market-fit while conserving scarce capital.",
    link: "https://www.goodreads.com/book/show/10127019-the-lean-startup",
  },
  {
    id: "b-3",
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    category: "Leadership & Crisis",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    synopsis: "Raw, unvarnished wisdom from a16z co-founder on steering startups through crises, layoffs, and difficult executive dilemmas.",
    keyTakeaway: "Peacetime CEO vs. Wartime CEO management tactics differ fundamentally when company survival is at stake.",
    link: "https://www.goodreads.com/book/show/18174464-the-hard-thing-about-hard-things",
  },
  {
    id: "b-4",
    title: "Shoe Dog: A Memoir by the Creator of Nike",
    author: "Phil Knight",
    category: "Founders & Grit",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
    synopsis: "The gritty, candid backstory of importing Japanese running shoes on shoestring debt to forging a global athletic titan.",
    keyTakeaway: "Tenacity, supply-chain resilience, and obsessive passion overcome persistent near-bankruptcy phases.",
    link: "https://www.goodreads.com/book/show/27220736-shoe-dog",
  },
];

export const podcastsData: PodcastResource[] = [
  {
    id: "p-1",
    title: "How I Built This",
    host: "Guy Raz (NPR)",
    category: "Founder Stories",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800",
    description: "In-depth narrative journeys with the world's greatest entrepreneurs delving into the earliest doubts and breakthrough moments.",
    highlightEpisode: "Airbnb: Joe Gebbia & Brian Chesky",
    spotifyUrl: "https://open.spotify.com/show/6E709HRbtGezSVMrTg8oZZ",
    youtubeUrl: "https://www.youtube.com/results?search_query=How+I+built+this+Guy+Raz",
  },
  {
    id: "p-2",
    title: "Masters of Scale",
    host: "Reid Hoffman (LinkedIn Co-Founder)",
    category: "Hyper-Growth Strategy",
    coverImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
    description: "Legendary Silicon Valley investor tests non-obvious theories on how companies scale from zero to a 100 million users.",
    highlightEpisode: "Do Things That Don't Scale (with Brian Chesky)",
    spotifyUrl: "https://open.spotify.com/show/1bJRgaFYYypAY33OxTX5GR",
    youtubeUrl: "https://www.youtube.com/results?search_query=Masters+of+Scale+Reid+Hoffman",
  },
  {
    id: "p-3",
    title: "The Ranveer Show (Startup & Business Edition)",
    host: "Ranveer Allahbadia",
    category: "Indian Startup Ecosystem",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    description: "Intimate long-form conversations with India's top founders from Zerodha, Boat, PhysicsWallah, and Mamaearth.",
    highlightEpisode: "Nithin Kamath on Bootstrapping Zerodha to Billions",
    spotifyUrl: "https://open.spotify.com/show/6ZcvVBPQ2SNraVll9reFD1",
    youtubeUrl: "https://www.youtube.com/results?search_query=TRS+Startup+Episodes",
  },
];

export const videosData: VideoResource[] = [
  {
    id: "v-1",
    title: "E-Cell NIT Silchar: Orientation & Innovation Conclave",
    channel: "E-Cell NIT Silchar Official",
    category: "E-Cell NITS Official",
    thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    duration: "48:15",
    videoUrl: "https://www.youtube.com/@ecellnitsilchar",
    description: "Keynote address by alumni entrepreneurs and mentors on launching startups from campus labs and incubation centres.",
  },
  {
    id: "v-2",
    title: "CS183F: Startup School - How to Evaluate Startup Ideas",
    channel: "Y Combinator",
    category: "Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    duration: "32:10",
    videoUrl: "https://www.youtube.com/watch?v=Th8Joqa44Co",
    description: "Kevin Hale explains how investors evaluate startup ideas using problem severity, market size, unfair advantages, and founder fit.",
  },
  {
    id: "v-3",
    title: "How Zerodha Bootstrapped to ₹4,000 Cr Profit Without Any VC",
    channel: "Finnovate Breakdown",
    category: "Case Study",
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    duration: "18:42",
    videoUrl: "https://www.youtube.com/results?search_query=Zerodha+case+study",
    description: "A deep dive into frugal engineering, zero marketing budget, and product-led word of mouth in fintech.",
  },
];

export const instagramData: InstagramResource[] = [
  {
    id: "ig-1",
    title: "Decoding The Cap Table: From Day 0 to Series A",
    handle: "@ecell.nits",
    category: "Infographic",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
    summary: "Visual guide illustrating dilution math across angel round, ESOP pool setup, and lead institutional investor stakes.",
    postUrl: "https://www.instagram.com/ecell.nits/",
    likesCount: "1.4k",
  },
  {
    id: "ig-2",
    title: "What is a SAFE Note? Simple Explainer for College Founders",
    handle: "@ecell.nits",
    category: "Reel",
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800",
    summary: "Simple Agreement for Future Equity simplified: Valuation caps, discount rates, and how it defers pricing till next round.",
    postUrl: "https://www.instagram.com/ecell.nits/",
    likesCount: "2.1k",
  },
  {
    id: "ig-3",
    title: "5 Indian Startups That Started From College Dorms",
    handle: "@ecell.nits",
    category: "Case Study",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    summary: "From campus hostel rooms to unicorn status: Ola, Swiggy, InMobi, RedBus, and Rapido founding stories.",
    postUrl: "https://www.instagram.com/ecell.nits/",
    likesCount: "3.5k",
  },
];
