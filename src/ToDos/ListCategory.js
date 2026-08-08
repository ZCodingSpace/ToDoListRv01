// import { useId } from "react";
import "./ListsStyles.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ToDo from "./ToDo";
import { useContext } from "react";
import { DataContext } from "../CustomContext";

export default function ListCategory({ listID, listTitle, todoList }) {
  // Access the data using useContext to manage the list of tasks
  const { setList } = useContext(DataContext);

  // Collect the not completed tasks.
  let notCompletedTodos = todoList.reduce(
    (notCompletedItems, todo) => {
      if (!todo.isChecked) {
        notCompletedItems.push(
          <ToDo
            key={todo.taskID}
            listID={listID}
            taskID={todo.taskID}
            title={todo.title}
            isChecked={todo.isChecked}
            status={todo.status}
          ></ToDo>,
        );
      }
      return notCompletedItems;
    },
    [], // The initial value for the notCompletedItems varible
  );

  // Collect the completed tasks.
  let completedTodos = todoList.reduce(
    (completedItems, todo) => {
      if (todo.isChecked) {
        completedItems.push(
          <ToDo
            key={todo.taskID}
            listID={listID}
            taskID={todo.taskID}
            title={todo.title}
            isChecked={todo.isChecked}
            status={todo.status}
          ></ToDo>,
        );
      }
      return completedItems;
    },
    [], // The initial value for the notCompletedItems varible
  );

  // Add a new task to the a specific list.
  function addTask(listID) {
    setList((prev) => {
      return prev.map((list) => {
        // Level 1: List Categories
        return list.listID === listID
          ? {
              ...list,
              // Level 2: Tasks
              todoList: [
                {
                  taskID: crypto.randomUUID(),
                  title: "",
                  isChecked: false,
                  status: "nonCompleted",
                },
                ...todoList, // Add the new task to the beginning of the list
              ],
            }
          : list;
      });
    });

    // NOTES:
    // crypto.randomUUID() is a built‑in JavaScript function that generates
    // a unique, random, universally‑unique identifier (UUID).
    // It’s part of the modern Web Crypto API and is supported in all modern browsers.

    // It’s the cleanest, safest way to generate unique IDs in JavaScript
    // without using React Hooks.
  }

  return (
    <div className="listCategory-main-container center">
      <div className="listCategory-container center">
        <div className="category-header center">

          {/* --- List Title Container - START --- */}
          <div className="center">
            <ChevronDownIcon />
            <h2>{listTitle}</h2>
          </div>
          {/* --- List Title Container - END --- */}

          {/* --- Add Task Button - START --- */}
          <div>
            <PlusIcon onClick={() => addTask(listID)} />
          </div>
          {/* --- Add Task Button - END --- */}
        </div>

        {/* --- Todos Container - START --- */}
        <div className="todos-container">{notCompletedTodos}</div>
        <div className="todos-container">{completedTodos}</div>
        {/* --- Todos Container - END --- */}
      </div>
    </div>
  );
}
