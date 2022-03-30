var login = document.querySelector("#login-btn");
var header = document.querySelector(".header");
var landing = document.querySelector(".landing");
var signup = document.querySelector("#signup-btn");
var getStarted = document.querySelector("#get-started");
var body = document.querySelector("body");
login.addEventListener("click", function () {
  document.getElementById("popups").style.display = "block";
  header.classList.add("makeblur");
  landing.classList.add("makeblur");
  //body.classList.add("removescroll");
});
var closebtn = document.querySelector(".closebtn");
closebtn.addEventListener("click", function () {
  document.getElementById("popups").style.display = "none";
  header.classList.remove("makeblur");
  landing.classList.remove("makeblur");
  //body.classList.remove("removescroll");
});

var signup_tempalate = `  <form action="">
        <label for="Phone">Name</label>
        <input type="text" maxlength="" placeholder="Name..">
        <label for="">Email</label>
        <input type="email" name="" placeholder="abc@xyz.com">
        <label for="">Password</label>
        <input type="password" name="">
        <label for="Phone">Phone Number: </label>
        <input maxlength="10" placeholder="Phone..">
      </form>`;
