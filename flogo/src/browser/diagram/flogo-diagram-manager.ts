import { QuickPickService, WidgetManager } from '@theia/core/lib/browser';
import { MonacoWorkspace } from "@theia/monaco/lib/browser/monaco-workspace";
import { inject, injectable } from 'inversify';
import {DiagramManager, LSTheiaSprottyConnector, TheiaFileSaver, TheiaSprottyConnector} from 'sprotty-theia/lib';
import { FLOGO_DIAGRAM_TYPE } from './flogo-diagram-configuration';
import { FlogoDiagramLanguageClient } from './flogo-diagram-language-client';
import { EditorManager } from '@theia/editor/lib/browser';

@injectable()
export class FlogoDiagramManager extends DiagramManager {

    readonly diagramType = FLOGO_DIAGRAM_TYPE;
    readonly iconClass = 'fa fa-sitemap';

    _diagramConnector: TheiaSprottyConnector;

    constructor(@inject(FlogoDiagramLanguageClient) diagramLanguageClient: FlogoDiagramLanguageClient,
                @inject(TheiaFileSaver) fileSaver: TheiaFileSaver,
                @inject(WidgetManager) widgetManager: WidgetManager,
                @inject(EditorManager) editorManager: EditorManager,
                @inject(MonacoWorkspace) workspace: MonacoWorkspace,
                @inject(QuickPickService) quickPickService: QuickPickService) {
        super();
        this._diagramConnector = new LSTheiaSprottyConnector({diagramLanguageClient, fileSaver, editorManager, widgetManager, workspace, quickPickService, diagramManager: this});
    }

    get diagramConnector() {
        return this._diagramConnector;
    }

    get label() {
        return 'Flogo diagram';
    }
}
