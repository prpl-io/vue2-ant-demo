'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role2User extends Model {}

    Role2User.init(
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            roleId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Roles',
                    key: 'id'
                }
            }
        },
        {
            sequelize,
            timestamps: false,
            createdAt: 'timestamp',
            tableName: 'Role2User'
        }
    );

    return Role2User;
};
