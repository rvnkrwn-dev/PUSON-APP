import { prisma } from '~/server/config/db';
import { verifyToken } from '~/server/utils/jwt';
import { defineEventHandler, setResponseStatus, sendError } from 'h3';

// Function to get all logs by user ID using access_token
export default defineEventHandler(async (event) => {
    const authHeader = event.req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        setResponseStatus(event, 401);
        return { error: 'Unauthorized' };
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = verifyToken(token); // Assuming verifyToken function returns the decoded token
        const user_id = decodedToken.user_id;

        const logs = await prisma.log.findMany({
            where: {
                user_id: user_id,
            },
        });

        return {
            statusCode: 200,
            body: logs,
        };
    } catch (error) {
        setResponseStatus(event, 500);
        if (error instanceof Error) {
            return { error: error.message };
        } else {
            return { error: 'An unexpected error occurred' };
        }
    }
});
