import { PartialEmoji, StringSelectOptionPayload } from "../types/index.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, assertStringLength, Limits } from "../validation/index.js";

/**
 * Builder for an option inside a String Select Menu.
 * Note: Does not extend BaseBuilder because it is not a standalone component type.
 */
export class StringSelectOptionBuilder {
  private readonly data: Partial<StringSelectOptionPayload>;

  constructor(data?: Partial<StringSelectOptionPayload> | { label: string; value: string }) {
    if (data && "label" in data && "value" in data && Object.keys(data).length === 2) {
      this.data = { label: data.label, value: data.value };
    } else {
      this.data = { ...data };
    }
  }

  public setLabel(label: string): this {
    assertStringLength(label, Limits.SelectOption.MaxLabelLength, "StringSelectOptionBuilder", "label");
    this.data.label = label;
    return this;
  }

  public label(label: string): this {
    return this.setLabel(label);
  }

  public setValue(value: string): this {
    assertStringLength(value, Limits.SelectOption.MaxValueLength, "StringSelectOptionBuilder", "value");
    this.data.value = value;
    return this;
  }

  public value(value: string): this {
    return this.setValue(value);
  }

  public setDescription(description: string): this {
    assertStringLength(description, Limits.SelectOption.MaxDescriptionLength, "StringSelectOptionBuilder", "description");
    this.data.description = description;
    return this;
  }

  public description(description: string): this {
    return this.setDescription(description);
  }

  public setEmoji(emoji: PartialEmoji): this {
    this.data.emoji = emoji;
    return this;
  }

  public emoji(emoji: PartialEmoji): this {
    return this.setEmoji(emoji);
  }

  public setDefault(isDefault: boolean): this {
    this.data.default = isDefault;
    return this;
  }

  public default(isDefault: boolean = true): this {
    return this.setDefault(isDefault);
  }

  public clone(): this {
    return new StringSelectOptionBuilder(deepClone(this.data)) as this;
  }

  public toJSON(): Readonly<StringSelectOptionPayload> {
    assertRequired(this.data.label, "StringSelectOptionBuilder", "label");
    assertRequired(this.data.value, "StringSelectOptionBuilder", "value");

    return {
      label: this.data.label,
      value: this.data.value,
      ...(this.data.description !== undefined && { description: this.data.description }),
      ...(this.data.emoji !== undefined && { emoji: this.data.emoji }),
      ...(this.data.default !== undefined && { default: this.data.default }),
    };
  }
}
