import type { Task } from "~/types/task.";

export interface Tag {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
}
