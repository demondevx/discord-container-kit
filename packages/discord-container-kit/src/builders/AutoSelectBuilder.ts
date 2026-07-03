import { AutoSelectPayload, SelectDefaultValue } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, assertStringLength, assertRange, Limits } from "../validation/index.js";

/**
 * Base builder for auto-populated select menus (User, Role, Mentionable, Channel).
 */
export abstract class AutoSelectBuilder<T extends AutoSelectPayload> extends BaseBuilder<T> {
  protected _defaultValues: SelectDefaultValue[] = [];

  constructor(data: Partial<T>) {
    super(data);
    if (data?.default_values) {
      this._defaultValues = [...data.default_values];
    }
  }

  public setCustomId(customId: string): this {
    assertStringLength(customId, Limits.Common.MaxCustomIdLength, this.constructor.name, "custom_id");
    this.data.custom_id = customId;
    return this;
  }

  public customId(customId: string): this {
    return this.setCustomId(customId);
  }

  public setPlaceholder(placeholder: string): this {
    assertStringLength(placeholder, Limits.SelectMenu.MaxPlaceholderLength, this.constructor.name, "placeholder");
    this.data.placeholder = placeholder;
    return this;
  }

  public placeholder(placeholder: string): this {
    return this.setPlaceholder(placeholder);
  }

  public setMinValues(minValues: number): this {
    assertRange(minValues, 0, 25, this.constructor.name, "min_values");
    this.data.min_values = minValues;
    return this;
  }

  public minValues(minValues: number): this {
    return this.setMinValues(minValues);
  }

  public setMaxValues(maxValues: number): this {
    assertRange(maxValues, 1, 25, this.constructor.name, "max_values");
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

  public setDefaultValues(...values: SelectDefaultValue[]): this {
    this._defaultValues = values;
    return this;
  }

  public defaultValues(...values: SelectDefaultValue[]): this {
    return this.setDefaultValues(...values);
  }

  protected copyDefaultValuesTo(cloned: this): void {
    cloned._defaultValues = deepClone(this._defaultValues);
  }

  protected getBasePayload(): Omit<AutoSelectPayload, "type"> {
    assertRequired(this.data.custom_id, this.constructor.name, "custom_id");

    return {
      custom_id: this.data.custom_id,
      ...(this.data.placeholder !== undefined && { placeholder: this.data.placeholder }),
      ...(this.data.min_values !== undefined && { min_values: this.data.min_values }),
      ...(this.data.max_values !== undefined && { max_values: this.data.max_values }),
      ...(this.data.disabled !== undefined && { disabled: this.data.disabled }),
      ...(this._defaultValues.length > 0 && { default_values: deepClone(this._defaultValues) }),
      ...(this.data.id !== undefined && { id: this.data.id }),
    };
  }
}
