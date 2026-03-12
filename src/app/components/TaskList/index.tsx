import React from 'react';
import clsx from 'clsx';
import styles from './TaskList.module.scss';

import {TaskClient, TaskStatus} from '@/app/types';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: TaskClient[];
    onChange(id: string): void;
    onDelete(id: string): void;
}

const TaskList: React.FC<TaskListProps> = ({tasks, onChange, onDelete}) => {
    return (
        <ul className={styles.list}>
            {tasks.map(({id, status, ...restTask}) => {
                const disabled = status !== TaskStatus.READY;
                const deleting = status === TaskStatus.DELETING;

                return (
                    <TaskItem
                        key={id}
                        id={id}
                        className={clsx(styles.item, {
                            [styles.optimistic]: disabled,
                            [styles.deleting]: deleting,
                        })}
                        disabled={disabled}
                        {...restTask}
                        onChange={onChange}
                        onDelete={onDelete}
                    />
                );
            })}
        </ul>
    );
};

export default TaskList;
