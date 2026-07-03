import { ComponentKind, AutoSelectPayload } from "../types/index.js";
import { AutoSelectBuilder } from "./AutoSelectBuilder.js";
import { deepClone } from "../internal/clone.js";

/**
 * Builder for User Select components (Type 5).
 */
export class UserSelectBuilder extends AutoSelectBuilder<AutoSelectPayload> {
  constructor(data?: Partial<AutoSelectPayload>) {
    super({ type: ComponentKind.UserSelect, ...data });
  }

  public clone(): this {
    const cloned = new UserSelectBuilder(deepClone(this.data)) as this;
    this.copyDefaultValuesTo(cloned);
    return cloned;
  }

  public toJSON(): Readonly<AutoSelectPayload> {
    return {
      type: ComponentKind.UserSelect,
      ...this.getBasePayload(),
    } as AutoSelectPayload;
  }
}
