const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/login", (req, res, next) => {
  /*this.users = JSON.parse(localStorage.getItem("users"));
    for (let u of this.users) {
      if (u.username === username && u.password === password) {
        this.loginUpdated.next(true);
        return;
      }
    }
    this.loginUpdated.next(false);*/
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  res.status(200).json({
    flag : true
  });
});

app.post("/signUp", (req, res, next) => {
  /*this.users = JSON.parse(localStorage.getItem("users"));
  for (let u of this.users) {
    if (u.username === user.username || u.email === user.email) {
      this.usersUpdated.next(false);
      return;
    }
  }
  this.users.push(user);
  localStorage.setItem("users", JSON.stringify(this.users));
  this.usersUpdated.next(true);*/
  //const user = req.body;
  console.log(req.body);
  res.status(200).json({
    flag : true
  });
});
app.post("/changePass", (req, res, next) => {
  /*this.users = JSON.parse(localStorage.getItem("users"));
    for (let u of this.users) {
      if (u.username === username && u.password === password) {
        u.password = new_pass;
        localStorage.setItem("users", JSON.stringify(this.users));
        this.changePassUpdated.next(true);
        return;
      }
    }
    this.changePassUpdated.next(false);*/
  console.log(req.body);
  res.status(200).json({
    flag : true
  });
});

app.post("/forgotPass", (req, res, next) => {
  /*this.users = JSON.parse(localStorage.getItem("users"));
    for (let u of this.users) {
      if (u.username === username && u.jmbg === jmbg) {
        this.forgotPassUpdated.next(true);
        this.secretQueUser = u;
        return;
      }
    }
    this.forgotPassUpdated.next(false);*/
  console.log(req.body);
  res.status(200).json({
    flag : true, question: "REPLACE WHEN GET FROM MONGODB", username: req.body.username
  });
});

app.post("/secretQuestion", (req, res, next) => {
  /*if(this.secretQueUser.answer === answer){
    this.secretAnsUpdated.next(true);
    return;
  }
  this.secretAnsUpdated.next(false);*/
  console.log(req.body);
  res.status(200).json({
    flag : true
  });
});

app.post("/newPass", (req, res, next) => {
  /*this.users = JSON.parse(localStorage.getItem("users"));
  for (let u of this.users) {
    if (u.username === this.secretQueUser.username && u.password === this.secretQueUser.password) {
      u.password = pass;
      localStorage.setItem("users", JSON.stringify(this.users));
      this.forgChangePassUpdated.next(true);
      return;
    }
  }
  this.forgChangePassUpdated.next(false);*/
  console.log(req.body);
  res.status(200).json({
    flag : true
  });
});

module.exports = app;
