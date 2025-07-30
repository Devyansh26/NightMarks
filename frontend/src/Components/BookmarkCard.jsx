import { FaExternalLinkAlt, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
export default function BookmarkCard({ id ,title, url, tags, description,onDelete }) {

  const token = localStorage.getItem("token");

  const handleDelete = async () => {
      if (confirm("Are you sure you want to delete this bookmark?")) {
        try {
          await axios.delete(`http://localhost:5000/bookmark/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          onDelete(id); // Notify parent to remove from list
        } catch (err) {
          console.error("Error deleting bookmark:", err);
          alert("Failed to delete bookmark");
        }
      }
    };

  return (
    <div className="relative bg-gray-800 rounded-xl shadow-2xl text-white w-80 max-w-xs p-6 flex flex-col gap-2 transition hover:scale-105 hover:shadow-cyan-700/40">
      <div className="font-bold text-lg mb-1">{title}</div>
      <p className="text-cyan-400 text-sm mb-1 break-all">
        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
          {url} 
        </a>
      </p>
      <p className="text-gray-400 text-sm mb-2">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags?.map(t => (
          <span
            key={t}
            className="bg-gray-700 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="absolute top-4 right-4 flex gap-3">
        <button><FaEdit className="text-cyan-300 hover:text-cyan-400" size={18} /></button>
        <button><FaTrash onClick={handleDelete} className="text-red-400 hover:text-red-500" size={18} /></button>
      </div>
    </div>
  );
}
