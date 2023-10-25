import { AiOutlineClose } from "react-icons/ai";
import Logo from "./Logo";
import Links from "./Links";
import { useDashboardContext } from "../pages/DashboardLayout";
const MobileSidebar = () => {
  const { mobileSidebar, toggleMobileSidebar } = useDashboardContext();
  return (
    <section
      className={`absolute inset-0 w-full h-full bg-black/80 p-4 lg:hidden z-10 ${
        mobileSidebar == true ? "" : "hidden"
      }`}
    >
      <div>
        <div className="center bg-white h-[95%] w-[95%] mx-auto rounded-lg p-4 ">
          <AiOutlineClose
            className="text-3xl text-red-600 cursor-pointer"
            onClick={toggleMobileSidebar}
          />
          <div className="flex flex-col items-center justify-center">
            <Logo />
            <Links />
          </div>
        </div>
      </div>
    </section>
  );
};
export default MobileSidebar;
