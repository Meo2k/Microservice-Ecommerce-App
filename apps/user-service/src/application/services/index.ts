export interface IPermissionService {
    getPermissions(userId: number): Promise<bigint>;
}
