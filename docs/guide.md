# The Ultimate Beginner's Guide to `discord-container-kit`

Welcome! If you are new to programming, new to `discord.js`, or just want to understand exactly how this library works without any AI help, you are in the perfect place. 

I will teach you step-by-step how to build beautiful Discord messages (called **Containers**) from scratch, using the `discord-container-kit` library.

---

## 1. The Magic Flag (Why we bypass `interaction.reply`)

Discord recently introduced "Components V2" (which this library uses). Because `discord.js` (the framework you use to make your bot) hasn't fully updated its internal code to support V2 yet, we have to bypass `interaction.reply()` when sending our containers.

If you use `interaction.reply()`, `discord.js` tries to "help" you by validating your message. Because it doesn't know what a Container is yet, it strips away the special V2 flags, and Discord will throw an **"Invalid Form Body"** error.

### What is the Flag?
To tell Discord "Hey! I am sending a brand new Components V2 Container, not a normal text message!", you MUST pass a specific "Flag" to the Discord API.

* **`flags: 32768`**: This is the magic number that tells Discord to render your message as a Container. 

### What if I want an "Ephemeral" (Hidden) message?
An ephemeral message is a message that only the person who clicked the button or ran the command can see. The flag for Ephemeral is `64`.
If you want a message to be BOTH a Container AND Ephemeral, you simply add the two flags together! `32768 + 64 = 32832`.
* **`flags: 32832`**: A hidden (ephemeral) Container message!

**Here is the exact code you must use to send your Container to Discord:**
```javascript
// ✅ ALWAYS USE THIS INSTEAD of interaction.reply()
await interaction.client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
  body: {
    type: 4, // 4 means "Reply to the user's command"
    data: {
      flags: 32768, // Add 64 to this number if you want the message to be hidden (ephemeral)
      components: [containerPayload] // Your built container goes here
    }
  }
});
```

*(Note: If you are updating a message when a user clicks a button, change `type: 4` to `type: 7`!)*

---

## 2. Your First Complete Command

Let's build a `/pick-channel` command from scratch to see how everything connects.

### Step 1: Import the tools you need
At the top of your file, you need to import `Routes` from `discord.js` and the builders from our library.

```javascript
import { Routes } from 'discord.js';
import { Container, ActionRow, ChannelSelect, TextDisplay } from 'discord-container-kit';
```

### Step 2: Create the Command Handler
Every time a user runs a slash command, Discord sends an `interaction` object to your bot.

```javascript
export async function handlePickChannel(interaction) {
  try {
    // We will build our container here!
  } catch (error) {
    console.error(error);
  }
}
```

### Step 3: Build the UI
Everything in V2 starts with a **Container**. We add a `TextDisplay` to tell the user what to do, and an `ActionRow` to hold our Dropdown menu.

```javascript
export async function handlePickChannel(interaction) {
  try {
    // 1. Build the dropdown menu
    const menu = new ChannelSelect()
      .setCustomId('my_channel_picker')
      .setPlaceholder('Click here to select a channel...')
      .setMinValues(1)
      .setMaxValues(1)
      .setChannelTypes(0); // 0 means Text Channels only!

    // 2. Put the menu inside an ActionRow
    // ActionRows are horizontal boxes that hold interactive things (like menus and buttons)
    const row = new ActionRow()
      .addComponents(menu);

    // 3. Build the main Container
    // The container is the main wrapper that holds everything
    const container = new Container()
      .addComponents(
        new TextDisplay().setContent('## Channel Setup'),
        new TextDisplay().setContent('Please select the channel where logs should be sent:'),
        row // Add our row at the bottom!
      );

    // 4. Convert it to JSON so Discord can understand it
    const payload = container.toJSON();

    // 5. Send it using our Golden Rule!
    await interaction.client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
      body: {
        type: 4, 
        data: {
          flags: 32768, 
          components: [payload]
        }
      }
    });

  } catch (error) {
    console.error("Oops! Something went wrong:", error);
  }
}
```

And that's it! You just built a fully functional V2 Container command!

---

## 3. The Dictionary of Components (Detailed)

