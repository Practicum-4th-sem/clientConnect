var signup_tempalate = ` 
        <div style="display:flex; flex-direction:row; justify-content:space-between"><h2>
        <ion-icon class="closebtn" name="close-outline"></ion-icon>
<<<<<<< HEAD
        </h2>
        <form action="/register" method="POST" id="signup">
=======
      </h2> <h2><b>ClientConnect</b></h2></div>
        <form action="/api/v1/users/register" method="POST" id="signup">
>>>>>>> afb5245e2954ce2d390a68974aef75a663d1336e
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
        <label for="">Password:</label>
        <input type="password" name="password">
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
<<<<<<< HEAD
      </h2>
      <form action="/login" method="POST" style="display: flex; flex-direction: column;">
=======
      </h2> <h2><b>ClientConnect</b></h2></div>
      <form action="/api/v1/users/login" method="POST" style="display: flex; flex-direction: column;">
>>>>>>> afb5245e2954ce2d390a68974aef75a663d1336e
        <label for="">Email</label>
        <input type="email" name="email" placeholder="abc@xyz.com">
        <label for="">Password</label>
        <input type="password" name="password">
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
login.addEventListener("click", function (e) {
  e.preventDefault();
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
signup.addEventListener("click", function (e) {
  e.preventDefault();
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
