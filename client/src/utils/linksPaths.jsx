import { MdLibraryBooks, MdQueryStats } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const linkspaths = [
  {
    icons: <MdLibraryBooks />,
    path: "",
    name: "add job",
  },
  {
    icons: <MdQueryStats />,
    path: "all-jobs",
    name: "all jobs",
  },
  {
    icons: <IoStatsChartOutline />,
    path: "stats",
    name: "stats",
  },
  {
    icons: <ImProfile />,
    path: "profile",
    name: "profile",
  },
  {
    icons: <MdAdminPanelSettings />,
    path: "admin",
    name: "admin",
  },
];

export default linkspaths;
