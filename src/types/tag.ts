import type { Task } from "~/types/task";
import type { Color } from "~/types/color";

export interface Tag {
  id: string;
  name: string;
  color: Color;
  tasks: Task[];
}
