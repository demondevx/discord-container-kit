export const ErrorCode = {
  InvalidColor: "INVALID_COLOR",
  InvalidUrl: "INVALID_URL",
  ExceedsMaxLength: "EXCEEDS_MAX_LENGTH",
  ExceedsMaxItems: "EXCEEDS_MAX_ITEMS",
  MissingRequired: "MISSING_REQUIRED",
  InvalidNesting: "INVALID_NESTING",
  InvalidConfiguration: "INVALID_CONFIGURATION",
  OutOfRange: "OUT_OF_RANGE",
  InvalidValue: "INVALID_VALUE",
} as const;

export type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode];
