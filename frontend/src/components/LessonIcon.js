import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/App.css";

function LessonIcon() {
  return (
    <div className="navbar">
        <Link to="/lessons" className="profile-icon">
            <FaBook/>
        </Link>
    </div>
  );
};

export default LessonIcon;
