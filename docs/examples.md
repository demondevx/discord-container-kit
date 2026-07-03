# Examples

Here are some copy-paste examples you can drop into your bot to see how the layout system works.

### The /help Command
A standard, clean help menu with a dropdown and buttons.

```javascript
import { Routes } from 'discord.js';
import { 
  ContainerBuilder, SectionBuilder, TextDisplayBuilder, ActionRowBuilder, 
  StringSelectBuilder, StringSelectOptionBuilder, ButtonBuilder, ThumbnailBuilder 
} from 'discord-container-kit';

export async function execute(interaction) {
  const container = new ContainerBuilder()
    .add(
      new SectionBuilder()
        .add(new TextDisplayBuilder().content("## 📚 Help Menu\nSelect a category below."))
        .setAccessory(new ThumbnailBuilder("https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png")),
      new ActionRowBuilder().add(
        new StringSelectBuilder()
          .customId("help_menu_select")
          .placeholder("Choose a category...")
          .addOptions(
            new StringSelectOptionBuilder().label("Commands").value("commands")
          )
      ),
      new ActionRowBuilder().add(
        new ButtonBuilder().secondary("btn_support", "Support Server"),
        new ButtonBuilder().link("https://github.com/demondevx/discord-container-kit", "GitHub")
      )
    );

  await interaction.client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
    body: { type: 4, data: { flags: 32768, components: [container.toJSON()] } }
  });
}
```

### The /bto Layout
A clean casino or gaming status layout.

```javascript
import { Routes } from 'discord.js';
import { ContainerBuilder, SectionBuilder, TextDisplayBuilder, ButtonBuilder, ActionRowBuilder } from 'discord-container-kit';

export async function execute(interaction) {
  const container = new ContainerBuilder()
    .add(
      new SectionBuilder()
        .add(new TextDisplayBuilder().content("## 🎲 BTO Status"))
        .setAccessory(new ButtonBuilder().primary("btn_bto_info", "Info")),
      new SectionBuilder()
        .add(new TextDisplayBuilder().content("**Balance:** 500 Coins"))
        .setAccessory(new ButtonBuilder().secondary("btn_bto_history", "History"))
    );

  await interaction.client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
    body: { type: 4, data: { flags: 32768, components: [container.toJSON()] } }
  });
}
```
