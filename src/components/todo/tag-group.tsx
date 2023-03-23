import type { QwikDragEvent } from "@builder.io/qwik";
import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import type { Tag } from "~/types/tag";
import { TaskItem } from "~/components/todo/task-item";
import { LuSlash } from "@qwikest/icons/lucide";
import { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import {
  moveTask,
  moveTaskAtIndex,
} from "~/components/repositories/tasks-repository";

interface TagGroupProps {
  tag: Tag;
}
export const TagGroup = component$<TagGroupProps>(({ tag }) => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const draggingOver = useSignal(false);
  const listRef = useSignal<HTMLUListElement>();
  const handleTaskDrop = $(async (event: QwikDragEvent<HTMLDivElement>) => {
    draggingOver.value = false;
    let tags = undefined;
    if (todo.selectedTag?.id !== tag.id) {
      tags = await moveTask(todo.selectedTag?.id, todo.selectedTask, tag.id);
    }
    if (listRef.value && todo.selectedTask) {
      let index = 0;
      const listNodes = Array.from(listRef.value.children);
      while (
        index < listNodes.length &&
        event.clientY > listNodes[index].getBoundingClientRect().top
      ) {
        index++;
      }
      console.log(index);
      todo.tags = await moveTaskAtIndex(tag.id, tags, todo.selectedTask, index);
    }
    if (tags) todo.tags = tags;
  });

  const handleTaskDragOver = $((event: QwikDragEvent<HTMLDivElement>) => {
    if (!draggingOver.value) {
      draggingOver.value = true;
    }
  });

  const handleTaskDragLeave = $((event: QwikDragEvent<HTMLDivElement>) => {
    if (draggingOver.value) {
      draggingOver.value = false;
    }
  });

  return (
    <div
      preventdefault:drop
      preventdefault:dragover
      onDragOver$={handleTaskDragOver}
      onDragLeave$={handleTaskDragLeave}
      onDrop$={handleTaskDrop}
    >
      <h2 class="mt-6 mb-2 font-bold text-xl uppercase">{tag.name}</h2>
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
          <div class="text-gray-400 flex flex-col w-full text-xl justify-center items-center text-center">
            <LuSlash />
            <p>No task with this tag.</p>
          </div>
        )}
      </div>
    </div>
  );
});
