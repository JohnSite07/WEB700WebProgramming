require('dotenv').config();
require('pg');
const Sequelize = require('sequelize')

class LegoData {
    constructor() {
        this.sequelize = new Sequelize(
            process.env.PGDATABASE,
            process.env.PGUSER,
            process.env.PGPASSWORD,
            {
                host: process.env.PGHOST,
                dialect: 'postgres',
                port: 5432,
                dialectOptions: {
                    ssl: { rejectUnauthorized: false },
                },
            }
        );

        this.Theme = this.sequelize.define(
            'Theme',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: Sequelize.STRING
            },
            {
                tableName: 'Themes',
                createdAt: false,
                updatedAt: false
            }
        );

        this.Set = this.sequelize.define(
            'Set',
            {
                set_num: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                name: Sequelize.STRING,
                year: Sequelize.INTEGER,
                num_parts: Sequelize.INTEGER,
                theme_id: Sequelize.INTEGER,
                img_url: Sequelize.STRING
            },
            {
                tableName: 'Sets',
                createdAt: false,
                updatedAt: false
            }
        );
        
        this.Set.belongsTo(this.Theme, { foreignKey: 'theme_id' });
        this.Theme.hasMany(this.Set, { foreignKey: 'theme_id' });
    }

    

    async initialize() {
        return new Promise((resolve, reject) => {
            try {
                this.sequelize.sync()
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } catch (error) {
                reject(`${error.message}`);
            }
        });
    }
    
    async getAllSets() {
        return new Promise((resolve, reject) => {
            try {
                this.Set.findAll({
                    include: [this.Theme]
                })
                .then(sets => {
                    resolve(sets);
                })
                .catch(err => {
                    reject(`Couldn't get all the sets: ${err.message}`);
                });
            } catch (error) {
                reject(`Couldn't get all the sets: ${error.message}`);
            }
        });
    }

    async getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            try {
                this.Set.findAll({
                    where: { set_num: setNum },
                    include: [this.Theme]
                })
                .then(sets => {
                    if (sets.length > 0) {
                        resolve(sets[0]);
                    } else {
                        reject("Unable to find requested set");
                    }
                })
                .catch(err => {
                    reject(`Unable to find requested set: ${err.message}`);
                });
            } catch (error) {
                reject(`Unable to find requested set: ${error.message}`);
            }
        });
    }

    async getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            try {
                this.Set.findAll({
                    include: [this.Theme],
                    where: {
                        '$Theme.name$': {
                            [Sequelize.Op.iLike]: `%${theme}%`
                        }
                    }
                })
                .then(sets => {
                    if (sets.length > 0) {
                        resolve(sets);
                    } else {
                        reject("Unable to find requested sets");
                    }
                })
                .catch(err => {
                    reject(`Unable to find requested sets: ${err.message}`);
                });
            } catch (error) {
                reject(`Unable to find requested sets: ${error.message}`);
            }
        });
    }

    async addSet(newSet) {
        return new Promise((resolve, reject) => {
            try {
                this.Set.create(newSet)
                    .then(() => {
                        resolve();
                    })
                    .catch(err => {
                        reject(err.errors[0].message);
                    });
            } catch (error) {
                reject(`Unable to add the set: ${error.message}`);
            }
        });
    }

    async getAllThemes() {
        return new Promise((resolve, reject) => {
            try {
                this.Theme.findAll()
                    .then(themes => {
                        resolve(themes);
                    })
                    .catch(err => {
                        reject(`Couldn't get all the themes: ${err.message}`);
                    });
            } catch (error) {
                reject(`Couldn't get all the themes: ${error.message}`);
            }
        });
    }



    async deleteSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            try {
                this.Set.destroy({
                    where: { set_num: setNum }
                })
                    .then((deletedCount) => {
                        if (deletedCount > 0) {
                            resolve();
                        } else {
                            reject("Unable to find the requested set to delete");
                        }
                    })
                    .catch(err => {
                        reject(err.errors[0].message);
                    });
            } catch (error) {
                reject(`Unable to delete the set: ${error.message}`);
            }
        });
    }
}

module.exports = LegoData;