document.addEventListener("DOMContentLoaded", function () {
    // Define a callback function to handle the API response for fetching rankings
    const callback = (responseStatus, responseData) => {
        // Log response status and data for debugging purposes
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get a reference to the HTML element that will display the list of rankings
        const rankingList = document.getElementById("rankingList");

        // Loop through each ranking in the response data
        responseData.forEach((rankings) => {
            // Create a new div element to display each ranking
            const displayItem = document.createElement("div");

            // Set the CSS classes for styling the ranking display
            displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";

            // Populate the inner HTML of the display item with ranking details
            displayItem.innerHTML = `
                <div class="card">
                    <img src="../images/${rankings.rank_id}.png" class="card-img-top img-fluid p-3" alt="Rank Image"><!-- images downloaded from https://emoji.gg/pack/1774-every-valorant-rank# -->
                    <div class="card-body">
                        <h5 class="card-title fw-bold text-center">${rankings.ranking}</h5>
                        <p class="card-text text-center">
                            Min points<br>${rankings.min_points}
                        </p>
                    </div>
                </div>
            `;

            // Append the display item to the rankingList container
            rankingList.appendChild(displayItem);
        });
    };

    // Make a GET request to the rankings API endpoint to fetch ranking details
    fetchMethod(currentUrl + "/api/rankings", callback);
});