// Parse the current URL to extract query parameters
url = new URL(document.URL);
const urlParams = url.searchParams;
const user_id = urlParams.get("user_id");

// Execute the code when the DOM has been fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the updateUserForm element
    const updateUserForm = document.getElementById("updateUserForm");

    // Add an event listener to the updateUserForm for form submission
    updateUserForm.addEventListener("submit", function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get values from form inputs for username, email, and password
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Check if either username or email is not undefined
        if (username !== undefined || email !== undefined) {
            // Log a message indicating that the user has been updated
            console.log("User updated");

            // Create a data object with the updated user information
            const data = {
                user_id: user_id,
                username: username,
                email: email,
                password: password
            };

            // Define a callback function to handle the API response after updating the user
            const callback = (responseStatus, responseData) => {
                // Log response status and data for debugging purposes
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                // Check if the response status is 200 (OK)
                if (responseStatus == 200) {
                    // Redirect to the login.html page after successful user update
                    window.location.href = "login.html";
                } else {
                    // If updating fails, display a warning message to the user
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            // Make a PUT request to the users API endpoint to update the user
            fetchMethod(currentUrl + `/api/users/${user_id}`, callback, "PUT", data);

            // Reset the updateUserForm after submission
            updateUserForm.reset();
        }
    });
});