Every builder in this library has specific methods you can call to customize it. Here is an exhaustive breakdown of **every single component** and how to use it.

*(Note: Every `.setSomething()` method also has a shorter alias like `.something()`. You can use whichever you prefer!)*

### The Container (Type 17)
`ContainerBuilder`
The absolute root of everything. You cannot send anything to Discord V2 unless it is inside a Container. Think of it like the blank canvas.
* **`.addComponents(...components)`**: Add things to the container. You can add `TextDisplay`, `Section`, `ActionRow`, `MediaGallery`, `File`, or `Separator` objects.
* **`.accent(color)`**: Add a colored sidebar to the left of the container! You can pass a standard named color (`'blurple'`, `'red'`, `'yellow'`), a Hex code (`'#FF0000'`), or an integer (`0xFF0000`).

#### Supported Color Names
| Color Name | Hex Code | | Color Name | Hex Code |
| :--- | :--- | :--- | :--- | :--- |
| **white** | `#FFFFFF` | | **aqua** | `#1ABC9C` |
| **green** | `#57F287` | | **blue** | `#3498DB` |
| **yellow** | `#FEE75C` | | **purple** | `#9B59B6` |
| **fuchsia** | `#EB459E` | | **gold** | `#F1C40F` |
| **orange** | `#E67E22` | | **red** | `#ED4245` |
| **grey** | `#95A5A6` | | **navy** | `#34495E` |
| **darkaqua** | `#11806A` | | **darkgreen** | `#1F8B4C` |
| **darkblue** | `#206694` | | **darkpurple** | `#71368A` |
| **darkgold** | `#C27C0E` | | **darkorange** | `#A84300` |
| **darkred** | `#992D22` | | **darkgrey** | `#979C9F` |
| **darkergrey** | `#7F8C8D` | | **lightgrey** | `#BCC0C0` |
| **darknavy** | `#2C3E50` | | **blurple** | `#5865F2` |
| **greyple** | `#99AAB5` | | **darkbutnotblack** | `#2C2F33` |
| **notquiteblack** | `#23272A` | | **luminousvividpink**| `#E91E63` |
| **darkvividpink**| `#AD1457` | | **black** | `#000000` |
| **pink** | `#FFC0CB` | | **cyan** | `#00FFFF` |
| **magenta** | `#FF00FF` | | **lime** | `#00FF00` |
| **maroon** | `#800000` | | **olive** | `#808000` |
| **teal** | `#008080` | | **silver** | `#C0C0C0` |

### The Action Row (Type 1)
`ActionRowBuilder`
A horizontal row used exclusively to hold interactive components. Discord requires that Buttons and Menus are placed inside an Action Row. They cannot be placed directly inside a Container.
* **`.addComponents(...components)`**: Add up to 5 Buttons, or exactly 1 Dropdown menu to this row.

### The Section (Type 9)
`SectionBuilder`
A visual grouping element. It creates a dedicated block of text with an image or button stuck to the right side of it.
**⚠️ CRITICAL WARNING**: Discord strictly requires that every Section has an `accessory` attached. If you don't want an accessory, DO NOT use a Section! Just add your `TextDisplay` directly to the `Container` instead!
* **`.addTextDisplays(...displays)`**: Add text inside the section.
* **`.setAccessory(Button | Thumbnail)`**: **(REQUIRED)** Attach a button or image to the right side of the text.

### Text Display (Type 10)
`TextDisplayBuilder`
Used to render text. Supports full Discord markdown. 
* `# Header 1`, `## Header 2`, `### Header 3`
* `**Bold**`, `*Italic*`, `__Underline__`, `~~Strikethrough~~`
* `[Link Text](https://link.com)`
* **`.setContent('Your text here')`**: Set the actual text. 

### Separator (Type 14)
`SeparatorBuilder`
Draws a dividing line or adds empty spacing between elements to make your UI look clean.
* **`.setDivider(true | false)`**: If true, draws a visible horizontal line.
* **`.setSpacing(number)`**: The amount of empty space around the line. `0` = None, `1` = Small, `2` = Large.
*(Shortcut: You can just type `new Separator().setDivider(true).large()`)*

