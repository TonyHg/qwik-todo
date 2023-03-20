import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Input from "~/components/todo/input";
import { TodoContext } from "~/components/contexts/todo-context";
import { Todo } from "~/types/todo";
import { TagGroup } from "~/components/todo/tag-group";

export default component$(() => {
  const todo: Todo = useContext(TodoContext) as Todo;
  return (
    <div>
      <h1 class="font-bold text-3xl mb-4">Todo List</h1>
      <Input />
      {todo.tags.map((tag) => (
        <TagGroup tag={tag} key={`tag-group-${tag.id}`} />
      ))}
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
