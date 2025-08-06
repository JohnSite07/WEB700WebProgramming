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
                createdAt: false,
                updatedAt: false
            }
        );
        
        this.Set.belongsTo(this.Theme,{foreignKey:'theme_id'});

        const setData = require("../data/setData");
        const themeData = require("../data/themeData");
    }

    

    async initialize() {
        return new Promise((resolve, reject) => {
            try {
                this.sequelize.sync()
                resolve()
            } catch (error) {
                reject(`${error.message}`)
            }
        });
    }
    
    async getAllSets() {
        // Processes set data by matching themes
        return new Promise((resolve, reject) => {
            try {
                this.Set = this.setData.map(setElement => {
                    // Finds matching theme for each set
                    const themeObject = this.themeData.find(themeElement => themeElement.id === setElement.theme_id);
                    // Assigns theme name or a default placeholder
                    setElement.theme = themeObject ? themeObject.name : "Unknown theme";
                    return setElement;
                });
                resolve(this.sets); // Returns processed sets
            } catch (error) {
                reject(`Couldn't get all the sets: ${error.message}`); // Handles processing errors
            }
        });
    }

    async getSetByNum(setNum) {
        // Retrieves a LEGO set by its unique set number
        return new Promise((resolve, reject) => {
            try {
                resolve(this.sets.find(setElement => setElement.set_num === setNum)); // Returns matching set
            } catch (error) {
                reject(`Unable to find requested set: ${error.message}`); // Handles lookup errors
            };
        });
    }

    async getSetsByTheme(theme) {
        // Filters sets by a given theme name (case-insensitive)
        return new Promise((resolve, reject) => {
            try {
                const setsByTheme = this.sets.filter(setElement => 
                    setElement.theme.toLowerCase().includes(theme.toLowerCase())
                );
                resolve(setsByTheme); // Returns filtered sets
            } catch (error) {
                reject(`Unable to find the requested set: ${error.message}`); // Handles filtering errors
            }
        });
    }

    async addSet(newSet) {
        // Adds a new LEGO set to the collection
        return new Promise((resolve, reject) => {
            try {
                // Check if set already exists
                const existingSet = this.sets.find(setElement => setElement.set_num === newSet.set_num);
                if (existingSet) {
                    reject("Set already exists"); // Reject if set number already exists
                } else {
                    // Find the theme name for the new set
                    const themeObject = this.themeData.find(themeElement => themeElement.id === newSet.theme_id);
                    newSet.theme = themeObject ? themeObject.name : "Unknown theme";
                    
                    // Add the new set to the sets array
                    this.sets.push(newSet);
                    resolve(); // Resolve without data
                }
            } catch (error) {
                reject(`Unable to add the set: ${error.message}`); // Handles addition errors
            }
        });
    }

    async getAllThemes() {
        // Returns all themes
        return new Promise((resolve, reject) => {
            try {
                resolve(this.themes);
            } catch (error) {
                reject(`Couldn't get all the themes: ${error.message}`);
            }
        });
    }

    async getThemeById(id) {
        // Returns a theme by its id
        return new Promise((resolve, reject) => {
            try {
                const foundTheme = this.themes.find(theme => theme.id == id);
                if (foundTheme) {
                    resolve(foundTheme);
                } else {
                    reject("unable to find requested theme");
                }
            } catch (error) {
                reject(`unable to find requested theme: ${error.message}`);
            }
        });
    }

    async deleteSetByNum(setNum) {
        // Deletes a set by its set_num
        return new Promise((resolve, reject) => {
            try {
                let foundSetIndex = this.sets.findIndex(s => s.set_num == setNum);
                if (foundSetIndex !== -1) {
                    this.sets.splice(foundSetIndex, 1);
                    resolve();
                } else {
                    reject("Unable to find the requested set to delete");
                }
            } catch (error) {
                reject(`Unable to delete the set: ${error.message}`);
            }
        });
    }
}

module.exports = LegoData;