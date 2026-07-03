import { BuilderError, ErrorCode } from "../errors/index.js";
import { Limits } from "../validation/index.js";

/**
 * Parses a color input into Discord's expected integer format.
 * Accepts numbers or hex strings like "#5865F2" or "5865F2".
 */
export function parseColor(color: string | number, builderName: string): number {
  let parsed: number;

  if (typeof color === "string") {
    const hex = color.replace(/^#/, "");
    parsed = parseInt(hex, 16);
    if (isNaN(parsed)) {
      throw new BuilderError(
        ErrorCode.InvalidColor,
        builderName,
        `Invalid color string: "${color}". Expected hex string or number.`
      );
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
