import type { Post } from "@/types/post";

type FilterOptions = {
  searchTerm: string;
  category: string;
  tag: string;
};

export const filterPosts = (items: Post[], options: FilterOptions): Post[] => {
  const searchValue = options.searchTerm.trim().toLowerCase();

  return items.filter((post) => {
    const searchMatch =
      !searchValue ||
      post.title.toLowerCase().includes(searchValue) ||
      post.excerpt.toLowerCase().includes(searchValue) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchValue));

    const categoryMatch = options.category === "all" || post.category === options.category;
    const tagMatch = options.tag === "all" || post.tags.includes(options.tag);

    return searchMatch && categoryMatch && tagMatch;
  });
};
