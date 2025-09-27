// utils/slugify.ts
export const slugifyJob = (id: string, title: string) => {
  return `${id}-${title.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-")}`;
};
