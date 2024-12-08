import bcrypt from 'bcryptjs';
import { User } from '~/server/model/User';
import { createLog } from '~/server/utils/atLog';

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context.auth.user;

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        // Read the request body
        const data = await readBody(event);

        // Validate input
        const { full_name, email, password, role } = data;

        if (!full_name || !email || !password) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Please provide all required fields (full_name, email, password).' };
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create new user
        const create_user = await User.createUser({
            full_name,
            email,
            password: hashedPassword,
            role: role || 'user',
        });

        await createLog(user.id, 'Tambah User', 'Berhasil menambahkan pengguna baru');

        // Exclude password from the response
        const { password: _, ...userData } = create_user;

        // Set response status and return success response
        setResponseStatus(event, 201);
        return {
            code: 201,
            message: 'Account created successfully!',
            data: {
                user: userData
            },
        };
    } catch (error: any) {
        // Log the error and return a 500 status code
        console.error('Error creating user:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
