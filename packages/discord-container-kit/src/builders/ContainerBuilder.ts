import { ComponentKind, ContainerPayload, AnyComponentPayload } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, assertMaxItems, Limits } from "../validation/index.js";
import { BuilderError, ErrorCode } from "../errors/index.js";
import { parseColor } from "../utilities/index.js";
import { ActionRowBuilder } from "./ActionRowBuilder.js";
import { SectionBuilder } from "./SectionBuilder.js";
import { TextDisplayBuilder } from "./TextDisplayBuilder.js";
import { MediaGalleryBuilder } from "./MediaGalleryBuilder.js";
import { FileBuilder } from "./FileBuilder.js";
import { SeparatorBuilder } from "./SeparatorBuilder.js";

export type ContainerChildBuilder =
  | ActionRowBuilder
  | SectionBuilder
  | TextDisplayBuilder
  | MediaGalleryBuilder
  | FileBuilder
  | SeparatorBuilder;

/**
 * Builder for Container components (Type 17).
 * The top-level layout component for Components V2.
 */
export class ContainerBuilder extends BaseBuilder<ContainerPayload> {
  private components: ContainerChildBuilder[] = [];

  constructor(data?: Partial<ContainerPayload>) {
    super({ type: ComponentKind.Container, ...data });

    if (data?.components) {
      this.components = data.components.map((c) => {
        switch (c.type) {
          case ComponentKind.ActionRow: return new ActionRowBuilder(c);
          case ComponentKind.Section: return new SectionBuilder(c);
          case ComponentKind.TextDisplay: return new TextDisplayBuilder(c);
          case ComponentKind.MediaGallery: return new MediaGalleryBuilder(c);
          case ComponentKind.File: return new FileBuilder(c);
          case ComponentKind.Separator: return new SeparatorBuilder(c);
          default:
            throw new BuilderError(ErrorCode.InvalidNesting, "ContainerBuilder", `Unsupported component type inside Container.`);
        }
      });
    }
  }

  public setAccentColor(color: string | number): this {
    this.data.accent_color = parseColor(color, "ContainerBuilder");
    return this;
  }

  public accent(color: string | number): this {
    return this.setAccentColor(color);
  }

  public setSpoiler(spoiler: boolean): this {
    this.data.spoiler = spoiler;
    return this;
  }

  public spoiler(spoiler: boolean = true): this {
    return this.setSpoiler(spoiler);
  }

  public addComponents(...components: ContainerChildBuilder[]): this {
    this.components.push(...components);
    assertMaxItems(this.components, Limits.Container.MaxChildren, "ContainerBuilder", "components");
    return this;
  }

  public add(...components: ContainerChildBuilder[]): this {
    return this.addComponents(...components);
  }

  public clearComponents(): this {
    this.components = [];
    return this;
  }

  public clear(): this {
    return this.clearComponents();
  }

  public clone(): this {
    const cloned = new ContainerBuilder(deepClone(this.data));
    cloned.components = this.components.map(c => c.clone());
    return cloned as this;
  }

  public toJSON(): Readonly<ContainerPayload> {
    assertRequired(this.components.length > 0 ? true : undefined, "ContainerBuilder", "components");
    assertMaxItems(this.components, Limits.Container.MaxChildren, "ContainerBuilder", "components");

    const payload = {
      type: ComponentKind.Container,
      components: this.components.map(c => c.toJSON() as AnyComponentPayload),
      ...(this.data.accent_color !== undefined && { accent_color: this.data.accent_color }),
      ...(this.data.spoiler !== undefined && { spoiler: this.data.spoiler }),
      ...(this.data.id !== undefined && { id: this.data.id }),
    };

    for (const c of payload.components) {
      if (c.type === ComponentKind.Section) {
        if (!Array.isArray(c.components)) {
          throw new Error("Invalid Section: missing components array");
        }
        if (c.accessory && c.accessory.type === ComponentKind.Thumbnail && !c.accessory.media?.url) {
          throw new Error("Invalid Section accessory: missing media.url");
        }
      }
    }

    return payload;
  }
}
