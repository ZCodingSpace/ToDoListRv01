//
//

export default function toDoListReducer(currentState, action) {
  console.log("inside the reducer");

  switch (action.type) {
    case "add_new_list": {
      return addNewList(currentState);
    }
    case "click_to_add_task": {
      return addTask(currentState, action.listID);
    }
    case "re_order_task": {
      return reOrderTasks(action.event, action.currentSnapshot);
    }
    case "synchronize_tabs": {
      return handleStorage(action.event, action.draggingState);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function addNewList(currentState) {
  return [
    {
      listID: crypto.randomUUID(),
      listTitle: "قائمة جديدة",
      todoList: [],
    },
    ...currentState,
  ];
}

function addTask(currentState, listID) {
    return currentState.map((list) => {
      // Level 1: List Categories
      return list.listID === listID
        ? {
            ...list,
            // Level 2: Tasks
            todoList: [
              {
                taskID: crypto.randomUUID(),
                title: "",
                isChecked: false,
                status: "nonCompleted",
              },
              ...list.todoList, // Add the new task to the beginning of the list
            ],
          }
        : list;
    });

}

function handleStorage(event, isDragging) {
  if (event.key === "toDoList" && !isDragging) {
    try {
      const updated = JSON.parse(event.newValue);
      if (Array.isArray(updated)) {
        return updated;
      }
    } catch {
      // Ignore invalid JSON
    }
  }
}

function reOrderTasks(event, currentSnapshot) {
  if (event.canceled) {
    return currentSnapshot;
  }

  const { operation } = event;

  const { id, initialIndex, index, initialGroup, group } = operation.source;
  const targetID = operation.target.id;

  if (initialGroup == null || group == null || targetID == null) return;

  const listsCopy = structuredClone(currentSnapshot);

  const initialList = listsCopy.find((list) => {
    return list.listID === initialGroup;
  });
  const movedTask = initialList.todoList.splice(initialIndex, 1)[0];

  if (targetID === id || targetID === initialGroup || targetID === group) {
    const newList = listsCopy.find((list) => {
      return list.listID === group;
    });
    newList.todoList.splice(index, 0, movedTask);

    return listsCopy;
  } else {
    const newList = listsCopy.find((list) => {
      return list.listID === targetID;
    });
    newList.todoList.splice(0, 0, movedTask);

    return listsCopy;
  }
}
