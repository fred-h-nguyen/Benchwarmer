$(document).ready(function() {
  $("#login").on("click", function(event) {
    event.preventDefault();
    var user = {
      username: $("#usernameInput")
        .val()
        .trim(),
      password: $("#passwordInput")
        .val()
        .trim()
    };
    $.post("/api/login", {
      username: user.username,
      password: user.password
    }).then(function() {
      window.location.reload();
    });
  });

  $("#logout").on("click", function() {
    $.ajax({ url: "/logout", method: "GET" }).then(function() {
      window.location.reload();
    });
  });
});
