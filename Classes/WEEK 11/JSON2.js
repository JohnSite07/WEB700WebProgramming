let myJSONStr = {
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
};

// Convert to An Object:
let myJSON = JSON.stringify(myJSONStr);

//Access the 3rd user (Shantell McLeod)
console.log(myJSON)