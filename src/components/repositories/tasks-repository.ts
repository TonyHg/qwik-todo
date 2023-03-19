import { Task } from "~/types/task.";

const TASK_KEY = "tasks";

export const getTasks: () => Promise<Task[]> = async () => {
  if (typeof window === "undefined") return [];
  console.log("Loading tasks...");
  const tasks = window.localStorage.getItem(TASK_KEY);
  console.log("Tasks loaded", tasks);
  return tasks ? JSON.parse(tasks) : [];
};

export const addTask = async (tasks: Task[], task: Task) => {
  tasks.push(task);
  await saveTasks(tasks);
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

export const removeTask = async (tasks: Task[], task: Task) => {
  const index = tasks.indexOf(task);
  if (index === -1) return;
  tasks.splice(index, 1);
  await saveTasks(tasks);
};

export const saveTasks = async (tasks: Task[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
};
