import { ErrorCodeType } from "./codes.js";

/**
 * Standardized error thrown by discord-container-kit builders.
 */
export class BuilderError extends Error {
  public readonly code: ErrorCodeType;
  public readonly builderName: string;

  constructor(code: ErrorCodeType, builderName: string, message: string) {
    super(`[${code}] ${builderName}: ${message}`);
    this.name = "BuilderError";
    this.code = code;
    this.builderName = builderName;
  }
}
