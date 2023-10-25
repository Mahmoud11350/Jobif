import Navbar from "../components/Navbabr";
import MobileSidebar from "../components/MobileSidebar";
import Sidebar from "../components/Sidebar";
import { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
const DashboardContext = createContext();
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data.data.user;
  } catch (error) {
    return redirect("/");
  }
};
const DashboardProvider = () => {
  const user = useLoaderData();
  const [sidebar, setSidebar] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
    setMobileSidebar(!mobileSidebar);
  };
  const toggleMobileSidebar = () => setMobileSidebar(!mobileSidebar);
  const loggingOutHandler = () => setLoggingOut(!loggingOut);
  return (
    <DashboardContext.Provider
      value={{
        sidebar,
        mobileSidebar,
        toggleSidebar,
        toggleMobileSidebar,
        loggingOut,
        loggingOutHandler,
        user,
      }}
    >
      <div className="grid grid-cols-[auto_1fr] items-stretch">
        <div>
          <MobileSidebar />
          <Sidebar />
        </div>
        <div>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardProvider;
