export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useCookie('isLoggedIn').value;
    const isAuthPage = to.path === '/auth/login' || to.path === '/auth/register';

    if (isAuthPage && isAuthenticated) {
        return navigateTo('/')
    }

    if (!isAuthPage && !isAuthenticated) {
        return navigateTo('/auth/login')
    }
});