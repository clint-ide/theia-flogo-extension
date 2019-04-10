import { injectable, inject } from "inversify";
import { EditorManager, TextEditor } from '@theia/editor/lib/browser';
import { Location } from 'vscode-languageserver-types';

@injectable()
export class ActiveEditorAccess {

    @inject(EditorManager) protected readonly editorManager: EditorManager;

    getSelection(): Location | undefined {
        const activeEditor = this.getActiveEditor();
        if (!activeEditor) {
            return;
        }
        const range = activeEditor.selection;
        const uri = activeEditor.uri.toString();
        return <Location>{ range, uri };
    }

    getLanguageId(): string | undefined {
        const activeEditor = this.getActiveEditor();
        if (!activeEditor) {
            return;
        }
        return activeEditor.document.languageId;
    }

    protected getActiveEditor(): TextEditor | undefined {
        const activeEditor = this.editorManager.currentEditor;
        if (activeEditor) {
            return activeEditor.editor;
        }
        return undefined;
    }

}