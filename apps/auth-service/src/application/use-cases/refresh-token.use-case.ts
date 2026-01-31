import { Result } from "@org/shared";
import { ITokenService } from "../services/index.js";


export class RefreshTokenUseCase {
    constructor(private readonly tokenService: ITokenService) { }

    async execute(userId: string): Promise<Result<{ accessToken: string }>> {
        const accessToken = this.tokenService.signAccess({ sub: userId });

        return Result.ok({ accessToken });
    }
}

