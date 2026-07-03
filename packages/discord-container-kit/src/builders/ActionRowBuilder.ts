import { ComponentKind, ActionRowPayload, AnySelectMenuPayload, ButtonPayload, TextInputPayload } from "../types/index.js";
import { BaseBuilder } from "./BaseBuilder.js";
import { deepClone } from "../internal/clone.js";
import { assertRequired, Limits } from "../validation/index.js";
import { BuilderError, ErrorCode } from "../errors/index.js";
import { ButtonBuilder } from "./ButtonBuilder.js";
import { StringSelectBuilder } from "./StringSelectBuilder.js";
import { UserSelectBuilder } from "./UserSelectBuilder.js";
import { RoleSelectBuilder } from "./RoleSelectBuilder.js";
import { MentionableSelectBuilder } from "./MentionableSelectBuilder.js";
import { ChannelSelectBuilder } from "./ChannelSelectBuilder.js";
import { TextInputBuilder } from "./TextInputBuilder.js";

export type ActionRowChildBuilder =
  | ButtonBuilder
  | StringSelectBuilder
  | UserSelectBuilder
  | RoleSelectBuilder
  | MentionableSelectBuilder
  | ChannelSelectBuilder
  | TextInputBuilder;

/**
 * Builder for Action Row components (Type 1).
 */
export class ActionRowBuilder extends BaseBuilder<ActionRowPayload> {
  private components: ActionRowChildBuilder[] = [];

  constructor(data?: Partial<ActionRowPayload>) {
    super({ type: ComponentKind.ActionRow, ...data });

    if (data?.components) {
      // We map the raw payloads to their respective builders
      this.components = data.components.map((c) => {
        switch (c.type) {
          case ComponentKind.Button: return new ButtonBuilder(c);
          case ComponentKind.StringSelect: return new StringSelectBuilder(c as import("../types/index.js").StringSelectPayload);
          case ComponentKind.UserSelect: return new UserSelectBuilder(c as import("../types/index.js").AutoSelectPayload);
          case ComponentKind.RoleSelect: return new RoleSelectBuilder(c as import("../types/index.js").AutoSelectPayload);
          case ComponentKind.MentionableSelect: return new MentionableSelectBuilder(c as import("../types/index.js").AutoSelectPayload);
          case ComponentKind.ChannelSelect: return new ChannelSelectBuilder(c as import("../types/index.js").ChannelSelectPayload);
          case ComponentKind.TextInput: return new TextInputBuilder(c);
          default:
            throw new BuilderError(ErrorCode.InvalidNesting, "ActionRowBuilder", `Unsupported component type inside ActionRow.`);
        }
      });
    }
  }

  public addComponents(...components: ActionRowChildBuilder[]): this {
    this.components.push(...components);
    this.validateNesting();
    return this;
  }

  public add(...components: ActionRowChildBuilder[]): this {
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
    const cloned = new ActionRowBuilder(deepClone(this.data));
    cloned.components = this.components.map(c => c.clone());
    return cloned as this;
  }

  private validateNesting(): void {
    let buttonCount = 0;
    let selectCount = 0;
    let textInputCount = 0;

    for (const comp of this.components) {
      if (comp instanceof ButtonBuilder) {
        buttonCount++;
      } else if (comp instanceof TextInputBuilder) {
        textInputCount++;
      } else {
        // All other allowed builders are select menus
        selectCount++;
      }
    }

    if (buttonCount > 0 && selectCount > 0) {
      throw new BuilderError(ErrorCode.InvalidNesting, "ActionRowBuilder", "Cannot mix buttons and select menus in the same action row.");
    }
    if (buttonCount > Limits.ActionRow.MaxButtons) {
      throw new BuilderError(ErrorCode.ExceedsMaxItems, "ActionRowBuilder", `Action rows can contain at most ${Limits.ActionRow.MaxButtons} buttons.`);
    }
    if (selectCount > Limits.ActionRow.MaxSelectMenus) {
      throw new BuilderError(ErrorCode.ExceedsMaxItems, "ActionRowBuilder", `Action rows can contain at most ${Limits.ActionRow.MaxSelectMenus} select menu.`);
    }
    if (textInputCount > 1) {
      throw new BuilderError(ErrorCode.ExceedsMaxItems, "ActionRowBuilder", `Action rows can contain at most 1 text input.`);
    }
    if (textInputCount > 0 && (buttonCount > 0 || selectCount > 0)) {
      throw new BuilderError(ErrorCode.InvalidNesting, "ActionRowBuilder", "Text inputs cannot be mixed with other components.");
    }
  }

  public toJSON(): Readonly<ActionRowPayload> {
    assertRequired(this.components.length > 0 ? true : undefined, "ActionRowBuilder", "components");
    this.validateNesting();

    return {
      type: ComponentKind.ActionRow,
      components: this.components.map(c => c.toJSON() as ButtonPayload | AnySelectMenuPayload | TextInputPayload),
      ...(this.data.id !== undefined && { id: this.data.id }),
    };
  }
}
