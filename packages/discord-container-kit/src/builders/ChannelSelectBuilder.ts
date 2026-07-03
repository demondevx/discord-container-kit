import { ComponentKind, ChannelSelectPayload } from "../types/index.js";
import { AutoSelectBuilder } from "./AutoSelectBuilder.js";
import { deepClone } from "../internal/clone.js";

/**
 * Builder for Channel Select components (Type 8).
 */
export class ChannelSelectBuilder extends AutoSelectBuilder<ChannelSelectPayload> {
  constructor(data?: Partial<ChannelSelectPayload>) {
    super({ type: ComponentKind.ChannelSelect, ...data });
  }

  public setChannelTypes(...types: number[]): this {
    this.data.channel_types = types;
    return this;
  }

  public channelTypes(...types: number[]): this {
    return this.setChannelTypes(...types);
  }

  public clone(): this {
    const cloned = new ChannelSelectBuilder(deepClone(this.data)) as this;
    this.copyDefaultValuesTo(cloned);
    return cloned;
  }

  public toJSON(): Readonly<ChannelSelectPayload> {
    return {
      type: ComponentKind.ChannelSelect,
      ...this.getBasePayload(),
      ...(this.data.channel_types !== undefined && { channel_types: [...this.data.channel_types] }),
    } as ChannelSelectPayload;
  }
}
