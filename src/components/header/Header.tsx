import "./header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      Oscar Trevejo Films 🎥
    </span>
  );
};

export default Header;