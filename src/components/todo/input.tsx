import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
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
  const todo: Todo = useContext(TodoContext) as Todo;
  useVisibleTask$(async ({ track }) => {
    track(() => todo.tags);
    if (task.tag === undefined && todo.tags.length > 0) {
      task.tag = todo.tags[0];
    }
  });

  const loading = useSignal(false);

  const handleSubmit = $(() => {
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
        class="grow hoverable input"
        placeholder="Read last chapter of Eleceed..."
      />
      <input
        value={task.date}
        onChange$={(event) => (task.date = event.target.value)}
        type="datetime-local"
        class="cursor-pointer hoverable input hidden sm:block"
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
        class={`hoverable aspect-square ${
          task.name.trim().length === 0 ? "bg-hover" : "btn-active"
        }  delay-75`}
      >
        <LuPlus />
      </button>
    </form>
  );
});
