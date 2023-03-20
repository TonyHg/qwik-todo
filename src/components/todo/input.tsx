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
  const tagOpen = useSignal(false);

  const todo: Todo = useContext(TodoContext) as Todo;

  const handleSubmit = $(() => {
    console.debug("Adding new task");
    console.log(task);
    addTask(task.name, task.date, task.tag?.id).then((tags) => {
      todo.tags = tags;
    });
  });

  return (
    <form preventdefault:submit onSubmit$={handleSubmit}>
      <input
        value={task.name}
        onChange$={(event) => (task.name = event.target.value)}
        type="text"
      />
      <input
        value={task.date}
        onChange$={(event) => (task.date = event.target.value)}
        type="date"
      />
      <TagInput
        tag={task.tag}
        handleClick={$((tag: Tag) => {
          task.tag = tag;
        })}
      />
      <button type="submit">Add</button>
    </form>
  );
});
