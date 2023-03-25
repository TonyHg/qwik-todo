import type { QwikChangeEvent, QwikKeyboardEvent } from "@builder.io/qwik";
import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import type { Task } from "~/types/task";
import {
  changeTaskDate,
  removeTask,
  renameTask,
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
  const handleMouseDown = $(() => {
    dragging.value = true;
  });
  const handleMouseUp = $(() => {
    dragging.value = false;
  });
  const done = useSignal(task.done);
  const name = useSignal(task.name);
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

  const handleDragStart = $(() => {
    if (todo.moveTag) return;
    todo.moveTask = {
      task: task,
      tag: tag,
    };
    dragging.value = true;
  });

  const handleDragEnd = $(() => {
    dragging.value = false;
  });

  const handleBlur = $(() => {
    if (name.value !== task.name) {
      renameTask(tag.id, task, name.value);
    }
  });

  const handleEnter = $((event: QwikKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  });

  const handleDateChange = $((event: QwikChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== task.date) {
      changeTaskDate(tag.id, task, event.target.value);
    }
  });

  return (
    <div
      preventdefault:dragover
      draggable={dragging.value}
      onDragStart$={handleDragStart}
      onDragEnd$={handleDragEnd}
      class={`flex flex-row parent-hover ${
        dragging.value ? "card-dragging" : ""
      }`}
    >
      <div class="flex flex-row grow gap-1 items-center">
        <LuGripVertical
          class="cursor-grab visible-hover text-gray-400"
          onMouseDown$={handleMouseDown}
          onMouseUp$={handleMouseUp}
        />
        <div
          class={`card flex flex-row gap-4 grow ${
            done.value ? "card-done" : ""
          }`}
        >
          <div
            role="checkbox"
            class="cursor-pointer text-gray-800"
            onClick$={toggleDone}
          >
            {done.value ? (
              <LuCheckCircle2 color={tag.color} />
            ) : (
              <LuCircle color={tag.color} />
            )}
          </div>
          {done.value ? (
            <p class="grow">{task.name}</p>
          ) : (
            <input
              class="grow bg-transparent focus:outline-none rounded"
              value={name.value}
              onChange$={(event) => (name.value = event.target.value)}
              onKeyDown$={handleEnter}
              onBlur$={handleBlur}
            />
          )}
          <input
            value={task.date}
            onChange$={handleDateChange}
            type="datetime-local"
            class={`cursor-pointer hoverable input ${
              task.date ? "" : "visible-hover"
            }`}
            style={`color: ${tag.color}`}
          />
          <button
            onClick$={handleDelete}
            class={`hoverable aspect-square ${
              confirmDelete.value ? "hover:bg-red-100" : ""
            }`}
          >
            {confirmDelete.value ? (
              <LuCheck color="#b9595b" />
            ) : (
              <LuTrash color="#b9595b" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
