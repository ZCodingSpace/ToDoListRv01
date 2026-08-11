import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ListCategory from "./ListCategory";
import { useContext, useState } from "react";
import { DataContext } from "../CustomContext";

export default function MainLlistsCreator() {
  const { lists, setList } = useContext(DataContext);
  const [deleteListStatus, setDeleteListStatus] = useState(false);

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

        deleteStatus= {deleteListStatus}
        changeDeleteStatus={toggleDeleteListsStatus}
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

  return (
    <>
      <div className="add-list-row center">
        <div className="add-list-button-container center" onClick={addNewList}>
          <PlusCircleIcon />
          <h2 className="add-list-title">إضـــــــافـــة قـــــــائـــمـــة</h2>
        </div>
        <div className="add-list-button-container center" onClick={addNewList}>
          <TrashIcon
            onClick={() => {
              toggleDeleteListsStatus();
            }}
          />
        </div>
      </div>
      <div className="list-categories-container center">
        {listCategoryComponent}
      </div>
    </>
  );
}
