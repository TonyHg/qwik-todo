import { Tag } from "~/types/tag";

const TAG_KEY = "tags";

export const getTags: () => Promise<Tag[]> = async () => {
  if (typeof window === "undefined") return [];
  console.log("Loading tags...");
  const tags = window.localStorage.getItem(TAG_KEY);
  console.log("Tags loaded", tags);
  return tags ? JSON.parse(tags) : [];
};

export const addTag = async (tags: Tag[], tag: Tag) => {
  tags.push(tag);
  await saveTags(tags);
};

export const editTag = async (tags: Tag[], tag: Tag) => {
  const index = tags.findIndex((t) => t.id === tag.id);
  tags[index] = tag;
  await saveTags(tags);
};

export const removeTag = async (tags: Tag[], tag: Tag) => {
  const index = tags.indexOf(tag);
  if (index === -1) return;
  tags.splice(index, 1);
  await saveTags(tags);
};

export const saveTags = async (tags: Tag[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TAG_KEY, JSON.stringify(tags));
};
