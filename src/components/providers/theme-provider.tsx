import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { ThemeContext } from "~/components/contexts/theme-context";
import type { Theme } from "~/types/color";

export const ThemeProvider = component$(() => {
  const state = useStore<Theme>({ value: "light" });

  useVisibleTask$(async () => {
    // TODO: get theme preference from browser
  });

  useContextProvider(ThemeContext, state);
  return <Slot />;
});
