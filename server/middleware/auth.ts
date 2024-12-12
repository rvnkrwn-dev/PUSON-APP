import UrlPattern from "url-pattern"
import {decodeAccessToken} from "~/server/utils/jwt";
import {User} from "~/server/model/User";

export default defineEventHandler( async (event) => {
    try {
        const endpoints = [
            '/api/auth/user',
            '/api/auth/logout',
            '/api/auth/verification',
            '/api/auth/users',
            '/api/auth/users/:id',
            // '/api/auth/users/search?q=:q',
            '/api/auth/users?page=:page&pagesize=:pagesize',
            '/api/auth/logs?page=:page&pagesize=:pagesize',
            '/api/auth/puskesmas',
            '/api/auth/puskesmas/:id',
            '/api/auth/puskesmas?page=:page&pagesize=:pagesize',
            '/api/auth/puskesmas/search?q=:q',
            '/api/auth/detail-user',
            '/api/auth/detail-user/:id',
            '/api/auth/detail-user?page=:page&pagesize=:pagesize',
            '/api/auth/detail-user/search?q=:q',
            '/api/auth/kk',
            '/api/auth/kk/:id',
            '/api/auth/kk?page=:page&pagesize=:pagesize',
            '/api/auth/kk/search?q=:q',
            '/api/auth/nik',
            '/api/auth/nik/:id',
            '/api/auth/nik?page=:page&pagesize=:pagesize',
            '/api/auth/nik/search?q=:q',
            '/api/auth/staff-puskesmas',
            '/api/auth/staff-puskesmas/:id',
            '/api/auth/staff-puskesmas?page=:page&pagesize=:pagesize',
            '/api/auth/staff-puskesmas/search?q=:q',
            '/api/auth/posyandu',
            '/api/auth/posyandu/:id',
            '/api/auth/posyandu?page=:page&pagesize=:pagesize',
            '/api/auth/posyandu/search?q=:q',
            '/api/auth/staff-posyandu',
            '/api/auth/staff-posyandu/:id',
            '/api/auth/staff-posyandu?page=:page&pagesize=:pagesize',
            '/api/auth/staff-posyandu/search?q=:q',
            '/api/auth/child',
            '/api/auth/child/:id',
            '/api/auth/child?page=:page&pagesize=:pagesize',
            '/api/auth/child/search?q=:q',
            '/api/auth/nik-child',
            '/api/auth/nik-child/:id',
            '/api/auth/nik-child?page=:page&pagesize=:pagesize',
            '/api/auth/nik-child/search?q=:q',
            '/api/auth/med-check-up',
            '/api/auth/med-check-up/:id',
            '/api/auth/med-check-up?page=:page&pagesize=:pagesize',
            '/api/auth/med-check-up/search?q=:q',
            '/api/auth/result-med-check-up',
            '/api/auth/result-med-check-up/:id',
            '/api/auth/result-med-check-up?page=:page&pagesize=:pagesize',
        ]

        const isHandledByThisMiddleware = endpoints.some(endopoint => {
            const pattern = new UrlPattern(endopoint)
            return pattern.match(event.req.url as string)
        })

        if (!isHandledByThisMiddleware) {
            return
        }

        const token = event.req.headers['authorization']?.split(' ')[1]

        const decoded = decodeAccessToken(token as string)

        if (!decoded) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            }))
        }


        try {
            const userId = decoded.id

            const user = await User.getUserById(userId)
            event.context.auth = {user: user}
        } catch (error) {
            return
        }
    } catch (e) {
        return
    }})
