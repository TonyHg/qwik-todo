import {
  $,
  component$,
  QwikDragEvent,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import type { Task } from "~/types/task.";
import {
  removeTask,
  toggleTask,
} from "~/components/repositories/tasks-repository";
import type { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import type { Tag } from "~/types/tag";
import {
  LuCheck,
  LuCheckCircle2,
  LuCircle,
  LuGripVertical,
  LuTrash,
} from "@qwikest/icons/lucide";

interface TaskItemProps {
  tag: Tag;
  task: Task;
}
export const TaskItem = component$<TaskItemProps>(({ tag, task }) => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const confirmDelete = useSignal(false);
  const dragging = useSignal(false);
  const done = useSignal(task.done);
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
    toggleTask(tag.id, task, !done.value);
    done.value = !done.value;
  });

  const handleDragStart = $((event: QwikDragEvent<HTMLDivElement>) => {
    todo.selectedTag = tag;
    todo.selectedTask = task;
    dragging.value = true;
  });

  const handleDragEnd = $((event: QwikDragEvent<HTMLDivElement>) => {
    dragging.value = false;
  });

  return (
    <div
      preventdefault:dragover
      draggable={true}
      onDragStart$={handleDragStart}
      onDragEnd$={handleDragEnd}
      class={`flex flex-row card parent-hover ${
        done.value ? "card-done" : ""
      } ${dragging.value ? "card-dragging" : ""}`}
    >
      <div class="flex flex-row gap-2 items-center">
        <LuGripVertical class="cursor-grab visible-hover" />
        <div
          role="checkbox"
          class="cursor-pointer text-gray-800"
          onClick$={toggleDone}
        >
          {done.value ? <LuCheckCircle2 /> : <LuCircle />}
        </div>
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
