import type { QwikKeyboardEvent } from "@builder.io/qwik";
import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import type { Tag } from "~/types/tag";
import type { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import { addTag } from "~/components/repositories/tags-repository";
import { LuPlus } from "@qwikest/icons/lucide";
import { COLORS } from "~/types/color";
import { ColorList } from "~/components/todo/color-list";

export interface TagInputProps {
  tag?: Tag;
  handleClick: (tag: Tag) => void;
}
export const TagInput = component$<TagInputProps>(({ tag, handleClick }) => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const tagInput = useSignal("");
  const tagColor = useSignal(COLORS[0]);
  const tagOpen = useSignal(false);

  const toggleTagOpen = $(() => {
    tagOpen.value = !tagOpen.value;
  });

  const handleAdd = $(() => {
    if (tagInput.value.trim().length === 0) return;
    addTag(tagInput.value, tagColor.value).then(({ tags, tag }) => {
      todo.tags = tags;
      console.log(tag);
      // eslint-disable-next-line qwik/valid-lexical-scope
      handleClick(tag);
      tagInput.value = "";
      tagOpen.value = false;
    });
  });

  const handleEnter = $((event: QwikKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  });

  const handleSelect = $((color: string) => (tagColor.value = color));

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
          <form
            preventdefault:submit
            class="flex flex-col gap-2"
            onSubmit$={handleAdd}
          >
            <div class="flex flex-row justify-between gap-2 p-2">
              <input
                type="text"
                value={tagInput.value}
                onChange$={(event) => (tagInput.value = event.target.value)}
                onKeyDown$={handleEnter}
                placeholder="New Tag"
                class={`focus:outline-none rounded-md px-2 py-1 w-full hoverable`}
              />
              <button
                type="submit"
                disabled={tagInput.value.trim().length === 0}
                class="hoverable"
              >
                <LuPlus />
              </button>
            </div>
            <ColorList selected={tagColor.value} onSelect={handleSelect} />
          </form>
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
