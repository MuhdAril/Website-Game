document.addEventListener("DOMContentLoaded", function () {
    // Define a callback function to handle the API response for fetching user details
    const callback = (responseStatus, responseData) => {
        // Log response status and data for debugging purposes
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get a reference to the HTML element that will display the list of users
        const userList = document.getElementById("userList");

        // Loop through each user in the response data
        responseData.forEach((user) => {
            // Create a new div element to display each user
            const displayItem = document.createElement("div");

            // Set the CSS classes for styling the user display
            displayItem.className = "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";

            // Populate the inner HTML of the display item with user details
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.username}</h5>
                        <p class="card-text">
                            ID: ${user.user_id} <br>
                            Email: ${user.email} <br>
                            Created On: ${user.created_on} <br>
                        </p>
                        <a href="singleUserInfo.html?user_id=${user.user_id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `;

            // Append the display item to the userList container
            userList.appendChild(displayItem);
        });
    };

    // Make a GET request to the users API endpoint to fetch user details
    fetchMethod(currentUrl + "/api/users", callback);
});