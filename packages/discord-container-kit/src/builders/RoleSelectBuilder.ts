import { ComponentKind, AutoSelectPayload } from "../types/index.js";
import { AutoSelectBuilder } from "./AutoSelectBuilder.js";
import { deepClone } from "../internal/clone.js";

/**
 * Builder for Role Select components (Type 6).
 */
export class RoleSelectBuilder extends AutoSelectBuilder<AutoSelectPayload> {
  constructor(data?: Partial<AutoSelectPayload>) {
    super({ type: ComponentKind.RoleSelect, ...data });
  }

  public clone(): this {
    const cloned = new RoleSelectBuilder(deepClone(this.data)) as this;
    this.copyDefaultValuesTo(cloned);
    return cloned;
  }

  public toJSON(): Readonly<AutoSelectPayload> {
    return {
      type: ComponentKind.RoleSelect,
      ...this.getBasePayload(),
    } as AutoSelectPayload;
  }
}
