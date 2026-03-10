'use client'

import  {useCallback, useState, memo} from 'react';
import type {Task} from "@/app/types";
import {Stats, TaskCreator, TaskList} from "@/app/components";
import {TEMPORARY_TASK_ID} from '@/app/constants';
import {createTaskAction} from '@/app/actions/tasks'

interface TaskAppClientProps {
    tasks: Task[];
}

export default memo<TaskAppClientProps>(function TaskAppClient({tasks: initialTasks}) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleAddTask = useCallback(async (text: string) => {
        const optimisticTask: Task = {
            id: `${TEMPORARY_TASK_ID}-${crypto.randomUUID()}`,
            text,
            completed: false,
        }

        setTasks((tasks) => [...tasks, optimisticTask])

        try {
            const realTask = await createTaskAction(text)

            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === optimisticTask.id ? realTask : task
                )
            )
        } catch (error) {
            setTasks((tasks) => tasks.filter((task) => task.id !== optimisticTask.id))
            console.error(error)
        }
    }, []);

    const handleChangeTask = useCallback(({id, ...rest}: Task) => setTasks(tasks => tasks.map((task) => task.id === id ? {id, ...rest} : task)), []);
    const handleDeleteTask = useCallback((id: string) => setTasks(tasks => tasks.filter((task) => task.id !== id)), [])

    return <>
        <TaskCreator onCreate={handleAddTask} />
        <TaskList tasks={tasks} onChange={handleChangeTask} onDelete={handleDeleteTask} />
        <Stats tasks={tasks} />
    </>
});