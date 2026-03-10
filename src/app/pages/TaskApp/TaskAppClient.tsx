'use client'

import  {useCallback, useState, memo} from 'react';
import type {Task} from "@/app/types";
import {Stats, TaskCreator, TaskList} from "@/app/components";
import {TEMPORARY_TASK_ID} from '@/app/constants';

interface TaskAppClientProps {
    tasks: Task[];
}

export default memo<TaskAppClientProps>(function TaskAppClient({tasks: initialTasks}) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleAddTask = useCallback((task: Task) => setTasks(tasks => [...tasks, task]), []);
    const handleConfirmTask = useCallback((task: Task) => setTasks(tasks => tasks.map(({id, ...restTask}) => id === TEMPORARY_TASK_ID ? task : {id, ...restTask} )), []);
    const handleRejectTask = useCallback(() => setTasks(tasks => tasks.filter(({id}) => id !== TEMPORARY_TASK_ID)), []);
    const handleChangeTask = useCallback(({id, ...rest}: Task) => setTasks(tasks => tasks.map((task) => task.id === id ? {id, ...rest} : task)), []);
    const handleDeleteTask = useCallback((id: string) => setTasks(tasks => tasks.filter((task) => task.id !== id)), [])

    return <>
        <TaskCreator onCreate={handleAddTask} onConfirm={handleConfirmTask} onReject={handleRejectTask} />
        <TaskList tasks={tasks} onChange={handleChangeTask} onDelete={handleDeleteTask} />
        <Stats tasks={tasks} />
    </>
});