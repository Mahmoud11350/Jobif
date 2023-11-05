import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Error from "./components/Error";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const pagesRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
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
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: currentUserloader,
        children: [
          {
            index: true,
            element: <NewJob />,
            action: newJobAction(queryClient),
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
            loader: statsLoader(queryClient),
            errorElement: <Error />,
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
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={pagesRouter} />;
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};
export default App;
