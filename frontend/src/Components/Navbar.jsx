import { Link ,useNavigate} from "react-router-dom";
import { FaBookmark } from "react-icons/fa";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login after logout
  }
  

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2">
        <FaBookmark className="text-cyan-400" size={26} />
        <span className="text-2xl font-bold">NightMarks</span>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/home" className="hover:text-cyan-400">Home</Link>
        <Link to="/profile" className="hover:text-cyan-400">Profile</Link>
        <Link to="/add" className="bg-cyan-400 text-gray-900 rounded-md px-4 py-2 font-semibold shadow hover:brightness-110 transition">Add</Link>
          {token  ? (
              <button
                onClick={handleLogout}
                className="hover:text-cyan-400 bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-cyan-400">Login</Link>
        )} 
       </div>
    </nav>
  );
}
