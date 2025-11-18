import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
}

export function TypingText({ text, speed = 40 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <>
      {displayedText}
      <span className="animate-pulse">|</span>
    </>
  );
}
