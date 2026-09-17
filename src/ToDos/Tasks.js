// imports from React
import { useContext, useEffect, useRef, useState } from "react";

// import components
import { DataContext } from "../CustomContext";

// imports from Heroicons library
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

// import from dnd-kit library
import { useSortable } from "@dnd-kit/react/sortable";

export default function Task({
  id,
  index,
  listID,
  column,
  taskID,
  title,
  isChecked,
  status,
  background,
  deleteTask,
}) {
  // Access the app data
  const { dispatch } = useContext(DataContext);
  const [deletMode, setDeleteMode] = useState("hide");

  // ???
  // What do I need to use isDragging
  // ???
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  // if (isDragging) return;

  const lastClickRef = useRef(null);

  useEffect(() => {
    // Store where the user clicked
    function handleMouseDown(event) {
      lastClickRef.current = event.target;
      if (event.target.className === "cancel-button") {
        setDeleteMode("hide");
      }
    }

    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, []);

  function handleBlur() {
    const clickedElement = lastClickRef.current.className.animVal;
    if (clickedElement !== "XMarkIcon") {
      closeDeleteMode();
    }
  }

  function closeDeleteMode() {
    setDeleteMode("hide");
  }

  return (
    <>
      <div
        ref={ref}
        // ref={setElement}
        data-dragging={isDragging}
        className={`task center task-background-${background}`}
        // data-shadow={isDragging || undefined}
      >
        <div className="center task-content">
          {/* --- Checkbox Button - START --- */}
          <div
            className="checkbox-container center"
            onClick={() => {
              dispatch({
                type: "update_task_status",
                listID: listID,
                taskID: taskID,
              });
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
            onChange={(event) =>
              dispatch({
                type: "update_task_Title",
                event: event,
                listID: listID,
                taskID: taskID,
              })
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                dispatch({
                  type: "press_enter_to_add_new_task",
                  listID: listID,
                  taskID: taskID,
                });
              }
            }}
            onFocus={() => setDeleteMode("show")}
            onBlur={handleBlur}
          ></input>
          {/* --- Task Title Input - END --- */}
        </div>

        {/* --- Delete Task Button - START --- */}
        <div
          className={`delete-task-button center ${deletMode}`}
          onClick={(event) => {
            event.stopPropagation();
            deleteTask({ deletedType: "task", listID: listID, taskID: taskID });
          }}
        >
          <XMarkIcon className="XMarkIcon" />
        </div>
        {/* --- Delete Task Button - END --- */}
      </div>
    </>
  );
}
