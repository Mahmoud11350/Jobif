import logo from "../assets/img/logo.svg";
const Logo = ({ logoCenter }) => {
  return (
    <div
      className={`h-20 flex items-center ${
        logoCenter == true ? "justify-center" : ""
      }`}
    >
      <img src={logo} alt="logo" className="max-w-full" />
    </div>
  );
};
export default Logo;
