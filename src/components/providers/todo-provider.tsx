import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { TodoContext } from "~/components/contexts/todo-context";
import { getTasks } from "~/components/repositories/tasks-repository";
import { getTags } from "~/components/repositories/tags-repository";

export const TodoProvider = component$(() => {
  const state = useStore({
    tasks: getTasks(),
    tags: getTags(),
  });
  useContextProvider(TodoContext, state);
  return <Slot />;
});
