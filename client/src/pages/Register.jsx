import Logo from "../components/Logo";
import Form from "../components/Form";
import { Link, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
// import { Form } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await customFetch.post("/auth/register", data);
    toast.success("Registration was successful");

    return redirect("/dashboard");
  } catch (error) {
    return toast.error(error.response.data.msg);
  }
};

const Register = () => {
  const inputs = [
    { label: "first name", name: "firstName" },
    { label: "last name", name: "lastName" },
    { label: "location", name: "location" },
    { label: "email", name: "email" },
    { label: "password", name: "password" },
  ];
  return (
    <section className="bg-white w-[400px] center p-4 rounded shadow my-4">
      <Logo className="text-center mx-auto" logoCenter={true} />
      <Form inputs={inputs} method={"post"} />
      <div className="flex flex-col"></div>
      <h5 className="text-center my-4">
        Already a Member ?{" "}
        <Link className="text-mainColor font-bold" to="/login">
          Login
        </Link>
      </h5>
    </section>
  );
};
export default Register;
