/**
 * Centralized limits mapping 1:1 to the Discord API.
 */
export const Limits = {
  Message: {
    MaxTopLevelComponents: 10,
    MaxTotalComponents: 40,
    MaxTotalTextLength: 4000,
  },
  Container: {
    MaxChildren: 10,
    MaxDepth: 1, // Cannot nest containers
  },
  Section: {
    MaxTextDisplays: 3,
    MaxAccessories: 1,
  },
  ActionRow: {
    MaxButtons: 5,
    MaxSelectMenus: 1,
  },
  MediaGallery: {
    MaxItems: 10,
  },
  StringSelect: {
    MaxOptions: 25,
    MinOptions: 1,
  },
  SelectMenu: {
    MaxPlaceholderLength: 150,
  },
  Button: {
    MaxLabelLength: 80,
    MaxUrlLength: 512,
  },
  Common: {
    MaxCustomIdLength: 100,
  },
  TextInput: {
    MaxLabelLength: 45,
    MaxPlaceholderLength: 100,
    MaxContentLength: 4000,
  },
  SelectOption: {
    MaxLabelLength: 100,
    MaxValueLength: 100,
    MaxDescriptionLength: 100,
  },
  Media: {
    MaxDescriptionLength: 1024, // Used for Thumbnails and MediaGalleryItems
  },
  Color: {
    Min: 0x000000,
    Max: 0xffffff,
  },
} as const;
