import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Loader2 } from "lucide-react";
import { path } from "@/config/path";
import AuthInitializer from "@/features/auth";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import PrivateLayout from "@/layouts/PrivateLayout";

//Auth pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import VerifyEmail from "@/pages/auth/VerifyEmail";

// Public pages
import Home from "@/pages/Home";
const JobDetail = lazy(() => import("@/pages/JobDetail"));
const CompanyDetail = lazy(() => import("@/pages/CompanyDetail"));

// Private pages
const Apply = lazy(() => import("@/pages/Apply"));
const Profile = lazy(() => import("@/pages/Profile"));
const ChatBot = lazy(() => import("@/pages/ChatBot"));
const ApplicationDetail = lazy(() => import("@/pages/ApplicationDetail"));
const SavedJobs = lazy(() => import("@/pages/SavedJobs"));

// Recruiter pages ── (chỉ load khi cần)
const RecruiterJobs = lazy(() => import("@/pages/recruiter/RecruiterJobs"));
const RecruiterApplications = lazy(
  () => import("@/pages/recruiter/RecruiterApplications"),
);
const RecruiterStats = lazy(() => import("@/pages/recruiter/RecruiterStats"));

// Fallback hiển thị trong khi đang tải
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="text-muted-foreground size-8 animate-spin" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthInitializer />
      <Suspense fallback={<PageLoader />}>
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
            <Route path={path.companyDetail} element={<CompanyDetail />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateLayout />}>
            <Route path={path.apply} element={<Apply />} />
            <Route path={path.profile} element={<Profile />} />
            <Route path={path.chatbot} element={<ChatBot />} />
            <Route
              path={path.applicationDetail}
              element={<ApplicationDetail />}
            />
            <Route path={path.savedJobs} element={<SavedJobs />} />

            {/* Recruiter routes */}
            <Route path={path.recruiter.jobs} element={<RecruiterJobs />} />
            <Route
              path={path.recruiter.applications}
              element={<RecruiterApplications />}
            />
            <Route path={path.recruiter.stats} element={<RecruiterStats />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
