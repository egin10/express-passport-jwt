const passport = require("passport"),
  passportJWT = require("passport-jwt"),
  _ = require('lodash'),
  users = require("./users"),
  cfg = require("./config"),
  ExtractJwt = passportJWT.ExtractJwt,
  JwtStrategy = passportJWT.Strategy;

let jwtOptions = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = () => {
  let strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    // check payload
    console.log('payload_recive : ',jwt_payload);

    // usually this would be a database call
    let user = users[ _.findIndex(users, {id: jwt_payload.id}) ] || null;
    if (user) {
      return done(null, user);
    } else {
      return done(new Error("User not found"), null);
    }
  });

passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};


