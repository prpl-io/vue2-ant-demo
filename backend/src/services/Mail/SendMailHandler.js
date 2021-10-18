const path = require('path');
const MailFactory = require('../Mail/Factory');

class SendMailHandler {
    constructor(config, nodemailer) {
        this.config = config;
        this.nodemailer = nodemailer;
    }

    async handle(options) {
        const { type: mailType } = options;

        if (!mailType) {
            return;
        }

        options.appUrl = this.config.app.frontendUrl;

        try {
            const mail = MailFactory.create(mailType, options);

            const mailOptions = {
                ...mail,
                attachments: [
                    {
                        filename: 'purple_logo.png',
                        path: path.resolve(
                            __dirname,
                            '../../../public/images/purple_logo.png'
                        ),
                        cid: 'purpleLogo'
                    }
                ]
            };

            await this.nodemailer.sendMail(mailOptions);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = SendMailHandler;
