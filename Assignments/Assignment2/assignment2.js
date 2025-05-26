class LegoData {
    constructor() {
        // Stores all LEGO sets after processing
        this.sets = [];
    }

    async initialize() {
        // Loads set and theme data asynchronously
        return new Promise((resolve, reject) => {
            try {
                this.setData = require("./data/setData.json"); // Load set data
                this.themeData = require("./data/themeData.json"); // Load theme data
                resolve(); // Resolves the Promise once data is loaded
            } catch (error) {
                reject(`Failed initialization: ${error.message}`); // Handles loading errors
            }
        });
    }
    
    async getAllSets() {
        // Processes set data by matching themes
        return new Promise((resolve, reject) => {
            try {
                this.sets = this.setData.map(setElement => {
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
            }
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
}

// Asynchronous execution function
async function run() {
    let data = new LegoData();

    await data.initialize(); // Ensures data is loaded before further operations
    const allSets = await data.getAllSets(); // Retrieves all sets after initialization
    console.log(`Number of Sets: ${allSets.length}`); // Logs total number of sets

    const set = await data.getSetByNum("0012-1"); // Retrieves a specific set
    console.log(set); // Logs set details

    const setByTheme = await data.getSetsByTheme("tech"); // Filters sets by theme
    console.log(`Number of 'tech' sets: ${setByTheme.length}`); // Logs filtered set count
}

run(); // Executes the program asynchronously