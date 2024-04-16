import PropTypes from "prop-types";
import Logo from "./Logo";

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
NavBar.propTypes = {
  children: PropTypes.func,
};
