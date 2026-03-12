'use client';

import {memo, useCallback, useState} from 'react';
import {TaskClient, TaskStatus} from '@/app/types';
import Stats from '@/app/components/Stats';
import TaskCreator from '@/app/components/TaskCreator';
import TaskList from '@/app/components/TaskList';
import {TEMPORARY_TASK_ID} from '@/app/constants';
import {createTaskAction, switchTask, removeTask} from '@/app/actions/tasks';

interface TaskAppClientProps {
    tasks: TaskClient[];
}

export default memo<TaskAppClientProps>(function TaskAppClient({
    tasks: initialTasks,
}) {
    const [tasks, setTasks] = useState<TaskClient[]>(initialTasks);

    const handleAddTask = useCallback(async (text: string) => {
        const optimisticTask: TaskClient = {
            id: `${TEMPORARY_TASK_ID}-${crypto.randomUUID()}`,
            text,
            completed: false,
            status: TaskStatus.OPTIMISTIC,
        };

        setTasks((tasks) => [...tasks, optimisticTask]);

        try {
            const realTask = await createTaskAction(text);

            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === optimisticTask.id
                        ? {...realTask, status: TaskStatus.READY}
                        : task
                )
            );
        } catch (error) {
            setTasks((tasks) =>
                tasks.filter((task) => task.id !== optimisticTask.id)
            );
            console.error(error);
        }
    }, []);

    const handleToggleTask = useCallback(async (id: string) => {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id
                    ? {
                          ...task,
                          completed: !task.completed,
                          status: TaskStatus.OPTIMISTIC,
                      }
                    : task
            )
        );

        try {
            const realTask = await switchTask(id);

            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === id
                        ? {...realTask, status: TaskStatus.READY}
                        : task
                )
            );
        } catch (error) {
            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === id
                        ? {
                              ...task,
                              completed: !task.completed,
                              status: TaskStatus.READY,
                          }
                        : task
                )
            );
            console.error(error);
        }
    }, []);

    const handleDeleteTask = useCallback(async (id: string) => {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? {...task, status: TaskStatus.DELETING} : task
            )
        );

        try {
            await removeTask(id);

            setTasks((tasks) => tasks.filter((task) => task.id !== id));
        } catch (error) {
            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === id ? {...task, status: TaskStatus.READY} : task
                )
            );
            console.error(error);
        }
    }, []);

    return (
        <>
            <TaskCreator onCreate={handleAddTask} />
            <TaskList
                tasks={tasks}
                onChange={handleToggleTask}
                onDelete={handleDeleteTask}
            />
            <Stats tasks={tasks} />
        </>
    );
});
