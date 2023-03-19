import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { Task } from "~/types/task.";
import { TasksContext } from "~/components/contexts/tasks-context";

const initialTasks: Task[] = [];
export const TasksProvider = component$(() => {
  const tasks = useStore(initialTasks);
  useContextProvider(TasksContext, tasks);
  return <Slot />;
});
