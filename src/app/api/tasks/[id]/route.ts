import { toggleTask, deleteTask } from '@/app/lib/tasks-store';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export const PATCH = async (_request: Request, {params}: RouteContext): Promise<Response> => {
    const { id } = await params;
    const task = toggleTask(id);

    if (!task) {
        return Response.json(
            { error: 'Task not found' },
            { status: 404 }
        );
    }

    return Response.json(task);
};

export const DELETE = async (_request: Request, {params}: RouteContext): Promise<Response> => {
    const { id } = await params;
    const deleted = deleteTask(id);

    return deleted ? new Response(null, { status: 204 }) : Response.json(
        { error: 'Task not found' },
        { status: 404 }
    );
};