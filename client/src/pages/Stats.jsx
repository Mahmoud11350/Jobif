import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import { MdPendingActions, MdOutlineGppBad } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const { data } = await customFetch("/jobs/show-stats");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
};
const Stats = () => {
  const {
    data: { stats },
  } = useQuery(statsQuery);

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
