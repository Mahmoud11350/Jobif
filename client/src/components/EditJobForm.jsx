import { Form, useNavigation } from "react-router-dom";
const EditJobForm = ({ inputs, type, method, values }) => {
  const navigation = useNavigation();
  return (
    <div className="bg-white my-8 mx-12 p-4 rounded-lg">
      <h4 className="mb-4 text-center ">Edit Job</h4>
      <Form method={method} className="grid lg:grid-cols-3 items-end gap-4">
        {inputs.map((input) => {
          return (
            <div className=" mt-4 flex flex-col" key={input.name}>
              <label htmlFor={input.name} className="mb-2">
                {input.label}
              </label>
              {input.type == "text" ? (
                <input
                  type={input.type}
                  id={input.name}
                  name={input.name}
                  defaultValue={values[input.name]}
                  className="bg-background py-2 px-4 rounded"
                />
              ) : (
                <select
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
        <button className="btn ">Edit Job</button>
      </Form>
    </div>
  );
};
export default EditJobForm;
