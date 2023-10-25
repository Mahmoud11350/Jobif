import { useDashboardContext } from "../pages/DashboardLayout";
import Links from "./Links";
import Logo from "./Logo";
const Sidebar = () => {
  const { sidebar, toggleSidebar } = useDashboardContext();
  return (
    <section
      className={`hidden lg:flex flex-col py-3 px-10 bg-white border-r min-h-screen  sticky top-0  ${
        sidebar == true ? "" : "lg:hidden"
      }`}
    >
      <Logo />
      <Links />
    </section>
  );
};
export default Sidebar;
