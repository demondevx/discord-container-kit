import { ComponentKind, SectionPayload } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, assertMaxItems, Limits } from "../validation/index.js";
import { BuilderError, ErrorCode } from "../errors/index.js";
import { TextDisplayBuilder } from "./TextDisplayBuilder.js";
import { ThumbnailBuilder } from "./ThumbnailBuilder.js";
import { ButtonBuilder } from "./ButtonBuilder.js";

/**
 * Builder for Section components (Type 9).
 */
export class SectionBuilder extends BaseBuilder<SectionPayload> {
  private textDisplays: TextDisplayBuilder[] = [];
  private accessoryBuilder?: ThumbnailBuilder | ButtonBuilder;

  constructor(data?: Partial<SectionPayload>) {
    super({ type: ComponentKind.Section, ...data });

    if (data?.components) {
      this.textDisplays = data.components.map(c => new TextDisplayBuilder(c));
    }

    if (data?.accessory) {
      if (data.accessory.type === ComponentKind.Thumbnail) {
        this.accessoryBuilder = new ThumbnailBuilder(data.accessory);
      } else if (data.accessory.type === ComponentKind.Button) {
        this.accessoryBuilder = new ButtonBuilder(data.accessory);
      }
    }
  }

  public addTextDisplays(...displays: TextDisplayBuilder[]): this {
    this.textDisplays.push(...displays.map(d => d.clone()));
    assertMaxItems(this.textDisplays, Limits.Section.MaxTextDisplays, "SectionBuilder", "components (TextDisplays)");
    return this;
  }

  public add(...displays: TextDisplayBuilder[]): this {
    return this.addTextDisplays(...displays);
  }

  public clearTextDisplays(): this {
    this.textDisplays = [];
    return this;
  }

  public clear(): this {
    this.clearTextDisplays();
    this.clearAccessory();
    return this;
  }

  public setAccessory(accessory: ThumbnailBuilder | ButtonBuilder): this {
    this.accessoryBuilder = accessory.clone();
    return this;
  }

  public accessory(accessory: ThumbnailBuilder | ButtonBuilder): this {
    return this.setAccessory(accessory);
  }

  public clearAccessory(): this {
    this.accessoryBuilder = undefined;
    return this;
  }

  public clone(): this {
    const cloned = new SectionBuilder(deepClone(this.data));
    cloned.textDisplays = this.textDisplays.map(c => c.clone());
    if (this.accessoryBuilder) {
      cloned.accessoryBuilder = this.accessoryBuilder.clone();
    }
    return cloned as this;
  }

  public toJSON(): Readonly<SectionPayload> {
    if (!this.accessoryBuilder && this.textDisplays.length === 0) {
      throw new BuilderError(ErrorCode.InvalidConfiguration, "SectionBuilder", "Section must contain text or accessory");
    }

    if (this.textDisplays.length > Limits.Section.MaxTextDisplays) {
      throw new BuilderError(ErrorCode.ExceedsMaxItems, "SectionBuilder", `Section can contain at most ${Limits.Section.MaxTextDisplays} TextDisplays.`);
    }

    for (const c of this.textDisplays) {
      const json = c.toJSON();
      if ((json as any).accessory) {
        throw new BuilderError(ErrorCode.InvalidConfiguration, "SectionBuilder", "TextDisplay cannot contain accessory");
      }
    }

    const components = this.textDisplays.map(t => structuredClone(t.toJSON()));

    const json: any = {
      type: ComponentKind.Section,
      components: components
    };

    if (this.data.id !== undefined) {
      json.id = this.data.id;
    }

    const accessoryRaw = this.accessoryBuilder?.toJSON?.();
    const accessory = accessoryRaw ? structuredClone(accessoryRaw) : undefined;
    if (accessory && typeof accessory === "object" && (accessory.type === 11 || accessory.type === 2)) {
      json.accessory = accessory;
    }

    console.log("SECTION OUTPUT FINAL:", JSON.stringify(json, null, 2));

    return json as Readonly<SectionPayload>;
  }
}
