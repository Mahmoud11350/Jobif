import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Login,
  Register,
  ErrorPage,
  DashboardLayout,
  NewJob,
  EditJob,
  AllJobs,
  Stats,
  Profile,
  Admin,
} from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as currentUserloader } from "./pages/DashboardLayout";
import { action as newJobAction } from "./pages/NewJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { action as profileFromAction } from "./components/ProfileForm";
import { loader as adminLoader } from "./pages/Admin";
import { loader as statsLoader } from "./pages/Stats";
import { loader as chechExistUserLoader } from "./pages/Landing";

const pagesRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: chechExistUserLoader,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: currentUserloader,
        children: [
          {
            index: true,
            element: <NewJob />,
            action: newJobAction,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: "profile/:id",
            element: <Profile />,
            action: profileFromAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={pagesRouter} />;
};
export default App;
