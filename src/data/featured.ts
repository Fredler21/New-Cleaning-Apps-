import { posts } from "@/data/posts";

export const featuredPosts = posts.slice(0, 5);
export const quickWinPosts = posts.filter((post) => post.tags.includes("quick wins")).slice(0, 4);
