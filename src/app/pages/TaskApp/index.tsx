import React from 'react';

import TaskAppClient from './TaskAppClient';
import {getTasks} from '@/app/lib/tasks-store';
import {TaskStatus} from '@/app/types';

export default async function TaskApp() {
    const tasks = await getTasks();

    return (
        <TaskAppClient
            tasks={tasks.map((task) => ({...task, status: TaskStatus.READY}))}
        />
    );
}
