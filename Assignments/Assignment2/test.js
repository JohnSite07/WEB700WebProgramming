const setData = require("./data/setData.json");
const themeData = require("./data/themeData.json");

sets = setData.map(setElement => {
    const themeObject = themeData.find(themeElement => themeElement.id === setElement.theme_id)
    setElement.theme = themeObject.name
    return setElement
})

// function getTheme(num) {
//     const theme = themeData.find(thm => thm.id === num);
//     return theme.name
// }


console.log(sets)