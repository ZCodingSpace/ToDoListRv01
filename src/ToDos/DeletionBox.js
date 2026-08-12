import { useContext } from "react";
import { DataContext } from "../CustomContext";

// Deletion Task Dialog Box Component
export default function DeletionBox({
  // Destructure the displayStatus prop to get the status, listID, and taskID
  displayStatus: { status, deletedType, listID, taskID },
  // A function to close the deletion dialog box using the setDeletionDialogStatus state updater function
  closeAlertWindow,
}) {
  // Access the data using useContext to manage the list of tasks
  const { setList } = useContext(DataContext);

  // Delete the task from the list
  function deleteList() {
    for (const ID of listID) {
      console.log(ID);
      setList((prev) => {
        return prev.filter((list) => {
          return list.listID !== ID;
        });
      });
    }

    closeAlertWindow();
  }

  // Delete the task from the list
  function deleteTask() {
    setList((prev) => {
      return prev.map((list) => {
        return list.listID === listID
          ? {
              ...list,
              todoList: list.todoList.filter((task) => {
                return task.taskID !== taskID;
              }),
            }
          : list;
      });
    });
    closeAlertWindow();
  }

  return (
    <div className={`deletion-dialog-box-container center ${status}`}>
      <div className="content-container center">
        <p className="deletion-msg">
          {`تحذير: لا يمكن استعادة ${deletedType === "task" ? "المهمة" : "القائمة"} بعد حذفها. هل تريد الحذف؟`}
        </p>

        {/* Deletion Task Buttons - START */}
        <div className="buttons-container center">
          <button
            className="confirm-button"
            onClick={() => {
              deletedType === "task" ? deleteTask() : deleteList();
            }}
          >
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
