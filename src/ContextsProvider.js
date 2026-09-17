// immports from React
import { useEffect, useReducer, useState } from "react";

import toDoListReducer from "./toDoListReducer";

// import components
import { ThemeContext, DataContext } from "./CustomContext";

// Provider component for contexts,
// wrapping the application and providing theme and data contexts
export default function ContextsProvider({ children }) {
  // ================== THEME CONTEXT - START ==================

  // State for managing the theme, initialized to light mode
  const [theme, setTheme] = useState({
    mode: "light",
    light: "theme-on",
    dark: "theme-off",
  });

  // Function to toggle the theme between light and dark modes
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

  // ================== THEME CONTEXT - END ==================

  // ================== DATA CONTEXT - START ==================

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

  let initialLists;

  try {
    const saved = localStorage.getItem("toDoList");
    initialLists = saved ? JSON.parse(saved) : listsArr;
  } catch {
    initialLists = listsArr;
  }
  
  const [lists, dispatch] = useReducer(toDoListReducer, initialLists);

  // Auto-Reset if the local storage deleted manualy.
  if (!lists) {
  localStorage.setItem("toDoList", JSON.stringify(listsArr));
}

  // Persist the lists state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(lists));
  }, [lists]);

  // ================== DATA CONTEXT - END ==================

  return (
    <ThemeContext.Provider value={{ theme, setTheme, changeTheme }}>
      <DataContext.Provider value={{ lists, dispatch }}>
        {children}
      </DataContext.Provider>
    </ThemeContext.Provider>
  );
}
