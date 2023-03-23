import { component$ } from "@builder.io/qwik";
import type { Tag } from "~/types/tag";
import { TaskItem } from "~/components/todo/task-item";
import { LuSlash } from "@qwikest/icons/lucide";

interface TagGroupProps {
  tag: Tag;
}
export const TagGroup = component$<TagGroupProps>(({ tag }) => {
  return (
    <div>
      <h2 class="mt-6 mb-2 font-bold text-xl uppercase">{tag.name}</h2>
      <ul>
        {tag.tasks.map((task) => (
          <li key={`task-item-${task.id}`} class="mb-2 last:mb-0">
            <TaskItem tag={tag} task={task} />
          </li>
        ))}
      </ul>
      {tag.tasks.length === 0 && (
        <div class="text-gray-400 flex flex-col w-full text-xl justify-center items-center text-center">
          <LuSlash />
          <p>No task with this tag.</p>
        </div>
      )}
    </div>
  );
});
