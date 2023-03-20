import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { addTask } from "~/components/repositories/tasks-repository";
import { Tag } from "~/types/tag";
import { TodoContext } from "~/components/contexts/todo-context";
import { Todo } from "~/types/todo";
import { TagInput } from "~/components/todo/tag-input";
import { PlusIcon, LoaderIcon } from "lucide-qwik";

interface AddTaskState {
  name: string;
  date?: string;
  tag?: Tag;
}

export const bgStyle = "bg-gray-100";
export const hoverStyle =
  "hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded-md px-2 py-1";

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
      })
      .finally(() => {
        loading.value = false;
      });
  });

  return (
    <form
      preventdefault:submit
      onSubmit$={handleSubmit}
      class="flex flex-row gap-2 bg-white rounded-lg px-4 py-2 w-full justify-between items-center"
    >
      <input
        value={task.name}
        onChange$={(event) => (task.name = event.target.value)}
        type="text"
        class={`w-1/2 ${hoverStyle}`}
        placeholder="Read last chapter of Eleceed..."
      />
      <input
        value={task.date}
        onChange$={(event) => (task.date = event.target.value)}
        type="date"
        class={`cursor-pointer ${hoverStyle}`}
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
        class={`${loading.value ? bgStyle : ""} ${hoverStyle}`}
      >
        <PlusIcon class={loading.value ? "animate-spin" : "animate-pulse"} />
      </button>
    </form>
  );
});
