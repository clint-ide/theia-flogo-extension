import { EditorManager } from "@theia/editor/lib/browser";
import { inject, injectable } from "inversify";
import { DiagramLanguageClient } from "sprotty-theia/lib/theia/languageserver";
import { FlogoLanguageClientContribution } from "../flogo-dsl-language-client-contribution";

@injectable()
export class FlogoDiagramLanguageClient extends DiagramLanguageClient {
    constructor(
        @inject(FlogoLanguageClientContribution) languageClientContribution: FlogoLanguageClientContribution,
        @inject(EditorManager) editorManager: EditorManager) {
        super(languageClientContribution, editorManager)
    }
}