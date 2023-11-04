import { jobSearch } from "../utils/jobInput";
import JobSearchForm from "../components/JobSearchForm";
import customFetch from "../utils/customFetch";
import { useLoaderData, useNavigate } from "react-router-dom";
import Job from "../components/Job";
import { createContext, useContext } from "react";
import Pagination from "../components/Pagination";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/jobs", { params });
    return { data };
  } catch (error) {
    return error;
  }
};

const JobsContext = createContext();
const AllJobs = () => {
  const { data } = useLoaderData();
  const navigate = useNavigate();
  const editJob = ({ id }) => {
    navigate(`/dashboard/edit-job/${id}`);
  };

  return (
    <JobsContext.Provider value={{ data, editJob }}>
      <>
        <JobSearchForm inputs={jobSearch} type={"search"} method={"get"} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8 mx-12 p-4">
          {data?.jobs?.map((job) => {
            const {
              _id,
              position,
              company,
              jobLocation,
              jobStatus,
              jobType,
              createdAt,
            } = job;

            return (
              <Job
                position={position}
                company={company}
                jobLocation={jobLocation}
                jobStatus={jobStatus}
                jobType={jobType}
                createdAt={createdAt}
                id={_id}
                key={_id}
              />
            );
          })}
        </div>
        <Pagination
          numOfPages={data.numOfPages}
          currentPage={data.currentPage}
        />
      </>
    </JobsContext.Provider>
  );
};
export const useAllJobsContext = () => useContext(JobsContext);
export default AllJobs;
