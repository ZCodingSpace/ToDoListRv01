// import styles
import "./ListsStyles.css";

// imports from React
import { useContext, useEffect, useRef, useState } from "react";

// import components
import { DataContext } from "../CustomContext";
import ListCategory from "./ListCategory";
import DeletionBox from "./DeletionBox";

// imports from Heroicons library
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { DragDropProvider } from "@dnd-kit/react";

export default function MainLlistsCreator() {
  // Access the app data
  const { lists, dispatch } = useContext(DataContext);

  // ================== Add new lists - START ==================

  function addNewList() {
    dispatch({ type: "add_new_list" });
  }

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
  function deleteItem({
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

  //  ================== Reorder tasks - START ==================

  // const snapshot = useRef(structuredClone(lists));
  const isDragging = useRef(false);

  function reOrderTasks(event) {
    dispatch({
      type: "re_order_task",
      event: event,
    });
  }

  // ONLY fires when localStorage changes in ANOTHER browser tab, not the same tab.
  useEffect(() => {
    function handleStorage(event) {
      dispatch({
        type: "synchronize_tabs",
        event: event,
        draggingState: isDragging.current,
      });
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  });

  //  ================== Reorder tasks - END ==================

  // =================== Render Components - START ==================

  // Render the list categories by mapping over the lists state
  // and creating a ListCategory component for each list

  let listCategoryComponent = Array.isArray(lists) && lists.map((list, index) => {
    return (
      <ListCategory
        key={list.listID}
        id={list.listID}
        listID={list.listID}
        listTitle={list.listTitle}
        todoList={list.todoList}
        background={(index % 7) + 1}
        editStatus={editListStatus}
        deleteFunction={deleteItem}
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
              // To prevent activateing the deletion dialog box
              // when no lists are selected for deletion
              if (toBeDeletedList.length === 0) {
                return;
              } else {
                // using an object instead of positional parameters
                // To avoid mixing up parameters forever.
                deleteItem({
                  deletedType: "list",
                  listsArr: toBeDeletedList,
                });
              }
            }}
          >
            <TrashIcon />
          </div>
        </div>
        {/* --- Edit/Delete Buttons Container - END --- */}
      </div>
      <DragDropProvider
        onDragStart={() => {
          isDragging.current = true;
        }}
        onDragEnd={(event) => {
          isDragging.current = false;
          reOrderTasks(event);
        }}
      >
        <div className="list-categories-container center">
          {listCategoryComponent}
        </div>
      </DragDropProvider>
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
