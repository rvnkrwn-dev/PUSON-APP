import {Log} from '~/server/model/Log';
import {StaffPuskesmas} from "~/server/model/StaffPuskesmas";

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

        const log = await Log.getAllLogsByUserId (user_id, page, pagesize);
        // Hitung total halaman
        const totalUsers = await Log.countAllLog();
        const totalPages = Math.ceil(totalUsers / pagesize);

        // Buat URL untuk prev dan next
        const baseUrl = "/api/auth/log";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        // Return hasil data
        return {
            code: 200,
            message: 'Staff Puskesmas fetched successfully!',
            data: log,
            totalPages,
            prev: prevPage,
            next: nextPage,
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
