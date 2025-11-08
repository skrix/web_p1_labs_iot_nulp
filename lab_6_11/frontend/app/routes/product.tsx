import { useParams, useNavigate } from "react-router";
import type { Route } from "./+types/product";
import { Layout } from "../components/Layout";
import { ProductPage } from "../components/ProductPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Товар - Vasyl&Co` },
    { name: "description", content: "Детальна інформація про товар" },
  ];
}

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-4 pt-24 pb-16 bg-white dark:bg-gray-950 min-h-screen">
          <ProductPage productId={id || "1"} onBack={() => navigate("/catalog")} />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
