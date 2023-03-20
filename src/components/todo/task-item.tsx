import { $, component$, useContext } from "@builder.io/qwik";
import { Task } from "~/types/task.";
import { removeTask } from "~/components/repositories/tasks-repository";
import { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import { Tag } from "~/types/tag";
import { TrashIcon, MenuIcon } from "lucide-qwik";

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
    <li>
      <div class="flex flex-row card">
        <div class="flex flex-row gap-2 items-center">
          <MenuIcon />
          <input type="checkbox" checked={task.done} />
          <p>{task.name}</p>
        </div>
        <button onClick$={handleDelete} class="hoverable">
          <TrashIcon color="#b9595b" />
        </button>
      </div>
    </li>
  );
});
