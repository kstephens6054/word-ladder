import "./Header.css";

const Header = () => {
  return (
    <header>
      <h1>
        <span className="logo-text-top">Word</span>{" "}
        <span className="logo-text-bottom">Ladder</span>
      </h1>
      <img
        className="logo"
        src="/assets/images/RoughStepladder.svg"
        alt="Rough Step Ladder"
        width="184"
        height="211"
      />
    </header>
  );
};

export default Header;
