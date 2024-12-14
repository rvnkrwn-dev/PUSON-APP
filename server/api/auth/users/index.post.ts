import bcrypt from 'bcryptjs';
import { User } from '~/server/model/User';
import { createLog } from '~/server/utils/atLog';
import { customAlphabet } from "nanoid";
import { defineEventHandler, setResponseStatus, createError, sendError, readBody } from 'h3';
import { SendEmailCreateAccount } from '~/server/utils/SendEmailCreateAccount';
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        // Check if users exists
        const user = event.context.auth.user;

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        // Read the request body
        const data = await readBody(event);

        // Validate input
        const { full_name, email, role, status } = data;

        if (!full_name || !email) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Harap berikan semua kolom yang diperlukan (nama lengkap, email).' };
        }

        // Generate random password if not provided
        const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10);
        const password = nanoid();

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create new users
        const create_user = await User.createUser({
            full_name,
            email,
            password: hashedPassword,
            role: role || 'user',
            status: status || 'pending',
        });

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Tambah,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Akun pengguna dengan email: ${email}, berhasil ditambahkan`,
        }

        await createLog(payload)

        // Send email with account details
        await SendEmailCreateAccount(email, full_name, password);

        // Exclude password from the response
        const { password: _, ...userData } = create_user;

        // Set response status and return success response
        setResponseStatus(event, 201);
        return {
            code: 201,
            message: 'Akun pengguna berhasil ditambahkan!',
            data: {
                user: userData,
                plainPassword: password // Return plain password if needed
            },
        };
    } catch (error: any) {
        // Log the error and return a 500 status code
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
