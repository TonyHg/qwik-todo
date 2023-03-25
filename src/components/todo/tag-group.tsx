import type { QwikDragEvent, QwikKeyboardEvent } from "@builder.io/qwik";
import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import type { Tag } from "~/types/tag";
import { TaskItem } from "~/components/todo/task-item";
import {
  LuCheck,
  LuGripVertical,
  LuListChecks,
  LuTrash,
} from "@qwikest/icons/lucide";
import type { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import {
  moveTask,
  moveTaskAtIndex,
} from "~/components/repositories/tasks-repository";
import {
  removeTag,
  renameTag,
} from "~/components/repositories/tags-repository";

interface TagGroupProps {
  tag: Tag;
}
export const TagGroup = component$<TagGroupProps>(({ tag }) => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const draggingOver = useSignal(false);
  const name = useSignal(tag.name);
  const confirmDelete = useSignal(false);
  const handleDelete = $(() => {
    if (confirmDelete.value) {
      removeTag(tag.id).then((tags) => {
        todo.tags = tags;
      });
    } else {
      confirmDelete.value = true;
    }
  });
  const listRef = useSignal<HTMLUListElement>();
  const handleTaskDrop = $(async (event: QwikDragEvent<HTMLDivElement>) => {
    draggingOver.value = false;
    if (!todo.moveTask || !listRef.value || todo.moveTag) return;
    let tags = undefined;
    if (todo.moveTask.task.id !== tag.id) {
      tags = await moveTask(todo.moveTask.tag.id, todo.moveTask.task, tag.id);
    }
    let index = 0;
    const listNodes = Array.from(listRef.value.children);
    while (
      index < listNodes.length &&
      event.clientY > listNodes[index].getBoundingClientRect().top
    ) {
      index++;
    }
    todo.tags = await moveTaskAtIndex(tag.id, tags, todo.moveTask.task, index);
    if (tags) {
      todo.tags = tags;
      todo.moveTask = undefined;
    }
  });

  const handleTaskDragOver = $(() => {
    if (!draggingOver.value) {
      draggingOver.value = true;
    }
  });

  const handleTaskDragLeave = $(() => {
    if (draggingOver.value) {
      draggingOver.value = false;
    }
  });

  const handleDragStart = $(() => {
    if (todo.moveTask) return;
    todo.moveTag = tag;
  });

  const handleBlur = $(() => {
    if (name.value && name.value !== tag.name) {
      renameTag(tag, name.value);
    }
  });

  const handleEnter = $((event: QwikKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  });

  const dragging = useSignal(false);
  const handleMouseDown = $(() => {
    if (dragging.value) return;
    dragging.value = true;
  });
  const handleMouseUp = $(() => {
    if (!dragging.value) return;
    dragging.value = false;
  });

  return (
    <div
      preventdefault:drop
      preventdefault:dragover
      onDragStart$={handleDragStart}
      onDragOver$={handleTaskDragOver}
      onDragLeave$={handleTaskDragLeave}
      onDrop$={handleTaskDrop}
      draggable={dragging.value}
      style={{ color: tag.color }}
    >
      <div class="flex flex-row justify-between items-center parent-hover mt-6 mb-2 gap-2">
        <LuGripVertical
          class="cursor-grab visible-hover text-gray-400"
          onMouseDown$={handleMouseDown}
          onMouseUp$={handleMouseUp}
        />
        <input
          value={name.value}
          onChange$={(event) => (name.value = event.target.value)}
          type="text"
          onKeyDown$={handleEnter}
          onBlur$={handleBlur}
          class="grow font-bold text-xl uppercase bg-transparent focus:outline-none rounded"
        />
        <button
          onClick$={handleDelete}
          class={`hoverable visible-hover ${
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
      <div
        class={`rounded-xl p-2 ${
          draggingOver.value ? "bg-gray-100" : "bg-transparent"
        }`}
      >
        <ul ref={listRef}>
          {tag.tasks.map((task) => (
            <li key={`task-item-${task.id}`} class="mb-2 last:mb-0">
              <TaskItem tag={tag} task={task} />
            </li>
          ))}
        </ul>
        {tag.tasks.length === 0 && (
          <div class="text-gray-300 flex flex-col w-full text-xl justify-center items-center text-center gap-2">
            <LuListChecks class="text-6xl" />
            <p>No task with this tag.</p>
          </div>
        )}
      </div>
    </div>
  );
});
