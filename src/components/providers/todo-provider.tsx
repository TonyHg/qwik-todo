import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { TodoContext } from "~/components/contexts/todo-context";
import { getTags } from "~/components/repositories/tags-repository";
import type { Todo } from "~/types/todo";

export const TodoProvider = component$(() => {
  const state = useStore<Todo>({
    tags: [],
  });

  useVisibleTask$(async () => {
    try {
      state.tags = await getTags();
    } catch (error) {
      console.warn("Failed to load tags");
    }
  });

  useContextProvider(TodoContext, state);
  return <Slot />;
});
