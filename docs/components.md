# Components

The library gives you wrapper builders for Discord's V2 UI components. They all share a `.toJSON()` method to safely compile to Discord API payloads.

### ContainerBuilder
The root component. Everything you build lives inside this. It acts as an array holding your sections and action rows.

### SectionBuilder
Think of sections as visual blocks inside your container. They hold `TextDisplayBuilder` items. 
**Note:** Discord currently requires every section to have an accessory (a button or a thumbnail) attached to it. 

### TextDisplayBuilder
Used for text. It supports standard Discord markdown, headers (`##`), and emojis.

### ButtonBuilder
Buttons function exactly like V2 buttons but must be placed inside an `ActionRowBuilder`. Use the helper methods `.primary()`, `.secondary()`, `.danger()`, and `.link()` to set them up quickly.

### StringSelectBuilder
Dropdown menus. Just like buttons, these must be wrapped in an `ActionRowBuilder`. A single select menu takes up the entire row.
