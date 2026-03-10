import React from 'react';
import clsx from "clsx";
import styles from './TaskList.module.scss'

import type {Task} from '@/app/types'
import TaskItem from './TaskItem';
import {TEMPORARY_TASK_ID} from "@/app/constants";

interface TaskListProps {
    tasks: Task[];
    onChange(task: Task): void;
    onDelete(id: string): void;
}

const TaskList: React.FC<TaskListProps> = ({tasks, onChange, onDelete}) => {
    return <ul className={styles.list}>
        {tasks.map(({id, ...restTask}) => {
            const disabled = id.startsWith(TEMPORARY_TASK_ID);

            return (<TaskItem key={id} id={id} className={clsx(styles.item, {[styles.tmp]: disabled})} disabled={disabled} {...restTask} onChange={onChange} onDelete={onDelete}/>)
        })}
    </ul>
}

export default TaskList;