class ResetPasswordService {
    constructor(passwordResetRepository) {
        this.passwordResetRepository = passwordResetRepository;
    }

    async isTokenValid(token) {
        const passwordReset = await this.passwordResetRepository.findByToken(
            token
        );

        return passwordReset && !passwordReset.isExpired();
    }

    async reset(token, password) {
        const passwordReset = await this.passwordResetRepository.findByToken(
            token
        );

        const user = await passwordReset.getUser();

        if (!user) {
            return false;
        }

        await user.update({
            password
        });

        await passwordReset.update({
            expiresAt: new Date()
        });

        return true;
    }
}

module.exports = ResetPasswordService;
