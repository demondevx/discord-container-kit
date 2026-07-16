import { BuilderError, ErrorCode } from "../errors/index.js";
import { Limits } from "../validation/index.js";

const NamedColors: Record<string, number> = {
  white: 0xFFFFFF, aqua: 0x1ABC9C, green: 0x57F287, blue: 0x3498DB,
  yellow: 0xFEE75C, purple: 0x9B59B6, fuchsia: 0xEB459E, gold: 0xF1C40F,
  orange: 0xE67E22, red: 0xED4245, grey: 0x95A5A6, navy: 0x34495E,
  darkaqua: 0x11806A, darkgreen: 0x1F8B4C, darkblue: 0x206694, darkpurple: 0x71368A,
  darkgold: 0xC27C0E, darkorange: 0xA84300, darkred: 0x992D22, darkgrey: 0x979C9F,
  darkergrey: 0x7F8C8D, lightgrey: 0xBCC0C0, darknavy: 0x2C3E50, blurple: 0x5865F2,
  greyple: 0x99AAB5, darkbutnotblack: 0x2C2F33, notquiteblack: 0x23272A,
  luminousvividpink: 0xE91E63, darkvividpink: 0xAD1457, black: 0x000000,
  pink: 0xFFC0CB, cyan: 0x00FFFF, magenta: 0xFF00FF, lime: 0x00FF00,
  maroon: 0x800000, olive: 0x808000, teal: 0x008080, silver: 0xC0C0C0,
};

/**
 * Parses a color input into Discord's expected integer format.
 * Accepts numbers, hex strings like "#5865F2", or standard color names like "red".
 */
export function parseColor(color: string | number, builderName: string): number {
  let parsed: number;

  if (typeof color === "string") {
    const lowerColor = color.toLowerCase();
    if (lowerColor in NamedColors) {
      parsed = NamedColors[lowerColor];
    } else {
      const hex = color.replace(/^#/, "");
      parsed = parseInt(hex, 16);
      if (isNaN(parsed)) {
        throw new BuilderError(
          ErrorCode.InvalidColor,
          builderName,
          `Invalid color string: "${color}". Expected hex string, standard color name, or number.`
        );
      }
    }
  } else {
    parsed = color;
  }

  if (parsed < Limits.Color.Min || parsed > Limits.Color.Max) {
    throw new BuilderError(
      ErrorCode.InvalidColor,
      builderName,
      `Color value ${parsed} is out of bounds (must be between 0 and 16777215).`
    );
  }

  return parsed;
}
