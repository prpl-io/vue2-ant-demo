class LoginHandler {
    constructor(userRepository, bcrypt) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
    }

    async handle(email, password) {
        const user = await this.userRepository.findOne({
            where: {
                email
            },
            attributes: ['id', 'email', 'password']
        });

        if (!user || !user.password) {
            return null;
        }

        const isValid = this.bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return null;
        }

        return this.userRepository.findById(user.id);
    }
}

module.exports = LoginHandler;
