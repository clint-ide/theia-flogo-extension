import {Container, ContainerModule} from "inversify";
import {
    boundsModule,
    buttonModule,
    configureModelElement,
    ConsoleLogger,
    defaultModule,
    edgeEditModule,
    expandModule,
    exportModule,
    fadeModule,
    graphModule,
    hoverModule,
    HtmlRoot,
    HtmlRootView,
    LogLevel,
    modelSourceModule,
    moveModule,
    openModule,
    overrideViewerOptions,
    PolylineEdgeView,
    PreRenderedElement,
    PreRenderedView,
    RectangularNode,
    RectangularNodeView,
    routingModule,
    SEdge,
    selectModule,
    SGraph,
    SGraphFactory,
    SLabel,
    SLabelView, SPort,
    TYPES,
    undoRedoModule,
    updateModule,
    viewportModule
} from 'sprotty/lib';
import 'sprotty/css/sprotty.css';
import "../css/diagram.css";
import {FlogoNode, FlogoTriggerNode} from "./flogo-models";
import {FlogoGraphView, FlogoNodeView} from "./views";

const flogoDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.info);
    bind(SGraphFactory).toSelf().inSingletonScope();

    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', SGraph, FlogoGraphView);
    configureModelElement(context, 'node', RectangularNode, RectangularNodeView);
    configureModelElement(context, 'node:triggers', FlogoNode, FlogoNodeView);
    configureModelElement(context, 'node:trigger', FlogoTriggerNode, FlogoNodeView);
    configureModelElement(context, 'node:action', FlogoNode, FlogoNodeView);
    configureModelElement(context, 'node:flows', FlogoNode, FlogoNodeView);
    configureModelElement(context, 'node:flow', FlogoNode, FlogoNodeView);
    configureModelElement(context, 'node:task', FlogoNode, FlogoNodeView);
    configureModelElement(context, 'label', SLabel, SLabelView);
    configureModelElement(context, 'edge', SEdge, PolylineEdgeView);
    configureModelElement(context, 'edge:straight', SEdge, PolylineEdgeView);
    configureModelElement(context, 'port', SPort, RectangularNodeView);
    configureModelElement(context, 'port:action', SPort, FlogoNodeView);
    configureModelElement(context, 'port:flowinput', SPort, FlogoNodeView);
    configureModelElement(context, 'port:taskinput', SPort, FlogoNodeView);
    configureModelElement(context, 'port:taskoutput', SPort, FlogoNodeView);
    configureModelElement(context, 'html', HtmlRoot, HtmlRootView);
    configureModelElement(context, 'pre-rendered', PreRenderedElement, PreRenderedView);
});

export /*default*/ function createFlogoDiagramContainer(widgetId: string): Container {
    const container = new Container();
    container.load(defaultModule, selectModule, moveModule, boundsModule, undoRedoModule, viewportModule,
        hoverModule, fadeModule, exportModule, expandModule, openModule, buttonModule, modelSourceModule, updateModule,
        edgeEditModule, graphModule, routingModule, flogoDiagramModule
    );
    overrideViewerOptions(container, {
        needsClientLayout: true,
        needsServerLayout: true,
        baseDiv: widgetId
    });
    return container;
}