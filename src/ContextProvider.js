import { ThemeContext, DataContext } from "./CustomContext";
import { useState, useId } from "react";

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

  const listsArr = [
    {
      listID: useId(),
      listTitle: "قائمة الصباح",
      todoList: [
        {
          taskID: useId(),
          title: "المهمة الأولى",
          status: "nonCompleted",
        },
        {
          taskID: useId(),
          title: "المهمة الأولى",
          status: "completed",
        },
        {
          taskID: useId(),
          title: "المهمة الأولى",
          status: "nonCompleted",
        },
      ],
    },
    {
      listID: useId(),
      listTitle: "قائمة المساء",
      todoList: [
        {
          taskID: useId(),
          title: "المهمة الثانية",
          status: "nonCompleted",
        },
      ],
    },
    {
      listID: useId(),
      listTitle: "قائمة إضافية",
      todoList: [
        {
          taskID: useId(),
          title: "المهمة الثالثة",
          status: "nonCompleted",
        },
      ],
    },
  ];

  const [lists, setList] = useState(listsArr);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, changeTheme }}>
      <DataContext.Provider value={{ lists, setList }}>
        {children}
      </DataContext.Provider>
    </ThemeContext.Provider>
  );
}
