import { useContext } from "react";
import { DataContext } from "../CustomContext";
import "./ListsStyles.css";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ToDo({ listID, taskID, title, isChecked, status }) {
  const { setList } = useContext(DataContext);

  function updateStatus(listID, toDoID) {
    setList((prev) => {
      return prev.map((list) => {
        // Level 1: List Categories
        return list.listID === listID
          ? {
              ...list,
              todoList: list.todoList.map((toDo) => {
                // Level 2: ToDo List
                return toDo.taskID === toDoID
                  ? {
                      ...toDo,
                      isChecked: toDo.isChecked ? false : true,
                      status:
                        toDo.status === "completed"
                          ? "nonCompleted"
                          : "completed",
                    }
                  : toDo;
              }),
            }
          : list;
      });
    });
  }

  function updateTask(event, listID, toDoID) {
    setList((prev) => {
      return prev.map((list) => {
        // Level 1: List Categories
        return list.listID === listID
          ? {
              ...list,
              todoList: list.todoList.map((toDo) => {
                // Level 2: ToDo List
                return toDo.taskID === toDoID
                  ? {
                      ...toDo,
                      title: event.target.value,
                    }
                  : toDo;
              }),
            }
          : list;
      });
    });
  }

  return (
    <>
      <div className="todo center">
        <div className="center taskContent">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              updateStatus(listID, taskID);
            }}
          ></input>
          <input
            type="text"
            className={`${status} task-title`}
            value={title}
            onChange={(event) => updateTask(event, listID, taskID)}
          ></input>
        </div>
        <div>
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </div>
      </div>
    </>
  );
}
