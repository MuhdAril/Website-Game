document.addEventListener("DOMContentLoaded", function () {
    // Get references to HTML elements by their IDs
    const messageForm = document.getElementById("messageForm");
    const token = localStorage.getItem("token");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const submitBtn = document.getElementById("submitBtn");
    const userMessageBtn = document.getElementById("userMessageBtn");

    // Check if a valid token is present in the local storage (user is logged in)
    if (token != null) {
        // Add event listener to the message form to handle form submission
        messageForm.addEventListener("submit", function (event) {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Get the user-entered message text from the form
            const message_text = document.getElementById("message_text").value;
            console.log("Message sent");

            // Prepare data object with the message text
            const data = {
                message_text: message_text
            }

            // Define the callback function to handle the API response for sending messages
            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                // Check if the message was successfully sent (status code 201)
                if (responseStatus == 201) {
                    // Redirect the user to the forum page after sending the message
                    window.location.href = "forum.html";
                } else {
                    // Display a warning message if sending the message fails
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            // Make a POST request to the messages API endpoint with the provided data and token
            fetchMethod(currentUrl + "/api/messages", callback, "POST", data, localStorage.getItem("token"));

            // Reset the form after successfully sending the message
            messageForm.reset();
        });
    } else {
        // Display a warning message for users not logged in
        warningCard.classList.remove("d-none");
        warningText.innerText = "Login or Register to send messages";

        // Hide the submit button and userMessageBtn when user is not logged in
        submitBtn.classList.add("d-none");
        userMessageBtn.classList.add("d-none");
    }
});