import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import StatsCard from "../components/StatsCard";
import { FaUsers, FaBriefcase } from "react-icons/fa";

export const loader = async () => {
  try {
    const {
      data: { data: users },
    } = await customFetch.get("/users");

    const {
      data: { jobs },
    } = await customFetch.get("/jobs");
    return { users, jobs };
  } catch (error) {
    return null;
  }
};
const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <div className="grid lg:grid-cols-2 gap-4 m-8">
      <StatsCard
        name={"total User"}
        icon={<FaUsers className="text-4xl" />}
        totalNum={users.users.length}
        cardType={"users"}
      />
      <StatsCard
        name={"total jobs"}
        icon={<FaBriefcase className="text-4xl" />}
        totalNum={jobs.length}
        cardType={"jobs"}
      />
    </div>
  );
};

export default Admin;
