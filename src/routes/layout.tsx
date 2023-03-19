import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <main>
        <Slot />
      </main>
      <footer>
        <a href="https://github.com/TonyHg/qwik-todo" target="_blank">
          Tony Heng - See on github
        </a>
      </footer>
    </>
  );
});
