

export interface ITokenService {
    signAccess(payload: object): string;
    signRefresh(payload: object): string;
}