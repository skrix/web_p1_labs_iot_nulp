interface SocialIconProps {
  href: string;
  ariaLabel: string;
  bgColor: string;
  hoverColor: string;
  children: React.ReactNode;
}

export function SocialIcon({ href, ariaLabel, bgColor, hoverColor, children }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full ${bgColor} ${hoverColor} transition-colors flex items-center justify-center text-white`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
