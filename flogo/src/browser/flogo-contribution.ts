import {inject, injectable} from "inversify";
import {
    Command,
    CommandContribution,
    CommandRegistry,
    MAIN_MENU_BAR,
    MenuContribution,
    MenuModelRegistry,
    MessageService
} from "@theia/core/lib/common";
import {TaskWidget} from "./task/task-widget";
import {AbstractViewContribution, FrontendApplication, OpenViewArguments} from "@theia/core/lib/browser";
import { EDITOR_CONTEXT_MENU } from '@theia/editor/lib/browser';
import {ActiveEditorAccess} from "./active-editor-access";

export const FlogoCommand = {
    id: 'Flogo.command',
    label: "Build application"
};

@injectable()
export class FlogoCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(FlogoCommand, {
            execute: () => this.messageService.info('Flogo application has been built.')
        });
    }
}

const FLOGO = [...MAIN_MENU_BAR , '8_flogo'];

@injectable()
export class FlogoMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerSubmenu(FLOGO, 'Flogo');

        menus.registerMenuAction(FLOGO, {
            commandId: FlogoCommand.id,
            label: FlogoCommand.label
        });
    }
}

/* Flogo task contribution */

export const FLOGO_TASK_ID = "flogotask"
export const FLOGO_TASK_LABEL = "Flogo task"
export const FLOGO_TASK_TOGGLE_COMMAND_ID = "flogotask:toggle"
export namespace FlogoTaskCommands {
    export const OPEN: Command = {
        id: 'flogotask:open',
        label: 'Open Flogo task'
    };
}
@injectable()
export class TaskWidgetContribution extends AbstractViewContribution<TaskWidget> {

    @inject(ActiveEditorAccess) protected readonly editorAccess: ActiveEditorAccess;

    constructor() {
        super({
            widgetId: FLOGO_TASK_ID,
            widgetName: FLOGO_TASK_LABEL,
            defaultWidgetOptions: {
                area: 'bottom'
            },
            toggleCommandId: FLOGO_TASK_TOGGLE_COMMAND_ID,
            toggleKeybinding: 'shift+f2'
        });
    }

    initializeLayout(app: FrontendApplication) {
        // TODO add status bar item
    }

    async openView(args?: Partial<OpenViewArguments>): Promise<TaskWidget> {
        const widget = await super.openView(args);
        const selection = this.editorAccess.getSelection();
        const languageId = this.editorAccess.getLanguageId();
        console.log(selection + " : " + languageId)
        return widget;
    }

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(FlogoTaskCommands.OPEN, {
            execute: () => this.openView({
                toggle: false,
                activate: true
            }),
            isEnabled: () => true
        });
        super.registerCommands(commands);
    }

    registerMenus(menus: MenuModelRegistry): void {
        const menuPath = [...EDITOR_CONTEXT_MENU, 'navigation'];
        menus.registerMenuAction(menuPath, {
            commandId: FlogoTaskCommands.OPEN.id,
            label: FLOGO_TASK_LABEL
        });
        super.registerMenus(menus);
    }
}