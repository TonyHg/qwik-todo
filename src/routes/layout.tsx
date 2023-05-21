import { component$, Slot, useContext } from "@builder.io/qwik";
import { LuGithub } from "@qwikest/icons/lucide";
import { ThemeContext } from "~/components/contexts/theme-context";
import type { Theme } from "~/types/color";

export default component$(() => {
  const theme = useContext(ThemeContext) as Theme;
  return (
    <div class={theme.value}>
      <div class="dark:bg-slate-800 wrapper min-h-screen">
        <main>
          <Slot />
        </main>
        <footer class="w-full flex gap-2 justify-center items-center mt-4 dark:text-white">
          <a
            href="http://github.com/TonyHg"
            target="_blank"
            class="font-bold hoverable"
          >
            Tony Heng
          </a>
          -
          <a
            href="https://github.com/TonyHg/qwik-todo"
            target="_blank"
            class="flex gap-2 items-center hoverable"
          >
            See on github <LuGithub />
          </a>
        </footer>
      </div>
    </div>
  );
});
