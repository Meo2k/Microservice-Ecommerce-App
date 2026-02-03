const saltRounds = 10;

export const hashPassword = async (password: string) => {
    const bcrypt = await import('bcrypt');
    return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (password: string, hash: string) => {
    const bcrypt = await import('bcrypt');
    return await bcrypt.compare(password, hash);
}