/**
 * Discord Component Types
 */
export const ComponentKind = {
  ActionRow: 1,
  Button: 2,
  StringSelect: 3,
  TextInput: 4,
  UserSelect: 5,
  RoleSelect: 6,
  MentionableSelect: 7,
  ChannelSelect: 8,
  Section: 9,
  TextDisplay: 10,
  Thumbnail: 11,
  MediaGallery: 12,
  File: 13,
  Separator: 14,
  Container: 17,
} as const;

export type ComponentKindType = typeof ComponentKind[keyof typeof ComponentKind];

/**
 * Discord Button Styles
 */
export const ButtonVariant = {
  Primary: 1,
  Secondary: 2,
  Success: 3,
  Danger: 4,
  Link: 5,
  Premium: 6,
} as const;

export type ButtonVariantType = typeof ButtonVariant[keyof typeof ButtonVariant];

/**
 * Discord Separator Spacing Sizes
 */
export const SpacingSize = {
  Small: 1,
  Large: 2,
} as const;

export type SpacingSizeType = typeof SpacingSize[keyof typeof SpacingSize];

/**
 * Discord Text Input Styles
 */
export const TextInputMode = {
  Short: 1,
  Paragraph: 2,
} as const;

export type TextInputModeType = typeof TextInputMode[keyof typeof TextInputMode];

/**
 * Discord Select Menu Default Value Types
 */
export type SelectDefaultValueKind = "user" | "role" | "channel";
