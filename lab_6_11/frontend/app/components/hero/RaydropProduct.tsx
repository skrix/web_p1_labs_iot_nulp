import { memo } from "react";
import raydropProduct from "../../assets/raydrop_product.svg";

export const RaydropProduct = memo(() => (
  <div aria-hidden="true">
    <img
      src={raydropProduct}
      alt="Raydrop Product"
      className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
    />
  </div>
));

RaydropProduct.displayName = "RaydropProduct";
