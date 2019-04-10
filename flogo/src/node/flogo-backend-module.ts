import { ContainerModule } from 'inversify';
import { LanguageServerContribution } from '@theia/languages/lib/node';
import { FlogoLanguageServerContribution } from './flogo-dsl-language-server-contribution';

export default new ContainerModule(bind => {
    bind(LanguageServerContribution).to(FlogoLanguageServerContribution).inSingletonScope();
});