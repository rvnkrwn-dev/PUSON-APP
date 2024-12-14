import bcrypt from 'bcryptjs';
import {User} from '~/server/model/User';
import {SendEmailRegister} from "~/server/utils/SendEmailRegister";
import {RegisterRequest, RegisterResponse} from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        // Membaca body dari request
        const data: RegisterRequest= await readBody(event);

        // Validasi input
        if (!data.full_name || !data.email || !data.password) {
            setResponseStatus(event, 400);
            return {code: 400, message: "Harap berikan semua kolom yang diperlukan (nama lengkap, email, kata sandi)."};
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(data.password, 10);

        // Membuat users baru
        const user = await User.registerUser({
            full_name: data.full_name,
            email: data.email,
            password: hashedPassword
        });

        // Mengatur status dan mengembalikan respons sukses
        setResponseStatus(event, 201);
        await SendEmailRegister(user.email, user.full_name);
        return <RegisterResponse>{
            code: 201,
            message: "Pengguna berhasil terdaftar!",
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
