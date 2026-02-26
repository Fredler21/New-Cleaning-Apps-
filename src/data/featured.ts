import { posts } from "@/data/posts";

/**
 * Featured This Week — rotates a window of 3 posts every week.
 * Uses the ISO week number so the selection shifts automatically
 * each Monday without any manual intervention.
 */
function getWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor(diff / oneWeek);
}

const weekIndex = getWeekNumber();
const featuredStart = (weekIndex * 3) % posts.length;
export const featuredThisWeek = Array.from({ length: 3 }, (_, i) =>
  posts[(featuredStart + i) % posts.length]
);

/**
 * Trending Now — shows the 5 most recently added posts.
 * Posts at the end of the array are the newest, so we reverse-slice.
 * Every time a new post is added, this list updates automatically.
 */
export const trendingPosts = [...posts].reverse().slice(0, 5);

export const quickWinPosts = posts.filter((post) => post.tags.includes("quick wins")).slice(0, 4);

/* Banner/slider posts — swap out Listerine for Cleaning Myths */
const mythsPost = posts.find((p) => p.slug === "30-cleaning-myths-you-should-be-wary-of");
export const heroPosts = [
  ...(mythsPost ? [mythsPost] : []),
  ...posts.slice(0, 5).filter((p) => p.slug !== "13-mind-blowing-listerine-hacks")
].slice(0, 4);
