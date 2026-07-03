import { execute as executeHelp } from '../../commands/help.js';

export async function handleHelpButtons(interaction) {
  switch (interaction.customId) {
    case 'btn_help_about':
      return await interaction.reply({
        content: "🤖 **About This Bot**\nThis bot is a live demo of discord-container-kit.\nGitHub: https://github.com/demondevx/discord-container-kit",
        ephemeral: true
      });

    case 'btn_help_docs':
      return await interaction.reply({
        content: "📖 **Documentation**\nDocs: https://github.com/demondevx/discord-container-kit/tree/main/docs",
        ephemeral: true
      });

    case 'btn_help_reset':
      return await executeHelp(interaction);

    default:
      return await interaction.reply({
        content: "⚠️ This button is no longer recognized.",
        ephemeral: true
      });
  }
}
