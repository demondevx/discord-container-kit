import { ComponentKind, MediaGalleryPayload } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertMaxItems, assertRequired, Limits } from "../validation/index.js";
import { MediaGalleryItemBuilder } from "./MediaGalleryItemBuilder.js";

/**
 * Builder for Media Gallery components (Type 12).
 */
export class MediaGalleryBuilder extends BaseBuilder<MediaGalleryPayload> {
  private items: MediaGalleryItemBuilder[] = [];

  constructor(data?: Partial<MediaGalleryPayload>) {
    super({ type: ComponentKind.MediaGallery, ...data });
    
    if (data?.items) {
      this.items = data.items.map(item => new MediaGalleryItemBuilder(item));
    }
  }

  /**
   * Adds items to the media gallery.
   */
  public addItems(...items: MediaGalleryItemBuilder[]): this {
    this.items.push(...items);
    assertMaxItems(this.items, Limits.MediaGallery.MaxItems, "MediaGalleryBuilder", "items");
    return this;
  }

  /** Alias for addItems */
  public add(...items: MediaGalleryItemBuilder[]): this {
    return this.addItems(...items);
  }

  /**
   * Clears all items from the gallery.
   */
  public clearItems(): this {
    this.items = [];
    return this;
  }

  /** Alias for clearItems */
  public clear(): this {
    return this.clearItems();
  }

  public clone(): this {
    const cloned = new MediaGalleryBuilder(deepClone(this.data));
    cloned.items = this.items.map(item => item.clone());
    return cloned as this;
  }

  public toJSON(): Readonly<MediaGalleryPayload> {
    assertRequired(this.items.length > 0 ? true : undefined, "MediaGalleryBuilder", "items");
    assertMaxItems(this.items, Limits.MediaGallery.MaxItems, "MediaGalleryBuilder", "items");

    return {
      type: ComponentKind.MediaGallery,
      items: this.items.map(item => item.toJSON()),
      ...(this.data.id !== undefined && { id: this.data.id }),
    };
  }
}
