const setData = require("./setData.json")
const themeData = require("./themeData.json")

const sets = setData.map(setElement => {
    const themeObject = themeData.find(
        themeElement => themeElement.id === setElement.theme_id
    )
    setElement.theme = themeObject ? themeObject.name : "Unknown theme"
    return setElement
})

console.log(sets)
