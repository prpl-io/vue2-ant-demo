module.exports = {
    up: (queryInterface, DataTypes) =>
        queryInterface.createTable(
            'Tasks',
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
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                completedAt: {
                    type: DataTypes.DATE,
                    allowNull: true
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
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true
                }
            },
            {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci'
            }
        ),

    down: queryInterface => queryInterface.dropTable('Tasks')
};
