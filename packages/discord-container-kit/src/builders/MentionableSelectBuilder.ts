import { ComponentKind, AutoSelectPayload } from "../types/index.js";
import { AutoSelectBuilder } from "./AutoSelectBuilder.js";
import { deepClone } from "../internal/clone.js";

/**
 * Builder for Mentionable Select components (Type 7).
 */
export class MentionableSelectBuilder extends AutoSelectBuilder<AutoSelectPayload> {
  constructor(data?: Partial<AutoSelectPayload>) {
    super({ type: ComponentKind.MentionableSelect, ...data });
  }

  public clone(): this {
    const cloned = new MentionableSelectBuilder(deepClone(this.data)) as this;
    this.copyDefaultValuesTo(cloned);
    return cloned;
  }

  public toJSON(): Readonly<AutoSelectPayload> {
    return {
      type: ComponentKind.MentionableSelect,
      ...this.getBasePayload(),
    } as AutoSelectPayload;
  }
}
