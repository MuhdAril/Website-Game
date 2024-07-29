document.addEventListener("DOMContentLoaded", function () {
    // Extract user_id from the URL parameters
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");

    // Define the callback function to handle the API response for user information
    const callbackForUserInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get the element to display user information
        const userInfo = document.getElementById("userInfo");

        // If the user information request fails, display an error message
        if (responseStatus == 404) {
            userInfo.innerHTML = `${responseData.message}`;
            return;
        }

        // Display the user information in a card
        userInfo.innerHTML = `
          <div class="card mx-auto col-xl-4 col-md-6 col-xs-12">
              <div class="card-body">
                <h4 class="card-title fw-bold text-center">${responseData.username}</h4>
                  <p class="card-text">
                      ID: ${responseData.user_id} <br>
                      Email: ${responseData.email} <br>
                      Team: ${responseData.team} <br>
                      Level: ${responseData.level} <br>
                      Created On: ${responseData.created_on} <br>
                  </p>
              </div>
          </div>
      `;
    };

    // Make a GET request to the API endpoint to fetch user information
    fetchMethod(currentUrl + `/api/users/${user_id}`, callbackForUserInfo);
});

// Execute this code when the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Extract user_id from the URL parameters
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");

    // Define the callback function to handle the API response for user's team information
    const callbackForUserTeam = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get the element to display user's team information
        const userInfo = document.getElementById("teamInfo");

        // If the user's team information request fails, display an error message
        if (responseStatus == 404) {
            userInfo.innerHTML = `
            <div class="card mx-auto col-xl-4 col-md-6 col-xs-12">
              <div class="card-body">
                <h5 class="card-text text-center">
                    ${responseData.message}
                </h5>
              </div>
            </div>
            `;
            return;
        }

        // Display the user's team information in a card
        userInfo.innerHTML = `
            <div class="card mx-auto col-xl-4 col-md-6 col-xs-12">
                <div class="card-body">
                    <h4 class="card-title fw-bold text-center">${responseData.team_name}</h4>
                    <p class="card-text">
                      ID: ${responseData.team_id} <br>
                      Rank: ${responseData.ranking} <br>
                      Points: ${responseData.total_points} <br>
                      Members: ${responseData.members} <br>
                    </p>
                </div>
            </div>
      `;
    };

    // Make a GET request to the API endpoint to fetch user's team information
    fetchMethod(currentUrl + `/api/teams/${user_id}`, callbackForUserTeam);
});