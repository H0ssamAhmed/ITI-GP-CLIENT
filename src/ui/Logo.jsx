import { Link } from "react-router-dom";
import logoLarge from "../assets/logo/logo-large.png";
import logoMeduim from "../assets/logo/logo-large.png";
import logoSmall from "../assets/logo/logo-large.png";

function Logo() {
  return (
    <Link to={"/"}>

      <div className="flex items-center space-x-4 lg:ml-20">
        {/* <!-- Large Screen Logo --> */}
        <img
          src={logoLarge}
          alt="Large Logo"
          className="hidden w-[15rem] lg:block"
        />

        {/* <!-- Medium Screen Logo --> */}
        <img
          src={logoMeduim}
          alt="Medium Logo"
          className="hidden w-[13rem] md:block lg:hidden"
        />

        {/* <!-- Small Screen Logo --> */}
        <img
          src={logoSmall}
          alt="Small Logo"
          className="block w-[10rem] md:hidden"
        />
      </div>
    </Link>

  );
}

export default Logo;
