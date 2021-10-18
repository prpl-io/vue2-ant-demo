const dayjs = require('dayjs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PasswordReset extends Model {
        static associate({ User }) {
            PasswordReset.belongsTo(User, { as: 'user', foreignKey: 'userId' });
        }

        isExpired() {
            return dayjs(this.expiresAt).isBefore(dayjs());
        }
    }

    PasswordReset.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'User',
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
            }
        },
        {
            sequelize,
            timestamps: true
        }
    );

    return PasswordReset;
};
