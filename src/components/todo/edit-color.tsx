import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { ColorList } from "~/components/todo/color-list";
import { changeTagColor } from "~/components/repositories/tags-repository";
import { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";

interface EditColorProps {
  tagId: string;
  color: string;
}
export const EditColor = component$<EditColorProps>(({ tagId, color }) => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const colorOpen = useSignal(false);
  const toggleColorOpen = $(() => {
    colorOpen.value = !colorOpen.value;
  });
  const handleSelect = $((color: string) => {
    changeTagColor(tagId, color).then((tags) => {
      todo.tags = tags;
      colorOpen.value = false;
    });
  });

  return (
    <div className="relative visible-hover">
      <button
        className={`w-6 h-6 aspect-square rounded-md hoverable p-0 flex`}
        style={`background-color: ${color}`}
        type="button"
        onClick$={toggleColorOpen}
      ></button>
      {colorOpen.value && (
        <div className="absolute right-0 pt-2 overflow-visible z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-64 mt-4">
          <ColorList selected={color} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
});
