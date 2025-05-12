// Declaring the serverMethods, serverRoutes and serverResponses arrays
const serverMethods = ["GET", "GET", "GET", "POST", "GET", "POST"]
const serverRoutes = ["/", "/store", "/store-admin", "/register", "/developer", "/login"]
const serverResponses = [
    "Home", "Main Storefront", "Manage Products", "Registed New User",
    "Developed by: Sita Jean Luc Mbuya: sjlmbuya@myseneca.ca", "User Logged In"
]

function processRequest(method, route) {
    for (let i = 0; i < serverRoutes.length; i++) {     // looping through the serverRoutes array
        var routeIndex = serverRoutes.indexOf(route);   // Get the index of the route
    }
    if (serverMethods[routeIndex] === method) {     // Check if the method match with the one in the serverMethods array
        console.log(`200: ${serverResponses[routeIndex]}`)  // Output the corresponding repsonse
    } else {
        console.log(`404: Unable to process ${method} request for ${route}`)    // Output the client error message if the there is no conrespondance between the method and the route
    }

}

//Testing the function
processRequest("GET", "/");
processRequest("GET", "/developer");

// Test error code
processRequest("POST", "/");