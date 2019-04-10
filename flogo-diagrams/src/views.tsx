/** @jsx svg */
import {svg} from 'snabbdom-jsx';

import {VNode} from "snabbdom/vnode";
import {IView, RenderingContext, setAttr, SGraph} from "sprotty/lib";
import {injectable} from "inversify";
import {FlogoNode} from "./flogo-models";

@injectable()
export class FlogoGraphView implements IView {
    render(model: Readonly<SGraph>, context: RenderingContext): VNode {
        var graph = model as SGraph
        //  viewBox="0 0 100 100"
        const transform = `scale(${graph.zoom}) translate(${-graph.scroll.x},${-graph.scroll.y})`;
        return <svg height="100%" width="100%" class-sprotty-graph={true}>
            <g transform={transform}>
                {context.renderChildren(graph)}
            </g>
        </svg>;
    }
}

@injectable()
export class FlogoNodeView implements IView {
    render(node: FlogoNode, context: RenderingContext): VNode {
        const vnode = <g>
            <rect class-mouseover={node.hoverFeedback} class-selected={node.selected}
                  x="0" y="0" width={Math.max(node.size.width, 0)} height={Math.max(node.size.height, 0)}></rect>
            {context.renderChildren(node)}
        </g>;

        setAttr(vnode, 'class', node.cssClass)

        return vnode
    }
}
