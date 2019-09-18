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
    cb(null, "backend/images");
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
let anagramID = 0;

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
        //console.log(item.type);
        res.status(200).json({
          flag : true,
          type : item.type
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
        const collection = db.collection('requests');
        const url = req.protocol + "://" + req.get("host");
        let flag = false;
        if(MIME_TYPE_MAP[req.file.mimetype]) flag = true;
        collection.insertOne({ name: req.body.name, surname: req.body.surname, email: req.body.email, job: req.body.job, username: req.body.username, password: md5(req.body.password), gender: req.body.gender, jmbg: req.body.jmbg, question: req.body.question, answer: req.body.answer , type : req.body.type ,imagePath: (flag)? (url + "/images/" + req.file.filename):"None" }, (err, result) => {
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

app.get("/players20", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        players20 : null
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('games');
    var d = new Date();
    d.setDate(d.getDate()-20);
    collection.find({datum: { $gte: d } }).toArray((function(err, items) {
      if(items != null){
        //console.log(items);
        res.status(200).json({
          players20 : items
        });
      } else {
        res.status(200).json({
          players20 : null
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          players20 : null
        });
        client.close();
      }
    }));
  });
});

app.get("/players10", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        players10 : null
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('games');
    var zero = new Date();
    var twelve = new Date();
    zero.setHours(0); zero.setMinutes(0); zero.setSeconds(0);
    twelve.setDate(twelve.getDate()+1); twelve.setHours(0); twelve.setMinutes(0); twelve.setSeconds(0);
    collection.find({"datum" : {"$gte": zero,"$lt": twelve}}).toArray((function(err, items) {
      if(items != null){
        //console.log(items);
        res.status(200).json({
          players10 : items
        });
      } else {
        res.status(200).json({
          players10 : null
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          players10 : null
        });
        client.close();
      }
    }));
  });
});

app.get("/players1", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        players1 : null
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('games');
    var d = new Date();

    d.setDate(1);
    collection.find({datum: { $gte: d } }).toArray((function(err, items) {
      if(items != null){
        console.log(items);
        res.status(200).json({
          players1 : items
        });
      } else {
        res.status(200).json({
          players1 : null
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          players1 : null
        });
        client.close();
      }
    }));
  });
});

app.post("/putAnagram", (req, res, next) => {
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
    const collection = db.collection('anagrams');
    collection.insertOne({ id: anagramID, anagram: req.body.anagram, recenica: req.body.recenica }, (err, result) => {
      if(result != null){
        anagramID++;
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

app.get("/playGame", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        players20 : null
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('calendar');
    var zero = new Date();
    var twelve = new Date();
    zero.setHours(0); zero.setMinutes(0); zero.setSeconds(0);
    twelve.setDate(twelve.getDate()+1); twelve.setHours(0); twelve.setMinutes(0); twelve.setSeconds(0);
    collection.findOne({"datum" : {"$gte": zero,"$lt": twelve}}, (err, item) => {
      if(item != null){
        res.status(200).json({
          flag : true,
          game : item.name
        });
        client.close();
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
