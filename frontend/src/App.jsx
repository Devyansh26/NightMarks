import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Components/layout';
import LandingPage from './Components/landingPage';
import HomePage from './Components/homepage';
import AddBookmarkForm from './Components/addBookmarkForm';
import ProfilePage from './Components/profilePage';
import AuthForm from './Components/authForm';
import ProtectedRoute from '../protectRoute';


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth required routes inside main Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/add" element={<AddBookmarkForm />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path='/login' element={<AuthForm/>}/>
        {/* Optionally: route for 404 */}
        <Route path="*" element={<div style={{color:"#fff",textAlign:"center",marginTop:"4rem"}}>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}
