import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ListCategory from "./ListCategory";
import { useContext } from "react";
import { DataContext } from "../CustomContext";


export default function MainLlistsCreator() {


  const {lists, setList} = useContext(DataContext);

  let listCategoryComponent = lists.map((list) => {
    return (
      <ListCategory
        key={list.listID}
        listTitle={list.listTitle}
        todoList={list.todoList}
      />
    );
  });

  console.log(lists)

  return (
    <>
      <div className="add-list-row">
        <div className="add-list-button-container center">
          <PlusCircleIcon className="h-6 w-6 text-gray-500" />
          <h2 className="add-list-title">إضـــــــافـــة قـــــــائـــمـــة</h2>
        </div>
      </div>
      <div className="list-categories-container center">
        {listCategoryComponent}
      </div>
    </>
  );
}
