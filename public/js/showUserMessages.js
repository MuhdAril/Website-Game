document.addEventListener("DOMContentLoaded", function () {
    // Define a callback function to handle the API response for fetching user messages
    const callback = (responseStatus, responseData) => {
        // Log response status and data for debugging purposes
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get a reference to the HTML element that will display the list of messages
        const messageList = document.getElementById("messageList");

        // Loop through each message in the response data
        responseData.forEach((message) => {
            // Create a new div element to display each message
            const displayItem = document.createElement("div");

            // Set the CSS classes for styling the message display
            displayItem.className = "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3";

            // Populate the inner HTML of the display item with message details
            displayItem.innerHTML = `
                <div class="card border-dark">
                    <div class="card-body">
                        <h4 class="card-title">${message.message_text}</h4>
                        <p class="card-text">
                            ${message.created_at} <br>
                            Message ID: ${message.message_id}
                        </p>
                        <a href="updateMessage.html?message_id=${message.message_id}" class="btn btn-primary">Edit Message</a>
                        <a href="userMessages.html" class="btn btn-danger" id="delete-${message.message_id}">Delete</a>
                    </div>
                </div>
            `;

            // Append the display item to the messageList container
            messageList.appendChild(displayItem);

            // Add an event listener to the delete button for each message
            const deleteButton = document.getElementById(`delete-${message.message_id}`);
            deleteButton.addEventListener("click", (event) => {
                event.preventDefault();

                // Define a callback function for handling the delete request
                const callbackForDelete = (responseStatus, responseData) => {
                    console.log("responseStatus", responseStatus);
                    console.log("responseData", responseData);
                    // Redirect to the userMessages.html page after successful deletion
                    window.location.href = "userMessages.html";
                };

                // Make a DELETE request to the messages API endpoint to delete the message
                fetchMethod(currentUrl + `/api/messages/${message.message_id}`, callbackForDelete, "DELETE");
            });
        });
    };

    // Make a GET request to the user messages API endpoint to fetch message details
    fetchMethod(currentUrl + `/api/messages/token/message`, callback, "GET", null, localStorage.getItem("token"));
});