import UrlPattern from "url-pattern"
import { sendError } from "h3"
import {decodeAccessToken} from "~/server/utils/jwt";
import {User} from "~/server/model/User";

export default defineEventHandler(async (event) => {
    const endpoints = [
        '/api/auth/user',
        '/api/auth/logs',
        '/api/auth/refresh',
    ]

    const isHandledByThisMiddleware = endpoints.some(endopoint => {
        const pattern = new UrlPattern(endopoint)
        return pattern.match(event.req.url)
    })

    if (!isHandledByThisMiddleware) {
        return
    }

    const token = event.req.headers['authorization']?.split(' ')[1]

    const decoded = decodeAccessToken(token)

    if (!decoded) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        }))
    }


    try {
        const userId = decoded.id

        const user = await User.getUserById(userId)

        event.context.auth = { user }
    } catch (error) {
        return
    }

})