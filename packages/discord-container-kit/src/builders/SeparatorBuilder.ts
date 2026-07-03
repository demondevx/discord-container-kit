import { ComponentKind, SeparatorPayload, SpacingSize, SpacingSizeType } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";

/**
 * Builder for Separator components (Type 14).
 */
export class SeparatorBuilder extends BaseBuilder<SeparatorPayload> {
  constructor(data?: Partial<SeparatorPayload>) {
    super({ type: ComponentKind.Separator, ...data });
  }

  /**
   * Sets the spacing size of the separator.
   */
  public setSpacing(spacing: SpacingSizeType): this {
    this.data.spacing = spacing;
    return this;
  }

  /** Alias for setSpacing */
  public spacing(spacing: SpacingSizeType): this {
    return this.setSpacing(spacing);
  }

  /** Sets spacing to Small (1) */
  public small(): this {
    return this.setSpacing(SpacingSize.Small);
  }

  /** Sets spacing to Large (2) */
  public large(): this {
    return this.setSpacing(SpacingSize.Large);
  }

  /**
   * Sets whether the divider line is visible.
   */
  public setDivider(divider: boolean): this {
    this.data.divider = divider;
    return this;
  }

  /** Alias for setDivider */
  public divider(divider: boolean): this {
    return this.setDivider(divider);
  }

  /** Hides the visible divider line */
  public hidden(): this {
    return this.setDivider(false);
  }

  public clone(): this {
    return new SeparatorBuilder(deepClone(this.data)) as this;
  }

  public toJSON(): Readonly<SeparatorPayload> {
    return {
      type: ComponentKind.Separator,
      ...(this.data.spacing !== undefined && { spacing: this.data.spacing }),
      ...(this.data.divider !== undefined && { divider: this.data.divider }),
      ...(this.data.id !== undefined && { id: this.data.id }),
    };
  }
}
