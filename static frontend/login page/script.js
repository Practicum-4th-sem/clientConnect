var login = document.querySelector("#login-btn");
var header = document.querySelector(".header");
var landing = document.querySelector(".landing");
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
