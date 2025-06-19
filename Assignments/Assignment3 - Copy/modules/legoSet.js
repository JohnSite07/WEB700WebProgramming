const fs = require('fs/promises');
const path = require('path');

class LegoData {
    constructor() {
        // The 'sets' property is initialized in getAllsSets, so it can be removed from here.
    }

    async initialize() {
        try {
            // Construct absolute paths to the data files
            const setDataPath = path.join(__dirname, '..', 'data', 'setData.json');
            const themeDataPath = path.join(__dirname, '..', 'data', 'themeData.json');

            // Read and parse the files
            this.setData = JSON.parse(await fs.readFile(setDataPath, 'utf8'));
            this.themeData = JSON.parse(await fs.readFile(themeDataPath, 'utf8'));
        } catch (error) {
            // The async function will automatically reject the promise on error
            throw new Error(`Failed initialization: ${error.message}`);
        }
    }

    // ... (the rest of your class methods remain the same)
    async getAllsSets() {
        return new Promise((resolve, reject) => {
            try {
                const sets = this.setData.map(setElement => {
                    const themeObject = this.themeData.find(
                        themeElement => themeElement.id === setElement.theme_id
                    )
                    // Create a new object to avoid mutating the original data
                    return {
                        ...setElement,
                        theme: themeObject ? themeObject.name : "Unknown theme"
                    };
                })
                resolve(sets)
            } catch (error) {
                reject(`Couldn't get all the sets: ${error.message}`)
            }
        })
    }

    async getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
             // To ensure you are searching through the processed sets, call getAllsSets first
             // or search through this.setData and add the theme manually.
             // For simplicity, let's assume getAllsSets has been called by the route handler logic.
             // A better implementation would be to have a single source of truth for the processed sets.
            try {
                const allSets = this.getAllsSets(); // This returns a promise
                allSets.then(sets => {
                    const foundSet = sets.find(setElement => setElement.set_num === setNum);
                     if (foundSet) {
                        resolve(foundSet);
                    } else {
                        reject(new Error("Unable to find requested set"));
                    }
                });
            } catch (error) {
                reject(`Unable to find requested set: ${error.message}`)
            }
        })
    }

     async getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            try {
                const allSets = this.getAllsSets(); // This returns a promise
                allSets.then(sets => {
                    const setsByTheme = sets.filter(setElement =>
                        setElement.theme.toLowerCase().includes(theme.toLowerCase())
                    );
                    if (setsByTheme.length > 0) {
                        resolve(setsByTheme);
                    } else {
                        reject(new Error("Unable to find requested sets for that theme"));
                    }
                });
            } catch (error) {
                reject(`Unable to find the requested set: ${error.message}`)
            }
        });
    }
}

module.exports = LegoData;