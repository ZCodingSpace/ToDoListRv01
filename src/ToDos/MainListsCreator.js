// imports from React
import { useContext, useState } from "react";

// import components
import { DataContext } from "../CustomContext";
import ListCategory from "./ListCategory";
import DeletionBox from "./DeletionBox";

// imports from Heroicons library
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function MainLlistsCreator() {
  // Access the app data
  const { lists, setList } = useContext(DataContext);

  // ================== Add new lists - START ==================

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

  // ================== Add new lists - START ==================

  // ================== Edit lists - START ==================

  // State to open list edit mode,
  // which allows to select lists to be deleted and rearrange the order of the lists.
  const [editListStatus, setEditListStatus] = useState(false);

  function toggleEditListsStatus() {
    setEditListStatus(editListStatus ? false : true);
  }

  // ================== Edit lists - END ==================

  // ================== Delete lists - START ==================

  // State to collect the listID of the lists to be deleted
  const [toBeDeletedList, setToBeDeletedList] = useState([]);

  function updateToBeDeleteList(listID) {
    setToBeDeletedList([...toBeDeletedList, listID]);
  }

  // State to manage the visibility of the deletion dialog box,
  // and save the listID and taskID of the task to be deleted
  const [deletionDialogStatus, setDeletionDialogStatus] = useState({
    status: "hideDeletionDialog",
    deletedType: "",
    listsArr: [],
    listID: "",
    taskID: "",
  });

  // Show the deletion dialog box and save the deleted componet information in the state
  // The function takes an object instead of positional parameters
  // To avoid mixing up parameters forever.
  function deleteAlertWindow({
    deletedType,
    listsArr = [],
    listID = "",
    taskID = "",
  }) {
    setDeletionDialogStatus({
      ...deletionDialogStatus,
      status: "showDeletionDialog",
      deletedType: deletedType,
      listsArr: listsArr,
      listID: listID,
      taskID: taskID,
    });
  }

  // Hide the deletion dialog box and reset the listID and taskID of the task to be deleted
  function closeAlertWindow() {
    setDeletionDialogStatus({
      status: "hideDeletionDialog",
      deletedType: "",
      listsArr: [],
      listID: "",
      taskID: "",
    });
    setToBeDeletedList([]);
  }

  //  ================== Delete lists - END ==================

  // =================== Render Components - START ==================

  // Render the list categories by mapping over the lists state
  // and creating a ListCategory component for each list

  let listCategoryComponent = lists.map((list) => {
    return (
      <ListCategory
        key={list.listID}
        listID={list.listID}
        listTitle={list.listTitle}
        todoList={list.todoList}
        editStatus={editListStatus}
        changeEditStatus={toggleEditListsStatus}
        deleteFunction={deleteAlertWindow}
        updateToBeDeleteList={updateToBeDeleteList}
      />
    );
  });

  return (
    <>
      <div className="add-list-row center">
        {/* --- Add List Button - START --- */}
        <div className="add-list-button-container center" onClick={addNewList}>
          <PlusCircleIcon />
          <h2 className="add-list-title">إضـــــــافـــة قـــــــائـــمـــة</h2>
        </div>
        {/* --- Add List Button - END --- */}

        {/* --- Edit/Delete Buttons Container - START --- */}
        <div className="select-editDelete-icons-container center">
          {/* Edit */}
          <div onClick={toggleEditListsStatus}>
            <PencilSquareIcon />
          </div>
          {/* Delete */}
          <div
            onClick={() => {
              // using an object instead of positional parameters
              // To avoid mixing up parameters forever.
              deleteAlertWindow({
                deletedType: "list",
                listsArr: toBeDeletedList,
              });
            }}
          >
            <TrashIcon />
          </div>
        </div>
        {/* --- Edit/Delete Buttons Container - END --- */}
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

  // =================== Render Components - END ==================
}
