import {
    boundsFeature,
    fadeFeature,
    hoverFeedbackFeature,
    layoutContainerFeature,
    openFeature,
    popupFeature,
    RectangularNode,
    selectFeature
} from "sprotty/lib";

export class FlogoNode extends RectangularNode {
    cssClass: string
    trace: string | undefined
    strokeWidth = 1

    hasFeature(feature: symbol): boolean {
        return feature === selectFeature || feature === boundsFeature// || feature === moveFeature || feature === editFeature
            || feature === layoutContainerFeature || feature === fadeFeature || feature === hoverFeedbackFeature
            || feature === popupFeature || (feature === openFeature && this.trace !== undefined)
    }
}

export class FlogoTriggerNode extends FlogoNode {
    trigger: any
}
