import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { ThemeContext } from "~/components/contexts/theme-context";
import type { Theme } from "~/types/color";

const THEME_KEY = "theme";

export const ThemeProvider = component$(() => {
  const state = useStore<Theme>({ value: "light" });

  useVisibleTask$(async () => {
    const theme = window.localStorage.getItem(THEME_KEY) ?? "light";
    if (theme) {
      state.value = theme;
    } else {
      state.value = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  });

  useContextProvider(ThemeContext, state);
  return <Slot />;
});
