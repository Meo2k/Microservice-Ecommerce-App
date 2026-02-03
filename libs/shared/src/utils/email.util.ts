import { ENV } from '../config/env.config';
import path from "path";

const renderEmailTemplate = async (templateName: string, data: Record<string, any>) => {
    const ejs = await import("ejs");
    const templatePath = path.join(
        process.cwd(),
        "libs/shared/src/templates/emails",
        `${templateName}.ejs`
    )

    return ejs.renderFile(templatePath, data)
}

let transporter: any;

const getTransporter = async () => {
    if (!transporter) {
        const nodemailer = (await import("nodemailer")).default;
        transporter = nodemailer.createTransport({
            host: ENV.EMAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: ENV.EMAIL_USER,
                pass: ENV.EMAIL_PASS,
            },
        });
    }
    return transporter;
}

export const sendEmail = async (to: string, subject: string, text: string, templateName: string, data: Record<string, any>) => {
    const html = await renderEmailTemplate(templateName, data)
    const transport = await getTransporter();
    await transport.sendMail({
        from: ENV.EMAIL_USER,
        to,
        subject,
        text,
        html
    });
}