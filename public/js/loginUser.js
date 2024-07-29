document.addEventListener("DOMContentLoaded", function () {
  // Define the callback function to handle the API response for login
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // Check if the login was successful (status code 200) and a token is received
    if (responseStatus == 200) {
      if (responseData.token) {
        // Save the token in the local storage
        localStorage.setItem("token", responseData.token);

        // Redirect the user to the profile page after successful login
        window.location.href = "profile.html";
      }
    } else {
      // Display a warning message if login fails
      warningCard.classList.remove("d-none");
      warningText.innerText = responseData.message;
    }
  };

  // Get the login form and warning elements by their IDs
  const loginForm = document.getElementById("loginForm");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  // Add event listener to the login form to handle form submission
  loginForm.addEventListener("submit", function (event) {
    console.log("loginForm.addEventListener");
    event.preventDefault();

    // Get username and password from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Prepare data object with username and password
    const data = {
      username: username,
      password: password,
    };

    // Make a POST request to the login API endpoint with the provided data
    fetchMethod(currentUrl + "/api/login", callback, "POST", data);

    // Reset the form after submission
    loginForm.reset();
  });
});