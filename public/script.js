var signup_tempalate = ` 
        <div style="display:flex; flex-direction:row; justify-content:space-between"><h2>
        <ion-icon class="closebtn" name="close-outline"></ion-icon>
        </h2> <h2><b>ClientConnect</b></h2></div>
        <form action="/register" method="POST" id="signup">
        <div class="signup-div">
        <div>
        <label for="Phone">Name:</label>
        <input type="text" maxlength="", name="name" placeholder="Name..">
        </div>
        <div>
        <label for="">Email:</label>
        <input type="email" name="email" placeholder="abc@xyz.com">
        </div>
        <div>
        <div style="position:relative;margin:0">
        <label for="">Password:</label>
          <input type="password" id = "password" name="password">
          <span>
          <i class="fa-solid fa-eye" id = "open" style = "cursor: pointer" onClick = "toggle()"></i>
          <i class="fa-solid fa-eye-slash" id = "close" style = "display: none; cursor: pointer" onClick = "toggle()"></i>
          </span>
        </div>
        </div>
        <div>
        <label for="Phone">Phone Number: </label>
        <input maxlength="10" placeholder="Phone.." name="phone">
        </div>
        </div>
        <div>
        <button type="submit" class="btn btn-sm" style="width:120px">Sign Up</button></div>
      </form>
        <hr />
      <a href="/auth/google">
        <button type="button" class="login-with-google-btn">
        Sign in with Google
      </button>
        </a>`;

var login_template = `
      <div style="display:flex; flex-direction:row; justify-content:space-between"><h2>
        <ion-icon class="closebtn" name="close-outline"></ion-icon>
        </h2> <h2><b>ClientConnect</b></h2></div>
      <form action="/login" method="POST" style="display: flex; flex-direction: column;">
        <label for="">Email</label>
        <input type="email" name="email" placeholder="abc@xyz.com">
        <label for="">Password</label>
        <div style="position:relative">
          <input type="password" id = "password" name="password">
          <a href = '/forgotPassword'><span>forgot password?</span></a>
          <span>
          <i class="fa-solid fa-eye" id = "open" style = "cursor: pointer" onClick = "toggle()"></i>
          <i class="fa-solid fa-eye-slash" id = "close" style = "display: none; cursor: pointer" onClick = "toggle()"></i>
          </span>
        </div>
        <br>
        <button type="submit" class="btn btn-sm" style="width:120px">Login</button>
      </form>
      <hr />
      <p>
        <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
          aria-controls="collapseExample" id="phonelogin">Login with Phone No.</a>
        <!-- <button class="btn btn-primary">Login with Google</button> -->

        <a href="/auth/google">
        <button type="button" class="login-with-google-btn">
        Sign in with Google
        </button>
        </a>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <form action="" style="display:flex;flex-direction:column; flex-wrap:wrap">
            <div><label for="Phone" style="width:125px">Phone Number: </label>
            <input maxlength="10" placeholder="Phone..">
            <button class="btn btn-primary">Send OTP</button></div>
          <div>  <label for="" style="width:125px">Enter OTP: </label>
            <input type="password" placeholder="OTP"></div>
          </form>
        </div>
      </div>
      `;
var login = document.querySelector("#login-btn");
var header = document.querySelector(".header");
var landing = document.querySelector(".landing");
var signup = document.querySelector("#signup-btn");
var getStarted = document.querySelector("#get-started");
var body = document.querySelector("body");

//login button
login.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("popups").style.display = "block";
  document.getElementById("popups").innerHTML = login_template;
  header.classList.add("makeblur");
  landing.classList.add("makeblur");
  body.classList.add("removescroll");
  var closebtn = document.querySelector(".closebtn");
  closebtn.addEventListener("click", function () {
    document.getElementById("popups").style.display = "none";
    header.classList.remove("makeblur");
    landing.classList.remove("makeblur");
    window.location.href = "/";
    body.classList.remove("removescroll");
  });
});

//signup button
signup.addEventListener("click", function (e) {
  e.preventDefault();
  //showTab(0);
  document.getElementById("popups").style.display = "block";
  document.getElementById("popups").innerHTML = signup_tempalate;
  header.classList.add("makeblur");
  landing.classList.add("makeblur");
  body.classList.add("removescroll");
  var closebtn = document.querySelector(".closebtn");
  closebtn.addEventListener("click", function () {
    document.getElementById("popups").style.display = "none";
    header.classList.remove("makeblur");
    landing.classList.remove("makeblur");
    window.location.href = "/";
    body.classList.remove("removescroll");
  });
});

//get started button
getStarted.addEventListener("click", function () {
  document.getElementById("popups").style.display = "block";
  document.getElementById("popups").innerHTML = signup_tempalate;
  header.classList.add("makeblur");
  landing.classList.add("makeblur");
  //body.classList.add("removescroll");
  var closebtn = document.querySelector(".closebtn");
  closebtn.addEventListener("click", function () {
    document.getElementById("popups").style.display = "none";
    header.classList.remove("makeblur");
    landing.classList.remove("makeblur");
    window.location.href = "/";
    //body.classList.remove("removescroll");
  });
});

//show password eye toggle function
var state = false;
function toggle() {
  if (state) {
    document.getElementById("password").setAttribute("type", "password");
    state = false;
    document.getElementById("open").style.display = "inline-block";
    document.getElementById("close").style.display = "none";
  } else {
    document.getElementById("password").setAttribute("type", "text");
    state = true;
    document.getElementById("open").style.display = "none";
    document.getElementById("close").style.display = "inline-block";
  }
}

//MULTI STEP SIGNIN FORM JS
/*
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
//multi step signin form js end
*/
