# Quickstart

Here is the absolute simplest way to get a V2 Container rendering in your bot. 

```javascript
import { Routes } from 'discord.js';
import { ContainerBuilder, SectionBuilder, TextDisplayBuilder, ThumbnailBuilder } from 'discord-container-kit';

export async function execute(interaction) {
  const container = new ContainerBuilder()
    .add(
      new SectionBuilder()
        .add(new TextDisplayBuilder().content("## Hello World"))
        .setAccessory(new ThumbnailBuilder("https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png"))
    );

  // Send the payload. You MUST pass flags: 32768 to render V2 Components.
  await interaction.client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
    body: {
      type: 4, 
      data: {
        flags: 32768, 
        components: [container.toJSON()] 
      }
    }
  });
}
```

### What's happening here?
1. We build a `ContainerBuilder`. This is the top-level wrapper.
2. Inside it, we add a `SectionBuilder`. Discord requires text to live inside a section.
3. Inside the section, we add a `TextDisplayBuilder` for the actual markdown text.
4. We add an accessory to the section to bypass Discord's strict validation rules.
5. We bypass standard `interaction.reply()` because discord.js strips V2 flags right now. Sending the raw payload via REST guarantees it renders correctly.
