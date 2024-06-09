import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/App.css";

function ProfileIcon() {
  return (
    <div className="navbar">
        <Link to="/profile" className="profile-icon">
            <FaUser/>
        </Link>
    </div>
  );
};

export default ProfileIcon;

