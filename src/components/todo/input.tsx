import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { addTask } from "~/components/repositories/tasks-repository";
import type { Tag } from "~/types/tag";
import { TodoContext } from "~/components/contexts/todo-context";
import type { Todo } from "~/types/todo";
import { TagInput } from "~/components/todo/tag-input";
import { LuPlus } from "@qwikest/icons/lucide";

interface AddTaskState {
  name: string;
  date?: string;
  tag?: Tag;
}

export default component$(() => {
  const task: AddTaskState = useStore({
    name: "",
    date: undefined,
    tag: undefined,
  });

  const loading = useSignal(false);

  const todo: Todo = useContext(TodoContext) as Todo;

  const handleSubmit = $(() => {
    console.debug("Adding new task");
    console.log(task);
    loading.value = true;
    addTask(task.name, task.date, task.tag?.id)
      .then((tags) => {
        todo.tags = tags;
        task.name = "";
        task.date = undefined;
      })
      .finally(() => {
        loading.value = false;
      });
  });

  return (
    <form
      preventdefault:submit
      onSubmit$={handleSubmit}
      class="flex flex-row gap-2 card"
    >
      <input
        value={task.name}
        onChange$={(event) => (task.name = event.target.value)}
        type="text"
        class={`w-1/2 hoverable`}
        placeholder="Read last chapter of Eleceed..."
      />
      <input
        value={task.date}
        onChange$={(event) => (task.date = event.target.value)}
        type="date"
        class={`cursor-pointer hoverable`}
      />
      <TagInput
        tag={task.tag}
        handleClick={$((tag: Tag) => {
          task.tag = tag;
        })}
      />
      <button
        type="submit"
        disabled={task.name.trim().length === 0}
        class={`${loading.value ? "bg-hover" : ""} hoverable`}
      >
        <LuPlus class={loading.value ? "animate-spin" : "animate-pulse"} />
      </button>
    </form>
  );
});
