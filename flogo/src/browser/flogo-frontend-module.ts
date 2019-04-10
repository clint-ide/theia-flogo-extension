/**
 * Generated using theia-extension-generator
 */

import {
    FLOGO_TASK_ID,
    FlogoCommandContribution,
    FlogoMenuContribution,
    TaskWidgetContribution
} from './flogo-contribution';
import {CommandContribution, MenuContribution} from "@theia/core/lib/common";

import {ContainerModule} from "inversify";
import {LanguageClientContribution} from '@theia/languages/lib/browser';
import {FlogoLanguageClientContribution} from './flogo-dsl-language-client-contribution';
import {LanguageGrammarDefinitionContribution} from '@theia/monaco/lib/browser/textmate';
import {FlogoGrammarContribution} from './flogo-dsl-grammar-contribution';
import {DiagramConfiguration, DiagramManager, DiagramManagerProvider} from 'sprotty-theia/lib';
import {FlogoDiagramConfiguration} from './diagram/flogo-diagram-configuration';
import {FlogoDiagramManager} from './diagram/flogo-diagram-manager';
import {KeybindingContribution, OpenHandler, WidgetFactory} from '@theia/core/lib/browser';
import {LSDiagramCommandContribution, LSDiagramKeybindingContribution} from 'sprotty-theia/lib/theia/languageserver';
import {FlogoDiagramLanguageClient} from './diagram/flogo-diagram-language-client';
import {AboutDialog} from "@theia/core/lib/browser/about-dialog";
import {ClintAboutDialog} from "./about-dialog";
import {createTaskWidget} from "./task/task-container";
import {ActiveEditorAccess} from "./active-editor-access";

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // add your contribution bindings here
    bind(ClintAboutDialog).toSelf().inSingletonScope()
    rebind(AboutDialog).toService(ClintAboutDialog)

    bind(CommandContribution).to(FlogoCommandContribution);
    bind(MenuContribution).to(FlogoMenuContribution);

    bind(FlogoLanguageClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toService(FlogoLanguageClientContribution);
    bind(LanguageGrammarDefinitionContribution).to(FlogoGrammarContribution).inSingletonScope();

    bind(FlogoDiagramLanguageClient).toSelf().inSingletonScope();
    bind(CommandContribution).to(LSDiagramCommandContribution).inSingletonScope();
    bind(KeybindingContribution).to(LSDiagramKeybindingContribution).inSingletonScope();

    bind(DiagramConfiguration).to(FlogoDiagramConfiguration).inSingletonScope();
    bind(FlogoDiagramManager).toSelf().inSingletonScope();
    // bind(FrontendApplicationContribution).toService(FlogoDiagramManager);
    bind(OpenHandler).toService(FlogoDiagramManager);
    bind(WidgetFactory).toService(FlogoDiagramManager);
    bind(DiagramManagerProvider).toProvider<DiagramManager>((context) => {
        return () => {
            return new Promise<DiagramManager>((resolve) => {
                let diagramManager = context.container.get<FlogoDiagramManager>(FlogoDiagramManager);
                resolve(diagramManager);
            });
        };
    });


    // Flogo task view
    bind(ActiveEditorAccess).toSelf().inSingletonScope();

    bind(TaskWidgetContribution).toSelf().inSingletonScope();
    bind(CommandContribution).toDynamicValue(ctx => ctx.container.get(TaskWidgetContribution));
    bind(MenuContribution).toDynamicValue(ctx => ctx.container.get(TaskWidgetContribution));
    bind(KeybindingContribution).toDynamicValue(ctx => ctx.container.get(TaskWidgetContribution));

    bind(WidgetFactory).toDynamicValue(context => ({
        id: FLOGO_TASK_ID,
        createWidget: () => createTaskWidget(context.container)
    }));
});