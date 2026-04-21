function useApplicationProfile(app) {
  if (!app) {
    return {
      profile: null,
      name: "Ứng viên",
      phone: "—",
      bio: null,
      skills: [],
      initials: "UV",
    };
  }

  const profile = app.user?.profile;
  const name = profile?.fullName || app.user?.email || "Ứng viên";
  const phone = app.phone || profile?.phone || "—";
  const bio = profile?.bio;
  const skills = Array.isArray(profile?.skills) ? profile.skills : [];
  const initials = name
    .split(" ")
    .slice(-2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return {
    profile,
    name,
    phone,
    bio,
    skills,
    initials,
  };
}

export default useApplicationProfile;