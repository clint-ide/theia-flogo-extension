import {Container, injectable} from "inversify";
import {DiagramConfiguration, LSTheiaDiagramServer, TheiaDiagramServer, TheiaKeyTool} from "sprotty-theia/lib";
import {KeyTool, TYPES} from 'sprotty/lib';
import {EditDiagramLocker} from "sprotty-theia";
import {createFlogoDiagramContainer} from "@clint-ide/flogo-diagrams/lib";
import 'sprotty-theia/css/theia-sprotty.css';

export const FLOGO_DIAGRAM_TYPE = 'flogo-diagram';

@injectable()
export class FlogoDiagramConfiguration implements DiagramConfiguration {
    diagramType = FLOGO_DIAGRAM_TYPE;

    createContainer(widgetId: string): Container {
        const container = createFlogoDiagramContainer(widgetId);
        container.bind(LSTheiaDiagramServer).toSelf().inSingletonScope();
        container.bind(TheiaDiagramServer).toService(LSTheiaDiagramServer);
        container.bind(TYPES.ModelSource).toService(TheiaDiagramServer);
        container.rebind(KeyTool).to(TheiaKeyTool).inSingletonScope();
        container.bind(EditDiagramLocker).toSelf().inSingletonScope();

        return container;
    }
}