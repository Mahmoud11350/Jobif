import { jobSearch } from "../utils/jobInput";
import JobForm from "../components/JobForm";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";
import Job from "../components/Job";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return data;
  } catch (error) {
    toast.error(error);
  }
};

const JobsContext = createContext();
const AllJobs = () => {
  const data = useLoaderData();
  console.log(data);
  const navigate = useNavigate();
  const editJob = ({ id }) => {
    navigate(`/dashboard/edit-job/${id}`);
  };

  return (
    <JobsContext.Provider value={{ data, editJob }}>
      <>
        <JobForm inputs={jobSearch} type={"search"} />
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
      </>
    </JobsContext.Provider>
  );
};
export const useAllJobsContext = () => useContext(JobsContext);
export default AllJobs;
