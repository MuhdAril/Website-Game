// Parse the current URL to extract query parameters
url = new URL(document.URL);
const urlParams = url.searchParams;
const message_id = urlParams.get("message_id");

// Execute the code when the DOM has been fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the editMessageForm element
    const editMessageForm = document.getElementById("editMessageForm");

    // Add an event listener to the editMessageForm for form submission
    editMessageForm.addEventListener("submit", function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the edited message text from the form input
        const message_text = document.getElementById("editMessage").value;

        // Check if the message_text is not undefined
        if (message_text !== undefined) {
            // Log a message indicating that the message has been edited
            console.log("Message edited");

            // Create a data object with the edited message_text
            const data = {
                message_text: message_text
            };

            // Define a callback function to handle the API response after editing the message
            const callback = (responseStatus, responseData) => {
                // Log response status and data for debugging purposes
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                // Check if the response status is 200 (OK)
                if (responseStatus == 200) {
                    // Redirect to the userMessages.html page after successful editing
                    window.location.href = "userMessages.html";
                } else {
                    // If editing fails, display a warning message to the user
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            // Make a PUT request to the messages API endpoint to edit the message
            fetchMethod(currentUrl + `/api/messages/${message_id}`, callback, "PUT", data);

            // Reset the editMessageForm after submission
            editMessageForm.reset();
        }
    });
});