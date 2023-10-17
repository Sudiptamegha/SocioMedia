import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // Step 1: Define a state variable for dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  // console.log(userData.coverpic);
  console.log(currentUser);
  // Step 2: Create a dropdown menu component
  const DropdownMenu = () => {
    return (
      <div
        className="dropdownMenu"
        style={{
          background: "cornflowerblue",
          fontSize: "14px",
          padding: "3px",
        }}
      >
        {/* Add dropdown menu items here */}
        <Link to={`/profile/${userData.id}`} className="dropdownMenuItem">
          My Profile
        </Link>
        <Link to="/">
          {" "}
          <div className="dropdownMenuItem" onClick={handleLogout}>
            Logout
          </div>
        </Link>
      </div>
    );
  };

  // Step 3: Toggle dropdown visibility when the profile picture is clicked
  const handleProfilePictureClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle logout (you can replace it with your actual logout logic)
  const handleLogout = () => {
    // Perform logout actions here
    localStorage.removeItem("user"); // Clear the authentication token from local storage (adjust the key as needed)
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SocioMedia</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user" onClick={handleProfilePictureClick}>
          <img src={"/upload/" + userData.coverpic} alt="" />
          <span>{currentUser.name}</span>
          {isDropdownOpen && <DropdownMenu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
