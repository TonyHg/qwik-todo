import { component$, Slot } from "@builder.io/qwik";
import { LuGithub } from "@qwikest/icons/lucide";

export default component$(() => {
  return (
    <>
      <main>
        <Slot />
      </main>
      <footer class="w-full flex gap-2 justify-center items-center mt-4">
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
    </>
  );
});
