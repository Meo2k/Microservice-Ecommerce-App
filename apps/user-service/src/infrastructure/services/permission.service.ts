import { getUserPermissions } from "@org/database";
import { IPermissionService } from "../../application/services/index.js";

export class PermissionService implements IPermissionService {
    async getPermissions(userId: number): Promise<bigint> {
        return getUserPermissions(userId);
    }
}
