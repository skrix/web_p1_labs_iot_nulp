import { useMemo } from "react";
import { Tile } from "./Tile";
import materialsImage from "../assets/materials.jpg";
import productImage from "../assets/product.jpg";
import raydropVideo from "../assets/raydrop_logo_video.mp4";

const TILES_DATA = [
  {
    title: "Матеріали",
    description: "AISI 304 характеризується високою корозійною стійкістю, стійкістю до окислення та відмінними механічними властивостями.",
    src: materialsImage,
  },
  {
    title: "Фільтри",
    description: "Виконаний за стандартом V60, він забезпечує ідеальну фіксацію фільтра, стабільний потік води та рівномірну екстракцію.",
    src: raydropVideo,
  },
  {
    title: "Дизайн",
    description: "Дизайн RayDrop витончений і впізнаваний: лаконічні лінії, чиста геометрія, ідеальний баланс між формою та функціональністю.",
    src: productImage,
  },
] as const;

export function TilesSection() {
  const tiles = useMemo(
    () =>
      TILES_DATA.map((tile, index) => (
        <Tile
          key={index}
          title={tile.title}
          description={tile.description}
          src={tile.src}
        />
      )),
    []
  );

  return (
    <section className="py-60 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiles}
        </div>
      </div>
    </section>
  );
}
