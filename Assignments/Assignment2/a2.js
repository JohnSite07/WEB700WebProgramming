class LegoData {
    constructor() {
        this.sets = []
    }

    initialize() {
        this.setData = require("./data/setData.json");
        this.themeData = require("./data/themeData.json");
    }
    
    getAllSets() {
        this.sets = setData.map(setElement => {
        const themeObject = themeData.find(themeElement => themeElement.id === setElement.theme_id);
        setElement.theme = themeObject ? themeObject.name:"Unknown them";
        return setElement;
})
    }

    getSetByNum(setNum) {
        return this.sets.find(setElement => setElement.set_num === setNum)
    }

    getSetsByTheme(theme) {
        
    }
}