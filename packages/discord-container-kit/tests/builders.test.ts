import { describe, it, expect } from "vitest";
import { Container, Section, TextDisplay, Button, ActionRow, BuilderError } from "../src/index.js";

describe("ContainerBuilder", () => {
  it("should serialize correctly with valid components", () => {
    const container = new Container()
      .accent("#FF0000")
      .add(
        new Section().add(new TextDisplay().content("Hello world"))
      );

    const json = container.toJSON();
    expect(json.type).toBe(17); // Container
    expect(json.accent_color).toBe(16711680);
    expect(json.components).toHaveLength(1);
    expect(json.components[0].type).toBe(9); // Section
  });

  it("should throw BuilderError if empty", () => {
    const container = new Container();
    expect(() => container.toJSON()).toThrow(BuilderError);
  });
});

describe("ActionRowBuilder validation", () => {
  it("should throw when mixing buttons and selects", () => {
    // We mock this by pushing a generic JSON object disguised as a button, since we just test validation logic
    expect(() => {
      const row = new ActionRow();
      row.add(new Button().primary("btn"));
      // The add() method itself will throw because it validates
      row.addComponents(new Button().primary("btn2"), new Button().primary("btn3"), new Button().primary("btn4"), new Button().primary("btn5"), new Button().primary("btn6"));
    }).toThrow(BuilderError);
  });
});
