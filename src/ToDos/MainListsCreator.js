import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ListCategory from "./ListCategory";
import { useContext, useState } from "react";
import { DataContext } from "../CustomContext";
import DeletionBox from "./DeletionBox";

export default function MainLlistsCreator() {
  const { lists, setList } = useContext(DataContext);
  const [deleteListStatus, setDeleteListStatus] = useState(false);
  const [toBeDeletedList, setToBeDeletedList] = useState([]);

  

    function updateToBeDeleteList(listID) {
    setToBeDeletedList([...toBeDeletedList, listID]);
  }


  function toggleDeleteListsStatus() {
    setDeleteListStatus(deleteListStatus ? false : true);
  }

  let listCategoryComponent = lists.map((list) => {
    return (
      <ListCategory
        key={list.listID}
        listID={list.listID}
        listTitle={list.listTitle}
        todoList={list.todoList}
        deleteStatus={deleteListStatus}
        changeDeleteStatus={toggleDeleteListsStatus}
        deleteFunction={deleteAlertWindow}
        updateToBeDeleteList={updateToBeDeleteList}
      />
    );
  });

  function addNewList() {
    setList((prev) => {
      return [
        {
          listID: crypto.randomUUID(),
          listTitle: "قائمة جديدة",
          todoList: [],
        },
        ...prev,
      ];
    });
  }

  // State to manage the visibility of the deletion dialog box,
  // and save the listID and taskID of the task to be deleted
  const [deletionDialogStatus, setDeletionDialogStatus] = useState({
    status: "hideDeletionDialog",
    deletedType: "",
    listID: "",
    taskID: "",
  });

  // Show the deletion dialog box and save the listID and taskID of the task to be deleted
  function deleteAlertWindow(deletedType, listID, taskID) {
    setDeletionDialogStatus({
      ...deletionDialogStatus,
      status: "showDeletionDialog",
      deletedType: deletedType,
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
      <div className="add-list-row center">
        <div className="add-list-button-container center" onClick={addNewList}>
          <PlusCircleIcon />
          <h2 className="add-list-title">إضـــــــافـــة قـــــــائـــمـــة</h2>
        </div>
        <div
          className="add-list-button-container center"
          onClick={toggleDeleteListsStatus}
        >
          <TrashIcon />
        </div>
      </div>
      <div className="list-categories-container center">
        {listCategoryComponent}
      </div>
      {/* --- Deletion Dialog Box - START --- */}
      <DeletionBox
        displayStatus={deletionDialogStatus}
        closeAlertWindow={closeAlertWindow}
      />
      {/* --- Deletion Dialog Box - END --- */}
    </>
  );
}
