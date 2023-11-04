import notFoundImg from "../assets/img/not-found.svg";
import serverDownImg from "../assets/img/server-down.svg";
import { Link, useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  if (error.status == "404") {
    return (
      <div className="max-w-[400px] center">
        <img className="max-w-full" src={notFoundImg} alt="404" />
        <div className="text-center mt-8">
          <h3>Page Not Found </h3>
          <Link to="/" className="btn mt-8 block">
            Back Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-[400px] center">
      <img className="max-w-full" src={serverDownImg} alt="500" />
      <div className="text-center mt-8">
        <h3>Server Is Down Try Again Later</h3>
        <Link to="/" className="btn mt-8 block">
          Back Home
        </Link>
      </div>
    </div>
  );
};
export default ErrorPage;
