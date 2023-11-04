import Navbar from "../components/Navbabr";
import MobileSidebar from "../components/MobileSidebar";
import Sidebar from "../components/Sidebar";
import { createContext, useContext, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import Loading from "../components/Loading";

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
  const navigation = useNavigation();
  const isLoading = navigation.state == "loading";
  const toggleSidebar = () => {
    setSidebar(!sidebar);
    setMobileSidebar(!mobileSidebar);
  };
  const toggleMobileSidebar = () => setMobileSidebar(!mobileSidebar);
  return (
    <DashboardContext.Provider
      value={{
        sidebar,
        mobileSidebar,
        toggleSidebar,
        toggleMobileSidebar,

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
          {isLoading ? <Loading /> : <Outlet />}
        </div>
      </div>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardProvider;
