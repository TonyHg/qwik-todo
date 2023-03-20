import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { Tag } from "~/types/tag";
import { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import { addTag } from "~/components/repositories/tags-repository";
import { bgStyle, hoverStyle } from "~/components/todo/input";
import { PlusCircleIcon } from "lucide-qwik";

export interface TagInputProps {
  tag?: Tag;
  handleClick: (tag: Tag) => void;
}
export const TagInput = component$<TagInputProps>(({ tag, handleClick }) => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const tagInput = useSignal("");
  const tagOpen = useSignal(false);

  const toggleTagOpen = $(() => {
    tagOpen.value = !tagOpen.value;
  });

  const handleAdd = $(() => {
    addTag(tagInput.value).then(({ tags, tag }) => {
      todo.tags = tags;
      console.log(tag);
      handleClick(tag);
      tagOpen.value = false;
    });
  });

  return (
    <div class="relative">
      <button
        class={`${tagOpen.value ? bgStyle : ""} max-w-[200px] ${hoverStyle}`}
        type="button"
        onClick$={toggleTagOpen}
      >
        {tag?.name ?? "Select Tag"}
      </button>
      {tagOpen.value && (
        <div class="absolute overflow-visible z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-64 mt-4">
          <div class="flex flex-row justify-between gap-2 p-2">
            <input
              type="text"
              value={tagInput.value}
              onChange$={(event) => (tagInput.value = event.target.value)}
              placeholder="New Tag"
              class={`focus:outline-none rounded-md px-2 py-1 w-full ${hoverStyle}`}
            />
            <button
              type="button"
              disabled={tagInput.value.trim().length === 0}
              class={hoverStyle}
              onClick$={handleAdd}
            >
              <PlusCircleIcon />
            </button>
          </div>
          <ul class="p-2 text-sm">
            {todo.tags.map((tag) => (
              <li key={`tag-option-${tag.id}`}>
                <button
                  type="button"
                  class={`text-left block w-full px-4 py-2 text-sm ${hoverStyle}`}
                  onClick$={() => {
                    handleClick(tag);
                    tagOpen.value = false;
                  }}
                >
                  {tag.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
