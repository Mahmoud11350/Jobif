import { Form as RegisteritionForm, useNavigation } from "react-router-dom";
const Form = ({ inputs, method }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting";
  return (
    <RegisteritionForm className="mb-4" method={method}>
      {inputs.map((input) => {
        return (
          <div className="mb-4" key={input.name}>
            <label htmlFor="input" className="capitalize mb-1 block">
              {input.label}
            </label>
            <input
              className=" border w-full rounded bg-background px-4 py-1 outline-none"
              type={
                input.name == "email"
                  ? "email"
                  : input.name == "password"
                  ? "password"
                  : "text"
              }
              name={input.name}
              id={input.name}
              required
            />
          </div>
        );
      })}
      <button
        type="submit"
        className={`btn w-full ${
          isSubmitting ? "bg-red-700 hover:bg-red-800" : ""
        }`}
      >
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </RegisteritionForm>
  );
};
export default Form;
