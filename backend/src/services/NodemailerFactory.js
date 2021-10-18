class NodemailerFactory {
    static create(nodemailer, hbs, configEmail, path) {
        const mailer = nodemailer.createTransport(configEmail);

        mailer.use(
            'compile',
            hbs({
                viewEngine: {
                    layoutsDir: path.resolve(__dirname, '../templates/mail'),
                    partialsDir: 'partials/',
                    defaultLayout: 'base'
                },
                viewPath: path.resolve(__dirname, '../templates/mail')
            })
        );

        return mailer;
    }
}

module.exports = NodemailerFactory;
