'use strict';
const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const { Role } = sequelize.models;

    class User extends Model {
        async isAdmin() {
            const roles = await this.getRoles();

            return this._hasRole(roles, Role.ADMIN);
        }

        async isUser() {
            const roles = await this.getRoles();

            return this._hasRole(roles, Role.USER);
        }

        async getRolesInfo() {
            const roles = await this.getRoles();

            return {
                roles: roles.map(role => role.name),
                isAdmin: this._hasRole(roles, Role.ADMIN),
                isUser: this._hasRole(roles, Role.USER)
            };
        }

        _hasRole(roles, roleName) {
            return roles.some(role => role.name.toLowerCase() === roleName);
        }

        static associate({ Role, Role2User, PasswordReset, Task }) {
            User.belongsToMany(Role, {
                as: 'roles',
                through: 'Role2User',
                foreignKey: 'userId',
                otherKey: 'roleId',
                onDelete: 'cascade'
            });
            User.hasMany(Role2User, {
                as: 'role2User',
                foreignKey: 'userId'
            });
            User.hasMany(PasswordReset, {
                as: 'passwordReset',
                foreignKey: 'userId'
            });
            User.hasMany(Task, {
                as: 'tasks',
                foreignKey: 'userId'
            });
        }

        static get DISPLAYABLE_FIELDS() {
            return [
                'id',
                'firstName',
                'lastName',
                'email',
                'createdAt',
                'updatedAt',
                'deletedAt'
            ];
        }

        static get FILTERABLE_FIELDS() {
            return [
                'firstName',
                'lastName',
                'email',
                'createdAt',
                'updatedAt',
                'deletedAt'
            ];
        }

        static get SEARCHABLE_FIELDS() {
            return ['firstName', 'lastName', 'email'];
        }
    }

    User.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fullName: {
                type: DataTypes.VIRTUAL,
                get() {
                    if (!this.firstName && !this.lastName) {
                        return null;
                    }

                    return `${this.firstName || ''} ${this.lastName || ''}`;
                }
            }
        },
        {
            sequelize,
            paranoid: true,
            timestamps: true,
            defaultScope: {
                attributes: {
                    exclude: ['password']
                }
            },
            scopes: {
                withAssociations: {
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            association: 'roles',
                            through: {
                                attributes: []
                            }
                        }
                    ]
                }
            },
            hooks: {
                beforeSave: (user, options) => {
                    if (options.fields.includes('password')) {
                        if (!user.password) {
                            return;
                        }

                        user.password = bcrypt.hashSync(user.password, 8);
                    }
                }
            }
        }
    );

    return User;
};
