import { Link } from "react-router";
import eyeLogo from "../assets/eye_logo.svg";

export function Logo() {
  return (
    <Link to="/" className="px-4 py-2 flex items-center hover:opacity-80 transition-opacity">
      <div className="w-16 h-8 overflow-hidden flex items-center justify-center">
        <img
          src={eyeLogo}
          alt="VasylCo logo"
          className="h-full w-full object-cover scale-200"
        />
      </div>
    </Link>
  );
}
