import { Form, redirect } from "react-router-dom";
import InputRow from "./InputRow";
import { useDashboardContext } from "../pages/DashboardLayout";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  try {
    await customFetch.patch(`/users/${params.id}`, formData);
    toast.success("User Profile Updated Successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/dashboard");
};

const ProfileForm = () => {
  const { user } = useDashboardContext();
  return (
    <Form
      encType="multipart/form-data"
      className="grid grid-cols-1 lg:grid-cols-3 gap-x-2 gap-y-4 items-end my-8"
      method="post"
    >
      <InputRow
        type={"file"}
        name={"avatar"}
        label={"select an image with max size 5 MB"}
      />
      <InputRow
        type={"text"}
        name={"firstName"}
        label={"first name"}
        defaultValue={user.firstName}
      />
      <InputRow
        type={"text"}
        name={"lastName"}
        label={"last name"}
        defaultValue={user.lastName}
      />
      <InputRow
        type={"text"}
        name={"email"}
        label={"email"}
        defaultValue={user.email}
      />
      <InputRow
        type={"text"}
        name={"location"}
        label={"location"}
        defaultValue={user.location}
      />
      <button type="submit" className="btn">
        Edit
      </button>
    </Form>
  );
};

export default ProfileForm;
