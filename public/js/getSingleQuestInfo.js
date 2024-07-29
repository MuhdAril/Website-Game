document.addEventListener("DOMContentLoaded", function () {

  // Extract the quest_id from the URL parameters
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const quest_id = urlParams.get("quest_id");

  // Define the callback function to handle the API response for quest information
  const callbackForQuestInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // Get the element to display quest information
    const singleQuestInfo = document.getElementById("singleQuestInfo");

    // If the quest is not found (status code 404), display an error message
    if (responseStatus == 404) {
      singleQuestInfo.innerHTML = `${responseData.message}`;
      return;
    }

    // Display the quest information in a card
    singleQuestInfo.innerHTML = `
      <div class="card mx-auto col-xl-4 col-md-6 col-xs-12">
          <div class="card-body">
            <h4 class="card-title fw-bold text-center">${responseData.title}</h4>
              <p class="card-text">
                  ID: ${responseData.quest_id} <br>
                  Description: ${responseData.description} <br>
                  Points: ${responseData.points} <br>
              </p>
              <a class="btn btn-primary btn-block mb-4" id="submit">Complete</a>
          </div>
      </div>
    `;

    // Get the warning card and warning text elements
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    // Define the callback function to handle the API response for completing the quest
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      // If quest completion is successful (status code 201), reload the page
      if (responseStatus === 201) {
        window.location.reload();
      } else {
        // If there's an error, display the warning message to the user
        console.log("Failed to complete quest");
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
      const token = localStorage.getItem("token");

      // Check if the user is logged in
      if (token != null) {
        const quest_id = responseData.quest_id;
        const data = {
          quest_id: quest_id
        };

        // Make a POST request to the API endpoint to complete the quest
        fetchMethod(currentUrl + "/api/questprogress", callback, "POST", data, localStorage.getItem("token"));
      } else {
        // If the user is not logged in, display a warning message
        console.log("User not logged in");
        warningCard.classList.remove("d-none");
        warningText.innerText = "Login and join a team to complete quests";
      }
    });
  };

  // Make a GET request to the API endpoint to fetch quest information
  fetchMethod(currentUrl + `/api/quests/${quest_id}`, callbackForQuestInfo);
});