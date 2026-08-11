import { useContext, useEffect, useState } from "react";
import { DataContext } from "../CustomContext";
import "./ListsStyles.css";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DeletionBox from "./DeletionBox";

export default function Task({ listID, taskID, title, isChecked, status }) {
  // Access the data using useContext to manage the list of tasks
  const { lists, setList } = useContext(DataContext);

  // Persist the lists state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(lists));
  }, [lists]);

  // State to manage the visibility of the deletion dialog box,
  // and save the listID and taskID of the task to be deleted
  const [deletionDialogStatus, setDeletionDialogStatus] = useState({
    status: "hideDeletionDialog",
    listID: "",
    taskID: "",
  });

  // Add a new task to the a specific list.
  function addTask(listID, taskID) {
    const [newTaskIndex, prevTaskStatus] = retrieveIndexandStatus(
      listID,
      taskID,
    );

    setList((prev) => {
      return prev.map((list) => {
        // Level 1: List Categories
        return list.listID === listID
          ? {
              ...list,
              // Level 2: Tasks
              todoList: [
                ...list.todoList.slice(0, newTaskIndex),
                {
                  taskID: crypto.randomUUID(),
                  title: "",
                  isChecked: prevTaskStatus === "completed",
                  status: prevTaskStatus,
                },
                ...list.todoList.slice(newTaskIndex),
              ],
            }
          : list;
      });
    });
  }

  // Retrieve the index of the task and its previous status to add a new task after it
  function retrieveIndexandStatus(listID, taskID) {
    const listIndexNum = lists.findIndex((list) => list.listID === listID);
    const taskIndexNum = lists[listIndexNum].todoList.findIndex(
      (task) => task.taskID === taskID,
    );

    // Retrieve the previous status of the task to be used for the new task
    const prevTaskStatus = lists[listIndexNum].todoList[taskIndexNum].status;

    return [taskIndexNum + 1, prevTaskStatus];
  }

  // Update the task title and status using a callback function to avoid unnecessary re-renders
  function updateTask(listID, taskID, updater) {
    setList((prev) => {
      return prev.map((list) => {
        // Level 1: List Categories
        return list.listID === listID
          ? {
              ...list,
              todoList: list.todoList.map((task) => {
                // Level 2: Task List
                return task.taskID === taskID
                  ? updater(task) // Callback function call
                  : task;
              }),
            }
          : list;
      });
    });
  }

  // Update the status of the task and toggle the checkbox passing a callback function to updateTask
  function updateStatus(listID, taskID) {
    updateTask(listID, taskID, (task) => {
      return {
        ...task,
        isChecked: !task.isChecked,
        status: task.status === "completed" ? "nonCompleted" : "completed",
      };
    });
  }

  // Update the task title passing a callback function to updateTask
  function updateTaskTitle(event, listID, taskID) {
    updateTask(listID, taskID, (task) => {
      return {
        ...task,
        title: event.target.value,
      };
    });
  }

  // Show the deletion dialog box and save the listID and taskID of the task to be deleted
  function alertWindow(listID, taskID) {
    setDeletionDialogStatus({
      ...deletionDialogStatus,
      status: "showDeletionDialog",
      listID: listID,
      taskID: taskID,
    });
  }

  // Hide the deletion dialog box and reset the listID and taskID of the task to be deleted
  function closeAlertWindow() {
    setDeletionDialogStatus({
      ...deletionDialogStatus,
      status: "hideDeletionDialog",
    });
  }

  return (
    <>
      <div className="task center">
        <div className="center task-content">
          {/* --- Checkbox Button - START --- */}
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
          {/* --- Checkbox Button - END --- */}

          {/* --- Task Title Input - START --- */}
          <input
            type="text"
            className={`${status} task-title`}
            value={title}
            onChange={(event) => updateTaskTitle(event, listID, taskID)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask(listID, taskID);
              }
            }}
          ></input>
          {/* --- Task Title Input - END --- */}
        </div>

        {/* --- Delete Task Button - START --- */}
        <div
          onClick={() => {
            alertWindow(listID, taskID);
          }}
        >
          <XMarkIcon className="delete-task-button" />
        </div>
        {/* --- Delete Task Button - END --- */}

        {/* --- Deletion Task Dialog Box - START --- */}
        <DeletionBox
          displayStatus={deletionDialogStatus}
          closeAlertWindow={closeAlertWindow}
          type={"task"}
        />
        {/* --- Deletion Task Dialog Box - END --- */}
      </div>
    </>
  );
}
