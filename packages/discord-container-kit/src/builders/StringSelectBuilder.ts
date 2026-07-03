import { ComponentKind, StringSelectPayload } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, assertStringLength, assertRange, assertMaxItems, Limits } from "../validation/index.js";
import { StringSelectOptionBuilder } from "./StringSelectOptionBuilder.js";

/**
 * Builder for String Select components (Type 3).
 */
export class StringSelectBuilder extends BaseBuilder<StringSelectPayload> {
  private options: StringSelectOptionBuilder[] = [];

  constructor(data?: Partial<StringSelectPayload>) {
    super({ type: ComponentKind.StringSelect, ...data });

    if (data?.options) {
      this.options = data.options.map(opt => new StringSelectOptionBuilder(opt));
    }
  }

  public setCustomId(customId: string): this {
    assertStringLength(customId, Limits.Common.MaxCustomIdLength, "StringSelectBuilder", "custom_id");
    this.data.custom_id = customId;
    return this;
  }

  public customId(customId: string): this {
    return this.setCustomId(customId);
  }

  public setPlaceholder(placeholder: string): this {
    assertStringLength(placeholder, Limits.SelectMenu.MaxPlaceholderLength, "StringSelectBuilder", "placeholder");
    this.data.placeholder = placeholder;
    return this;
  }

  public placeholder(placeholder: string): this {
    return this.setPlaceholder(placeholder);
  }

  public setMinValues(minValues: number): this {
    assertRange(minValues, 0, 25, "StringSelectBuilder", "min_values");
    this.data.min_values = minValues;
    return this;
  }

  public minValues(minValues: number): this {
    return this.setMinValues(minValues);
  }

  public setMaxValues(maxValues: number): this {
    assertRange(maxValues, 1, 25, "StringSelectBuilder", "max_values");
    this.data.max_values = maxValues;
    return this;
  }

  public maxValues(maxValues: number): this {
    return this.setMaxValues(maxValues);
  }

  public setDisabled(disabled: boolean): this {
    this.data.disabled = disabled;
    return this;
  }

  public disabled(disabled: boolean = true): this {
    return this.setDisabled(disabled);
  }

  public addOptions(...options: StringSelectOptionBuilder[]): this {
    this.options.push(...options);
    assertMaxItems(this.options, Limits.StringSelect.MaxOptions, "StringSelectBuilder", "options");
    return this;
  }

  public add(...options: StringSelectOptionBuilder[]): this {
    return this.addOptions(...options);
  }

  public clearOptions(): this {
    this.options = [];
    return this;
  }

  public clear(): this {
    return this.clearOptions();
  }

  public clone(): this {
    const cloned = new StringSelectBuilder(deepClone(this.data));
    cloned.options = this.options.map(opt => opt.clone());
    return cloned as this;
  }

  public toJSON(): Readonly<StringSelectPayload> {
    assertRequired(this.data.custom_id, "StringSelectBuilder", "custom_id");
    assertRequired(this.options.length > 0 ? true : undefined, "StringSelectBuilder", "options");
    assertMaxItems(this.options, Limits.StringSelect.MaxOptions, "StringSelectBuilder", "options");

    return {
      type: ComponentKind.StringSelect,
      custom_id: this.data.custom_id,
      options: this.options.map(opt => opt.toJSON()),
      ...(this.data.placeholder !== undefined && { placeholder: this.data.placeholder }),
      ...(this.data.min_values !== undefined && { min_values: this.data.min_values }),
      ...(this.data.max_values !== undefined && { max_values: this.data.max_values }),
      ...(this.data.disabled !== undefined && { disabled: this.data.disabled }),
      ...(this.data.id !== undefined && { id: this.data.id }),
    };
  }
}
