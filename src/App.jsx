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
import VerifyEmail from "@/pages/auth/VerifyEmail";
import OAuthCallback from "@/pages/auth/OAuthCallback";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Public pages
import Home from "@/pages/Home";
import MembershipPage from "@/pages/Membership";
import Auth from "@/pages/auth/Auth";
import TemplateGallery from "@/pages/TemplateGallery";
const JobDetail = lazy(() => import("@/pages/JobDetail"));
const CompanyDetail = lazy(() => import("@/pages/CompanyDetail"));
const Companies = lazy(() => import("@/pages/Companies"));
const Posts = lazy(() => import("@/pages/Posts"));
const PostDetail = lazy(() => import("@/pages/PostDetail"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Private pages
const Apply = lazy(() => import("@/pages/Apply"));
const Profile = lazy(() => import("@/pages/Profile"));
const ChatBot = lazy(() => import("@/pages/ChatBot"));
const Conversations = lazy(() => import("@/pages/Conversations"));
const ApplicationDetail = lazy(() => import("@/pages/ApplicationDetail"));
const SavedJobs = lazy(() => import("@/pages/SavedJobs"));

// Recruiter pages ── (chỉ load khi cần)
const RecruiterJobs = lazy(() => import("@/pages/recruiter/RecruiterJobs"));
const RecruiterPosts = lazy(() => import("@/pages/recruiter/RecruiterPosts"));
const RecruiterApplications = lazy(
  () => import("@/pages/recruiter/RecruiterApplications"),
);
const RecruiterStats = lazy(() => import("@/pages/recruiter/RecruiterStats"));
const RecruiterCompany = lazy(
  () => import("@/pages/recruiter/RecruiterCompany"),
);

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
            <Route path={path.auth} element={<Auth />} />
            <Route path={path.verifyEmail} element={<VerifyEmail />} />
            <Route path={path.forgotPassword} element={<ForgotPassword />} />
            <Route
              path="/oauth/callback/:provider"
              element={<OAuthCallback />}
            />
          </Route>

          {/* Public routes */}
          <Route element={<DefaultLayout />}>
            <Route path={path.home} element={<Home />} />
            <Route path={path.jobs} element={<Home />} />
            <Route path={path.companies} element={<Companies />} />
            <Route
              path={path.cvTemplates}
              element={<TemplateGallery type="cv" />}
            />
            <Route
              path={path.coverLetterTemplates}
              element={<TemplateGallery type="cover-letter" />}
            />
            <Route path={path.posts} element={<Posts />} />
            <Route path={path.postDetail} element={<PostDetail />} />
            <Route path={path.jobDetail} element={<JobDetail />} />
            <Route path={path.companyDetail} element={<CompanyDetail />} />
            <Route path={path.notFound} element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateLayout />}>
            <Route path={path.apply} element={<Apply />} />
            <Route path={path.profile} element={<Profile />} />
            <Route path={path.chatbot} element={<ChatBot />} />
            <Route path={path.conversations} element={<Conversations />} />
            <Route
              path={path.applicationDetail}
              element={<ApplicationDetail />}
            />
            <Route path={path.savedJobs} element={<SavedJobs />} />
            <Route path={path.membership} element={<MembershipPage />} />

            {/* Recruiter routes */}
            <Route path={path.recruiter.jobs} element={<RecruiterJobs />} />
            <Route path={path.recruiter.posts} element={<RecruiterPosts />} />
            <Route
              path={path.recruiter.applications}
              element={<RecruiterApplications />}
            />
            <Route path={path.recruiter.stats} element={<RecruiterStats />} />
            <Route
              path={path.recruiter.company}
              element={<RecruiterCompany />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
