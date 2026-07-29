import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ListCategory from "./ListCategory";
import { useId } from "react";

export default function MainLlistsCreator() {
  const lists = [
    {
      listID: useId(),
      listTitle: "",
      todoList: [
        { taskID: useId(), title: "المهمة الأولى", status: "" },
        { taskID: useId(), title: "المهمة الأولى", status: "" },
        { taskID: useId(), title: "المهمة الأولى", status: "" },
      ],
    },
    {
      listID: useId(),
      listTitle: "",
      todoList: [{ taskID: useId(), title: "المهمة الثانية", status: "" }],
    },
    {
      listID: useId(),
      listTitle: "",
      todoList: [{ taskID: useId(), title: "المهمة الثالثة", status: "" }],
    },
  ];

  let listCategoryComponent = lists.map((list) => {
    return (
      <ListCategory
        key={list.listID}
        listTitle={list.listTitle}
        todoList={list.todoList}
      />
    );
  });

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
