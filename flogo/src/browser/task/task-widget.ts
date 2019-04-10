import {injectable} from "inversify";
import {BaseWidget} from "@theia/core/lib/browser";
import {FLOGO_TASK_ID} from "../flogo-contribution";

@injectable()
export class TaskWidget extends BaseWidget {

    constructor() {
        super();

        this.id = FLOGO_TASK_ID;
        this.title.label = 'Flogo Task';
        this.title.iconClass = 'fa fa-indent';
        this.title.closable = true;
    }

}