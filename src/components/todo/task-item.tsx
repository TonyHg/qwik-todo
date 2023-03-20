import { $, component$, useContext } from "@builder.io/qwik";
import { Task } from "~/types/task.";
import { removeTask } from "~/components/repositories/tasks-repository";
import { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import { Tag } from "~/types/tag";

interface TaskItemProps {
  tag: Tag;
  task: Task;
}
export const TaskItem = component$<TaskItemProps>(({ tag, task }) => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const handleDelete = $(() => {
    removeTask(tag.id, task).then((tags) => {
      todo.tags = tags;
    });
  });

  return (
    <li>
      <div class="flex flex-row gap-2 justify-between">
        <p>{task.name}</p>
        <button onClick$={handleDelete}>delete</button>
      </div>
    </li>
  );
});
