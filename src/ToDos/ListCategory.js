// imports from React
import { useContext } from "react";

// import components
import { DataContext } from "../CustomContext";
import Task from "./Tasks";

// imports from Heroicons library
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Bars2Icon } from "@heroicons/react/24/outline";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

export default function ListCategory({
  id,
  listID,
  listTitle,
  todoList,
  editStatus,
  changeEditStatus,
  deleteFunction,
  updateToBeDeleteList,
}) {
  // Access the app data
  const { dispatch } = useContext(DataContext);

  const { isDropTarget, ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.low,
  });

  const droppableStyle = isDropTarget ? { background: "#00000030" } : undefined;

  // Add a new task to the a specific list.
  function addTask(listID) {
    dispatch({ type: "click_to_add_task", listID: listID });
  }

  // ================== Render Components - START ==================

  // Collect the not completed tasks.
  let notCompletedTasks = todoList.reduce(
    (notCompletedItems, task, index) => {
      if (!task.isChecked) {
        notCompletedItems.push(
          <Task
            key={task.taskID}
            id={task.taskID}
            index={index}
            listID={listID}
            column={id}
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
    (completedItems, task, index) => {
      if (task.isChecked) {
        completedItems.push(
          <Task
            key={task.taskID}
            id={task.taskID}
            index={index}
            listID={listID}
            column={id}
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
      <div className="listCategory-main-container center" ref={ref}>
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
          />
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
          <div className="tasks-container" style={droppableStyle}>
            {notCompletedTasks}
            {completedTasks}
          </div>
          {/* --- Tasks Container - END --- */}
        </div>
        {/* --- List Content Container - END --- */}

        {/* --- Reorder List Button - START --- */}
        <div
          className={`list-order-bars-container center ${editStatus ? "" : "list-edit-mode-hide"}`}
        >
          <Bars2Icon />
        </div>
        {/* --- Reorder List Button - END --- */}
      </div>
    </>
  );
  // ================= Render Components - END ==================
}
