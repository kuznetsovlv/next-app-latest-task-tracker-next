'use server';

import {revalidatePath} from 'next/cache';
import {addTask, toggleTask, deleteTask} from '@/app/lib/tasks-store';
import type {Task} from '@/app/types';

export async function createTaskAction(text: string): Promise<Task> {
    const normalizedText = text.trim();

    if (!normalizedText) {
        throw new Error('Task required');
    }

    const task = await addTask(normalizedText);

    revalidatePath('/');

    return task;
}

export async function switchTaskAction(id: string): Promise<Task> {
    const task = await toggleTask(id);

    if (!task) {
        throw new Error('Incorrect task id');
    }

    revalidatePath('/');

    return task;
}

export async function removeTaskAction(id: string): Promise<boolean> {
    const success = await deleteTask(id);

    revalidatePath('/');

    return success;
}
