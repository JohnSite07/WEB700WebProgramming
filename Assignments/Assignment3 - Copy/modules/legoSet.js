const fs = require('fs/promises');
const path = require('path');

class LegoData {
    constructor() {
        this.sets = []
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

    async getAllsSets() {
        return new Promise((resolve, reject) => {
            try {
                this.sets = this.setData.map(setElement => {
                    const themeObject = this.themeData.find(
                        themeElement => themeElement.id === setElement.theme_id
                    )
                    setElement.theme = themeObject ? themeObject.name : "Unknown theme"
                    return setElement
                })
                resolve(this.sets)
            } catch (error) {
                reject(`Couldn't get all the sets: ${error.message}`)
            }
        })
    }

    async getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.sets.find(
                    setElement => setElement.set_num === setNum
                ))
            } catch (error) {
                reject(`Unable to find requested set: ${error.message}`)
            }
        })
    }

    async getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            try {
                const setsByTheme = this.sets.filter(setElement =>
                    setElement.theme.toLowerCase().includes(theme.toLowerCase())
                )
                resolve(setsByTheme);
            } catch (error) {
                reject(`Unable to find the requested set: ${error.message}`)
            }
        });
    }
}

module.exports = LegoData