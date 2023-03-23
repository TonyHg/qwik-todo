import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { Tag } from "~/types/tag";
import { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import { addTag } from "~/components/repositories/tags-repository";
import { LuPlus } from "@qwikest/icons/lucide";

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
      // eslint-disable-next-line qwik/valid-lexical-scope
      handleClick(tag);
      tagInput.value = "";
      tagOpen.value = false;
    });
  });

  return (
    <div class="relative w-1/4">
      <button
        class={`${tagOpen.value ? "bg-hover" : ""} w-full truncate hoverable`}
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
              class={`focus:outline-none rounded-md px-2 py-1 w-full hoverable`}
            />
            <button
              type="button"
              disabled={tagInput.value.trim().length === 0}
              class="hoverable"
              onClick$={handleAdd}
            >
              <LuPlus />
            </button>
          </div>
          <ul class="p-2 text-sm">
            {todo.tags.map((tag) => (
              <li
                key={`tag-option-${tag.id} mb-1 last:mb-0 max-h-[500px] overflow-y-auto`}
              >
                <button
                  type="button"
                  class={`text-left block w-full px-4 py-2 text-sm truncate hoverable`}
                  onClick$={() => {
                    // eslint-disable-next-line qwik/valid-lexical-scope
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
