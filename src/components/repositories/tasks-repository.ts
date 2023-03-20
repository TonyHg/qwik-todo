import { Task } from "~/types/task.";
import {
  DEFAULT_TAG,
  getTags,
  saveTags,
} from "~/components/repositories/tags-repository";
import { v4 } from "uuid";
import { Tag } from "~/types/tag";

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

export const toggleTask = async (tasks: Task[], task: Task) => {
  const index = tasks.findIndex((t) => t.id === task.id);
  tasks[index].done = !tasks[index].done;
  await saveTasks(tasks);
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
