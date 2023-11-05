import { useDashboardContext } from "../pages/DashboardLayout";
import Links from "./Links";
import Logo from "./Logo";
const Sidebar = ({ queryClient }) => {
  const { sidebar, toggleSidebar } = useDashboardContext();
  return (
    <section
      className={`hidden lg:flex flex-col py-3 px-10 bg-white border-r min-h-screen  sticky top-0  transition-all ${
        sidebar == true ? "" : "lg:hidden"
      }`}
    >
      <Logo />
      <Links queryClient={queryClient} />
    </section>
  );
};
export default Sidebar;
