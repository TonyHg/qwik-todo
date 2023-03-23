import type {
  QwikDragEvent} from "@builder.io/qwik";
import {
  $,
  component$,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Input from "~/components/todo/input";
import { TodoContext } from "~/components/contexts/todo-context";
import type { Todo } from "~/types/todo";
import { TagGroup } from "~/components/todo/tag-group";
import { moveTag } from "~/components/repositories/tags-repository";

export default component$(() => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const listRef = useSignal<HTMLUListElement>();
  const handleTaskDrop = $(async (event: QwikDragEvent<HTMLUListElement>) => {
    if (!todo.moveTag || !listRef.value || todo.moveTask) return;
    let index = 0;
    const listNodes = Array.from(listRef.value.children);
    while (
      index < listNodes.length &&
      event.clientY > listNodes[index].getBoundingClientRect().top
    ) {
      index++;
    }
    const tags = await moveTag(todo.moveTag.id, index);
    if (tags) {
      todo.tags = tags;
      todo.moveTag = undefined;
    }
  });

  return (
    <div>
      <h1 class="font-bold text-3xl mb-4">Todo List</h1>
      <Input />
      <ul
        ref={listRef}
        preventdefault:drop
        preventdefault:dragover
        onDrop$={handleTaskDrop}
      >
        {todo.tags.map((tag) => (
          <li key={`tag-group-${tag.id}`}>
            <TagGroup tag={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Todo List",
  meta: [
    {
      name: "description",
      content: "A simple todo list app made in Qwik",
    },
  ],
};
