import jwt from 'jsonwebtoken';

const config = useRuntimeConfig()
const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
        expiresIn: '4h',
    })
}

const generateAccessToken = (payload: any) => {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m',
    })
}

export const generateToken = (payload: any) => {
    const refreshToken = generateRefreshToken(payload);
    const accessToken = generateAccessToken(payload);

    return {refreshToken, accessToken};
}

export const decodeAccessToken = (token: string) => {
    try {
        return jwt.verify(token, config.ACCESS_TOKEN_SECRET) as any
    } catch (e) {
        return false
    }
}

export const decodeRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, config.REFRESH_TOKEN_SECRET) as any
    } catch (e) {
        return false
    }
}

export const sendRefreshToken = (event: any, token: string) => {
    setCookie(event, "refresh_token", token, {
        httpOnly: true,
        sameSite: true,
        secure: true
    })
}

export const deleteRefreshToken = (event: any) => {
    deleteCookie(event, 'refresh_token')
}