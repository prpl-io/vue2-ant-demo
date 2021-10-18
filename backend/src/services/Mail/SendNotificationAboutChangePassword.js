class SendNotificationAboutChangePassword {
    constructor(emailPublisher) {
        this.emailPublisher = emailPublisher;
    }

    handle(user) {
        this.emailPublisher.publish({
            type: 'PasswordChanged',
            email: user.email,
            firstName: user.firstName
        });
    }
}

module.exports = SendNotificationAboutChangePassword;
