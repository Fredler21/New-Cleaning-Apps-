export const titleToId = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const toSentenceCase = (value: string): string =>
  value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value;
