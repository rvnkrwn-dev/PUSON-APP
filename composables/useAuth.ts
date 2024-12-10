import {jwtDecode} from "jwt-decode"

export default () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;
    const useAuthToken = () => useState('auth_token')
    const useAuthUser = () => useState('auth_user')
    const isLoggedIn = () => useCookie('isLoggedIn')

    const setToken = (newToken: string) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser: string) => {
        const authUser = useAuthUser()
        authUser.value = newUser
    }

    const login = ({ email, password, ip_address }: {email: string, password: string, ip_address: string}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response: any = await useFetchApi(`/api/auth/login`, {
                    method: 'POST',
                    body: {
                        email,
                        password,
                        ip_address
                    }
                })

                setToken(response?.access_token)
                setUser(response?.data?.user)
                isLoggedIn().value = String(true)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response: any = await useFetchApi(`/api/auth/refresh`, {
                    method: 'POST',
                })
                setToken(response?.access_token)
                resolve(true)
            } catch (error) {
                await logout();
                reject(error)
            }
        })
    }

    const getUser = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response: any = await useFetchApi(`/api/auth/user`)

                setUser(response?.data?.user)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const reRefreshAccessToken = () => {
        const authToken = useAuthToken()

        if (!authToken.value) {
            return
        }

        const jwt = jwtDecode(authToken.value)

        const newRefreshTime = jwt.exp - 60000

        setTimeout(async () => {
            await refreshToken()
            reRefreshAccessToken()
        }, newRefreshTime);
    }

    const initAuth = () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!isLoggedIn().value) return
                await refreshToken()
                await getUser()

                reRefreshAccessToken()

                resolve(true)
            } catch (error) {
                console.log(error)
                reject(error)
            } finally {
                // setIsAuthLoading(false)
            }
        })
    }

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await useFetchApi(`${apiUrl}/auth/logout`, {
                    method: 'POST'
                })

                setToken(null)
                setUser(null)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    return {
        login,
        useAuthUser,
        useAuthToken,
        initAuth,
        logout,
        isLoggedIn
    }
}