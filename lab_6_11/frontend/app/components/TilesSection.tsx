import { useMemo } from "react";
import { Tile } from "./Tile";

const TILES_DATA = [
  {
    title: "Преміальні аксесуари",
    description: "Пуровери ручної роботи з нержавіючої сталі, точні ваги, чайники з контролем температури та преміальні млинки. Кожен інструмент створений для ідеального заварювання кави.",
    bgColor: "bg-slate-200",
    icon: (
      <svg className="w-32 h-32 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2 21h18v-2H2v2zM20 8H4V6h16v2zm-1.5 8.5c0 .83-.67 1.5-1.5 1.5H7c-.83 0-1.5-.67-1.5-1.5v-5h13v5zm0-9.5H5.5V5h13v2z"/>
        <path d="M18.5 7h-13c-.83 0-1.5.67-1.5 1.5v8c0 .83.67 1.5 1.5 1.5h13c.83 0 1.5-.67 1.5-1.5v-8c0-.83-.67-1.5-1.5-1.5z"/>
      </svg>
    ),
  },
  {
    title: "Прецизійні фільтри",
    description: "Паперові та металеві фільтри преміум-класу для оптимальної екстракції. V60, Chemex, AeroPress та спеціальні фільтри, які розкривають унікальні характеристики вашої кави.",
    bgColor: "bg-amber-200",
    icon: (
      <svg className="w-32 h-32 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 3v18h12V3H6zm10 16H8V5h8v14z"/>
        <path d="M10 7h4v2h-4zm0 4h4v2h-4zm0 4h4v2h-4z"/>
      </svg>
    ),
  },
  {
    title: "Елітна кава",
    description: "Моносортова кава з найкращих мікро-плантацій. Світле та середнє обсмажування, яке підкреслює терруар, ретельно відібране та обсмажене для розкриття складних смакових профілів.",
    bgColor: "bg-orange-200",
    icon: (
      <svg className="w-32 h-32 text-orange-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S20.43 3 18.5 3zM16 5v3H6V5h10zm2.5 3H18V5h.5c.83 0 1.5.67 1.5 1.5S19.33 8 18.5 8zM4 19h16v2H4z"/>
      </svg>
    ),
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
          bgColor={tile.bgColor}
          icon={tile.icon}
        />
      )),
    []
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tiles}
        </div>
        <div className="flex justify-center">
          <button className="px-8 py-3 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded transition-colors">
            Переглянути більше
          </button>
        </div>
      </div>
    </section>
  );
}
