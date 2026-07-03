export async function handleHelpSelectMenu(interaction) {
  const selected = interaction.values[0];

  switch (selected) {
    case 'general':
      return await interaction.reply({
        content: "🤖 **General Info**\nThis bot is a live demo of discord-container-kit.\nGitHub: https://github.com/demondevx/discord-container-kit",
        ephemeral: true
      });

    case 'commands':
      return await interaction.reply({
        content: "📜 **Commands**\n- `/help` shows interactive menu\n- `/showcase` shows container example\n- `/ping` latency check",
        ephemeral: true
      });

    case 'support':
      return await interaction.reply({
        content: "❓ **Support**\nGitHub Issues: https://github.com/demondevx/discord-container-kit/issues",
        ephemeral: true
      });

    default:
      return await interaction.reply({
        content: "⚠️ Unknown category selected.",
        ephemeral: true
      });
  }
}
