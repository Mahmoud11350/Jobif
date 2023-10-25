import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
export const action = async ({ params }) => {
  const { id } = params;
  try {
    const deleted = await customFetch.delete(`/jobs/${id}`);
    toast.success("Job Deleted Successfully");
  } catch (error) {
    toast.error("job can't be deleted ");
  }
  return redirect("/dashboard/all-jobs");
};
