import Logo from "./Logo";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { AiFillCaretDown } from "react-icons/ai";
import { useDashboardContext } from "../pages/DashboardLayout";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { toggleSidebar, loggingOut, loggingOutHandler, user } =
    useDashboardContext();
  const logoutHandler = async () => {
    try {
      await customFetch.post("/auth/logout");
      navigate("/login");
      toast.success("Good Bye See You Later");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <nav
      className="flex
     items-center justify-between bg-white h-[100px] p-4 border-b relative "
    >
      <div>
        <AiOutlineAlignLeft
          className="text-mainColor text-4xl font-extrabold cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      <div>
        <h2 className="hidden lg:block fon-bold">Dashboard</h2>

        <div className="lg:hidden">
          <Logo />
        </div>
      </div>
      <div className="flex items-center gap-2 bg-mainColor text-white py-2 px-4 rounded  cursor-pointer relative">
        {user?.avatar ? (
          <img src={user.avatar} className="w-8 h-8 rounded-full" />
        ) : (
          <RxAvatar className="text-2xl" />
        )}

        <h5 onClick={loggingOutHandler}>{`${user.firstName}`}</h5>
        <button>
          <AiFillCaretDown />
        </button>
        {loggingOut && (
          <button
            className=" absolute -bottom-9 right-1/2 translate-x-1/2 bg-red-500 hover:bg-red-600 py-1 px-2 rounded text-white "
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
