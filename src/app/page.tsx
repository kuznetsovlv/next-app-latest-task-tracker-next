import styles from './page.module.css';

import {TaskApp} from './pages';
import {getTasks} from "@/app/lib/tasks-store";

export default async function Home() {
    const tasks = getTasks();
    console.log([...tasks]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <TaskApp />
      </main>
    </div>
  );
}
