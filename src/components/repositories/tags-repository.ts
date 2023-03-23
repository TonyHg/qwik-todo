import type { Tag } from "~/types/tag";
import { v4 } from "uuid";

const TAG_KEY = "tags";
const DEFAULT_COLOR = "#2a2c2f";
export const DEFAULT_TAG: Tag = {
  id: "default",
  name: "Other",
  color: DEFAULT_COLOR,
  tasks: [],
};

export const getTags: () => Promise<Tag[]> = async () => {
  if (typeof window === "undefined") return [];
  const tags = window.localStorage.getItem(TAG_KEY);
  return tags ? JSON.parse(tags) : [DEFAULT_TAG];
};

export const getTag = async (id: string): Promise<Tag> => {
  const tags = await getTags();
  const tag = tags.find((t) => t.id === id);
  if (!tag) throw new Error("Tag not found");
  return tag;
};

export const addTag = async (name: string, color: string = DEFAULT_COLOR) => {
  const tags = await getTags();
  const tag = {
    id: v4(),
    name: name,
    color: color,
    tasks: [],
  };
  tags.push(tag);
  await saveTags(tags);
  return { tags, tag };
};

export const renameTag = async (tag: Tag, name: string) => {
  const tags = await getTags();
  const index = tags.findIndex((t) => t.id === tag.id);
  if (index === -1) throw new Error("Tag not found");
  tags[index].name = name;
  await saveTags(tags);
};

export const removeTag = async (tagId: string): Promise<Tag[]> => {
  const tags = await getTags();
  const index = tags.findIndex((t) => t.id === tagId);
  if (index === -1) throw new Error("Tag not found");
  tags.splice(index, 1);
  await saveTags(tags);
  return tags;
};

export const moveTag = async (tagId: string, index: number): Promise<Tag[]> => {
  const tags = await getTags();
  const tagIndex = tags.findIndex((t) => t.id === tagId);
  if (tagIndex === -1) throw new Error("Tag not found");
  index--;
  const tag = tags.splice(tagIndex, 1)[0];
  tags.splice(index, 0, tag);
  await saveTags(tags);
  return tags;
};

export const saveTags = async (tags: Tag[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TAG_KEY, JSON.stringify(tags));
};
