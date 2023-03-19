import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { TasksContext } from "~/components/contexts/tasks-context";
import { getTasks } from "~/components/repositories/tasks-repository";

export const TasksProvider = component$(() => {
  const tasks = useStore(getTasks());
  useContextProvider(TasksContext, tasks);
  return <Slot />;
});
