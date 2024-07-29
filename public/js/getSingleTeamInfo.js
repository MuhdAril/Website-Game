document.addEventListener("DOMContentLoaded", function () {
  // Extract team_id and token from the URL parameters and local storage
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const team_id = urlParams.get("team_id");
  const token = localStorage.getItem("token");

  // Get the warning card and warning text elements
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  // Define the callback function to handle the API response for team information
  const callbackForTeamInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // Get the element to display team information
    const singleTeamInfo = document.getElementById("singleTeamInfo");

    // If the team information request fails, display an error message
    if (responseStatus != 200) {
      singleTeamInfo.innerHTML = `${responseData.message}`;
      return;
    }

    // Display the team information in a card
    singleTeamInfo.innerHTML = `
      <div class="card mx-auto col-lg-6 col-md-8 col-sm-12">
          <div class="card-body">
              <p class="card-text">
                  ID:  ${responseData.team_id} <br>
                  Name: ${responseData.team_name} <br>
                  Rank: ${responseData.ranking} <br>
                  Points: ${responseData.total_points} <br>
                  Members: ${responseData.members} <br>
              </p>
              <button type="button" class="btn btn-primary btn-block" id="submit">Join</button>
          </div>
      </div>
    `;

    // Define the callback function to handle the API response for joining a team
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      // If joining the team is successful (status code 201), reload the page
      if (responseStatus === 201) {
        window.location.reload();
      } else {
        // If there's an error, display the warning message to the user
        console.log("Joining team failed");
        const errorMessage = responseData.message;
        warningCard.classList.remove("d-none");
        warningText.innerText = errorMessage;
      }
    };

    // Get the join button element
    const joinButton = document.getElementById("submit");

    // Add an event listener for the join button click
    joinButton.addEventListener("click", function (event) {
      console.log("joinButton.addEventListener");
      event.preventDefault();

      // Check if the user is logged in
      if (token != null) {
        const team_id = responseData.team_id;
        const data = {
          team_id: team_id
        };

        // Make a POST request to the API endpoint to join the team
        fetchMethod(currentUrl + "/api/teamparticipants", callback, "POST", data, localStorage.getItem("token"));
      } else {
        // If the user is not logged in, display a warning message
        console.log("User not logged in");
        warningCard.classList.remove("d-none");
        warningText.innerText = "Login to join a team";
      }
    });
  };

  // Make a GET request to the API endpoint to fetch team information
  fetchMethod(currentUrl + `/api/teams/${team_id}`, callbackForTeamInfo);
});