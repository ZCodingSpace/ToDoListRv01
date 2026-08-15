// import styles
import "./ListsStyles.css";

// imports from React
import { useContext } from "react";

// import components
import { DataContext } from "../CustomContext";
import Task from "./Tasks";

// imports from Heroicons library
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Bars2Icon } from "@heroicons/react/24/outline";

export default function ListCategory({
  listID,
  listTitle,
  todoList,
  editStatus,
  changeEditStatus,
  deleteFunction,
  updateToBeDeleteList,
}) {
  // Access the app data
  const { setList } = useContext(DataContext);

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
  }

  // ================== Render Components - START ==================

  // Collect the not completed tasks.
  let notCompletedTasks = todoList.reduce(
    (notCompletedItems, task) => {
      if (!task.isChecked) {
        notCompletedItems.push(
          <Task
            key={task.taskID}
            listID={listID}
            taskID={task.taskID}
            title={task.title}
            isChecked={task.isChecked}
            status={task.status}
            deleteTask={deleteFunction}
          ></Task>,
        );
      }
      return notCompletedItems;
    },
    [], // The initial value for the notCompletedItems varible
  );

  // Collect the completed tasks.
  let completedTasks = todoList.reduce(
    (completedItems, task) => {
      if (task.isChecked) {
        completedItems.push(
          <Task
            key={task.taskID}
            listID={listID}
            taskID={task.taskID}
            title={task.title}
            isChecked={task.isChecked}
            status={task.status}
            deleteTask={deleteFunction}
          ></Task>,
        );
      }
      return completedItems;
    },
    [], // The initial value for the notCompletedItems varible
  );

  return (
    <>
      <div className="listCategory-main-container center">
        {/* --- Select list to delete - START --- */}
        <div
          className={`list-checkbox-container center ${editStatus ? "" : "list-edit-mode-hide"}`}
        >
          <input
            type="checkbox"
            className="list-checkbox"
            onClick={() => {
              updateToBeDeleteList(listID);
            }}
          />{" "}
        </div>
        {/* --- Select list to delete - END --- */}

        {/* --- List Content Container - START --- */}

        <div className="listCategory-container center">
          {/* --- List Header Container - START --- */}
          <div className="category-header center">
            {/* --- List Title Container - START --- */}
            <div className="center">
              <ChevronDownIcon
                onClick={(event) => {
                  event.stopPropagation();
                }}
              />
              <h2>{listTitle}</h2>
            </div>
            {/* --- List Title Container - END --- */}

            {/* --- Add Task Button - START --- */}
            <div onClick={() => addTask(listID)}>
              <PlusIcon />
            </div>
            {/* --- Add Task Button - END --- */}
          </div>
          {/* --- List Header Container - END --- */}

          {/* --- Tasks Container - START --- */}
          <div className="tasks-container">{notCompletedTasks}</div>
          <div className="tasks-container">{completedTasks}</div>
          {/* --- Tasks Container - END --- */}
        </div>
        {/* --- List Content Container - END --- */}

        {/* --- Select list to reorder - START --- */}
        <div
          className={`list-order-bars-container center ${editStatus ? "" : "list-edit-mode-hide"}`}
        >
          <Bars2Icon />
        </div>
        {/* --- Select list to reorder - END --- */}
      </div>
    </>
  );
  // ================= Render Components - END ==================
}
