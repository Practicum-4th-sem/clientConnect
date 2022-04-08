var signup_tempalate = ` 
        <h2>
        <ion-icon class="closebtn" name="close-outline"></ion-icon>
        </h2>
        <form action="/api/v1/users/register" method="POST" id="signup">
        <div class="signup-div">
        <div>
        <label for="Phone">Name:</label>
        <input type="text" maxlength="" placeholder="Name..">
        </div>
        <div>
        <label for="">Email:</label>
        <input type="email" name="" placeholder="abc@xyz.com">
        </div>
        <div>
        <label for="">Password:</label>
        <input type="password" name="">
        </div>
        <div>
        <label for="Phone">Phone Number: </label>
        <input maxlength="10" placeholder="Phone..">
        </div>
        </div>
        <div>
        <button type="submit" class="btn btn-sm">Sign Up</button></div>
      </form>
      <a href="/auth/google">
        <button type="button" class="login-with-google-btn">
        Sign in with Google
      </button>
        </a>`;
var login_template = `
      <h2>
        <ion-icon class="closebtn" name="close-outline"></ion-icon>
      </h2>
      <form action="/api/v1/users/login" method="POST" style="display: flex; flex-direction: column;">
        <label for="">Email</label>
        <input type="email" name="" placeholder="abc@xyz.com">
        <label for="">Password</label>
        <input type="password" name="">
        <br>
        <button type="submit" class="btn btn-sm">Login</button>
      </form>
      <br>
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
          <form action="">
            <label for="Phone">Phone Number: </label>
            <input maxlength="10" placeholder="Phone..">
            <button class="btn btn-primary">Send OTP</button>
            <label for="">Enter OTP: </label>
            <input type="password" placeholder="OTP">
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
login.addEventListener("click", function () {
  document.getElementById("popups").style.display = "block";
  document.getElementById("popups").innerHTML = login_template;
  header.classList.add("makeblur");
  landing.classList.add("makeblur");
  //body.classList.add("removescroll");
  var closebtn = document.querySelector(".closebtn");
  closebtn.addEventListener("click", function () {
    document.getElementById("popups").style.display = "none";
    header.classList.remove("makeblur");
    landing.classList.remove("makeblur");
    //body.classList.remove("removescroll");
  });
});
signup.addEventListener("click", function () {
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
    //body.classList.remove("removescroll");
  });
});
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
    //body.classList.remove("removescroll");
  });
});
