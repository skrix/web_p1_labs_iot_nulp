import { TypingText } from "../TypingText";

const HERO_TEXT =
  "Vasyl&Co RayDrop — це пуровер ручної роботи, \
  виготовлений повністю з харчової нержавіючої сталі AISI 304, \
  що поєднує в собі естетику мінімалізму та професійний підхід до заварювання кави.";

export function RaydropText() {
  return (
    <p className="text-white text-xs sm:text-sm md:text-base font-mono leading-relaxed">
      <TypingText text={HERO_TEXT} speed={40} />
    </p>
  );
}
