import { handleHelpButtons } from '../components/help/buttons.js';
import { handleHelpSelectMenu } from '../components/help/selectMenu.js';
import { execute as executeHelp } from '../commands/help.js';

export async function interactionCreateHandler(interaction) {
  try {
    // 1. Slash Command Routing
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === 'help') {
        return await executeHelp(interaction);
      }
      return;
    }

    // 2. String Select Menu Routing
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'help_menu_select') {
        return await handleHelpSelectMenu(interaction);
      }
      return;
    }

    // 3. Button Routing
    if (interaction.isButton()) {
      if (interaction.customId.startsWith('btn_help_')) {
        return await handleHelpButtons(interaction);
      }
      
      // Fallback
      return await interaction.reply({
        content: "⚠️ This interaction is no longer valid or recognized.",
        ephemeral: true
      });
    }

  } catch (error) {
    console.error("[Router Error] Unhandled exception:", error);
    
    if (interaction.isRepliable()) {
      const payload = { 
        content: "⚠️ Something went wrong while handling this interaction.", 
        ephemeral: true 
      };
      
      try {
        if (interaction.deferred || interaction.replied) {
          await interaction.followUp(payload);
        } else {
          await interaction.reply(payload);
        }
      } catch (replyErr) {
        console.error("[Router Error] Failed to send fallback reply:", replyErr);
      }
    }
  }
}
