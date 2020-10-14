const LocaStrategy = require('passport-local').Strategy
const pool = require('../models/db')
const bcrypt = require('bcrypt')
const crypto = require('crypto');

function initialize(passport){
    const autheticateUser = (username, pass, done) =>{
         pool.query(`SELECT * FROM users WHERE username=$1`,[username], (err, results) => {
            if (err) {
              throw err;
            }    
            if (results.rows.length > 0) {
              const user = results.rows[0];
    
              bcrypt.compare(pass, user.pass, (err, isMatch) => {
                if (err) {
                  console.log(err);
                }
                if(isMatch){
                    const accessToken = crypto.randomBytes(24).toString('hex');
                    pool.query('UPDATE users SET token=$1 where username=$2',[accessToken,user.username]);
                }
                if (isMatch) {
                  return done(null, user);
                } else {
                  //password is incorrect
                  return done(null, false, { message: "Password is incorrect" });
                }
              });
            } else {
              // No user
              return done(null, false, {
                message: "No user with that username"
              });
            }
          })
    }
    passport.use(
        new LocaStrategy({
            usernameField:"username",
            passwordField: "pass"
        },autheticateUser)
    );
    passport.serializeUser((user, done) => done(null, user.id));

    // In deserializeUser that key is matched with the in memory array / database or any data resource.
    // The fetched object is attached to the request object as req.user
  
    passport.deserializeUser((id, done) => {
      pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
        if (err) {
          return done(err);
        }
        console.log(`ID is ${results.rows[0].id}`);
        return done(null, results.rows[0]);
      });
    });
}

module.exports = initialize