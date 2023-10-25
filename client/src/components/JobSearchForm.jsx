import { Form, Link, useSubmit } from "react-router-dom";
const JobSearchForm = ({ inputs, type }) => {
  const submit = useSubmit();
  const debounce = (onChange) => {
    let timeOut;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeOut);
      setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <div className="bg-white my-8 mx-12 p-4 rounded-lg">
      <h4 className="mb-4 text-center ">
        {type == "newJob" ? "Add Job" : "Search"}
      </h4>
      <Form className="grid lg:grid-cols-3 items-end gap-4">
        {inputs.map((input) => {
          return (
            <div className=" mt-4 flex flex-col" key={input.name}>
              <label htmlFor={input.name} className="mb-2">
                {input.label}
              </label>
              {input.type == "text" ? (
                <input
                  onChange={debounce((form) => submit(form))}
                  type={input.type}
                  id={input.name}
                  name={input.name}
                  className="bg-background py-2 px-4 rounded"
                />
              ) : (
                <select
                  onChange={(e) => submit(e.currentTarget.form)}
                  name={input.name}
                  className="bg-background py-2 px-4 rounded"
                >
                  {input.enum.map((option) => {
                    return (
                      <option
                        value={option}
                        name={input.name}
                        id={input.name}
                        key={option}
                      >
                        {option}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          );
        })}

        <Link
          to="/dashboard/all-jobs"
          className="bg-mainColor block text-white  text-center font-semibold py-2 rounded"
        >
          Reset Form Values
        </Link>
      </Form>
    </div>
  );
};
export default JobSearchForm;
