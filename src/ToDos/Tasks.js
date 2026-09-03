// imports from React
import { useContext } from "react";

// import components
import { DataContext } from "../CustomContext";

// imports from Heroicons library
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars2Icon } from "@heroicons/react/24/outline";

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
  deleteTask,
}) {
  // Access the app data
  const { dispatch } = useContext(DataContext);

  // // To connect the sortable element ==> Task
  // const [element, setElement] = useState(null);
  // // To connect the sortable handle element ==> Bars2Icon
  // const handleRef = useRef(null);

  // ???
  // What do I need to use isDragging
  // ???
  // const {ref, isDragging } = useSortable({ id, index, element, handle: handleRef, group:listID });
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  // if (isDragging) return;

  return (
    <>
      <div
        ref={ref}
        // ref={setElement}
        data-dragging={isDragging}
        className="task center"
        // data-shadow={isDragging || undefined}
      >
        <div>
          {/* <div ref={handleRef}> */}
          <Bars2Icon />
        </div>

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
          ></input>
          {/* --- Task Title Input - END --- */}
        </div>

        {/* --- Delete Task Button - START --- */}
        <div
          onClick={() => {
            deleteTask({ deletedType: "task", listID: listID, taskID: taskID });
          }}
        >
          <XMarkIcon className="delete-task-button" />
        </div>
        {/* --- Delete Task Button - END --- */}
      </div>
    </>
  );
}