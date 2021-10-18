'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate({ User }) {
            Role.belongsToMany(User, {
                as: 'users',
                through: 'Role2User',
                foreignKey: 'roleId',
                otherKey: 'userId'
            });
        }

        static get ADMIN() {
            return 'admin';
        }

        static get USER() {
            return 'user';
        }

        static get ADMIN_ROLES() {
            return [this.ADMIN];
        }

        static get ALL_ROLES() {
            return [this.ADMIN, this.USER];
        }
    }

    Role.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: true
        }
    );

    return Role;
};
