class LegoData {
    constructor() {
        // Stores all LEGO sets after processing
        this.sets = [];
        // Stores all Lego themes after processing
        this.themes = [];
    }

    async initialize()  {
        // Loads set and theme data asychronously
        return new Promize((resolve, reject) => {
            try {
                this.setData = require("../data/setData.json"); // Load set data
                this.themeData = require("../data/themeData.json"); // Load theme data
                this.themes = [...this.themeData]; //Set themes array
                resolve(); // Resolces the Promise once data is loaded
            } catch (error) {
                reject(`Failed initialization: ${error.message}`);
            }
        });
    }

    async getAllSets() {
        // Processes set data by matching themes
        return new Promise((resolve, reject) => {
            try {
                this.sets = this.setData.map(setElement => {
                    // Find matching theme for each set
                    const themeObject = this.themeData.find(themeElement => themeElement.id === setElement.theme_id);
                    // Assign theme name or a default placeholder
                    setElement.theme = themeObject ? themeObject.name : "Unknown Theme";
                    return setElement;
                });
                resolve(this.sets); // Returns processed sets
            } catch (error) {
                reject(`Couldn't get all the sets: ${error.message}`);
            }
        });
    }

    async getSetByNum(setNum) {
        // Retrieves a LEGO set by its unique set number
        return new Promise((resolve, reject) => {
            try {
                resolve(this.sets.find(setElement => setElement.set_num === setNum)); // Returns matching set
            } catch (error) {
                reject(`Unable to find requested set: ${error.message}`); // Handle lookup errors
            };
        });
    }

    async getSetsByTheme(theme) {
        // Filters sets by a given theme name (case-insensitive)
        return new Promise((resolve, reject) => {
            try {
                const setByTheme = this.sets.filter(setElement =>
                    setElement.theme.toLowerCase().includes(theme.toLowerCase())
                );
                resolve(setByTheme); // Returns filtered sets
            } catch (error) {
                reject(`Couldn't get sets by theme: ${error.message}`); // Handle filtering errors
            }
        });
    }

    async addSet(newSet) {
        // Adds a new LEGO set to the collection
        return new Promise((resolve, reject) => {
            try {
                // Check if set already exists
                const existingSet = this.sets.find(selElement => setElement.set_num === newSet.set_num);
                if (existingSet) {
                    reject("Set already exists"); // Reject if set number already exists
                } else {
                    //Find the theme name for the new set
                    const themeObject = this.themeData.find(themeElement => themeElement.id === newSet.theme_id);
                    newSet.theme = themeObject ? themeObject.name : "Unknown Theme";

                    // Add the new set to the sets array
                    this.sets.push(newSet);
                    resolve(); // Resolve without data
                }
            } catch (error) {
                reject(`Unable to add the set: ${error.message}`); // Handle addition errors
            }
        });
    }

    async getAllThemes() {
        // Returns all themes
        return new Promise((resolve, reject) => {
            try {
                resolve(this.themes); // Returns the themes array
            } catch (error) {
                reject(`Couldn't get all themes: ${error.message}`);
            }
        });
    }

    async getThemeById(id) {
        // Return a theme by its id
        return new Promise((resolve, reject) => {
            try {
                const foundTheme = this.themes.find(theme => theme.id == id);
                if (foundTheme) {
                    resolve(foundTheme);
                } else {
                    reject("Unable to find requested theme");
                }
            } catch (error) {
                reject(`Unable to find requested theme: ${error.message}`);
            }
        });
    }

    async deleteSetByNum(setNum) {
        // Deletes a set by its set_num
        return new Promise((resolve, reject) => {
            try {
                let foundSetIndex = this.sets.findIndex(set => set.set_num === setNum);
                if (foundSetIndex !== -1) {
                    this.sets.splice(foundSetIndex, 1);
                    resolve();
                } else {
                    reject("Unable to find requested set to delete");
                }
            } catch (error) {
                reject(`Unable to delete the set: ${error.message}`)
            }
        });
    }
}

module.exports = LegoData;