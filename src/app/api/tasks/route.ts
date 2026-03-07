import { getTasks, addTask } from '@/app/lib/tasks-store';

export const GET = async (): Promise<Response> =>  Response.json(getTasks());

export const POST = async (request: Request): Promise<Response> => {
    const body = await request.json();
    const text = body?.text?.trim();

    if (!text) {
        return Response.json(
            { error: 'Text is required' },
            { status: 400 }
        );
    }

    const task = addTask(text);

    return Response.json(task, { status: 201 });
};