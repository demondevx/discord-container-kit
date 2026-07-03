/**
 * Base class for all discord-container-kit builders.
 * Enforces the internal data structure and toJSON contract.
 */
export abstract class BaseBuilder<PayloadType> {
  protected readonly data: Partial<PayloadType>;

  constructor(data: Partial<PayloadType> = {}) {
    this.data = { ...data };
  }

  /**
   * Validates the builder's state and returns the finalized Discord API payload.
   */
  public abstract toJSON(): Readonly<PayloadType>;

  /**
   * Returns a deep copy of this builder.
   */
  public abstract clone(): this;
}
