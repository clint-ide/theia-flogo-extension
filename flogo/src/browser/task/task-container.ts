import {Container, interfaces} from 'inversify';
import {TaskWidget} from "./task-widget";

function createHierarchyTreeContainer(parent: interfaces.Container): Container {
    const child = new Container({ defaultScope: 'Singleton' });
    child.parent = parent;

    child.bind(TaskWidget).toSelf();

    return child;
}

export function createTaskWidget(parent: interfaces.Container): TaskWidget {
    return createHierarchyTreeContainer(parent).get<TaskWidget>(TaskWidget);
}