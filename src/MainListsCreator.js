import "./MainListsCreator.css";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function MainLlistsCreator() {
  return (
    <div className="add-list-row">
      <div className="add-list-button-container center">
        <PlusCircleIcon class="h-6 w-6 text-gray-500" />
        <h2 className="add-list-title">إضـــــــافـــة قـــــــائـــمـــة</h2>
      </div>
    </div>
  );
}
