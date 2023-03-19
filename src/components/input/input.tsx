import { $, component$, QwikSubmitEvent } from "@builder.io/qwik";
import { Task } from "~/types/task.";
import { addTask } from "~/components/repositories/tasks-repository";
import { v4 as uuidv4 } from "uuid";

export default component$(() => {
  const task: Partial<Task> = {
    name: "",
    date: undefined,
    tag: undefined,
  };
  const handleSubmit = $(() => {
    console.debug("Adding new task");
    console.log(task);
    addTask({
      id: uuidv4(),
      name: task.name ?? "",
      date: task.date,
      tag: task.tag,
      done: false,
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
      <input
        value={task.tag}
        onChange$={(event) => (task.tag = event.target.value)}
        type="text"
      />
      <button type="submit">Add</button>
    </form>
  );
});
