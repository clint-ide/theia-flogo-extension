import {LanguageClientFactory, Languages, Workspace} from '@theia/languages/lib/browser';
import {DiagramManagerProvider} from 'sprotty-theia/lib';
import {inject, injectable, multiInject} from 'inversify';
import {FLOGO_LANGUAGE_FILE_NAME, FLOGO_LANGUAGE_SERVER_ID, FLOGO_LANGUAGE_SERVER_NAME} from '../common';
import {DiagramLanguageClientContribution} from "sprotty-theia/lib/theia/languageserver";

@injectable()
export class FlogoLanguageClientContribution extends DiagramLanguageClientContribution {

    readonly id = FLOGO_LANGUAGE_SERVER_ID;
    readonly name = FLOGO_LANGUAGE_SERVER_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory,
        @multiInject(DiagramManagerProvider) protected diagramManagerProviders: DiagramManagerProvider[]
    ) {
        super(workspace, languages, languageClientFactory, diagramManagerProviders)
    }

    protected get globPatterns(): string[] {
        return [
            '**/' + FLOGO_LANGUAGE_FILE_NAME
        ];
    }

    protected get documentSelector(): string[] {
        return [
            FLOGO_LANGUAGE_SERVER_ID
        ];
    }
}