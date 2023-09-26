// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// // const keys = require("../../keys");
// require("dotenv").config();
// const authuser = require("./../models/authModel");

// module.exports = (passport) => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         //options for the google strategy
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: "/auth/google/redirect",
//       },
//       (accessToken, refeshToken, profile, done) => {
//         //passport callback function
//         // console.log(profile);
//         // console.log("passport callback function fires");

//         authuser.findOne({ googleid: profile.id }).then((currentUser) => {
//           if (currentUser) {
//             // console.log("user is ", currentUser);
//             done(null, currentUser);
//           } else {
//             new authuser({
//               googleid: profile.id,
//               name: profile.displayName,
//               email: profile.emails[0].value,
//               photo: profile._json.picture,
//             })
//               .save()
//               .then((newUser) => {
//                 // console.log(`new User created ${newUser}`);
//                 done(null, newUser);
//               });
//           }
//         });
//       }
//     )
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     authuser.findById(id).then((user) => {
//       done(null, user);
//     });
//   });
// };
const crypto = require("crypto");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./../models/userModel");
const SendEmail = require("../utils/email");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.PROD_CLIENT_URL}/api/auth/google/callback`,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ email: profile.email });
        if (!user) {
          const password = crypto
            .createHash("sha256")
            .update(profile.id + profile.given_name)
            .digest("hex");
          const newUser = new User({
            name: profile.displayName,
            email: profile.email,
            password,
            googleId: profile.id,
          });
          //   console.log(newUser, "user");
          await User.create(newUser);
          await SendEmail("welcome", newUser, {
            title: "Welcome to the family!",
          });
          return done(null, newUser);
        } else {
          if (user.googleId === undefined) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  User.findById(user._id, function (err, user) {
    done(err, user);
  });
});
