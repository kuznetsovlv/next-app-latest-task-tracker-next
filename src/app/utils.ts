export const toggleTask = async (id: string) => {
    const task = await fetch(`${getOrigin()}/tasks/${id}`, {method: 'PATCH'});

    if(task.ok) {
        return task.json();
    }

    throw new Error(task.statusText);

};

export const deleteTask = async (id: string) => {
    const result = await fetch(`${getOrigin()}/tasks/${id}`, {method: 'DELETE'});

    if(result.ok) {
        return;
    }

    throw new Error(result.statusText);
}

function getOrigin(): string {
    return `${window.location.origin}/api`;
}