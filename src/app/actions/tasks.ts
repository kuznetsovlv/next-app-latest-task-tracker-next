'use server'

import {revalidatePath} from 'next/cache';
import { addTask } from '@/app/lib/tasks-store';
import type { Task } from '@/app/types';

export async function createTaskAction(text: string): Promise<Task> {
    const normalizedText = text.trim();

    if(!normalizedText) {
        throw new Error('Task required');
    }

    const task = await addTask(normalizedText);

    revalidatePath('/');

    return task;
}