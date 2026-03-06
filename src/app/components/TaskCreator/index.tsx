import {memo, useState} from 'react';
import {v4} from 'uuid'
import styles from './TaskCreator.module.scss';

import type {Task} from '@/app/types'

interface TaskCreatorProps {
    onAdd(task: Task): void;
}

const TaskCreator = memo<TaskCreatorProps>(function TaskCreator({onAdd})  {
    const [text, setText] = useState<string>('');

    return <div className={styles.creator}>
        <input className={styles.input} type="text" value={text} onChange={({target: {value}}) => setText(value) }/>
        <input className={styles.button} type="button" value="Add" disabled={!text} onClick={() => {
            onAdd({id: v4(), text, completed: false});
            setText('');
        }}/>
    </div>
});

export default TaskCreator