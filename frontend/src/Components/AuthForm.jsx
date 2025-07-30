import { useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../../../ProtectRoutes/ReactProject/api";


export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username,setusername]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [mobile,setmobile]=useState('');
  const [error,seterror]=useState('');
  const navigate = useNavigate();

  const handleLogin= async () => {
        try{
            const res = await api.post('/login', { email, password });
            localStorage.setItem('token',res.data.access_token);
            if(res.data.access_token){
                navigate('/home');
            }

        }
        catch (err){
            console.error("Login failed",err);
            seterror(err.response?.data?.message || "Login failed. Please try again.");
        }
        }

  const handleSignup = async () => {
      try {
        const res = await api.post('/register', {
          name: username,
          email,
          password,
          mobile
        });

        alert("User registered successfully!");
        setIsLogin(true);  // Switch to login form after successful registration
        
      } catch (err) {
        console.error("Signup failed", err);
        seterror(err.response?.data?.message || "Signup failed. Please try again.");
      }
    };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 ">
    <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-80">
      <h2 className="text-white text-2xl mb-4 font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
      <form className="flex flex-col gap-4">
        {!isLogin && <input className={inputClass} placeholder="Username" onChange={(e)=>setusername(e.target.value)} />  }
        <input className={inputClass} placeholder="Email" onChange={(e)=>setemail(e.target.value)} />
        <input type="password" className={inputClass} placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />
        {!isLogin && <input className={inputClass} placeholder="Mobile Number" onChange={(e)=>setmobile(e.target.value)}/>  }
        <button onClick={(e) => {
                e.preventDefault(); // <-- very important!
                isLogin ? handleLogin() : handleSignup();
              }}
          className="w-full bg-cyan-400 text-gray-900 py-2 rounded-md font-semibold hover:brightness-110 mt-2 transition">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <div className="text-center mt-4 text-gray-400">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <button onClick={() => setIsLogin(false)} className="text-cyan-400 hover:underline font-semibold">
              Sign up
            </button>
          </>
        ) : (
          <>
            Already a member?{' '}
            <button onClick={() => setIsLogin(true)} className="text-cyan-400 hover:underline font-semibold">
              Login
            </button>
          </>
        )}
      </div>
    </div>
    </div>
  );
}

const inputClass = "w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none";
