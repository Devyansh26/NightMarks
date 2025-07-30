import { useState } from "react";
import api from "../../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBookmarkForm() {
  const [title, settitle] = useState('');
  const [url, seturl] = useState('');
  const [tags, settags] = useState('');
  const [description, setdescription] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async () => {
    setError('');

    try {
      const token = localStorage.getItem("token");
      console.log("Access Token:", token);
            
      if (!token) {
        alert("You're not logged in.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/save_bookmark",
        { title, url, tags, description },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );
      alert("Bookmark Saved!");
      navigate('/home');

    } catch (err) {
      setError(err.response?.data?.message || "Failed to save bookmark");
      console.error("Server response:", err.response?.data);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 relative overflow-hidden">
      {/* Decorative gradients for extra depth */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full opacity-10 blur-3xl pointer-events-none z-0"></div>
      <div className="relative z-10 bg-gray-900/95 text-white p-10 rounded-2xl shadow-2xl w-full max-w-lg mx-auto ring-1 ring-cyan-600/30 ring-offset-2 mb-22">
        <h2 className="text-2xl font-bold mb-8 text-cyan-400 text-center">Add a Bookmark</h2>
        <form className="flex flex-col gap-5">
          <input type="text" onChange={(e)=>settitle(e.target.value)} placeholder="Title" className={inputClass}/>
          <input type="text" onChange={(e)=>seturl(e.target.value)} placeholder="URL" className={inputClass}/>
          <input type="text" onChange={(e)=>settags(e.target.value)} placeholder="Tags (comma separated)" className={inputClass}/>
          {/* <input type="text" onChange={(e)=>setcategory(e.target.value)} placeholder="Category" className={inputClass}/> */}
          <textarea onChange={(e)=>setdescription(e.target.value)}  placeholder="Description" rows={3} className={inputClass + " resize-y"} />
          <button onClick={(e) => {
                e.preventDefault(); // <-- very important!
                handleSubmit();
              }}
             className="w-full bg-cyan-400 text-gray-900 py-2 rounded-md font-semibold hover:brightness-110 mt-2 transition">Save</button>
        </form>
      </div>
    </div>
  );
}

const inputClass = "w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none";
