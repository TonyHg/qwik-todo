import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import type { Task } from "~/types/task.";
import { removeTask } from "~/components/repositories/tasks-repository";
import type { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import type { Tag } from "~/types/tag";
import { LuCheck, LuGripVertical, LuTrash } from "@qwikest/icons/lucide";

interface TaskItemProps {
  tag: Tag;
  task: Task;
}
export const TaskItem = component$<TaskItemProps>(({ tag, task }) => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const confirmDelete = useSignal(false);
  const handleDelete = $(() => {
    if (confirmDelete.value) {
      removeTask(tag.id, task).then((tags) => {
        todo.tags = tags;
      });
    } else {
      confirmDelete.value = true;
    }
  });

  const toggleDone = $(() => {
    task.done = !task.done;
  });

  return (
    <div class={`flex flex-row card ${task.done ? "card-done" : ""}`}>
      <div class="flex flex-row gap-2 items-center">
        <LuGripVertical class="cursor-grab" />
        <input
          type="checkbox"
          checked={task.done}
          onClick$={toggleDone}
          class="cursor-pointer"
        />
        <p>{task.name}</p>
      </div>
      <button
        onClick$={handleDelete}
        class={`hoverable ${confirmDelete.value ? "hover:bg-red-100" : ""}`}
      >
        {confirmDelete.value ? (
          <LuCheck color="#b9595b" />
        ) : (
          <LuTrash color="#b9595b" />
        )}
      </button>
    </div>
  );
});
