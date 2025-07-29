let myJSONStr = `{
    "users": [
        {
            "userId": 1,
            "fName": "Joe",
            "lName": "Smith"
        },
        {
            "userID": 2,
            "fName": "Jeffrey",
            "lName": "Sherman"
        },
        {
            "userID": 3,
            "fName": "Shantell",
            "lName": "McLeod"
        }
    ]
}`;

// Convert to An Object:
let myObj = JSON.parse(myJSONStr);

//Access the 3rd user (Shantell McLeod)
console.log(myObj.users[2].fName)