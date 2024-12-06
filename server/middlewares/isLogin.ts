import { defineEventHandler, sendError, createError, setResponseStatus } from 'h3';
import jwt from 'jsonwebtoken';
import { isBlacklisted } from '~/server/utils/tokenBlacklist';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN!;

export default defineEventHandler(async (event) => {
    const authHeader = event.node.req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        setResponseStatus(event, 401);
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
    }

    const token = authHeader.split(' ')[1];

    // Periksa apakah token di blacklist
    if (isBlacklisted(token)) {
        setResponseStatus(event, 401);
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Token has been blacklisted' }));
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        event.context.user = decoded; // Pastikan event.context.user disetel dengan benar
    } catch (error) {
        setResponseStatus(event, 401);
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid token' }));
    }
});
