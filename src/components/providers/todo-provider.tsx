import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { TodoContext } from "~/components/contexts/todo-context";
import { getTasks } from "~/components/repositories/tasks-repository";
import { getTags } from "~/components/repositories/tags-repository";
import { Task } from "~/types/task.";
import { Tag } from "~/types/tag";

interface TodoProviderState {
  tasks: Task[];
  tags: Tag[];
}
export const TodoProvider = component$(() => {
  const state = useStore<TodoProviderState>({
    tasks: [],
    tags: [],
  });

  useVisibleTask$(async () => {
    try {
      state.tasks = await getTasks();
    } catch (error) {
      console.warn("Failed to load tasks");
    }
    try {
      state.tags = await getTags();
    } catch (error) {
      console.warn("Failed to load tags");
    }
  });

  useContextProvider(TodoContext, state);
  return <Slot />;
});
