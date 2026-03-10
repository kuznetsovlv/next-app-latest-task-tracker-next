import {memo, useState} from 'react';
import styles from './TaskCreator.module.scss';

import type {Task} from '@/app/types';
import {createTask} from '@/app/utils';
import {TEMPORARY_TASK_ID} from '@/app/constants';

interface TaskCreatorProps {
    onCreate(task: Task): void;
    onConfirm(task: Task): void;
    onReject(): void;
}

export default memo<TaskCreatorProps>(function TaskCreator({onCreate, onConfirm, onReject})  {
    const [text, setText] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);

    return <form className={styles.creator} onSubmit={(event) => {
        event.preventDefault();
        setDisabled(true);
        onCreate({id: TEMPORARY_TASK_ID, text, completed: false});
        const tasks = createTask(text);
        tasks.then(onConfirm, onReject).finally(() => {
            setText('');
            setDisabled(false);
        });
    }}>
        <input className={styles.input} type="text" name="text" disabled={disabled} value={text} onChange={({target: {value}}) => setText(value) }/>
        <input className={styles.button} type="submit" value="Add" disabled={!text || disabled} />
    </form>
});
