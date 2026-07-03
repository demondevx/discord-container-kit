import {
  ComponentKindType,
  ButtonVariantType,
  SpacingSizeType,
  TextInputModeType,
  SelectDefaultValueKind,
} from "./enums.js";

// Basic Data Types
export interface PartialEmoji {
  id?: string;
  name?: string;
  animated?: boolean;
}

export interface UnfurledMediaItem {
  url: string;
  proxy_url?: string;
  width?: number;
  height?: number;
  // Other fields populated by Discord are ignored for builders
}

export interface SelectDefaultValue {
  id: string;
  type: SelectDefaultValueKind;
}

// ---------------------------------------------------------
// Top-Level / Layout Components
// ---------------------------------------------------------

export interface ContainerPayload {
  type: typeof ComponentKind.Container;
  components: AnyComponentPayload[];
  accent_color?: number;
  spoiler?: boolean;
  id?: number;
}

export interface ActionRowPayload {
  type: typeof ComponentKind.ActionRow;
  components: (
    | ButtonPayload
    | AnySelectMenuPayload
    | TextInputPayload
  )[];
  id?: number;
}

export interface SectionPayload {
  type: typeof ComponentKind.Section;
  components: TextDisplayPayload[];
  accessory?: ThumbnailPayload | ButtonPayload;
  id?: number;
}

// ---------------------------------------------------------
// Content Components
// ---------------------------------------------------------

export interface TextDisplayPayload {
  type: typeof ComponentKind.TextDisplay;
  content: string;
  id?: number;
}

export interface ThumbnailPayload {
  type: typeof ComponentKind.Thumbnail;
  media: UnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
  id?: number;
}

export interface MediaGalleryItemPayload {
  media: UnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
}

export interface MediaGalleryPayload {
  type: typeof ComponentKind.MediaGallery;
  items: MediaGalleryItemPayload[];
  id?: number;
}

export interface FilePayload {
  type: typeof ComponentKind.File;
  file: UnfurledMediaItem;
  spoiler?: boolean;
  id?: number;
}

export interface SeparatorPayload {
  type: typeof ComponentKind.Separator;
  spacing?: SpacingSizeType;
  divider?: boolean;
  id?: number;
}

// ---------------------------------------------------------
// Interactive Components
// ---------------------------------------------------------

export interface ButtonPayload {
  type: typeof ComponentKind.Button;
  style: ButtonVariantType;
  label?: string;
  emoji?: PartialEmoji;
  custom_id?: string;
  url?: string;
  sku_id?: string;
  disabled?: boolean;
  id?: number;
}

export interface StringSelectOptionPayload {
  label: string;
  value: string;
  description?: string;
  emoji?: PartialEmoji;
  default?: boolean;
}

export interface StringSelectPayload {
  type: typeof ComponentKind.StringSelect;
  custom_id: string;
  options: StringSelectOptionPayload[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  id?: number;
}

export interface AutoSelectPayload {
  type:
    | typeof ComponentKind.UserSelect
    | typeof ComponentKind.RoleSelect
    | typeof ComponentKind.MentionableSelect
    | typeof ComponentKind.ChannelSelect;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  default_values?: SelectDefaultValue[];
  id?: number;
}

export interface ChannelSelectPayload extends AutoSelectPayload {
  type: typeof ComponentKind.ChannelSelect;
  channel_types?: number[]; // Intentionally loose, mapped to Discord API
}

export type AnySelectMenuPayload =
  | StringSelectPayload
  | AutoSelectPayload
  | ChannelSelectPayload;

export interface TextInputPayload {
  type: typeof ComponentKind.TextInput;
  custom_id: string;
  style: TextInputModeType;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
  id?: number;
}

// ---------------------------------------------------------
// Union Type
// ---------------------------------------------------------

export type AnyComponentPayload =
  | ContainerPayload
  | ActionRowPayload
  | SectionPayload
  | TextDisplayPayload
  | ThumbnailPayload
  | MediaGalleryPayload
  | FilePayload
  | SeparatorPayload
  | ButtonPayload
  | AnySelectMenuPayload
  | TextInputPayload;

// We need an import of the constants here for the typeof references
import { ComponentKind } from "./enums.js";
