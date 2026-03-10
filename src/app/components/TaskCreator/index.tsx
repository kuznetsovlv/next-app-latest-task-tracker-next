import {memo, useState} from 'react';
import styles from './TaskCreator.module.scss';

interface TaskCreatorProps {
    onCreate(text: string): void
}

export default memo<TaskCreatorProps>(function TaskCreator({onCreate})  {
    const [text, setText] = useState<string>('');

    return <form className={styles.creator} onSubmit={(event) => {
        event.preventDefault();
        onCreate(text);
        setText('');
    }}>
        <input className={styles.input} type="text" name="text"  value={text} onChange={({target: {value}}) => setText(value) }/>
        <input className={styles.button} type="submit" value="Add" disabled={!text} />
    </form>
});
