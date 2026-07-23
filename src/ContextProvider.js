import { ThemeContext } from "./CustomContext";
import { useState } from "react";

// Provider component for managing the theme
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    mode: "light",
    light: "theme-on",
    dark: "theme-off",
  });

  function changeTheme() {
    let themeMode = theme.mode === "light" ? "dark" : "light";
    let lightMode = theme.light === "theme-on" ? "theme-off" : "theme-on";
    let darkMode = theme.dark === "theme-on" ? "theme-off" : "theme-on";
    setTheme((pre) => {
      return {
        ...pre,
        mode: themeMode,
        light: lightMode,
        dark: darkMode,
      };
    });
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
