import BookmarkCard from "./bookmarkCard";
import api from "../../api";
import { useEffect,useState } from "react";
import axios from "axios";

export default function HomePage() {

  const [bookmarks, setBookmarks] = useState([]);
  const [loading,setLoading] =useState(true)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/bookmarks", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        setBookmarks(res.data.bookmarks); // Adjust if backend sends differently
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
      }finally{
        setLoading(false);
      }
    };
    

    fetchBookmarks();
  }, []);


  if (loading) {
    return <div className="min-h-screen bg-gray-900 py-10"><div className="text-white text-center mt-10">Loading Bookmarks...</div></div>;
  }

  const handleDelete = (id) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <h2 className="text-white text-3xl font-bold px-12 mb-8">Your Bookmarks</h2>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {bookmarks.map(b => <BookmarkCard key={b.id} {...b} onDelete={handleDelete} />)}
      </div>
    </div>
  );
}
