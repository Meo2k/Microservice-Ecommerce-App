export interface ITokenService {
    signAccess(payload: { sub: number | string }): string;
    signRefresh(payload: { sub: number | string }): string;
    verifyAccess(token: string): any;
    verifyRefresh(token: string): any;
}

export interface IPasswordService {
    comparePassword(password: string, hash: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}

export interface IPermissionService {
    getPermissions(userId: number): Promise<bigint>;
}

