import { component$, useContext } from "@builder.io/qwik";
import type { Color , Theme } from "~/types/color";
import { COLORS, getColorFromTheme } from "~/types/color";
import { LuCheck } from "@qwikest/icons/lucide";
import { ThemeContext } from "~/components/contexts/theme-context";

interface ColorListProps {
  selected: Color;
  onSelect: (color: Color) => void;
}

export const ColorList = component$<ColorListProps>(
  ({ selected, onSelect }) => {
    const theme = useContext(ThemeContext) as Theme;
    return (
      <div class="flex flex-row gap-2 px-2 pb-2 w-full overflow-x-auto">
        {COLORS.map((color) => {
          const colorString = getColorFromTheme(theme.value, color);
          return (
            <button
              key={`tag-color-${colorString}`}
              type="button"
              class={`w-6 h-6 aspect-square rounded-md hoverable p-0 flex ${
                color === selected ? "border-2 border-gray-800" : ""
              }`}
              style={`background-color: ${colorString}`}
              onClick$={() => {
                // eslint-disable-next-line qwik/valid-lexical-scope
                onSelect(color);
              }}
            >
              {color === selected && (
                <div class="m-auto">
                  <LuCheck color="white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);
