//

export default function toDoListReducer(currentState, action) {
  console.log("inside the reducer");

  switch (action.type) {
    case "add_new_list": {
      return addNewList(currentState);
    }
    case "click_to_add_task": {
      return clickToAddTask(currentState, action.listID);
    }
    case "press_enter_to_add_new_task": {
      return PressEnterToAddTask(currentState, action.listID, action.taskID);
    }
    case "update_task_Title": {
      return updateTaskTitle(
        currentState,
        action.event,
        action.listID,
        action.taskID,
      );
    }
    case "update_task_status": {
      return updateStatus(currentState, action.listID, action.taskID);
    }
    case "delete_list": {
      return deleteList(currentState, action.listsArr);
    }
    case "delete_task": {
      return deleteTask(currentState, action.listID, action.taskID);
    }
    case "re_order_task": {
      return reOrderTasks(currentState, action.event);
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

function clickToAddTask(currentState, listID) {
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

// Retrieve the index of the task and its previous status
// to add a new task after it
function retrieveIndexandStatus(currentState, listID, taskID) {
  const listIndexNum = currentState.findIndex((list) => list.listID === listID);
  const taskIndexNum = currentState[listIndexNum].todoList.findIndex(
    (task) => task.taskID === taskID,
  );

  // Retrieve the previous status of the task to be used for the new task
  const prevTaskStatus =
    currentState[listIndexNum].todoList[taskIndexNum].status;

  return [taskIndexNum + 1, prevTaskStatus];
}

function PressEnterToAddTask(currentState, listID, taskID) {
  const [newTaskIndex, prevTaskStatus] = retrieveIndexandStatus(
    currentState,
    listID,
    taskID,
  );

  return currentState.map((list) => {
    // Level 1: List Categories
    return list.listID === listID
      ? {
          ...list,
          // Level 2: Tasks
          todoList: [
            ...list.todoList.slice(0, newTaskIndex),
            {
              taskID: crypto.randomUUID(),
              title: "",
              isChecked: prevTaskStatus === "completed",
              status: prevTaskStatus,
            },
            ...list.todoList.slice(newTaskIndex),
          ],
        }
      : list;
  });
}

// Update the task title and status using a callback function.
function updateTask(currentState, listID, taskID, updater) {
  return currentState.map((list) => {
    // Level 1: List Categories
    return list.listID === listID
      ? {
          ...list,
          todoList: list.todoList.map((task) => {
            // Level 2: Task List
            return task.taskID === taskID
              ? updater(task) // Callback function call
              : task;
          }),
        }
      : list;
  });
}

// Update the task title passing a callback function to updateTask.
function updateTaskTitle(currentState, event, listID, taskID) {
  return updateTask(currentState, listID, taskID, (task) => {
    return {
      ...task,
      title: event.target.value,
    };
  });
}

// Update the status of the task and toggle the checkbox passing a callback function to updateTask.
function updateStatus(currentState, listID, taskID) {
  return updateTask(currentState, listID, taskID, (task) => {
    return {
      ...task,
      isChecked: !task.isChecked,
      status: task.status === "completed" ? "nonCompleted" : "completed",
    };
  });
}

function deleteList(currentState, listsArr) {
  return currentState.filter((list) => {
    return !listsArr.includes(list.listID);
  });
}

// Delete the task from the list
function deleteTask(currentState, listID, taskID) {
  return currentState.map((list) => {
    return list.listID === listID
      ? {
          ...list,
          todoList: list.todoList.filter((task) => {
            return task.taskID !== taskID;
          }),
        }
      : list;
  });
}

function reOrderTasks(currentState, event) {
  if (event.canceled) {
    return currentState;
  }

  const { operation } = event;

  const { id, initialIndex, index, initialGroup, group } = operation.source;
  const targetID = operation.target.id;

  if (initialGroup == null || group == null || targetID == null) return;

  const listsCopy = structuredClone(currentState);

  const initialList = listsCopy.find((list) => {
    return list.listID === initialGroup;
  });
  const movedTask = initialList.todoList.splice(initialIndex, 1)[0];

  if (targetID === id || targetID === initialGroup || targetID === group) {
    console.log("if")
    const newList = listsCopy.find((list) => {
      return list.listID === group;
    });
    newList.todoList.splice(index, 0, movedTask);
    
    return listsCopy;
  } else {
    console.log("else")
    const newList = listsCopy.find((list) => {
      return list.listID === targetID;
    });
    newList.todoList.splice(0, 0, movedTask);

    return listsCopy;
  }
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
