import { BuilderError, ErrorCode } from "../errors/index.js";

/**
 * Asserts that a string does not exceed the maximum length.
 */
export function assertStringLength(
  value: string,
  maxLength: number,
  builderName: string,
  propertyName: string
): void {
  if (value.length > maxLength) {
    throw new BuilderError(
      ErrorCode.ExceedsMaxLength,
      builderName,
      `${propertyName} exceeds maximum length of ${maxLength} characters (got ${value.length}).`
    );
  }
}

/**
 * Asserts that a number falls within an inclusive range.
 */
export function assertRange(
  value: number,
  min: number,
  max: number,
  builderName: string,
  propertyName: string
): void {
  if (value < min || value > max) {
    throw new BuilderError(
      ErrorCode.OutOfRange,
      builderName,
      `${propertyName} must be between ${min} and ${max} (got ${value}).`
    );
  }
}

/**
 * Asserts that an array does not exceed the maximum item count.
 */
export function assertMaxItems(
  items: unknown[],
  maxItems: number,
  builderName: string,
  propertyName: string
): void {
  if (items.length > maxItems) {
    throw new BuilderError(
      ErrorCode.ExceedsMaxItems,
      builderName,
      `${propertyName} cannot contain more than ${maxItems} items (got ${items.length}).`
    );
  }
}

/**
 * Asserts a value is defined.
 */
export function assertRequired<T>(
  value: T | undefined | null,
  builderName: string,
  propertyName: string
): asserts value is T {
  if (value === undefined || value === null) {
    throw new BuilderError(
      ErrorCode.MissingRequired,
      builderName,
      `${propertyName} is required but was not provided.`
    );
  }
}

/**
 * Asserts a string matches basic URL structure.
 */
export function assertUrl(
  value: string,
  builderName: string,
  propertyName: string
): void {
  // Very basic URL validation to catch obvious mistakes.
  // Discord's CDN or attachment:// paths are valid.
  if (
    !value.startsWith("http://") &&
    !value.startsWith("https://") &&
    !value.startsWith("attachment://")
  ) {
    throw new BuilderError(
      ErrorCode.InvalidUrl,
      builderName,
      `${propertyName} must be a valid HTTP/HTTPS URL or attachment:// scheme (got "${value}").`
    );
  }
}
