import { memo } from "react";

interface SocialLinkProps {
  href: string;
  ariaLabel: string;
  bgColor: string;
  hoverColor: string;
  children: React.ReactNode;
}

export const SocialLink = memo(function SocialLink({ href, ariaLabel, bgColor, hoverColor, children }: SocialLinkProps) {
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
});
