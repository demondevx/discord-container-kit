import { SlashCommandBuilder, Routes } from 'discord.js';
import { 
  ContainerBuilder, 
  SectionBuilder, 
  TextDisplayBuilder, 
  ActionRowBuilder, 
  StringSelectBuilder, 
  StringSelectOptionBuilder, 
  ButtonBuilder,
  ThumbnailBuilder
} from 'discord-container-kit';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('View the interactive help menu');

export async function execute(interaction) {
  const container = new ContainerBuilder()
    .add(
      new SectionBuilder()
        .add(new TextDisplayBuilder().content("## 📚 Help Menu\nSelect a category below to learn more about the bot."))
        .setAccessory(new ThumbnailBuilder("https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png")),
      new ActionRowBuilder().add(
        new StringSelectBuilder()
          .customId("help_menu_select")
          .placeholder("Choose a category...")
          .addOptions(
            new StringSelectOptionBuilder().label("General Info").value("general").description("Learn about the bot").emoji({ name: "🤖" }),
            new StringSelectOptionBuilder().label("Commands").value("commands").description("List of all commands").emoji({ name: "📜" }),
            new StringSelectOptionBuilder().label("Support").value("support").description("Get help from the developers").emoji({ name: "❓" })
          )
      ),
      new ActionRowBuilder().add(
        new ButtonBuilder().primary("btn_help_about", "About Bot").emoji({ name: "ℹ️" }),
        new ButtonBuilder().secondary("btn_help_docs", "Docs").emoji({ name: "📖" }),
        new ButtonBuilder().danger("btn_help_reset", "Reset Help").emoji({ name: "🔄" }),
        new ButtonBuilder().link("https://github.com", "GitHub")
      )
    );

  const payload = container.toJSON();

  await interaction.client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
    body: {
      type: 4, 
      data: {
        flags: 32768, 
        components: [payload] 
      }
    }
  });
}
