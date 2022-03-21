var login = document.querySelector("#login-btn");
login.addEventListener("click", function () {
  document.getElementById("popups").style.display = "block";
});
var closebtn = document.querySelector(".closebtn");
console.log(closebtn.parentElement);
closebtn.addEventListener("click", function () {
  closebtn.parentElement.style.display = "none";
});
