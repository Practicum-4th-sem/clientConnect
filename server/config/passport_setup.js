const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../../keys");
const authuser = require("./../models/authModel");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        //options for the google strategy
        clientID: keys.google.clientId,
        clientSecret: keys.google.clientsecret,
        callbackURL: "/auth/google/redirect",
      },
      (accessToken, refeshToken, profile, done) => {
        //passport callback function
        // console.log(profile);
        // console.log("passport callback function fires");

        authuser.findOne({ googleid: profile.id }).then((currentUser) => {
          if (currentUser) {
            // console.log("user is ", currentUser);
            done(null, currentUser);
          } else {
            new authuser({
              googleid: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              photo: profile._json.picture,
            })
              .save()
              .then((newUser) => {
                // console.log(`new User created ${newUser}`);
                done(null, newUser);
              });
          }
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    authuser.findById(id).then((user) => {
      done(null, user);
    });
  });
};
