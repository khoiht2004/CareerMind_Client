import { BrowserRouter as Router, Routes, Route } from "react-router";
import { path } from "@/config/path";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import PrivateLayout from "@/layouts/PrivateLayout";

// Pages - Auth
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import VerifyEmail from "@/pages/auth/VerifyEmail";

// Pages - Main
import Home from "@/pages/Home";
import JobDetail from "@/pages/JobDetail";
import Apply from "@/pages/Apply";
import Profile from "@/pages/Profile";
import ChatBot from "@/pages/ChatBot";

// Auth initializer — triggers getMe on app start to restore session
import { useGetMeQuery } from "@/services/auth.service";

function AuthInitializer() {
  useGetMeQuery();
  return null;
}

function App() {
  return (
    <Router>
      <AuthInitializer />
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path={path.login} element={<Login />} />
          <Route path={path.register} element={<Register />} />
          <Route path={path.verifyEmail} element={<VerifyEmail />} />
        </Route>

        {/* Public routes */}
        <Route element={<DefaultLayout />}>
          <Route path={path.home} element={<Home />} />
          <Route path={path.jobDetail} element={<JobDetail />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateLayout />}>
          <Route path={path.apply} element={<Apply />} />
          <Route path={path.profile} element={<Profile />} />
          <Route path={path.chatbot} element={<ChatBot />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
