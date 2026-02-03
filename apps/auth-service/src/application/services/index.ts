export interface ITokenService {
    signAccess(payload: { sub: number | string }): Promise<string> | string;
    signRefresh(payload: { sub: number | string }): Promise<string> | string;
    verifyAccess(token: string): Promise<any> | any;
    verifyRefresh(token: string): Promise<any> | any;
}

export interface IPasswordService {
    comparePassword(password: string, hash: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}

export interface IPermissionService {
    getPermissions(userId: number): Promise<bigint>;
}
