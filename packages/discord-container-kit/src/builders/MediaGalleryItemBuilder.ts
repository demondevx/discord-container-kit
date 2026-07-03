import { MediaGalleryItemPayload } from "../types/index.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, assertStringLength, assertUrl, Limits } from "../validation/index.js";

/**
 * Builder for an individual item inside a Media Gallery.
 * Note: Does not extend BaseBuilder because it is not a standalone component type.
 */
export class MediaGalleryItemBuilder {
  private readonly data: Partial<MediaGalleryItemPayload>;

  constructor(data?: Partial<MediaGalleryItemPayload> | string) {
    if (typeof data === "string") {
      this.data = { media: { url: data } };
    } else {
      this.data = { ...data };
    }
  }

  public setMediaUrl(url: string): this {
    assertUrl(url, "MediaGalleryItemBuilder", "url");
    this.data.media = { url };
    return this;
  }

  public url(url: string): this {
    return this.setMediaUrl(url);
  }

  public setDescription(description: string): this {
    assertStringLength(description, Limits.Media.MaxDescriptionLength, "MediaGalleryItemBuilder", "description");
    this.data.description = description;
    return this;
  }

  public description(description: string): this {
    return this.setDescription(description);
  }

  public setSpoiler(spoiler: boolean): this {
    this.data.spoiler = spoiler;
    return this;
  }

  public spoiler(spoiler: boolean = true): this {
    return this.setSpoiler(spoiler);
  }

  public clone(): this {
    return new MediaGalleryItemBuilder(deepClone(this.data)) as this;
  }

  public toJSON(): Readonly<MediaGalleryItemPayload> {
    assertRequired(this.data.media?.url, "MediaGalleryItemBuilder", "media.url");

    return {
      media: { url: this.data.media.url },
      ...(this.data.description !== undefined && { description: this.data.description }),
      ...(this.data.spoiler !== undefined && { spoiler: this.data.spoiler }),
    };
  }
}
