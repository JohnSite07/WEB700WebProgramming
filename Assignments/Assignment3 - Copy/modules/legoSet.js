class LegoData {
    constructor() {
        this.sets = []
    }

    async initialize() {
        return new Promise((resolve, reject) => {
            try {
                this.setData = require("../data/setData.json")
                this.themeData = require("../data/themeData.json")
                resolve()
            } catch (error) {
                reject(`Failed initialization: ${error.message}`)
            }
        })
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