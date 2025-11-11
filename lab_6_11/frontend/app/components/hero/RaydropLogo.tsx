import raydropLogo from "../../assets/raydrop_logo.svg";

export const RaydropLogo = () => {
  return (
    <div className="w-96 h-32 overflow-hidden flex items-center justify-center">
      <img
        src={raydropLogo}
        alt="Raydrop Logo"
        className="h-full w-full object-cover scale-150 brightness-0 invert"
      />
    </div>
  );
};

RaydropLogo.displayName = "RaydropLogo";
