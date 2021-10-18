module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable(
            'Role2User',
            {
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'Users',
                        key: 'id'
                    },
                    primaryKey: true
                },
                roleId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    onDelete: 'CASCADE',
                    references: {
                        model: 'Roles',
                        key: 'id'
                    },
                    primaryKey: true
                },
                createdAt: {
                    allowNull: false,
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.literal('NOW()')
                }
            },
            {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci'
            }
        );
    },
    down: queryInterface => {
        return queryInterface.dropTable('Role2User');
    }
};
