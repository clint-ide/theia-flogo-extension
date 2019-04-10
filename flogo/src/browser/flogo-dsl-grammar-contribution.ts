import {LanguageGrammarDefinitionContribution, TextmateRegistry} from '@theia/monaco/lib/browser/textmate';
import {injectable} from 'inversify';
import {FLOGO_LANGUAGE_FILE_NAME, FLOGO_LANGUAGE_SERVER_ID, FLOGO_LANGUAGE_SERVER_NAME} from '../common';
// import {JsonGrammarContribution} from "@theia/textmate-grammars/lib/browser/json";

@injectable()
export class FlogoGrammarContribution implements LanguageGrammarDefinitionContribution {

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: FLOGO_LANGUAGE_SERVER_ID,
            aliases: [
                FLOGO_LANGUAGE_SERVER_NAME, FLOGO_LANGUAGE_SERVER_ID
            ],
            extensions: [],
            filenames: [
                FLOGO_LANGUAGE_FILE_NAME
            ],
            mimetypes: []
        });

        // monaco.languages.setLanguageConfiguration(FLOGO_LANGUAGE_SERVER_ID, new JsonGrammarContribution().config);

        registry.mapLanguageIdToTextmateGrammar(FLOGO_LANGUAGE_SERVER_ID, 'source.json');

    }
}
