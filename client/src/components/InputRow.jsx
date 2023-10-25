const InputRow = ({ label, name, type, defaultValue }) => {
  return (
    <div className="grid capitalize ">
      <label htmlFor={name} className="mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="bg-background py-2 px-4 rounded"
      />
    </div>
  );
};

export default InputRow;
