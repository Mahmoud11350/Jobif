import { NavLink } from "react-router-dom";
import linkspaths from "../utils/linksPaths";
import { useDashboardContext } from "../pages/DashboardLayout";
const Links = () => {
  const { user, toggleMobileSidebar } = useDashboardContext();
  return (
    <div className="mt-4 ">
      {linkspaths.map((link) => {
        if (link.name == "admin" && user.role !== "admin") return;

        return (
          <NavLink
            end
            key={link.name}
            to={`${
              link.name == "profile" ? link.path + "/" + user._id : link.path
            }`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center capitalize gap-4 mb-8 text-lg bg-mainColor text-white font-bold py-1 px-2 rounded"
                : "flex items-center capitalize gap-4 mb-8 text-lg"
            }
            onClick={toggleMobileSidebar}
          >
            {link.icons}
            {link.name}
          </NavLink>
        );
      })}
    </div>
  );
};
export default Links;
