import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("access");
    console.log("Access token removed from localStorage");
    navigate("/");
  }

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;