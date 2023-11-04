import Logo from "./Logo";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { AiFillCaretDown } from "react-icons/ai";
import { useDashboardContext } from "../pages/DashboardLayout";
const Navbar = () => {
  const { toggleSidebar, user } = useDashboardContext();

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

        <h5>{`${user.firstName}`}</h5>
      </div>
    </nav>
  );
};
export default Navbar;
