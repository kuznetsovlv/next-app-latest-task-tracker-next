export interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export enum TaskStatus {
    READY = 'READY',
    DELETING = 'DELETING',
    OPTIMISTIC = 'OPTIMISTIC',
}

export interface TaskClient extends Task {
    status: TaskStatus;
}
