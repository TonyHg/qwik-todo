import { component$ } from "@builder.io/qwik";
import { COLORS } from "~/types/color";
import { LuCheck } from "@qwikest/icons/lucide";

interface ColorListProps {
  selected: string;
  onSelect: (color: string) => void;
}

export const ColorList = component$<ColorListProps>(
  ({ selected, onSelect }) => {
    return (
      <div class="flex flex-row gap-2 px-2 pb-2 w-full overflow-x-auto">
        {COLORS.map((color) => (
          <button
            key={`tag-color-${color}`}
            type="button"
            class={`w-6 h-6 aspect-square rounded-md hoverable p-0 flex ${
              color === selected ? "border-2 border-gray-800" : ""
            }`}
            style={`background-color: ${color}`}
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
        ))}
      </div>
    );
  }
);
