document.addEventListener("DOMContentLoaded", function () {

    // Define the callback function to handle the API response
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // If the team creation is successful (status code 201), reload the page
        if (responseStatus == 201) {
            window.location.reload();
        } else {
            // If there's an error, display the warning message to the user
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
        }
    };

    // Get the form element and set up an event listener for form submission
    const createTeamForm = document.getElementById("createTeamForm");

    // Get the warning card and warning text elements
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    createTeamForm.addEventListener("submit", function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the value of the team name input field
        const name = document.getElementById("name").value;

        // Create a data object with the team name
        const data = {
            name: name
        };

        // Make a POST request to the API endpoint to create a new team
        fetchMethod(currentUrl + "/api/teams", callback, "POST", data);

        // Reset the form after submission
        createTeamForm.reset();
    });
});