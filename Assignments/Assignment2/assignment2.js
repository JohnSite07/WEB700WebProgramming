/********************************************************************************
* WEB700 – Assignment 02
* * I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* * Name: Sita Jean Luc Mbuya Student ID: 111827242 Date: 24/05/2025
*
********************************************************************************/

class LegoData {
    constructor() {
        this.sets = []; // Initialize an empty array to store Lego sets
    }

    // Method to initialize the data by loading from JSON files and merging them
    initialize() {
        return new Promise((resolve, reject) => {
            try {
                // Load data from JSON files using require()
                // NOTE: require() is synchronous and will throw an error if files are not found or JSON is invalid.
                const setData = require("./data/setData.json");
                const themeData = require("./data/themeData.json");

                // Process each set in setData
                this.sets = setData.map(setElement => {
                    // Find the corresponding theme in themeData
                    const themeObject = themeData.find(themeElement => themeElement.id === setElement.theme_id);
                    
                    // Create a new object for the set, including the theme name
                    // If themeObject is found, add its name; otherwise, theme might be undefined or null
                    return {
                        ...setElement, // Spread existing set properties
                        theme: themeObject ? themeObject.name : "Unknown Theme" // Add the theme name
                    };
                });
                
                // Resolve the promise once initialization is complete
                resolve(); 
            } catch (error) {
                // If any error occurs during file loading or processing, reject the promise
                reject(`Initialization failed: ${error.message}`);
            }
        });
    }

    // Method to get all sets
    getAllSets() {
        return new Promise((resolve, reject) => {
            if (this.sets.length > 0) {
                // Resolve with the array of all sets
                resolve(this.sets);
            } else {
                // Reject if there are no sets (e.g., initialize wasn't called or failed)
                reject("No sets available. Initialize first.");
            }
        });
    }

    // Method to get a specific set by its set_num
    getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            // Find the set with the matching set_num
            const foundSet = this.sets.find(set => set.set_num === setNum);

            if (foundSet) {
                // If found, resolve with the set object
                resolve(foundSet);
            } else {
                // If not found, reject with an error message
                reject(`Unable to find requested set: ${setNum}`);
            }
        });
    }

    // Method to get sets by theme (case-insensitive, partial match)
    getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            // Filter sets whose theme contains the provided theme string (case-insensitive)
            const matchingSets = this.sets.filter(set => 
                set.theme.toLowerCase().includes(theme.toLowerCase())
            );

            if (matchingSets.length > 0) {
                // If matching sets are found, resolve with the array of sets
                resolve(matchingSets);
            } else {
                // If no matching sets are found, reject with an error message
                reject(`Unable to find requested sets for theme: ${theme}`);
            }
        });
    }
}

// --- Test Code ---
// This code must be left in your a2.js file for submission.

let legoCollection = new LegoData();

// Initialize the collection
legoCollection.initialize()
    .then(() => {
        // After successful initialization, proceed to test other methods
        console.log("Initialization successful.\n");

        // Test getAllSets()
        return legoCollection.getAllSets();
    })
    .then(allSets => {
        // NOTE: The assignment expects "Number of Sets: 30" if using the full dataset from the links.
        // My example JSON will result in a different number.
        console.log(`Number of Sets: ${allSets.length}`);
        
        // Test getSetByNum() - using a number that exists in my sample setData.json
        // The assignment asks to test "0012-1"
        return legoCollection.getSetByNum("0012-1"); 
    })
    .then(set => {
        console.log("\nFound set by number (0012-1):");
        console.log(set);

        // Test getSetsByTheme() - using 'tech' for "Technic"
        // The assignment expects "Number of 'tech' sets: 6" with the full dataset.
        // My example JSON will result in 3 "Technic" sets.
        return legoCollection.getSetsByTheme('tech');
    })
    .then(themedSets => {
        console.log(`\nNumber of 'tech' themed sets: ${themedSets.length}`);
        // To see the actual sets: console.log(themedSets);
    })
    .catch(error => {
        // Catch any errors that occurred in the promise chain
        console.error(`Error: ${error}`);
    });

// Example of testing a non-existent set number to see the rejection
legoCollection.initialize()
    .then(() => {
        return legoCollection.getSetByNum("non-existent-set-num-999");
    })
    .then(set => {
        console.log("\nThis should not print if the set doesn't exist:");
        console.log(set);
    })
    .catch(error => {
        console.error(`\nError (as expected for non-existent set): ${error}`);
    });

// Example of testing a non-existent theme to see the rejection
legoCollection.initialize()
    .then(() => {
        return legoCollection.getSetsByTheme("nonexistenttheme");
    })
    .then(themedSets => {
        console.log("\nThis should not print if the theme doesn't exist:");
        console.log(themedSets);
    })
    .catch(error => {
        console.error(`\nError (as expected for non-existent theme): ${error}`);
    });

