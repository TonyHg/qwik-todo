export interface Color {
  light: string;
  dark: string;
}
export const COLORS: Color[] = [
  { light: "#2a2c2f", dark: "#f5f5f5" },
  { light: "#264653", dark: "#8fc5de" },
  { light: "#26c5b1", dark: "#4dd5c4" },
  { light: "#60c3c5", dark: "#a8dadc" },
  { light: "#3884b3", dark: "#669fc5" },
  { light: "#183a6a", dark: "#528ac3" },
  { light: "#d8ae41", dark: "#e9c46a" },
  { light: "#e58135", dark: "#f4a261" },
  { light: "#e35531", dark: "#e76f51" },
  { light: "#f32e3f", dark: "#e63946" },
  { light: "#f72585", dark: "#f72585" },
  { light: "#7209b7", dark: "#9748cc" },
];

export const getColorFromTheme = (theme: string, color: Color) => {
  return theme === "light" ? color.light : color.dark;
};

export const DEFAULT_COLOR = COLORS[0];

export type Theme = {
  value: string;
  // value: "light" | "dark";
};
