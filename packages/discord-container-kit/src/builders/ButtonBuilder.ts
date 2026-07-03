import { ComponentKind, ButtonVariant, ButtonVariantType, ButtonPayload, PartialEmoji } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, assertStringLength, assertUrl, Limits } from "../validation/index.js";
import { BuilderError, ErrorCode } from "../errors/index.js";

/**
 * Builder for Button components (Type 2).
 */
export class ButtonBuilder extends BaseBuilder<ButtonPayload> {
  constructor(data?: Partial<ButtonPayload>) {
    super({ type: ComponentKind.Button, ...data });
  }

  public setStyle(style: ButtonVariantType): this {
    this.data.style = style;
    return this;
  }

  public style(style: ButtonVariantType): this {
    return this.setStyle(style);
  }

  public setLabel(label: string): this {
    assertStringLength(label, Limits.Button.MaxLabelLength, "ButtonBuilder", "label");
    this.data.label = label;
    return this;
  }

  public label(label: string): this {
    return this.setLabel(label);
  }

  public setEmoji(emoji: PartialEmoji): this {
    this.data.emoji = emoji;
    return this;
  }

  public emoji(emoji: PartialEmoji): this {
    return this.setEmoji(emoji);
  }

  public setCustomId(customId: string): this {
    assertStringLength(customId, Limits.Common.MaxCustomIdLength, "ButtonBuilder", "custom_id");
    this.data.custom_id = customId;
    return this;
  }

  public customId(customId: string): this {
    return this.setCustomId(customId);
  }

  public setUrl(url: string): this {
    assertUrl(url, "ButtonBuilder", "url");
    this.data.url = url;
    return this;
  }

  public url(url: string): this {
    return this.setUrl(url);
  }

  public setSkuId(skuId: string): this {
    this.data.sku_id = skuId;
    return this;
  }

  public skuId(skuId: string): this {
    return this.setSkuId(skuId);
  }

  public setDisabled(disabled: boolean): this {
    this.data.disabled = disabled;
    return this;
  }

  public disabled(disabled: boolean = true): this {
    return this.setDisabled(disabled);
  }

  // --- Convenience Style Helpers ---

  public primary(customId: string, label?: string): this {
    this.setStyle(ButtonVariant.Primary);
    this.setCustomId(customId);
    if (label !== undefined) this.setLabel(label);
    return this;
  }

  public secondary(customId: string, label?: string): this {
    this.setStyle(ButtonVariant.Secondary);
    this.setCustomId(customId);
    if (label !== undefined) this.setLabel(label);
    return this;
  }

  public success(customId: string, label?: string): this {
    this.setStyle(ButtonVariant.Success);
    this.setCustomId(customId);
    if (label !== undefined) this.setLabel(label);
    return this;
  }

  public danger(customId: string, label?: string): this {
    this.setStyle(ButtonVariant.Danger);
    this.setCustomId(customId);
    if (label !== undefined) this.setLabel(label);
    return this;
  }

  public link(url: string, label?: string): this {
    this.setStyle(ButtonVariant.Link);
    this.setUrl(url);
    if (label !== undefined) this.setLabel(label);
    return this;
  }

  public premium(skuId: string): this {
    this.setStyle(ButtonVariant.Premium);
    this.setSkuId(skuId);
    return this;
  }

  public clone(): this {
    return new ButtonBuilder(deepClone(this.data)) as this;
  }

  public toJSON(): Readonly<ButtonPayload> {
    assertRequired(this.data.style, "ButtonBuilder", "style");

    // Style-specific validation
    switch (this.data.style) {
      case ButtonVariant.Link:
        assertRequired(this.data.url, "ButtonBuilder", "url (required for Link buttons)");
        if (this.data.custom_id !== undefined) {
          throw new BuilderError(ErrorCode.InvalidConfiguration, "ButtonBuilder", "Link buttons cannot have a custom_id.");
        }
        if (this.data.sku_id !== undefined) {
          throw new BuilderError(ErrorCode.InvalidConfiguration, "ButtonBuilder", "Link buttons cannot have a sku_id.");
        }
        break;

      case ButtonVariant.Premium:
        assertRequired(this.data.sku_id, "ButtonBuilder", "sku_id (required for Premium buttons)");
        if (this.data.custom_id !== undefined) {
          throw new BuilderError(ErrorCode.InvalidConfiguration, "ButtonBuilder", "Premium buttons cannot have a custom_id.");
        }
        if (this.data.url !== undefined) {
          throw new BuilderError(ErrorCode.InvalidConfiguration, "ButtonBuilder", "Premium buttons cannot have a url.");
        }
        if (this.data.label !== undefined || this.data.emoji !== undefined) {
          throw new BuilderError(ErrorCode.InvalidConfiguration, "ButtonBuilder", "Premium buttons cannot have a label or emoji.");
        }
        break;

      default:
        // Primary, Secondary, Success, Danger
        assertRequired(this.data.custom_id, "ButtonBuilder", "custom_id (required for non-link, non-premium buttons)");
        if (this.data.url !== undefined) {
          throw new BuilderError(ErrorCode.InvalidConfiguration, "ButtonBuilder", "Only Link buttons can have a url.");
        }
        if (this.data.sku_id !== undefined) {
          throw new BuilderError(ErrorCode.InvalidConfiguration, "ButtonBuilder", "Only Premium buttons can have a sku_id.");
        }
        break;
    }

    return {
      type: ComponentKind.Button,
      style: this.data.style,
      ...(this.data.label !== undefined && { label: this.data.label }),
      ...(this.data.emoji !== undefined && { emoji: this.data.emoji }),
      ...(this.data.custom_id !== undefined && { custom_id: this.data.custom_id }),
      ...(this.data.url !== undefined && { url: this.data.url }),
      ...(this.data.sku_id !== undefined && { sku_id: this.data.sku_id }),
      ...(this.data.disabled !== undefined && { disabled: this.data.disabled }),
      ...(this.data.id !== undefined && { id: this.data.id }),
    };
  }
}
