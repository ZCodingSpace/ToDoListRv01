import "./ListsStyles.css";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ToDo({title, status}) {
  return (
    <>
      <div className="todo center">
        <div className="center">
          <input type="checkbox"></input>
          <p className={`${status}`}>{title}</p>
        </div>
        <div>
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </div>
      </div>
    </>
  );
}
