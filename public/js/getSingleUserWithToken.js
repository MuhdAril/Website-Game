document.addEventListener("DOMContentLoaded", function () {
  // Define the callback function to handle the API response for user information
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // Get the element to display user information and errors
    const userInfo = document.getElementById("userInfo");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    // If the user information request fails, display an error message. In this page, the only reason status is not 200 is due to token timeout
    if (responseStatus != 200) {
      warningCard.classList.remove("d-none");
      warningText.innerText = "Session timed out. Log out and log back in to continue";
      return;
    }

    // Display the user information in a card with update and delete buttons
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
                <a href="updateUser.html?user_id=${responseData.user_id}" class="btn btn-primary">Update details</a>
                <a class="btn btn-danger" id="delete-${responseData.user_id}">Delete</a>
            </div>
        </div>
      `;

    // Get references to various buttons in the UI
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const profileButton = document.getElementById("profileButton");
    const logoutButton = document.getElementById("logoutButton");

    // Retrieve the user's token from local storage
    const token = localStorage.getItem("token");

    // Check if a token exists (user is logged in)
    if (token) {
      // Hide login and register buttons, show profile and logout buttons
      loginButton.classList.add("d-none");
      registerButton.classList.add("d-none");
      profileButton.classList.remove("d-none");
      logoutButton.classList.remove("d-none");
    } else {
      // Show login and register buttons, hide profile and logout buttons
      loginButton.classList.remove("d-none");
      registerButton.classList.remove("d-none");
      profileButton.classList.add("d-none");
      logoutButton.classList.add("d-none");
    }

    // Add event listener to the delete button to handle deletion
    const deleteButton = document.getElementById(`delete-${responseData.user_id}`);
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const callbackForDelete = (responseStatus, responseData) => {
        console.log("responseStatus", responseStatus);
        console.log("responseData", responseData);
        localStorage.removeItem("token");
        window.location.href = "index.html";
      };
      // Make a DELETE request to delete the user
      fetchMethod(currentUrl + `/api/users/${responseData.user_id}`, callbackForDelete, "DELETE");
    });
  };

  // Make a GET request to the API endpoint to fetch user information using the token
  fetchMethod(currentUrl + `/api/users/token/user`, callback, "GET", null, localStorage.getItem("token"));
});

// Execute this code when the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Define the callback function to handle the API response for user's team information
  const callbackForUserTeam = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // Get the element to display user's team information
    const userInfo = document.getElementById("teamInfo");

    // If the user's team information request fails, display an error message with a button to view all teams
    if (responseStatus != 200) {
      userInfo.innerHTML = `
          <div class="container">
          <div class="row">
            <div class="card mx-auto col-xl-4 col-md-6 col-xs-12">
              <div class="card-body">
                <h5 class="card-text text-center">
                  ${responseData.message}
                </h5>
              </div>
            </div>
          </div>
        
          <div class="row mt-3">
            <a href="teams.html" class="btn btn-primary col-xl-4 col-md-6 col-xs-12 mx-auto">View all Teams</a>
          </div>
        </div>
        `;
      return;
    } else {
      // Display the user's team information in a card with a leave button
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
                <a href="profile.html" class="btn btn-danger" id="leave">Leave</a>
            </div>
        </div>
        `;

      // Add event listener to the leave button to handle leaving the team
      const leaveButton = document.getElementById(`leave`);
      leaveButton.addEventListener("click", (event) => {
        event.preventDefault();
        const callbackForLeave = (responseStatus, responseData) => {
          console.log("responseStatus", responseStatus);
          console.log("responseData", responseData);
          window.location.href = "profile.html";
        };
        // Make a DELETE request to leave the team
        fetchMethod(currentUrl + `/api/teamparticipants/token/teamparticipant`, callbackForLeave, "DELETE", null, localStorage.getItem("token"));
      });
    }
  };

  // Make a GET request to the API endpoint to fetch user's team information using the token
  fetchMethod(currentUrl + `/api/teams/token/team`, callbackForUserTeam, "GET", null, localStorage.getItem("token"));
});