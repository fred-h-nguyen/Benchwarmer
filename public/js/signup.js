$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var username = $("input#signupusername");
  var password = $("input#password");
  var email = $("input#email");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", function(event) {
    event.preventDefault();
    var userData = {
      username: username.val().trim(),
      email: email.val().trim(),
      password: password.val().trim()
    };

    if (!userData.email || !userData.password || !userData.username) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.username);
    email.val("");
    password.val("");
    username.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, username) {
    $.post("/api/signup", {
      email: email,
      password: password,
      username: username
    })
      .then(function() {
        window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
