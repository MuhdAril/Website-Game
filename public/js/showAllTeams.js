document.addEventListener("DOMContentLoaded", function () {
    // Define a callback function to handle the API response for fetching teams
    const callback = (responseStatus, responseData) => {
        // Log response status and data for debugging purposes
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get a reference to the HTML element that will display the list of teams
        const teamList = document.getElementById("teamList");

        // Loop through each team in the response data
        responseData.forEach((team) => {
            // Create a new div element to display each team
            const displayItem = document.createElement("div");

            // Set the CSS classes for styling the team display
            displayItem.className = "col-xl-4 col-sm-6 col-xs-12 p-3";

            // Populate the inner HTML of the display item with team details
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${team.name}</h5>
                        <p class="card-text">
                            Rank: ${team.ranking}
                        </p>
                        <a href="singleTeamInfo.html?team_id=${team.team_id}" class="btn btn-primary">Expand</a>
                    </div>
                </div>
            `;

            // Append the display item to the teamList container
            teamList.appendChild(displayItem);
        });
    };

    // Make a GET request to the teams API endpoint to fetch teams
    fetchMethod(currentUrl + "/api/teams", callback);
});