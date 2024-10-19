import { renderFile } from "ejs";
import { createTransport } from "nodemailer";
import path from "path";

class EmailService {
    constructor (){        
        this.transporter = createTransport(
            {
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                }
            }
        )
    }

    async sendMail(receivers = [], subject = '', template, templateParams){        
        await this.transporter.sendMail(
            {
                from: '"Base Admin" <foo@example.com>',
                to: receivers.toString(),
                subject,
                html: await renderFile(path.resolve("./src/views/" + template ), templateParams),
            }
        )
    }
}

export default EmailService