import { toast } from "react-toastify";
import JobForm from "../components/JobForm";
import customFetch from "../utils/customFetch";
import { newJobInputs } from "../utils/jobInput";
import { redirect } from "react-router-dom";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const job = Object.fromEntries(formData);
    try {
      const data = await customFetch.post("/jobs", job);
      queryClient.invalidateQueries(["stats"]);
      toast.success("Wishing You The Best In This Job");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      return toast.error(error.response.data.msg);
    }
  };

const NewJob = () => {
  return <JobForm inputs={newJobInputs} type={"newJob"} method={"post"} />;
};
export default NewJob;
