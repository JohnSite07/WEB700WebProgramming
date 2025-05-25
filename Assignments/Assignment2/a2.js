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
        this.sets = [];
    }

    async initialize() {
        return new Promise((resolve, reject) => {
            try {
                this.setData = require("./data/setData.json");
                this.themeData = require("./data/themeData.json");
                resolve();
            } catch (error) {
                reject(`Failed initialization: ${error.message}`);
            }
        });
    }
    
    async getAllSets() {
        return new Promise((resolve, reject) => {
            try {
                this.sets = this.setData.map(setElement => {
                    const themeObject = this.themeData.find(themeElement => themeElement.id === setElement.theme_id);
                    setElement.theme = themeObject ? themeObject.name:"Unknown theme";
                    return setElement;
                });
                resolve(this.sets);
            } catch (error) {
                reject(`Couldn't get all the sets: ${error.message}`);
            }
        });
    }

    async getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            try {
                resolve (this.sets.find(setElement => setElement.set_num === setNum))
            } catch (error) {
                reject(`Unable to find requested set: ${error.message}`)
            }
            
        });
    }

    async getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            try {
                const setsByTheme = this.sets.filter(
                    setsElement => setsElement.theme.toLowerCase().includes(theme.toLowerCase())
                );
                resolve(setsByTheme)  
            } catch (error) {
                reject (`Unable to find the requested set: ${error.message}`);
            } 
        });
    }
}

async function run() {
    let data = new LegoData();

    await data.initialize()
    const allSets = await data.getAllSets()
    console.log(`Number of Sets: ${allSets.length}`)
    const set = await data.getSetByNum("0012-1")
    console.log(set)
    const setByTheme = await data.getSetsByTheme("tech")
    console.log(`Number of 'tech' sets: ${setByTheme.length}`)
}

run()