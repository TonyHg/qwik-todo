import type { Task } from "~/types/task";
import {
  DEFAULT_TAG,
  getTags,
  saveTags,
} from "~/components/repositories/tags-repository";
import { v4 } from "uuid";
import type { Tag } from "~/types/tag";

const TASK_KEY = "tasks";

export const getTasks: () => Promise<Task[]> = async () => {
  if (typeof window === "undefined") return [];
  console.log("Loading tasks...");
  const tasks = window.localStorage.getItem(TASK_KEY);
  console.log("Tasks loaded", tasks);
  return tasks ? JSON.parse(tasks) : [];
};

export const addTask = async (
  name: string,
  date?: string,
  tagId: string = DEFAULT_TAG.id
) => {
  console.log("Adding task", name, tagId, date);
  const task: Task = {
    id: v4(),
    name: name,
    date: date,
    done: false,
  };
  const tags = await getTags();
  const index = tags.findIndex((t) => t.id === tagId);
  if (index === -1) throw new Error("Tag not found");
  tags[index].tasks.push(task);
  await saveTags(tags);
  return tags;
};

export const editTask = async (tasks: Task[], task: Task) => {
  const index = tasks.findIndex((t) => t.id === task.id);
  tasks[index] = task;
  await saveTasks(tasks);
};

export const renameTask = async (tagId: string, task: Task, name: string) => {
  const tags = await getTags();
  const index = tags.findIndex((t) => t.id === tagId);
  if (index === -1) throw new Error("Tag not found");
  const taskIndex = tags[index].tasks.findIndex((t) => t.id === task.id);
  if (taskIndex === -1) throw new Error("Task not found");
  tags[index].tasks[taskIndex].name = name;
  await saveTags(tags);
};

export const changeTaskDate = async (
  tagId: string,
  task: Task,
  date: string
) => {
  const tags = await getTags();
  const index = tags.findIndex((t) => t.id === tagId);
  if (index === -1) throw new Error("Tag not found");
  const taskIndex = tags[index].tasks.findIndex((t) => t.id === task.id);
  if (taskIndex === -1) throw new Error("Task not found");
  tags[index].tasks[taskIndex].date = date;
  await saveTags(tags);
};

export const toggleTask = async (tagId: string, task: Task, done: boolean) => {
  const tags = await getTags();
  const index = tags.findIndex((t) => t.id === tagId);
  if (index === -1) throw new Error("Tag not found");
  const taskIndex = tags[index].tasks.findIndex((t) => t.id === task.id);
  if (taskIndex === -1) throw new Error("Task not found");
  tags[index].tasks[taskIndex].done = done;
  await saveTags(tags);
};

export const moveTask = async (
  tagId?: string,
  task?: Task,
  newTagId?: string
): Promise<Tag[]> => {
  if (!tagId || !task || !newTagId) throw new Error("Invalid parameters");
  const tags = await getTags();
  const index = tags.findIndex((t) => t.id === tagId);
  if (index === -1) throw new Error("Tag not found");
  const taskIndex = tags[index].tasks.findIndex((t) => t.id === task.id);
  if (taskIndex === -1) throw new Error("Task not found");
  const newTagIndex = tags.findIndex((t) => t.id === newTagId);
  if (newTagIndex === -1) throw new Error("Tag not found");
  tags[newTagIndex].tasks.push(task);
  tags[index].tasks.splice(taskIndex, 1);
  await saveTags(tags);
  return tags;
};

export const moveTaskAtIndex = async (
  tagId: string,
  tags?: Tag[],
  task?: Task,
  index?: number
): Promise<Tag[]> => {
  if (!tagId || !task || index === undefined)
    throw new Error("Invalid parameters");
  tags ??= await getTags();
  const tagIndex = tags.findIndex((t) => t.id === tagId);
  if (tagIndex === -1) throw new Error("Tag not found");
  const taskIndex = tags[tagIndex].tasks.findIndex((t) => t.id === task.id);
  if (taskIndex === -1) throw new Error("Task not found");
  index--;
  tags[tagIndex].tasks.splice(taskIndex, 1);
  tags[tagIndex].tasks.splice(index, 0, task);
  await saveTags(tags);
  return tags;
};

export const removeTask = async (tagId: string, task: Task) => {
  const tags = await getTags();
  const index = tags.findIndex((t) => t.id === tagId);
  if (index === -1) throw new Error("Tag not found");
  const taskIndex = tags[index].tasks.findIndex((t) => t.id === task.id);
  if (taskIndex === -1) throw new Error("Task not found");
  tags[index].tasks.splice(taskIndex, 1);
  await saveTags(tags);
  return tags;
};

export const saveTasks = async (tasks: Task[]) => {
  if (typeof window === "undefined") return;
  console.debug("Saving tasks");
  window.localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
};
