import type { SVGProps } from "react";

export type LogoVariant = "dark" | "light";
export type LogoSize = "horizontal" | "compact" | "mark";

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, "color"> {
  variant?: LogoVariant;
  size?: LogoSize;
  decorative?: boolean;
  title?: string;
}

const palettes = {
  dark: {
    accent: "#2454D6",
    divider: "#D0D5DD",
    foreground: "#0B0F17",
    secondary: "#475467",
  },
  light: {
    accent: "#7EA2FF",
    divider: "#475467",
    foreground: "#FFFFFF",
    secondary: "#D0D5DD",
  },
} as const;

const dimensions = {
  horizontal: { height: 64, viewBox: "0 0 440 64", width: 440 },
  compact: { height: 64, viewBox: "0 0 222 64", width: 222 },
  mark: { height: 64, viewBox: "0 0 64 64", width: 64 },
} as const;

interface GlyphProps {
  accent: string;
  foreground: string;
}

function MarkGlyph({ accent, foreground }: GlyphProps) {
  return (
    <>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 18h5c5 0 5 5 7 9l1 5" stroke={foreground} strokeWidth="4" />
        <path d="M8 46h5c5 0 5-5 7-9l1-5" stroke={foreground} strokeWidth="4" />
        <path d="m32 21 11 11-11 11-11-11Z" stroke={accent} strokeWidth="4" />
        <path d="M43 32h13m-5-5 5 5-5 5" stroke={foreground} strokeWidth="4" />
      </g>
      <circle cx="8" cy="18" r="3.5" fill={accent} />
      <circle cx="8" cy="46" r="3.5" fill={accent} />
      <circle cx="32" cy="32" r="3" fill={foreground} />
    </>
  );
}

function Wordmark({ foreground }: Pick<GlyphProps, "foreground">) {
  return (
    <g fill={foreground}>
      <path d="M82 13h10v15.25L107 13h13l-18.5 18.5L121 53h-13L92 35.4V53H82Z" />
      <path
        d="m127 53 16-40h12l16 40h-11l-3.2-9h-15.6L138 53h-11Zm17.1-18h9.8L149 21.2 144.1 35Z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <path
        d="m174 53 16-40h12l16 40h-11l-3.2-9h-15.6L185 53h-11Zm17.1-18h9.8L196 21.2 191.1 35Z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </g>
  );
}

interface DescriptorProps {
  divider: string;
  secondary: string;
}

function Descriptor({ divider, secondary }: DescriptorProps) {
  return (
    <>
      <path d="M236 15v34" stroke={divider} />
      <g
        fill={secondary}
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="1.1"
      >
        <text x="256" y="29">
          KI-AUTOMATISIERUNGS-
        </text>
        <text x="256" y="43">
          AGENTUR
        </text>
      </g>
    </>
  );
}

/**
 * Accessible KAA logo. Set `decorative` when adjacent visible text already names
 * the brand to prevent duplicate screen-reader announcements.
 */
export function Logo({
  variant = "dark",
  size = "horizontal",
  decorative = false,
  width,
  height,
  title,
  "aria-label": ariaLabel,
  ...props
}: LogoProps) {
  const palette = palettes[variant];
  const dimension = dimensions[size];
  const accessibleName =
    ariaLabel ??
    title ??
    (size === "mark" ? "KAA" : "KAA – KI-Automatisierungs-Agentur");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox={dimension.viewBox}
      width={width ?? dimension.width}
      height={height ?? dimension.height}
      focusable="false"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : accessibleName}
    >
      {!decorative && <title>{accessibleName}</title>}
      <MarkGlyph accent={palette.accent} foreground={palette.foreground} />
      {size !== "mark" && <Wordmark foreground={palette.foreground} />}
      {size === "horizontal" && (
        <Descriptor divider={palette.divider} secondary={palette.secondary} />
      )}
    </svg>
  );
}
