import bcrypt from 'bcryptjs';
import { User } from '~/server/model/User';
import {createLog} from "~/server/utils/atLog";
import {setResponseStatus} from "h3";
import {verifyToken} from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
    const authHeader = event.req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        setResponseStatus(event, 401);
        return { error: 'Unauthorized' };
    }

    const token = authHeader.split(' ')[1];

    try {
        verifyToken(token)
        // Read the request body
        const {
            full_name,
            email,
            password,
            role,
            url_profile,
            secure_url_profile,
            public_id_profile
        } = await readBody(event);

        // Validate input
        if (!full_name || !email || !password) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Please provide all required fields (full_name, email, password)." };
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create new user
        const user = await User.createUser({
            full_name,
            email,
            password: hashedPassword,
            role: role || 'user', // Default role
            url_profile: url_profile || '',
            secure_url_profile: secure_url_profile || '',
            public_id_profile: public_id_profile || ''
        });

        await createLog(user.id, "Tambah User", `Berhasil menambahkan pengguna baru`)

        // Set response status and return success response
        setResponseStatus(event, 201);
        return {
            code: 201,
            message: "Account created successfully!",
            data: {
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role,
                }
            },
        };
    } catch (error: any) {
        // Return error if any
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
