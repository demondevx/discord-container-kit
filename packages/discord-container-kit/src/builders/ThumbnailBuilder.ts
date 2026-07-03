import { ComponentKind, ThumbnailPayload } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, assertStringLength, assertUrl, Limits } from "../validation/index.js";

/**
 * Builder for Thumbnail components (Type 11).
 * Only valid as an accessory within a Section.
 */
export class ThumbnailBuilder extends BaseBuilder<ThumbnailPayload> {
  constructor(data?: Partial<ThumbnailPayload> | string) {
    if (typeof data === "string") {
      super({ type: ComponentKind.Thumbnail, media: { url: data } });
    } else {
      super({ type: ComponentKind.Thumbnail, ...data });
    }
  }

  /**
   * Sets the media URL.
   */
  public setMediaUrl(url: string): this {
    assertUrl(url, "ThumbnailBuilder", "url");
    this.data.media = { url };
    return this;
  }

  /** Alias for setMediaUrl */
  public url(url: string): this {
    return this.setMediaUrl(url);
  }

  /**
   * Sets the image description (alt text).
   */
  public setDescription(description: string): this {
    assertStringLength(description, Limits.Media.MaxDescriptionLength, "ThumbnailBuilder", "description");
    this.data.description = description;
    return this;
  }

  /** Alias for setDescription */
  public description(description: string): this {
    return this.setDescription(description);
  }

  /**
   * Sets the spoiler overlay.
   */
  public setSpoiler(spoiler: boolean): this {
    this.data.spoiler = spoiler;
    return this;
  }

  /** Alias for setSpoiler(true) */
  public spoiler(spoiler: boolean = true): this {
    return this.setSpoiler(spoiler);
  }

  public clone(): this {
    return new ThumbnailBuilder(deepClone(this.data)) as this;
  }

  public toJSON(): Readonly<ThumbnailPayload> {
    assertRequired(this.data.media?.url, "ThumbnailBuilder", "media.url");

    const payload: any = {
      type: ComponentKind.Thumbnail,
      media: { url: this.data.media.url },
      spoiler: this.data.spoiler ?? false,
    };

    if (this.data.description && this.data.description.length > 0) {
      payload.description = this.data.description;
    }

    if (this.data.id !== undefined) {
      payload.id = this.data.id;
    }

    return payload as Readonly<ThumbnailPayload>;
  }
}
