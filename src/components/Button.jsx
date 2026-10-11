import { Link } from "react-router-dom";
import { theme } from "../theme";

const Button = ({
  children,
  variant = "primary",
  className = "",
  to,
  ...props
}) => {
  const styles = {
    primary: theme.cls.btnPrimary,
    secondary: theme.cls.btnSecondary,
    small: theme.cls.btnSmall,
  };

  if (to) {
    return (
      <Link
        to={to}
        className={`${styles[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;