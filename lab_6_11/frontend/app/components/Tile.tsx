import { memo } from "react";

interface TileProps {
  title: string;
  description: string;
  src: string;
}

const isVideoUrl = (url: string): boolean => {
  return /\.(mp4|webm|ogg|mov)$/i.test(url) || url.includes('video');
};

export const Tile = memo(function Tile({ title, description, src }: TileProps) {
  const isVideo = isVideoUrl(src);

  return (
    <div className="flex flex-col items-center">
      <div className="size-[480px] mb-4 overflow-hidden">
        {isVideo ? (
          <video
            src={src}
            className="w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img src={src} alt={title} className="w-full h-full object-cover object-center" />
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-white/70 text-center text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
});
