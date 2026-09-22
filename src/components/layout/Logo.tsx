import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      src={"/logo.png"}
      alt="Nepcart"
      className="w-15 cursor-pointer  "
      onClick={() => navigate("/")}
    />
  );
};

export default Logo;