### Thumbnail (Type 11)
`ThumbnailBuilder`
A small image. Can be used as a Section `accessory`.
* **`.setMediaUrl('https://...')`**: The link to the image. Must be a valid URL.
* **`.setDescription('text')`**: Alternative text for screen readers (Accessibility).

### File (Type 13)
`FileBuilder`
Displays an attached file beautifully inside the container. You must actually upload the file to Discord using standard attachments, and then reference it here.
* **`.setFileUrl('attachment://filename.png')`**: The name of the file you attached in the `files: []` array of your HTTP request.

### Media Gallery (Type 12) & Items
`MediaGalleryBuilder` and `MediaGalleryItemBuilder`
Displays a beautiful, modern grid of images.
* **`MediaGallery.addItems(...items)`**: Add images to the gallery. Maximum 4 images.
* **`MediaGalleryItem.setMediaUrl('https://...')`**: The direct link to the image.
* **`MediaGalleryItem.setSpoiler(true)`**: Blur the image until the user clicks it (great for NSFW or spoilers).

### Buttons (Type 2)
`ButtonBuilder`
Clickable buttons. Can trigger your bot, or link to a website.
* **`.setStyle(number)`**: The color/type of the button.
  * `1` = Primary (Blue)
  * `2` = Secondary (Grey)
  * `3` = Success (Green)
  * `4` = Danger (Red)
  * `5` = Link (Grey, opens a browser)
* **`.setLabel('Text')`**: The text on the button.
* **`.setCustomId('my_id')`**: The ID your bot will receive when someone clicks it. *(Do not use this if style is 5)*.
* **`.setUrl('https://...')`**: Where the button goes. *(Only use this if style is 5)*.
* **`.setEmoji({ name: '🌟' })`**: Adds an emoji to the button.
* **`.setDisabled(true)`**: Greys the button out so it cannot be clicked.

---

## 4. Dropdown Menus (Select Menus)

Discord provides 5 different types of dropdown menus. They all use the same base settings:
* **`.setCustomId('my_id')`**: The ID your bot receives when clicked.
* **`.setPlaceholder('Choose something...')`**: The grey default text shown when nothing is selected.
* **`.setMinValues(1)`**: Minimum number of things the user must select before they can submit.
* **`.setMaxValues(5)`**: Maximum number of things they can select.

### 1. String Select Menu (Type 3)
`StringSelectBuilder`
A standard menu where YOU define the exact options the user can pick from.
* **`.addOptions(...options)`**: Add `StringSelectOption` builders.

**The Options:** `StringSelectOptionBuilder`
* **`.setLabel('Text')`**: The bold text of the option.
* **`.setValue('internal_id')`**: The secret value your bot receives when this is clicked.
* **`.setDescription('Sub-text')`**: The smaller text under the label.
* **`.setDefault(true)`**: Make this option pre-selected when the menu loads.

### 2. Auto-Populating Menus (Types 5, 6, 7, 8)
These menus automatically fill up with server data. You do not provide options for them! Discord generates the list of users, roles, or channels for you.

You can provide default selections using: 
**`.setDefaultValues({ id: 'discord_id', type: 'user' })`**
*(Type can be 'user', 'role', or 'channel')*

**ChannelSelectBuilder (Type 8)**
Allows users to select channels. You can restrict the types of channels shown so they don't accidentally pick a Voice channel when you want a Text channel.
* Special method: **`.setChannelTypes(0, 5)`** 
  * `0` = Text Channel
  * `2` = Voice Channel
  * `4` = Category
  * `5` = Announcement Channel

**UserSelectBuilder (Type 5)**
Allows users to select members of the server.

**RoleSelectBuilder (Type 6)**
Allows users to select server roles.

**MentionableSelectBuilder (Type 7)**
A combined dropdown that allows selecting BOTH users and roles in a single menu.

---

### Conclusion
By remembering the Magic Flag (`32768`), and piecing together the components like Lego bricks, you can build literally any user interface imaginable natively in Discord. 

If you ever get an "Invalid Form Body" error, double-check your `Section` components to ensure they have an `accessory`, and ensure you aren't using `interaction.reply()`!
