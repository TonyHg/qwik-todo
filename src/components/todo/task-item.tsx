import { $, component$, useContext } from "@builder.io/qwik";
import type { Task } from "~/types/task.";
import { removeTask } from "~/components/repositories/tasks-repository";
import type { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import type { Tag } from "~/types/tag";
import { LuMenu, LuTrash } from "@qwikest/icons/lucide";

interface TaskItemProps {
  tag: Tag;
  task: Task;
}
export const TaskItem = component$<TaskItemProps>(({ tag, task }) => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const handleDelete = $(() => {
    removeTask(tag.id, task).then((tags) => {
      todo.tags = tags;
    });
  });

  return (
    <div class="flex flex-row card">
      <div class="flex flex-row gap-2 items-center">
        <LuMenu />
        <input type="checkbox" checked={task.done} />
        <p>{task.name}</p>
      </div>
      <button onClick$={handleDelete} class="hoverable">
        <LuTrash color="#b9595b" />
      </button>
    </div>
  );
});
