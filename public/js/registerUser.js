document.addEventListener("DOMContentLoaded", function () {
    // Get the signup form and warning elements by their IDs
    const signupForm = document.getElementById("signupForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    // Add event listener to the signup form to handle form submission
    signupForm.addEventListener("submit", function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get user input values from the form
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Check if password and confirmPassword match
        if (password === confirmPassword) {
            console.log("Signup successful");
            console.log("Username:", username);
            console.log("Email:", email);
            console.log("Password:", password);

            // Hide any previous warning messages
            warningCard.classList.add("d-none");

            // Prepare data object with username, email, and password
            const data = {
                username: username,
                email: email,
                password: password,
            };

            // Define the callback function to handle the API response for user registration
            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                // Check if the registration was successful (status code 200) and a token is received
                if (responseStatus == 200) {
                    if (responseData.token) {
                        // Save the token in the local storage
                        localStorage.setItem("token", responseData.token);

                        // Redirect the user to the profile page after successful registration
                        window.location.href = "profile.html";
                    }
                } else {
                    // Display a warning message if registration fails
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            // Make a POST request to the register API endpoint with the provided data
            fetchMethod(currentUrl + "/api/register", callback, "POST", data);

            // Reset the form after successful submission
            signupForm.reset();
        } else {
            // Display a warning message if passwords do not match
            warningCard.classList.remove("d-none");
            warningText.innerText = "Passwords do not match";
        }
    });
});