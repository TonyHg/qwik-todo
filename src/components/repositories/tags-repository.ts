import { Tag } from "~/types/tag";
import { v4 } from "uuid";
import { useContext } from "@builder.io/qwik";
import { TodoContext } from "~/components/contexts/todo-context";
import { Todo } from "~/types/todo";

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
  console.log("Loading tags...");
  const tags = window.localStorage.getItem(TAG_KEY);
  console.log("Tags loaded", tags);
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
