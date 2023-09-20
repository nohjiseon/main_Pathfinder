import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const logout = async () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  cookies.remove("is_login");
  localStorage.removeItem("token");
  localStorage.removeItem("memberId");
  localStorage.removeItem("email");
  navigate("/");
};

export default logout;
