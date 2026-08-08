import { useContext, useState } from "react";
import { DataContext } from "../CustomContext";
import "./ListsStyles.css";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ToDo({ listID, taskID, title, isChecked, status }) {
  // Access the data using useContext to manage the list of tasks
  const { lists, setList } = useContext(DataContext);

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
                  isChecked: false,
                  status: prevTaskStatus,
                  // To be continue:
                  // This should be add the new task as completed when the previous one is already completed.
                },
                ...list.todoList.slice(newTaskIndex),
              ],
            }
          : list;
      });
    });
  }

  function retrieveIndexandStatus(listID, taskID) {
    const listIndexNum = lists.findIndex((list) => list.listID === listID);
    const taskIndexNum = lists[listIndexNum].todoList.findIndex(
      (task) => task.taskID === taskID,
    );

    const prevTaskStatus = lists[listIndexNum].todoList[taskIndexNum].status;

    return [taskIndexNum + 1, prevTaskStatus];
  }

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

  // Show the deletion dialog box and save the listID and taskID of the task to be deleted
  function alertWindow(listID, toDoID) {
    setDeletionDialogStatus({
      ...deletionDialogStatus,
      status: "showDeletionDialog",
      listID: listID,
      taskID: toDoID,
    });
  }

  // Hide the deletion dialog box and reset the listID and taskID of the task to be deleted
  function closeAlertWindow(listID, toDoID) {
    setDeletionDialogStatus({
      ...deletionDialogStatus,
      status: "hideDeletionDialog",
    });
  }

  return (
    <>
      <div className="todo center">
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
            onChange={(event) => updateTask(event, listID, taskID)}
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
        <DeletionTask
          displayStatus={deletionDialogStatus}
          closeAlertWindow={closeAlertWindow}
        />
        {/* --- Deletion Task Dialog Box - END --- */}
      </div>
    </>
  );
}

// Deletion Task Dialog Box Component
function DeletionTask({
  // Destructure the displayStatus prop to get the status, listID, and taskID
  displayStatus: { status, listID, taskID },
  // A function to close the deletion dialog box using the setDeletionDialogStatus state updater function
  closeAlertWindow,
}) {
  // Access the data using useContext to manage the list of tasks
  const { setList } = useContext(DataContext);

  // Delete the task from the list
  function deleteTask() {
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
    <div className={`deletion-dialog-box-container center ${status}`}>
      <div className="content-container center">
        <p className="deletion-msg">
          تحذير: لا يمكن استعادة المهمة بعد حذفها. هل تريد الحذف؟
        </p>

        {/* Deletion Task Buttons - START */}
        <div className="buttons-container center">
          <button className="confirm-button" onClick={deleteTask}>
            نعم
          </button>
          <button className="cancel-button" onClick={closeAlertWindow}>
            إلغاء
          </button>
        </div>
        {/* Deletion Task Buttons - END */}
      </div>
    </div>
  );
}
