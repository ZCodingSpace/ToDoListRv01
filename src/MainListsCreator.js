import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import "./MainListsCreator.css";

export default function MainLlistsCreator() {
  return (
    <div className="add-list-row">
      <div className="add-list-button-container center">
        <AddCircleOutlineOutlinedIcon />
        <h2 className="add-list-title">إضـــــــافـــة قـــــــائـــمـــة</h2>
      </div>
    </div>
  );
}
