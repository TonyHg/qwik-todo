import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { Tag } from "~/types/tag";
import { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import { addTag } from "~/components/repositories/tags-repository";

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
    addTag(tagInput.value).then((tags) => {
      todo.tags = tags;
    });
  });

  return (
    <>
      <button type="button" onClick$={toggleTagOpen}>
        {tag?.name ?? "Select Tag"}
      </button>
      {tagOpen.value && (
        <div class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div class="flex flex-row gap-2 py-2">
            <input
              type="text"
              value={tagInput.value}
              onChange$={(event) => (tagInput.value = event.target.value)}
              placeholder="New Tag"
            />
            <button type="button" onClick$={handleAdd}>
              Add
            </button>
          </div>
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDividerButton"
          >
            {todo.tags.map((tag) => (
              <li key={`tag-option-${tag.id}`}>
                <button
                  type="button"
                  class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
    </>
  );
});
