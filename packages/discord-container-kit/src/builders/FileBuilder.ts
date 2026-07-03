import { ComponentKind, FilePayload } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, assertUrl } from "../validation/index.js";

/**
 * Builder for File components (Type 13).
 */
export class FileBuilder extends BaseBuilder<FilePayload> {
  constructor(data?: Partial<FilePayload> | string) {
    if (typeof data === "string") {
      super({ type: ComponentKind.File, file: { url: data } });
    } else {
      super({ type: ComponentKind.File, ...data });
    }
  }

  /**
   * Sets the file URL.
   * Typically uses the "attachment://filename" scheme.
   */
  public setFileUrl(url: string): this {
    assertUrl(url, "FileBuilder", "url");
    this.data.file = { url };
    return this;
  }

  /** Alias for setFileUrl */
  public url(url: string): this {
    return this.setFileUrl(url);
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
    return new FileBuilder(deepClone(this.data)) as this;
  }

  public toJSON(): Readonly<FilePayload> {
    assertRequired(this.data.file?.url, "FileBuilder", "file.url");

    return {
      type: ComponentKind.File,
      file: { url: this.data.file.url },
      ...(this.data.spoiler !== undefined && { spoiler: this.data.spoiler }),
      ...(this.data.id !== undefined && { id: this.data.id }),
    };
  }
}
