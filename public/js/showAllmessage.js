document.addEventListener("DOMContentLoaded", function () {
    // Define the callback function to handle the API response for fetching messages
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
            displayItem.className =
                "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3";

            // Populate the inner HTML of the display item with message details
            displayItem.innerHTML = `
                <div class="card border-dark">
                    <div class="card-body">
                        <h4 class="card-title">${message.message_text}</h4>
                        <p class="card-text">
                            ${message.username} <br>
                            ${message.created_at}
                        </p>
                    </div>
                </div>
            `;

            // Append the display item to the messageList container
            messageList.appendChild(displayItem);
        });
    };

    // Make a GET request to the messages API endpoint to fetch messages
    fetchMethod(currentUrl + "/api/messages", callback);
});