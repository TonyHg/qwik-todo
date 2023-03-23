import type { Tag } from "~/types/tag";
import type { Task } from "~/types/task.";

export interface Todo {
  tags: Tag[];
  selectedTag?: Tag;
  selectedTask?: Task;
}
