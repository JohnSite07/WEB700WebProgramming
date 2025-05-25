const setData = require("./data/setData.json");
const themeData = require("./data/themeData.json");

sets = setData.map(setElement => {
    const themeObject = themeData.find(themeElement => themeElement.id === setElement.theme_id);
    setElement.theme = themeObject ? themeObject.name:"Unknown them";
    return setElement;
})

function getSetsByTheme(theme) {
    setsByTheme = sets.filter(
        setsElement => setsElement.theme.toLowerCase().includes(theme.toLowerCase())
    )
    return setsByTheme
}

console.log(getSetsByTheme("Creator"))