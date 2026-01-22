
export interface IEmailRepository {
    sendOtpToEmail(to: string, templateName: string): Promise<void>;
   
}