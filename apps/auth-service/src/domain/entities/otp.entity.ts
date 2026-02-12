import { ErrorCodes, ErrorMessages, Result } from "@org/shared/server";

export class Otp {
    constructor(
        public readonly email: string,
        public readonly code: string,
        public readonly expiresAt: Date,
        private _attempts: number = 0,
        private _isLocked: boolean = false
    ) { }

    get attempts() { return this._attempts; }
    get isLocked() { return this._isLocked; }

    static create(email: string): Otp {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        return new Otp(email, code, expiresAt);
    }

    validateGeneral(): Result<any> {
        if (this._isLocked) {
            return Result.fail({ code: ErrorCodes.ERR_BAD_REQUEST, message: ErrorMessages.Otp.OtpLocked });
        }
        if (new Date() > this.expiresAt) {
            return Result.fail({ code: ErrorCodes.ERR_BAD_REQUEST, message: ErrorMessages.Otp.OtpInvalid });
        }
        return Result.ok();
    }

    syncAttempts(currentAttempts: number, maxAttempts: number): void {
        this._attempts = currentAttempts;
        if (this._attempts >= maxAttempts) {
            this._isLocked = true;
        }
    }
}
