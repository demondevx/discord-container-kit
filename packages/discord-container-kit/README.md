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

const container = new ContainerBuilder().add(
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
