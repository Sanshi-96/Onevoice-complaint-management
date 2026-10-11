import { Link } from "react-router-dom";
import logo from "../assets/logo/main logo 2.png";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center shrink-0">
      <img
        src={logo}
        alt="OneVoice Logo"
        className="w-[100px] object-contain"
        style={{
          
        }}
      />
    </Link>
  );
};

export default Logo;