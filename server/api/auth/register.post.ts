import bcrypt from 'bcryptjs';
import {User} from '~/server/model/User';
import {SendEmailRegister} from "~/server/utils/SendEmailRegister";

export default defineEventHandler(async (event) => {
    try {
        // Membaca body dari request
        const {
            full_name,
            email,
            password
        } = await readBody(event);

        // Validasi input
        // @ts-ignore
        if (!full_name || !email || !password) {
            setResponseStatus(event, 400);
            return {code: 400, message: "Please provide all required fields (full_name, email, password)."};
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Membuat user baru
        const user = await User.createUser({
            full_name,
            email,
            password: hashedPassword
        });

        // Mengatur status dan mengembalikan respons sukses
        setResponseStatus(event, 201);
        await SendEmailRegister(email, full_name);
        return {
            code: 201,
            message: "User registered successfully!",
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
        // Mengembalikan error jika ada
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error.message || "Internal Server Error"})
        );
    }
});
