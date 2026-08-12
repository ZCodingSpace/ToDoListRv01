// import { useId } from "react";
import "./ListsStyles.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { DataContext } from "../CustomContext";
import Task from "./Tasks";

export default function ListCategory({
  listID,
  listTitle,
  todoList,
  deleteStatus,
  changeDeleteStatus,
  deleteFunction,
  updateToBeDeleteList
}) {
  // Access the data using useContext to manage the list of tasks
  const { setList } = useContext(DataContext);


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
  return (
    <>
      {" "}
      <div className="listCategory-main-container center">
        <input
          type="checkbox"
          className={`list-checkbox ${deleteStatus ? "" : "list-checkbox-hide"}`}
          onClick={updateToBeDeleteList}
        />
        <div className="listCategory-container center">
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
            <div>
              <PlusIcon onClick={() => addTask(listID)} />
            </div>
            {/* --- Add Task Button - END --- */}
          </div>

          {/* --- Tasks Container - START --- */}
          <div className="todos-container">{notCompletedTasks}</div>
          <div className="todos-container">{completedTasks}</div>
          {/* --- Tasks Container - END --- */}
        </div>
      </div>
    </>
  );
}
