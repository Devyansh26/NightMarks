import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        console.log(token)
        const response = await fetch("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

         

        if (!response.ok) {
          const text = await response.text();
        console.log("Raw response:", text);
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 py-10"><div className="text-white text-center mt-10">Loading profile...</div></div>;
  }

  if (!profile) {
    return <div className="text-red-500 text-center mt-10">Failed to load profile</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

      <div className="relative bg-gray-800 bg-opacity-90 rounded-2xl shadow-2xl px-12 py-10 flex flex-col items-center ring-1 ring-cyan-700/60 ring-offset-2 w-full max-w-md">
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-400/70 via-cyan-600/50 to-gray-800 flex items-center justify-center mb-6 border-4 border-cyan-400/40 shadow-lg">
          <span className="text-6xl select-none">👤</span>
        </div>

        <h2 className="text-white text-2xl font-bold mb-1 tracking-wide">{profile.name}</h2>
        <p className="text-gray-400 mb-2">{profile.email}</p>

        <div className="bg-gray-700/50 rounded-lg px-6 py-4 w-full text-white text-sm space-y-2 mb-8">
          <div><span className="font-semibold text-cyan-300">Mobile:</span> {profile.mobile}</div>
          <div><span className="font-semibold text-cyan-300">Role:</span> {profile.role}</div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button className="w-full bg-cyan-400/80 text-gray-900 py-2 rounded-md font-semibold hover:bg-cyan-400 transition">Edit Profile</button>
          <button className="w-full border border-red-400 text-red-400 py-2 rounded-md font-semibold hover:bg-red-400 hover:text-white transition">Logout</button>
        </div>
      </div>
    </div>
  );
}
