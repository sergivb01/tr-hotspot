const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }, (accessToken, refreshToken, profile, done) => {
    let isEmailValid = profile.emails[0].value.endsWith(`@${process.env.EMAIL}`)
    console.log('abcde4')
    if (!isEmailValid) done(new Error('Wrong domain!', 'The used email is not valid'))

    User.findOne({
      googleId: profile.id
    }).then((currentUser) => {
      if (currentUser) { // User already exists in the database
        if (process.env.NODE_ENV !== 'production') console.info(`An already registered user has just logged in! ${currentUser}`)
        console.log('abcde3')
        done(null, currentUser)
      } else { // User is new, create profile
        console.log('abcde2')
        new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          thumbnail: profile._json.image.url
        }).save().then((newUser) => {
          if (process.env.NODE_ENV !== 'production') console.info(`A new user has been registered and logged in! ${newUser}`)

          console.log('abcde1')
          done(null, newUser)
        })
      }
    })
  })
)
