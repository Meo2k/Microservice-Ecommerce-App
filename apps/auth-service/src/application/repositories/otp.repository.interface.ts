import { Otp } from "../../domain/entities/otp.entity.js";

export interface IOtpRepository {
    save(otp: Otp): Promise<void>;
    findByEmail(email: string): Promise<Otp | null>;
    delete(email: string): Promise<void>;
    getCooldownSeconds(email: string): Promise<number>;
    setCooldown(email: string, seconds: number): Promise<void>;
    incrementAttempts(email: string): Promise<number>;
}
