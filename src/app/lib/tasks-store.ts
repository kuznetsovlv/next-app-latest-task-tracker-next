import type {Task} from '@/app/types';

const tasks: Task[] = [];

export const getTasks = (): Task[] => tasks;

export const addTask = (text: string): Task[] => {
    tasks.push({
        id: crypto.randomUUID(),
        text,
        completed: false,
    });

    return tasks;
};

export const toggleTask = (id: string): Task | null => {
    const task = tasks.find((task) => task.id === id);

    if(!task) {
        return null;
    }

    task.completed = !task.completed;

    return task;
};

export const deleteTask = (id: string): boolean => {
    const index = tasks.findIndex(task => task.id === id);
    if(index < 0) {
        return false;
    }

    tasks.splice(index, 1);
    return true;
};