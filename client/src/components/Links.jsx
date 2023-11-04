import { NavLink, useNavigate } from "react-router-dom";
import linkspaths from "../utils/linksPaths";
import { useDashboardContext } from "../pages/DashboardLayout";
import { BiLogOut } from "react-icons/bi";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
const Links = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await customFetch.post("/auth/logout");
      navigate("/login");
      toast.success("Good Bye See You Later");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
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
      <button
        onClick={logoutHandler}
        className="flex items-center capitalize gap-4 mb-8 text-lg bg-red-500 px-2 py-1 rounded hover:bg-red-700 text-white"
      >
        <BiLogOut /> Log Out
      </button>
    </div>
  );
};
export default Links;
