// Define a callback function to handle the API response for fetching quests
const callback = (responseStatus, responseData) => {
  // Log response status and data for debugging purposes
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  // Get a reference to the HTML element that will display the list of quests
  const questList = document.getElementById("questList");

  // Loop through each quest in the response data
  responseData.forEach((quest) => {
      // Create a new div element to display each quest
      const displayItem = document.createElement("div");

      // Set the CSS classes for styling the quest display
      displayItem.className =
          "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";

      // Populate the inner HTML of the display item with quest details
      displayItem.innerHTML = `
          <div class="card h-100">
              <div class="card-body">
                  <h4 class="card-title text-center fw-bold">${quest.title}</h4>
                  <p class="card-text">
                      <strong>ID:</strong> <br>${quest.quest_id} <br><br>
                      <strong>Description:</strong> <br>${quest.description} <br><br>
                      <strong>Points:</strong> <br>${quest.points} <br><br>
                  </p>
              </div>
              <a href="singleQuestInfo.html?quest_id=${quest.quest_id}" class="btn btn-primary mx-3 mb-3">Enter</a>
          </div>
      `;

      // Append the display item to the questList container
      questList.appendChild(displayItem);
  });
};

// Make a GET request to the quests API endpoint to fetch quests
fetchMethod(currentUrl + "/api/quests", callback);