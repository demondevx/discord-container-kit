import { ComponentKind, TextInputModeType, TextInputPayload } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, assertStringLength, assertRange, Limits } from "../validation/index.js";

/**
 * Builder for Text Input components (Type 4).
 * Valid ONLY in Modals, not in standard messages.
 */
export class TextInputBuilder extends BaseBuilder<TextInputPayload> {
  constructor(data?: Partial<TextInputPayload>) {
    super({ type: ComponentKind.TextInput, ...data });
  }

  public setCustomId(customId: string): this {
    assertStringLength(customId, Limits.Common.MaxCustomIdLength, "TextInputBuilder", "custom_id");
    this.data.custom_id = customId;
    return this;
  }

  public customId(customId: string): this {
    return this.setCustomId(customId);
  }

  public setLabel(label: string): this {
    assertStringLength(label, Limits.TextInput.MaxLabelLength, "TextInputBuilder", "label");
    this.data.label = label;
    return this;
  }

  public label(label: string): this {
    return this.setLabel(label);
  }

  public setStyle(style: TextInputModeType): this {
    this.data.style = style;
    return this;
  }

  public style(style: TextInputModeType): this {
    return this.setStyle(style);
  }

  public setPlaceholder(placeholder: string): this {
    assertStringLength(placeholder, Limits.TextInput.MaxPlaceholderLength, "TextInputBuilder", "placeholder");
    this.data.placeholder = placeholder;
    return this;
  }

  public placeholder(placeholder: string): this {
    return this.setPlaceholder(placeholder);
  }

  public setMinLength(minLength: number): this {
    assertRange(minLength, 0, Limits.TextInput.MaxContentLength, "TextInputBuilder", "min_length");
    this.data.min_length = minLength;
    return this;
  }

  public minLength(minLength: number): this {
    return this.setMinLength(minLength);
  }

  public setMaxLength(maxLength: number): this {
    assertRange(maxLength, 1, Limits.TextInput.MaxContentLength, "TextInputBuilder", "max_length");
    this.data.max_length = maxLength;
    return this;
  }

  public maxLength(maxLength: number): this {
    return this.setMaxLength(maxLength);
  }

  public setRequired(required: boolean): this {
    this.data.required = required;
    return this;
  }

  public required(required: boolean = true): this {
    return this.setRequired(required);
  }

  public setValue(value: string): this {
    assertStringLength(value, Limits.TextInput.MaxContentLength, "TextInputBuilder", "value");
    this.data.value = value;
    return this;
  }

  public value(value: string): this {
    return this.setValue(value);
  }

  public clone(): this {
    return new TextInputBuilder(deepClone(this.data)) as this;
  }

  public toJSON(): Readonly<TextInputPayload> {
    assertRequired(this.data.custom_id, "TextInputBuilder", "custom_id");
    assertRequired(this.data.label, "TextInputBuilder", "label");
    assertRequired(this.data.style, "TextInputBuilder", "style");

    return {
      type: ComponentKind.TextInput,
      custom_id: this.data.custom_id,
      label: this.data.label,
      style: this.data.style,
      ...(this.data.placeholder !== undefined && { placeholder: this.data.placeholder }),
      ...(this.data.min_length !== undefined && { min_length: this.data.min_length }),
      ...(this.data.max_length !== undefined && { max_length: this.data.max_length }),
      ...(this.data.required !== undefined && { required: this.data.required }),
      ...(this.data.value !== undefined && { value: this.data.value }),
      ...(this.data.id !== undefined && { id: this.data.id }),
    };
  }
}
