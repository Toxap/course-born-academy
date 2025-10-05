import type { Dispatch, SetStateAction } from "react";

import DecorativeBackground from "./DecorativeBackground";
import CoursesSection from "./sections/CoursesSection";
import ProfileSection from "./sections/ProfileSection";
import HomeSection from "./sections/HomeSection";
import AdminSection from "./sections/AdminSection";
import type { DashboardUser } from "./UserDashboard";

interface MainContentProps {
  activePage: string;
  theme: string;
  user: DashboardUser | null;
  profileTab: string;
  setProfileTab: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<DashboardUser | null>>;
}

export default function MainContent({
  activePage,
  theme,
  user,
  profileTab,
  setProfileTab,
  setUser,
}: MainContentProps) {
  return (
    <main className="flex-1 p-10 relative z-10 transition-colors duration-500">
      <DecorativeBackground theme={theme} />
      {activePage === "courses" && <CoursesSection theme={theme} />}
      {activePage === "profile" && (
        <ProfileSection
          theme={theme}
          user={user}
          profileTab={profileTab}
          setProfileTab={setProfileTab}
        />
      )}
      {activePage === "home" && <HomeSection user={user} />}
      {activePage === "admin" && (
        <AdminSection theme={theme} user={user} setUser={setUser} />
      )}
    </main>
  );
}
