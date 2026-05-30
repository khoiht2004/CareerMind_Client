export const path = {
  // Auth
  home: "/",
  auth: "/auth",
  login: "/auth?tab=login",
  register: "/register",
  verifyEmail: "/verify-email",

  // Jobs
  jobs: "/jobs",
  jobDetail: "/jobs/:id",
  apply: "/jobs/:id/apply",

  // Companies
  companies: "/companies",
  companyDetail: "/companies/:id",

  // Content
  cvTemplates: "/cv-templates",
  coverLetterTemplates: "/cover-letter-templates",
  posts: "/posts",
  postDetail: "/post/:id",

  // User
  profile: "/profile",
  chatbot: "/chatbot",
  conversations: "/conversations",
  applicationDetail: "/applications/:id",
  savedJobs: "/saved-jobs",

  // Membership
  membership: "/membership",
  notFound: "/404",

  // Recruiter
  recruiter: {
    jobs: "/recruiter/jobs",
    posts: "/recruiter/posts",
    applications: "/recruiter/applications",
    stats: "/recruiter/stats",
    company: "/recruiter/company",
  },
};
