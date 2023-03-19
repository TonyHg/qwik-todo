import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Input from "~/components/input/input";

export default component$(() => {
  return (
    <div>
      <h1>Todo List</h1>
      <Input />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Todo List',
  meta: [
    {
      name: 'description',
      content: 'A simple todo list app made in Qwik',
    },
  ],
};
