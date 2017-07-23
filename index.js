const express = require("express"),
  _ = require('lodash'),
  bodyParser = require("body-parser"),
  jwt = require("jsonwebtoken"),
  auth = require("./auth.js")(),
  users = require("./users.js"),
  cfg = require("./config.js"),
  app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.initialize());

app.get("/", (req, res) => {
  res.json({
    status: "KiwKiwKiw!"
  });
});

app.post("/login", (req, res) => {
  let dataInput = {};

  if (req.body.email && req.body.password) {
    dataInput.email = req.body.email;
    dataInput.password = req.body.password;
  }

  //check user email
  let user = users[_.findIndex(users, { email: dataInput.email })];

  if (!user) {
    res.sendStatus(401).json({ message: "no such user found" });
  }

  if (user.password === dataInput.password) {
    /*
    from now on we'll identify the user by the id 
    and the id is the only personalized value that goes into our token
    */
    let payload = { id: user.id };
    let token = jwt.sign(payload, cfg.jwtSecret);
    res.json({ message: "success", token: token });
  } else {
    res.status(401).json({ message: "passwords did not match" });
  }
});

app.get("/kiw", auth.authenticate(), (req, res) => {
  res.json( {id : users[req.user.id], message: 'Success! You can not see this without a token'});
});

app.get("/secretDebug", (req, res, next) => {
    console.log(req.get('Authorization'));
    next();
  }, (req, res) => {
    res.json("Debugging Okey!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`It's run on port ${port}`);
});
