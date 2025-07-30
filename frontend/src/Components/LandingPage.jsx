
import AuthForm from "./authForm";

export default function LandingPage() {
  return (<>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <h1 className="text-4xl font-extrabold text-cyan-400 mb-2">NightMarks</h1>
      <p className="text-gray-300 max-w-md mb-8 text-center">Save and organize your favorite links with style. Sign up or log in to get started.</p>
      
    </div>
    <AuthForm />
    </>
  );
}
