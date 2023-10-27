import Logo from "../components/Logo";
import jobHunt from "../assets/img/job-hunt.svg";
import { Link, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
export const loader = async () => {
  try {
    await customFetch("/users/current-user");
    return redirect("/dashboard");
  } catch (error) {
    return null;
  }
};
const Landing = () => {
  return (
    <section className="container">
      <Logo />
      <div className="flex  items-center h-[calc(100vh-80px)] ">
        <div className="mx-auto text-center">
          <h1>
            Job <span className="text-mainColor font-bold ">Tracking</span> App
          </h1>
          <p className="max-w-[500px] py-4 text-slate-600">
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Link to="/register" className="btn">
              Register
            </Link>
            <Link to="/login" className="btn">
              Login / Demo User
            </Link>
          </div>
        </div>
        <img
          src={jobHunt}
          alt="job Hunt"
          className="hidden lg:block max-w-full w-[500px]"
        />
      </div>
    </section>
  );
};
export default Landing;
