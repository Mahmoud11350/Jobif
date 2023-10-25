import { Link, redirect, useNavigate, useNavigation } from "react-router-dom";
import Form from "../components/Form";
import Logo from "../components/Logo";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Welcome Back ");
    return redirect("/dashboard");
  } catch (error) {
    return toast.error(error.response.data.msg);
  }
};
const Login = () => {
  const navigate = useNavigate();
  const inputs = [
    { name: "email", label: "email" },
    { label: "password", name: "password" },
  ];
  const demoUser = { email: "demo@gmail.com", password: "secret" };
  const exploreApp = async () => {
    try {
      await customFetch.post("/auth/login", demoUser);
      navigate("/dashboard");

      toast.success("Take a Test Drive");
    } catch (error) {
      navigate("/landing");
      toast.error("Something Wrong ");
    }
  };
  return (
    <section className="bg-white w-[400px] center p-4 rounded shadow">
      <Logo className="text-center mx-auto" logoCenter={true} />
      <Form inputs={inputs} method={"post"} />
      <div className="flex flex-col">
        <button
          className="btn mb-4 rounded text-center cursor-pointer"
          onClick={exploreApp}
        >
          Explore the App
        </button>
      </div>
      <h5 className="text-center my-4">
        Not a member ?{" "}
        <Link className="text-mainColor font-bold" to="/register">
          Register
        </Link>
      </h5>
    </section>
  );
};
export default Login;
