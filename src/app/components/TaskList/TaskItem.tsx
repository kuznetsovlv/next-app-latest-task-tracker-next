import {memo} from 'react';

import type {Task} from '@/app/types'

interface TaskItemProps extends Task {
    className?: string;
    onChange(task: Task): void;
}

const TaskItem = memo<TaskItemProps>(function TaskItem({id, text, completed, className, onChange}) {
   return <li className={className}>
        <input id={id} name={id} type="checkbox" checked={completed}
               onClick={() => onChange({id, text, completed: !completed})}/>
        <label htmlFor={id}>{text}</label>
    </li>
})


export default TaskItem;
