import { RaydropLogo } from "./hero/RaydropLogo";
import { RaydropProduct } from "./hero/RaydropProduct";
import { RaydropText } from "./hero/RaydropText";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute left-1/4 md:left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 scale-500 sm:scale-200 md:scale-300 lg:scale-500">
        <RaydropProduct />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 scale-80 md:scale-150 lg:scale-250">
        <RaydropLogo />
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40 max-w-[90%] sm:max-w-md">
        <RaydropText />
      </div>
    </section>
  );
}
