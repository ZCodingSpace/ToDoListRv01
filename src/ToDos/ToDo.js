import { useContext } from "react";
import { DataContext } from "../CustomContext";
import "./ListsStyles.css";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ToDo({ listID, taskID, title, isChecked, status }) {
  const { setList } = useContext(DataContext);

  // Update the task title and status using a callback function to avoid unnecessary re-renders
  function updateTodo(listID, toDoID, updater) {
    setList((prev) => {
      return prev.map((list) => {
        // Level 1: List Categories
        return list.listID === listID
          ? {
              ...list,
              todoList: list.todoList.map((toDo) => {
                // Level 2: ToDo List
                return toDo.taskID === toDoID
                  ? updater(toDo) // Callback function call
                  : toDo;
              }),
            }
          : list;
      });
    });
  }

  // Update the status of the task and toggle the checkbox passing a callback function to updateTodo
  function updateStatus(listID, toDoID) {
    updateTodo(listID, toDoID, (toDo) => {
      return {
        ...toDo,
        isChecked: !toDo.isChecked,
        status: toDo.status === "completed" ? "nonCompleted" : "completed",
      };
    });
  }

  // Update the task title passing a callback function to updateTodo
  function updateTask(event, listID, toDoID) {
    updateTodo(listID, toDoID, (toDo) => {
      return {
        ...toDo,
        title: event.target.value,
      };
    });
  }

  // Delete the task from the list
  function deleteTask(listID, taskID) {
    setList((prev) => {
      return prev.map((list) => {
        return list.listID === listID
          ? {
              ...list,
              todoList: list.todoList.filter((toDo) => {
                return toDo.taskID !== taskID;
              }),
            }
          : list;
      });
    });
  }

  return (
    <>
      <div className="todo center">
        <div className="center task-content">

          {/* Checkbox Button - START */}
          <div
            className="checkbox-container"
            onClick={() => {
              updateStatus(listID, taskID);
            }}
          >
            <CheckBadgeIcon
              className={`${isChecked ? "checked-badge-icon" : ""}`}
            />
            <input type="checkbox" checked={isChecked} readOnly></input>
          </div>
          {/* Checkbox Button - END */}

          {/* Task Title Input - START */}
          <input
            type="text"
            className={`${status} task-title`}
            value={title}
            onChange={(event) => updateTask(event, listID, taskID)}
          ></input>
          {/* Task Title Input - END */}
        </div>
        
        {/* Delete Task Button - START */}
        <div>
          <XMarkIcon
            onClick={() => {
              deleteTask(listID, taskID);
            }}
          />
        </div>
        {/* Delete Task Button - END */}
      </div>
    </>
  );
}
