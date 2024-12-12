export const calculateAge = (birthdate: Date): number => {
    const now = new Date();
    const diff = now.getTime() - new Date(birthdate).getTime();
    const age = (diff / (1000 * 60 * 60 * 24 * 365.25));
    return parseFloat(age.toFixed(2));
};
