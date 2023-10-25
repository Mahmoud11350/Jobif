import day from "dayjs";
import { Form, Link, useNavigate } from "react-router-dom";
const Job = ({
  id,
  position,
  company,
  jobLocation,
  jobType,
  jobStatus,
  createdAt,
}) => {
  const date = day(createdAt).format("D MMM, YYYY");
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 mb-4 rounded">
      <div className="flex items-center pb-6 border-b">
        <div className="bg-mainColor text-white p-6 rounded-lg capitalize">
          {position.charAt(0)}
        </div>
        <div className="ml-4 capitalize">
          <h4>{position}</h4>
          <p>{company}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 capitalize mt-4">
        <h5 className="mb-2">{jobLocation}</h5>
        <h5 className="mb-2">{date}</h5>
        <h5 className="mb-2">{jobType}</h5>
        <h5 className={`${jobStatus}`}>{jobStatus}</h5>
      </div>
      <div className="flex gap-4 mt-4 ">
        <Link className="btn capitalize" to={`/dashboard/edit-job/${id}`}>
          edit
        </Link>
        <Form method="post" action={`../delete-job/${id}`}>
          <button type="submit" className="btn capitalize">
            delete
          </button>
        </Form>
      </div>
    </div>
  );
};
export default Job;
