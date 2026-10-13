/*
 * One-off seed — ports the 5 hardcoded blog posts from
 * fiit-website/src/app/blog/posts.ts into Convex's `blogPosts` table.
 *
 * Converts the legacy `body: string[]` format into TipTap JSON (each
 * string becomes a paragraph node). All posts import as "published"
 * with their original date as `publishedAt`.
 *
 * Usage: node scripts/seed-blog-posts.mjs
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

// ── Helper: convert string[] → TipTap JSON doc ──────────────────────────
// Each paragraph string becomes a paragraph node with a single text run.
// Empty strings become empty paragraph nodes (spacing).
function paragraphsToTipTapJson(paragraphs) {
  return JSON.stringify({
    type: "doc",
    content: paragraphs.map((text) => ({
      type: "paragraph",
      content: text.trim()
        ? [{ type: "text", text: text.trim() }]
        : [],
    })),
  });
}

// Mirror of fiit-website/src/app/blog/posts.ts POSTS array. Hardcoded here
// to keep this script self-contained.
const POSTS = [
  {
    slug: "new-years-wishes-from-jason",
    featured: true,
    category: "Reflection",
    title: "New Year's Wishes From Jason",
    excerpt: "A minute to share some thoughts about this past year: the community we've built, the lessons from the floor, and what we're carrying into the next.",
    author: "Jason Battiste",
    publishedAt: "2025-12-30T00:00:00Z",
    readTime: "5 min read",
    coverImageUrl: "/blog/new-years-wishes.jpg",
    body: [
      "Another year on the floor at 1047 Gerrard. Another year of early mornings, late nights, and every kind of person imaginable walking through our doors: first-timers nervous about their first class, returning fighters sharpening their tools, parents bringing their kids to learn what discipline actually feels like.",
      "When I opened FIIT Co., the goal was simple: build a room where real technique lives next to real community. Where the person on the bag next to you might be a former pro, and might be a neighbour who'd never thrown a punch in their life six months ago. That mix is everything. It's what keeps this sport honest.",
      "This year, I watched members hit milestones I know they didn't think they could. I watched trainers step up and coach with more patience and precision than I did at their age. I watched the community take care of itself, with people checking on each other, showing up for each other, pushing each other harder than I ever could from the whiteboard.",
      "Heading into the new year, my wish for you is the same one I've given myself: don't stop when you're tired. Stop when you're done. Whatever \"done\" looks like for you (a fight, a transformation, a rep you've been chasing for months), it's going to take longer than you think, and it's going to be worth it.",
      "Thank you for trusting us with your training. See you on the floor.",
      "- Jason",
    ],
  },
  {
    slug: "new-years-resolutions-habits-that-stick",
    featured: false,
    category: "Habits",
    title: "New Year's Resolutions: Building Habits That Stick",
    excerpt: "The second Friday in January is known as 'Quitters Day.' Here's how to set goals that survive past February, and why training is the easiest habit to anchor.",
    author: "Jason Battiste",
    publishedAt: "2025-01-21T00:00:00Z",
    readTime: "6 min read",
    coverImageUrl: "/blog/ny-resolutions.jpeg",
    body: [
      "The second Friday of January has a nickname in the behavioural-psychology world: Quitters Day. It's the day most New Year's resolutions officially get abandoned. By February, most of the rest are gone. By March, the gyms empty out. It happens every year and it's not because people lack discipline. It's because the goals they set were impossible to sustain in the first place.",
      "A resolution like \"get in shape\" is a direction, not a plan. A plan is something like: I'm going to show up at FIIT three times a week for the next eight weeks, and I'm going to let my trainer handle what happens once I walk in. The decision that matters is the first one: showing up. Everything after that is already built for you.",
      "The reason boxing training is one of the easiest habits to anchor is that the feedback loop is immediate. You're not staring at a mirror waiting for a six-pack to appear. You're learning a jab. You're learning how to move your feet. You're learning how to breathe under work. Every class, you're measurably better at something, even on the days you don't feel like it. That's dopamine. That's what keeps you coming back.",
      "Here's the framework I give members who want their January resolution to still be standing in July:",
      "1. Commit to a rhythm, not a transformation. Three sessions a week for eight weeks, no negotiation. Put them in your calendar. Treat them like meetings.",
      "2. Show up tired. Most of your best sessions will be on the days you didn't want to come in. Show up anyway. Even a light session beats skipping.",
      "3. Stop measuring the wrong things. Don't weigh yourself weekly. Notice what the work is doing to your energy, your sleep, your mood, your confidence. Those are the real metrics.",
      "4. Let the community carry you. The people around you on the floor are the most underrated part of this gym. When you're flat, they pull you up. When they're flat, you return the favour. That's how a habit survives its own bad days.",
      "You don't need a transformation. You need a rhythm. If you get the rhythm right, the transformation shows up on its own.",
    ],
  },
  {
    slug: "support-local",
    featured: false,
    category: "Community",
    title: "Support Local",
    excerpt: "Why the Leslieville corner we call home matters, and the neighbours, makers, and small businesses we train alongside.",
    author: "FIIT Co.",
    publishedAt: "2025-01-15T00:00:00Z",
    readTime: "3 min read",
    coverImageUrl: "/blog/support-local.png",
    body: [
      "FIIT Co. sits on a corner in Leslieville where every second storefront belongs to somebody who took a risk to open it. Butchers, bakers, roasters, florists, tattoo artists, boutique grocers. The whole stretch of Gerrard East runs on small businesses run by people who live in the neighbourhood.",
      "When we picked 1047 Gerrard, we weren't just picking a building. We were picking a block. A community that shows up for each other, supports each other, sends each other customers, and keeps the street alive.",
      "If you train at FIIT and you haven't explored the corner yet, do yourself a favour. Grab a coffee next door. Pick up something for dinner on your way home. Nod to the people you see in the morning on your way in. The neighbourhood is part of what makes this studio what it is. Support the people who support us.",
    ],
  },
  {
    slug: "sweet-potato-brownies",
    featured: false,
    category: "Nutrition",
    title: "Sweet Potato Brownies",
    excerpt: "A recipe for the sweet cravings that hit after a hard session. Healthier, easier than you think, and actually good.",
    author: "Jason Battiste",
    publishedAt: "2025-01-31T00:00:00Z",
    readTime: "4 min read",
    coverImageUrl: "/blog/sweet-potato-brownies.webp",
    body: [
      "Nobody trains hard and then eats perfectly. If you tell me you do, I don't believe you. The trick isn't avoiding the cravings. It's having something on hand that hits the craving without wrecking your recovery.",
      "These sweet potato brownies are my go-to. They're dense, fudgy, genuinely chocolatey, and built on a base that's mostly protein, fibre, and real food. No wheat flour, no refined sugar, no protein-bar aftertaste. Just a proper brownie that happens to be good for you.",
      "What you need: one large sweet potato (about 2 cups mashed), 3/4 cup almond butter or peanut butter, 1/3 cup maple syrup or honey, 1/2 cup cocoa powder, 2 eggs, 1 tsp vanilla, 1/2 tsp baking soda, pinch of salt, handful of dark chocolate chips if you want them.",
      "Roast the sweet potato whole at 400°F for about 45 minutes until soft. Scoop the flesh out, mash it smooth, let it cool a bit. Mix everything in one bowl. Pour into a parchment-lined 8x8 pan. Bake at 350°F for 25–30 minutes. Let it cool in the pan before cutting or the middle will fall apart on you.",
      "Store them in the fridge. They'll keep for a week and they get better after a day. Eat one with a coffee after a hard session and you'll understand.",
    ],
  },
  {
    slug: "fiit-for-spring",
    featured: false,
    category: "Nutrition",
    title: "FIIT For Spring",
    excerpt: "Moving our bodies. Fuelling our bodies. It takes commitment, discipline, hard work. A guest post from Caitlyn Bertone, owner of Better Bowls.",
    author: "Caitlyn Bertone · Better Bowls",
    publishedAt: "2025-04-03T00:00:00Z",
    readTime: "5 min read",
    coverImageUrl: "/blog/fiit-for-spring.webp",
    body: [
      "Hey FIIT Co. community, Caitlyn here, from Better Bowls. Jason asked me to write a little something as spring rolls in, because spring is the season most people start thinking seriously about how they're eating again. I spend my whole week feeding athletes and busy humans through Better Bowls, so here's what I tell them.",
      "Spring isn't about shedding weight for summer. That's the wrong frame. Spring is about giving your body more of what it's been missing all winter: real colour, real vegetables, proper hydration, enough protein to actually rebuild from the work you're putting in on the floor at FIIT.",
      "The single biggest change I see make a difference isn't a diet. It's just eating enough. Most people I meet who train hard are chronically under-fuelled, especially on training days. They skip breakfast, grab something sad at lunch, then wonder why their 6pm class feels brutal. If you fuel properly, your class feels like training. If you don't, it feels like survival.",
      "A simple rule: every meal should have a real protein, a real carb, and a vegetable you actually want to eat. Nothing fancier than that. If you can't cook it yourself, there are people in the neighbourhood (hi!) who do it for you. The excuse of \"I don't have time\" doesn't hold up anymore.",
      "Train hard. Eat real. Spring is a great time to start. See you at the studio. I'm the one always in the Wednesday evening class.",
    ],
  },
];

async function main() {
  console.log(`Seeding ${POSTS.length} blog posts → ${CONVEX_URL}`);
  const existing = await client.query("websiteContent:listBlogPosts");
  if (existing.length > 0) {
    console.log(`\n⚠️  ${existing.length} blog posts already exist. Aborting.`);
    process.exit(1);
  }

  let ok = 0;
  for (const p of POSTS) {
    try {
      const bodyJson = paragraphsToTipTapJson(p.body);
      await client.mutation("websiteContent:createBlogPost", {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        author: p.author,
        readTime: p.readTime,
        coverImageUrl: p.coverImageUrl,
        bodyJson,
        status: "published",
        featured: p.featured,
        publishedAt: p.publishedAt,
      });
      console.log(`  ✓ ${p.featured ? "★ " : "  "}${p.title}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${p.title}: ${err.message}`);
    }
  }

  console.log(`\nDone. Inserted: ${ok}/${POSTS.length}.`);
}

main().catch((err) => {
  console.error("Seed crashed:", err);
  process.exit(1);
});
