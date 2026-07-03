import { ComponentKind, TextDisplayPayload } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired } from "../validation/index.js";

/**
 * Builder for Text Display components (Type 10).
 */
export class TextDisplayBuilder extends BaseBuilder<TextDisplayPayload> {
  constructor(data?: Partial<TextDisplayPayload> | string) {
    if (typeof data === "string") {
      super({ type: ComponentKind.TextDisplay, content: data });
    } else {
      super({ type: ComponentKind.TextDisplay, ...data });
    }
  }

  /**
   * Sets the text content of the display.
   * Supports Discord markdown.
   */
  public setContent(content: string): this {
    this.data.content = content;
    return this;
  }

  /** Alias for setContent */
  public content(content: string): this {
    return this.setContent(content);
  }

  public clone(): this {
    return new TextDisplayBuilder(deepClone(this.data)) as this;
  }

  public toJSON(): Readonly<TextDisplayPayload> {
    assertRequired(this.data.content, "TextDisplayBuilder", "content");

    return {
      type: ComponentKind.TextDisplay,
      content: this.data.content,
      ...(this.data.id !== undefined && { id: this.data.id }),
    };
  }
}
