import { redirect, useLoaderData, useParams } from "react-router-dom";
import EditJobForm from "../components/EditJobForm";
import customFetch from "../utils/customFetch";
import { newJobInputs } from "../utils/jobInput";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  const id = params.id;
  try {
    const job = await customFetch(`/jobs/${id}`);
    return job;
  } catch (error) {
    return redirect("/dashboard");
  }
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${id}`, data);
    toast.success("Job Edited Successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/all-jobs");
  }
};

const EditJob = () => {
  const {
    data: { data },
  } = useLoaderData();
  return (
    <EditJobForm
      inputs={newJobInputs}
      type={"editJob"}
      method={"post"}
      values={{ ...data }}
    />
  );
};
export default EditJob;
