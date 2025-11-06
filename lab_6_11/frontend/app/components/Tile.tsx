interface TileProps {
  title: string;
  description: string;
  bgColor: string;
  icon: React.ReactNode;
}

export function Tile({ title, description, bgColor, icon }: TileProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={`aspect-[4/3] w-full ${bgColor} mb-4 flex items-center justify-center relative rounded-lg shadow-md`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-center text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
