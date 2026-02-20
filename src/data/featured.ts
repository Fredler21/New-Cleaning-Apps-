import { posts } from "@/data/posts";

export const featuredPosts = posts.slice(0, 5);
export const quickWinPosts = posts.filter((post) => post.tags.includes("quick wins")).slice(0, 4);

/* Banner/slider posts — swap out Listerine for Cleaning Myths */
const mythsPost = posts.find((p) => p.slug === "30-cleaning-myths-you-should-be-wary-of");
export const heroPosts = [
  ...(mythsPost ? [mythsPost] : []),
  ...posts.slice(0, 5).filter((p) => p.slug !== "13-mind-blowing-listerine-hacks")
].slice(0, 4);
