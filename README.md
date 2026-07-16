# discord-container-kit

[![NPM Version](https://img.shields.io/npm/v/discord-container-kit.svg)](https://www.npmjs.com/package/discord-container-kit)

A lightweight builder library for Discord Components V2 containers and sections.

## Why this library

Discord Components V2 is powerful but painful to build manually.

This library exists to:
* Remove raw JSON building
* Prevent invalid component structures
* Make containers composable and reusable

Built for developers who want to stop fighting Discord's raw component JSON and focus on structure instead.

## Installation

```bash
npm install discord-container-kit
```

Requires Node.js 20+ and discord.js v14.18.0+.

## Quick Start

```javascript
import { 
  ContainerBuilder, SectionBuilder, TextDisplayBuilder, ButtonBuilder 
} from "discord-container-kit";

const container = new ContainerBuilder()
  .accent("blurple")
  .add(
  new SectionBuilder()
    .add(
      new TextDisplayBuilder().content("## Hello World")
    )
    .setAccessory(
      new ButtonBuilder().primary("btn_click", "Click Me")
    )
);

console.log(container.toJSON());
```

## 🎨 Supported Accent Colors
You can add a colored sidebar to your containers using `.accent('colorname')` or `.accent('#HexCode')`. 

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

## 📖 The Ultimate Beginner's Guide

New to Components V2 or Discord.js? We highly recommend starting with our beginner-friendly guide.

**[Read The Ultimate Beginner's Guide Here](https://github.com/demondevx/discord-container-kit/blob/main/docs/guide.md)** 

This guide covers:
- Why you must bypass `interaction.reply()`
- The Magic `32768` Flag
- Copy-pasteable examples for **every single component type** (Dropdowns, Buttons, Galleries, and more)

## Features

* Prevents invalid Discord V2 component trees
* Builder-based API instead of raw JSON
* Safe serialization with no reference leaks
* Supports Containers, Sections, TextDisplays, Buttons, and Accessories

## Documentation

Full documentation is available in the [docs folder](https://github.com/demondevx/discord-container-kit/tree/main/docs):

* [Installation Setup](https://github.com/demondevx/discord-container-kit/blob/main/docs/installation.md)
* [Quickstart Guide](https://github.com/demondevx/discord-container-kit/blob/main/docs/quickstart.md)
* [Component API Details](https://github.com/demondevx/discord-container-kit/blob/main/docs/components.md)
* [Code Examples](https://github.com/demondevx/discord-container-kit/blob/main/docs/examples.md)
* [Troubleshooting](https://github.com/demondevx/discord-container-kit/blob/main/docs/troubleshooting.md)

## Notes

This library follows the Discord Components V2 specification. Because Components V2 is actively being tested by Discord, backend rules (like strict accessory requirements on sections) might change. 
