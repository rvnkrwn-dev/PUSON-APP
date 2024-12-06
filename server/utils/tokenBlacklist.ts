const tokenBlacklist: string[] = [];

export const addToBlacklist = (token: string) => {
    tokenBlacklist.push(token);
};

export const isBlacklisted = (token: string) => {
    return tokenBlacklist.includes(token);
};
