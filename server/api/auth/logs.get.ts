import { Log } from '~/server/model/Log';

export default defineEventHandler(async (event) => {
    try {
        // Check if users exists
        const user = event.context.auth.user;

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid users' };
        }

        const user_id = user.id;
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pagesize = parseInt(query.pagesize as string, 10) || 10;

        const logs = await Log.getAllLogByUserId (user_id, page, pagesize);

        return {
            statusCode: 200,
            body: logs,
        };
    } catch (error) {
        console.error('Error fetching logs:', error);
        setResponseStatus(event, 500);
        if (error instanceof Error) {
            return { error: error.message };
        } else {
            return { error: 'An unexpected error occurred' };
        }
    }
});
