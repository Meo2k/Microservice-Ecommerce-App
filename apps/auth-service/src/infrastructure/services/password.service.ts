import { comparePassword } from "@org/shared";
import { IPasswordService } from "../../application/services/index.js";

export class PasswordService implements IPasswordService {
    async comparePassword(password: string, hash: string): Promise<boolean> {
        return comparePassword(password, hash);
    }
}
