const express = require("express");
const bodyParser = require("body-parser");
var md5 = require('md5');
const multer = require('multer');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "." + ext);
  }
});

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

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
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : false
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('users');
    collection.findOne({$and:[{username: req.body.username}, {password: md5(req.body.password)}]}, (err, item) => {
      if(item != null){
        res.status(200).json({
          flag : true
        });
      } else {
        res.status(200).json({
          flag : false
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          flag : false
        });
        client.close();
      }
    });
  });
});

app.post("/signUp", multer({ storage: storage }).single("image"), (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : false
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('users');
    collection.findOne({$or:[{username: req.body.username}, {email: req.body.email}, {jmbg: req.body.jmbg}]}, (err, item) => {
      if(item == null){
        const url = req.protocol + "://" + req.get("host");
        collection.insertOne({ name: req.body.name, surname: req.body.surname, email: req.body.email, job: req.body.job, username: req.body.username, password: md5(req.body.password), gender: req.body.gender, jmbg: req.body.jmbg, question: req.body.question, answer: req.body.answer, imagePath: url + "/images/" + req.file.filename }, (err, result) => {
          console.log(req.body);
          res.status(200).json({
            flag : true
          });
          client.close();
          if (err) {
            console.error(err);
            res.status(200).json({
              flag : false
            });
            client.close();
            return
          }
        });
      } else {
        res.status(200).json({
          flag : false
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          flag : false
        });
        client.close();
      }
    });
  });
});

app.post("/changePass", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : false
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('users');
    collection.findOne({$and:[{username: req.body.username}, {password: md5(req.body.password)}]}, (err, item) => {
      if(item != null){
        collection.updateOne({username: req.body.username}, {'$set': {'password': md5(req.body.new_pass)}}, (err, item) => {
          if(err){
            res.status(200).json({
              flag : false
            });
            client.close();
            return;
          }
          res.status(200).json({
            flag : true
          });
          client.close();
          return;
        })
      } else {
        res.status(200).json({
          flag : false
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          flag : false
        });
        client.close();
      }
    });
  });
});

app.post("/forgotPass", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : false, question: "", username: req.body.username
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('users');
    collection.findOne({$and:[{username: req.body.username}, {jmbg: req.body.jmbg}]}, (err, item) => {
      if(item != null){
        res.status(200).json({
          flag : true, question: item.question, username: req.body.username
        });
      } else {
        res.status(200).json({
          flag : false, question: "", username: req.body.username
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          flag : false, question: "", username: req.body.username
        });
        client.close();
      }
    });
  });
});

app.post("/secretQuestion", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : false
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('users');
    collection.findOne({username: req.body.u}, (err, item) => {
      if(item != null && req.body.answer === item.answer){
        console.log(item);
        res.status(200).json({
          flag : true
        });
      } else {
        res.status(200).json({
          flag : false
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          flag : false
        });
        client.close();
      }
    });
  });
});

app.post("/newPass", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : false
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('users');
    collection.findOne({username: req.body.u}, (err, item) => {
      if(item != null){
        collection.updateOne({username: req.body.u}, {'$set': {'password': md5(req.body.password)}}, (err, item) => {
          if(err){
            res.status(200).json({
              flag : false
            });
            client.close();
            return;
          }
          res.status(200).json({
            flag : true
          });
          client.close();
          return;
        })
      } else {
        res.status(200).json({
          flag : false
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          flag : false
        });
        client.close();
      }
    });
  });
});

module.exports = app;
