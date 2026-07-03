# Troubleshooting

If your container isn't rendering or interactions are failing, check these fixes.

### "Buttons not responding"
If you click a button and get "This interaction failed", you don't have a listener set up for that button's `custom_id`. Wrap your `interactionCreate` event in a `try/catch` and ensure you are returning `await interaction.reply()` for every button click.

### "Invalid Form Body"
You are missing a required property on a component. Check the stack trace. The Discord API is extremely strict about limits (like max 5 buttons per row). Our builders catch most of these, but Discord throws this error if you slip past.

### "Accessory errors"
Discord's backend currently demands that if you use a `SectionBuilder`, it needs an accessory attached. If you see `accessory[BASE_TYPE_REQUIRED]`, use `.setAccessory()` on your section and pass in either a `ButtonBuilder` or a `ThumbnailBuilder`.

### "Why container not rendering"
If the bot sends a blank message or regular text instead of your UI:
1. You forgot `flags: 32768` in your payload.
2. You used `interaction.reply()` which strips out V2 flags. Use `interaction.client.rest.post` directly.
3. You left a legacy field like `content: "Hello"` inside the `data` object. V2 components strictly forbid regular text outside the container.
