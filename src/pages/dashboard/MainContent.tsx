import DecorativeBackground from "./DecorativeBackground";
import CoursesSection from "./sections/CoursesSection";
import ProfileSection from "./sections/ProfileSection";
import HomeSection from "./sections/HomeSection";

export default function MainContent({ activePage, theme, user, profileTab, setProfileTab }) {
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
    </main>
  );
}
