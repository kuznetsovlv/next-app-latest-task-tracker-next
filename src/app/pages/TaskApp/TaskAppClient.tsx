'use client';

import {memo, useCallback, useOptimistic, useTransition} from 'react';
import {TaskClient, TaskStatus} from '@/app/types';
import Stats from '@/app/components/Stats';
import TaskCreator from '@/app/components/TaskCreator';
import TaskList from '@/app/components/TaskList';
import {TEMPORARY_TASK_ID} from '@/app/constants';
import {
    createTaskAction,
    removeTaskAction,
    switchTaskAction,
} from '@/app/actions/tasks';

interface TaskAppClientProps {
    tasks: TaskClient[];
}

enum TaskActionType {
    ADD = 'ADD',
    TOGGLE = 'TOGGLE',
    DELETE = 'DELETE',
}

interface Payload {
    action: TaskActionType;
    text: string;
}

export default memo<TaskAppClientProps>(function TaskAppClient({
    tasks: initialTasks,
}) {
    const [_, startTransition] = useTransition();

    const [optimisticTasks, updateTasks] = useOptimistic<TaskClient[], Payload>(
        initialTasks,
        (tasks, {text, action}) => {
            switch (action) {
                case TaskActionType.ADD:
                    return [
                        ...tasks,
                        {
                            id: `${TEMPORARY_TASK_ID}-${crypto.randomUUID()}`,
                            text,
                            completed: false,
                            status: TaskStatus.OPTIMISTIC,
                        },
                    ];
                case TaskActionType.TOGGLE:
                    return tasks.map((task) =>
                        task.id === text
                            ? {
                                  ...task,
                                  completed: !task.completed,
                                  status: TaskStatus.OPTIMISTIC,
                              }
                            : task
                    );
                case TaskActionType.DELETE:
                    return tasks.map((task) =>
                        task.id === text
                            ? {...task, status: TaskStatus.DELETING}
                            : task
                    );
                default:
                    return tasks;
            }
        }
    );

    const handleAddTask = useCallback(async (text: string) => {
        startTransition(async () => {
            updateTasks({text, action: TaskActionType.ADD});

            try {
                await createTaskAction(text);
            } catch (error) {
                console.error(error);
            }
        });
    }, []);

    const handleToggleTask = useCallback(async (id: string) => {
        startTransition(async () => {
            updateTasks({
                text: id,
                action: TaskActionType.TOGGLE,
            });

            try {
                await switchTaskAction(id);
            } catch (error) {
                console.error(error);
            }
        });
    }, []);

    const handleDeleteTask = useCallback(async (id: string) => {
        startTransition(async () => {
            updateTasks({
                text: id,
                action: TaskActionType.DELETE,
            });

            try {
                await removeTaskAction(id);
            } catch (error) {
                console.error(error);
            }
        });
    }, []);

    return (
        <>
            <TaskCreator onCreate={handleAddTask} />
            <TaskList
                tasks={optimisticTasks}
                onChange={handleToggleTask}
                onDelete={handleDeleteTask}
            />
            <Stats tasks={optimisticTasks} />
        </>
    );
});
