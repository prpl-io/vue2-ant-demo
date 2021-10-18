module.exports = {
    up: (queryInterface, DataTypes) =>
        queryInterface.createTable(
            'PasswordResets',
            {
                id: {
                    primaryKey: true,
                    type: DataTypes.UUID
                },
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'Users',
                        key: 'id'
                    }
                },
                token: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                expiresAt: {
                    allowNull: false,
                    type: DataTypes.DATE
                },
                createdAt: {
                    allowNull: false,
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.literal('NOW()')
                },
                updatedAt: {
                    allowNull: false,
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.literal('NOW()')
                }
            },
            {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci'
            }
        ),

    down: queryInterface => queryInterface.dropTable('PasswordResets')
};
