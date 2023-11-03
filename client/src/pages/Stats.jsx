import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import { MdPendingActions, MdOutlineGppBad } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
export const loader = async () => {
  try {
    const { data } = await customFetch("/jobs/show-stats");
    return data;
  } catch (error) {
    return redirect("/dashboard");
  }
};
const Stats = () => {
  const { stats } = useLoaderData();

  return (
    <>
      <div className="m-8 grid lg:grid-cols-3 gap-4">
        <StatsCard
          name={"interview"}
          totalNum={stats.interview || 0}
          cardType={"interview"}
          icon={<BsFillBriefcaseFill />}
        />
        <StatsCard
          name={"pending"}
          totalNum={stats.pending || 0}
          cardType={"pending"}
          icon={<MdPendingActions />}
        />
        <StatsCard
          name={"declined"}
          totalNum={stats.declined || 0}
          cardType={"declined"}
          icon={<MdOutlineGppBad />}
        />
      </div>
    </>
  );
};
export default Stats;
