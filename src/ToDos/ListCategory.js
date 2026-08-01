// import { useId } from "react";
import "./ListsStyles.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ToDo from "./ToDo";

export default function ListCategory({ listID, listTitle, todoList }) {
  console.log(todoList)
  let todos = todoList.map((todo) => {
    return (
      <ToDo
        key={todo.taskID}
        listID={listID}
        taskID={todo.taskID}
        title={todo.title}
        isChecked={todo.isChecked}
        status={todo.status}
      ></ToDo>
    );
  });

  return (
    <div className="listCategory-main-container center">
      <div className="listCategory-container center">
        <div className="category-header center">
          <div className="center">
            <ChevronDownIcon className="h-6 w-6 text-gray-500" />
            <h2>{listTitle}</h2>
          </div>
          <div>
            <PlusIcon className="h-6 w-6 text-gray-500" />
          </div>
        </div>
        <div className="todos-container">{todos}</div>
      </div>
    </div>
  );
}
