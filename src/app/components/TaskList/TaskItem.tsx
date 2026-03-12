import {memo} from 'react';

import type {Task} from '@/app/types';

interface TaskItemProps extends Task {
    className?: string;
    disabled?: boolean;
    onChange(id: string): void;
    onDelete(id: string): void;
}

const TaskItem = memo<TaskItemProps>(function TaskItem({
    id,
    text,
    completed,
    className,
    disabled = false,
    onChange,
    onDelete,
}) {
    return (
        <li className={className}>
            <input
                id={id}
                name={id}
                type="checkbox"
                checked={completed}
                disabled={disabled}
                onChange={() => onChange(id)}
            />
            <label htmlFor={id}>{text}</label>
            <input
                type="button"
                value="-"
                disabled={disabled}
                onClick={() => onDelete(id)}
            />
        </li>
    );
});

export default TaskItem;
