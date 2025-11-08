import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("catalog", "./routes/catalog.tsx"),
  route("product/:id", "./routes/product.tsx"),
  route("cart", "./routes/cart.tsx"),
  route("checkout", "./routes/checkout.tsx"),
  route("order-success", "./routes/order-success.tsx"),
  route("sign-up", "./routes/sign-up.tsx"),
  route("sign-in", "./routes/sign-in.tsx"),
] satisfies RouteConfig;
