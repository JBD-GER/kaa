import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: Props) {
  return (
    <header
      className={`section-header section-header--${align}${inverse ? " section-header--inverse" : ""}`}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <div className="section-header__description">{description}</div> : null}
    </header>
  );
}
