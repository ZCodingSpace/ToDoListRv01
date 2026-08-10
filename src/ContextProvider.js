import { ThemeContext, DataContext } from "./CustomContext";
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

  // NOTES:
  // crypto.randomUUID() is a built‑in JavaScript function that generates
  // a unique, random, universally‑unique identifier (UUID).
  // It’s part of the modern Web Crypto API and is supported in all modern browsers.

  // It’s the cleanest, safest way to generate unique IDs in JavaScript
  // without using React Hooks.

  const listsArr = [
    {
      listID: crypto.randomUUID(),
      listTitle: "قائمة الصباح",
      todoList: [
        {
          taskID: crypto.randomUUID(),
          title: "المهمة الأولى",
          isChecked: false,
          status: "nonCompleted",
        },
        {
          taskID: crypto.randomUUID(),
          title: "المهمة الثانية",
          isChecked: true,
          status: "completed",
        },
        {
          taskID: crypto.randomUUID(),
          title: "المهمة الثالثة",
          isChecked: false,
          status: "nonCompleted",
        },
      ],
    },
    {
      listID: crypto.randomUUID(),
      listTitle: "قائمة المساء",
      todoList: [
        {
          taskID: crypto.randomUUID(),
          title: "المهمة الثانية",
          isChecked: false,
          status: "nonCompleted",
        },
      ],
    },
    {
      listID: crypto.randomUUID(),
      listTitle: "قائمة إضافية",
      todoList: [
        {
          taskID: crypto.randomUUID(),
          title: "المهمة الثالثة",
          isChecked: false,
          status: "nonCompleted",
        },
      ],
    },
  ];

  // State for managing the list of tasks, initialized from localStorage if available
  const [lists, setList] = useState(() => {
    const savedLists = localStorage.getItem("toDoList");
    return savedLists ? JSON.parse(savedLists) : listsArr;
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme, changeTheme }}>
      <DataContext.Provider value={{ lists, setList }}>
        {children}
      </DataContext.Provider>
    </ThemeContext.Provider>
  );
}
