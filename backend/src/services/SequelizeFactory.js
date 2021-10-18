'use strict';

const fs = require('fs');
const path = require('path');

class SequelizeFactory {
    static create(Sequelize, config) {
        let sequelize;

        const hooks = {
            beforeUpdate(instance) {
                if ('updatedAt' in instance) {
                    instance.updatedAt = new Date();
                }
            }
        };

        if (config.db.url) {
            sequelize = new Sequelize(config.db.url, { ...config.db, hooks });
        } else {
            sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, { ...config.db, hooks });
        }

        const id = Math.random().toString(36).substring(2);
        console.info(`Sequelize created #ID ${id}`);

        const db = {};
        const modelsPath = path.join(__dirname, '../models');

        fs.readdirSync(modelsPath)
            .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
            .forEach(file => {
                const model = require(path.join(modelsPath, file))(sequelize, Sequelize.DataTypes);
                db[model.name] = model;
            });

        Object.keys(db).forEach(modelName => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

        return db;
    }
}

module.exports = SequelizeFactory;
