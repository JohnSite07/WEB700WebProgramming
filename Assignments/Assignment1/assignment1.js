
// Name: Sita Jean Luc Mbuya
// Student ID: 111807242 
// Date: May 14, 2025

// WEB700 – Assignment 1
// I declare that this assignment is my own work in accordance with Seneca's
// Academic Integrity Policy


// Step 3: Creating the "Server" Arrays
const serverMethods = ["GET", "GET", "GET", "POST", "GET", "POST"];
const serverRoutes = ["/", "/store", "/store-admin", "/register", "/developer", "/login"];
const serverResponses = [
    "Home", 
    "Main Storefront", 
    "Manage Products", 
    "Registered New User",
    "Developed by: Sita Jean Luc Mbuya: sjlmbuya@myseneca.ca", 
    "User Logged In"
];

// Step 4: Creating the "web server simulator" Function - "processRequest"
function processRequest(method, route) {
    // Loop through the serverRoutes array to find a match
    for (let i = 0; i < serverRoutes.length; i++) {
        // Check if the current method and route in the arrays match the input parameters
        if (serverMethods[i] === method && serverRoutes[i] === route) {
            // If both method and route match at the same index, return the corresponding response with status 200
            return `200: ${serverResponses[i]}`;
        }
    }
    // If no match is found after checking all combinations, return a 404 error message
    return `404: Unable to process ${method} request for ${route}`;
}

// Step 5: Manually Testing the "processRequest" Function
console.log("--- Manual Tests ---");
console.log(processRequest("GET", "/")); 
console.log(processRequest("GET", "/store")); 
console.log(processRequest("GET", "/store-admin")); 
console.log(processRequest("POST", "/register")); 
console.log(processRequest("GET", "/developer")); 
console.log(processRequest("POST", "/login")); 

// Test a non-matching combination (404 error)
console.log(processRequest("POST", "/"));
console.log(processRequest("GET", "/register")); 
console.log(processRequest("PUT", "/")); 
console.log("--- End of Manual Tests ---\n");


// Step 6: Automating the Tests by creating a "testRequests" Function

// Function to generate a random integer
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function testRequests() {
    // Define the testMethods and testRoutes arrays as specified
    const testMethods = ["GET", "POST"];
    const testRoutes = ["/", "/store", "/store-admin", "/register", "/developer", "/login", "/notFound1", "/notFound2"];

    // Define the randomRequest function
    function randomRequest() {
        // Get a random method from testMethods
        const randMethodIndex = getRandomInt(testMethods.length);
        const randMethod = testMethods[randMethodIndex];

        // Get a random route from testRoutes
        const randRouteIndex = getRandomInt(testRoutes.length);
        const randRoute = testRoutes[randRouteIndex];
        
        // Invoke processRequest with the random values and log the result
        console.log(processRequest(randMethod, randRoute));
    }

    // Use setInterval to execute randomRequest every 1 second (1000 milliseconds)
    setInterval(randomRequest, 1000);
}

// Step 7: Invoke the "testRequests" function 
testRequests();