import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { ColorList } from "~/components/todo/color-list";
import { changeTagColor } from "~/components/repositories/tags-repository";
import type { Todo } from "~/types/todo";
import { TodoContext } from "~/components/contexts/todo-context";
import type { Color , Theme } from "~/types/color";
import { ThemeContext } from "~/components/contexts/theme-context";
import { getColorFromTheme } from "~/types/color";

interface EditColorProps {
  tagId: string;
  color: Color;
}
export const EditColor = component$<EditColorProps>(({ tagId, color }) => {
  const todo: Todo = useContext(TodoContext) as Todo;
  const colorOpen = useSignal(false);
  const toggleColorOpen = $(() => {
    colorOpen.value = !colorOpen.value;
  });
  const handleSelect = $((color: Color) => {
    changeTagColor(tagId, color).then((tags) => {
      todo.tags = tags;
      colorOpen.value = false;
    });
  });

  const theme = useContext(ThemeContext) as Theme;

  return (
    <div class="relative visible-hover">
      <button
        class={`w-6 h-6 aspect-square rounded-md hoverable p-0 flex`}
        style={`background-color: ${getColorFromTheme(theme.value, color)}`}
        type="button"
        onClick$={toggleColorOpen}
      ></button>
      {colorOpen.value && (
        <div class="absolute right-0 pt-2 overflow-visible z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-64 mt-2 dark:bg-slate-600">
          <ColorList selected={color} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
});
