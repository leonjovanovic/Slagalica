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
          //console.log(req.body);
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
        client.close();
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
        client.close();
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
        //console.log(items);
        res.status(200).json({
          players1 : items
        });
        client.close();
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

app.post("/playGame", (req, res, next) => {
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
    const collection = db.collection('games');
    var zero = new Date();
    var twelve = new Date();
    zero.setHours(0); zero.setMinutes(0); zero.setSeconds(0);
    twelve.setDate(twelve.getDate()+1); twelve.setHours(0); twelve.setMinutes(0); twelve.setSeconds(0);
    collection.findOne({"datum" : {"$gte": zero,"$lt": twelve}, "username" : req.body.username}, (err, item) => {
      if(item != null){
        res.status(200).json({
          flag : true,
          game : "takmicar",
          id : -2
        });
        client.close();
      } else {
        const collection = db.collection('calendar');
        collection.findOne({"datum" : {"$gte": zero,"$lt": twelve}}, (err, item) => {
          if(item != null){
            res.status(200).json({
              flag : true,
              game : item.name,
              id : item.id_igre
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

app.post("/getAnagram", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        anagram : null
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('anagrams');
    //console.log(req.body);
    collection.findOne({"id" : req.body.id}, (err, item) => {
      if(item != null){
        //console.log(item.anagram);
        res.status(200).json({
          anagram : item.anagram
        });
        client.close();
      } else {
        //console.log("ne radi1");
        res.status(200).json({
          anagram : null
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          anagram : null
        });
        client.close();
      }
    });
  });
});

app.post("/resultAnagram", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag: false,
        points: null
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('anagrams');
    collection.findOne({"id" : req.body.id}, (err, item) => {
      if(item != null){
        const collection2 = db.collection('games');
        var points;
        if(item.recenica === req.body.answer){
          points = 20;
        }else{
          points = 0;
        }
        collection2.insertOne({ username: req.body.username, points: points, datum: new Date() }, (err, result) => {
          if(result != null){
            //console.log("INSERTUJEM");
            res.status(200).json({
              flag : true,
              points: points
            });
          } else {
            res.status(200).json({
              flag : false,
              points: null
            });
            client.close();
          }
          if(err){
            res.status(200).json({
              flag : false,
              points: null
            });
            client.close();
          }
        });
      } else {
        res.status(200).json({
          flag : false,
          points: null
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          flag : false,
          points: null
        });
        client.close();
      }
    });
  });
});

app.post("/mojBroj", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag: false
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('games');
    collection.insertOne({ username: req.body.username, points: req.body.points, datum: new Date() }, (err, item) => {
      if(item != null){
        res.status(200).json({
          flag : true
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

app.get("/requests", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        accounts : null
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('requests');
    collection.find().toArray((function(err, items) {
      if(items != null){
        //console.log(items);
        res.status(200).json({
          accounts : items
        });
      } else {
        res.status(200).json({
          accounts : null
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          accounts : null
        });
        client.close();
      }
    }));
  });
});

app.post("/accepted", (req, res, next) => {
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
    collection.insertOne({ name: req.body.user.name, surname: req.body.user.surname, email: req.body.user.email, job: req.body.user.job, username: req.body.user.username, password: req.body.user.password, gender: req.body.user.gender, jmbg: req.body.user.jmbg, question: req.body.user.question, answer: req.body.user.answer , type : req.body.user.type ,imagePath: req.body.user.imagePath}, (err, result) => {
      if(result != null){

        const collection = db.collection('requests');
        collection.deleteOne({username: req.body.user.username}, (err,result)=>{
          if(result != null){
            res.status(200).json({
              flag : true
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

app.post("/rejected", (req, res, next) => {
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
    const collection = db.collection('requests');
    collection.deleteOne({username: req.body.user.username}, (err,result)=>{
      if(result != null){
        res.status(200).json({
          flag : true
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

app.get("/allAnagrams", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        anagrams : null
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('anagrams');
    collection.find().toArray((function(err, items) {
      if(items != null){
        res.status(200).json({
          anagrams : items
        });
      } else {
        res.status(200).json({
          anagrams : null
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          anagrams : null
        });
        client.close();
      }
    }));
  });
});

app.post("/insertGame", (req, res, next) => {
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
    const collection = db.collection('calendar');
    var zero = new Date(req.body.date);
    var twelve = new Date(req.body.date);
    zero.setHours(0); zero.setMinutes(0); zero.setSeconds(0);
    twelve.setDate(twelve.getDate()+1); twelve.setHours(0); twelve.setMinutes(0); twelve.setSeconds(0);
    collection.findOne({"datum" : {"$gte": zero,"$lt": twelve}}, (err, items)=> {
      if(items != null){
        //console.log("UPDATE");
        collection.updateOne({"datum" : {"$gte": zero,"$lt": twelve}}, {'$set': { name: req.body.name, id_igre: req.body.id, datum: new Date(req.body.date)}}, (err, item) => {
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
        });
      } else {
        //console.log("INSERT");
        collection.insertOne({ name: req.body.name, id_igre: req.body.id, datum: new Date(req.body.date)}, (err, result) => {
          if(result != null){
            res.status(200).json({
              flag : true
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
      }
      if(err){
        res.status(200).json({
          flag: false
        });
        client.close();
      }
    });
  });
});

app.post("/alreadyPlayed", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag: 0
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('games');
    var zero = new Date(req.body.date);
    var twelve = new Date(req.body.date);
    zero.setHours(0); zero.setMinutes(0); zero.setSeconds(0);
    twelve.setDate(twelve.getDate()+1); twelve.setHours(0); twelve.setMinutes(0); twelve.setSeconds(0);
    collection.findOne({"datum" : {"$gte": zero,"$lt": twelve}}, (err, items)=> {
      if(items != null){
        console.log(items);
        res.status(200).json({
          flag: 1
        });
        client.close();
      } else {
        res.status(200).json({
          flag: 2
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          flag: 0
        });
        client.close();
      }
    });
  });
});

app.post("/drzava", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : 0
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('geoDatabase');
    collection.findOne({drzava: req.body.name}, (err, items)=> {//ako je type(drzava) jednak imenu
      if(items != null){
        //console.log(items.drzava);
        res.status(200).json({
          flag : 2
        });
        client.close();
      } else {
        //console.log("INSERT");
        const collection = db.collection('geoEval');
        collection.insertOne({ username: req.body.username, pojam: "drzava", rec: req.body.name, datum: new Date()}, (err, result) => {
          if(result != null){
            res.status(200).json({
              flag : 1
            });
            client.close();
          } else {
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
          if(err){
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
        });
      }
      if(err){
        res.status(200).json({
          flag: 0
        });
        client.close();
      }
    });
  });
});

app.post("/grad", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : 0
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('geoDatabase');
    collection.findOne({grad: req.body.name}, (err, items)=> {//ako je type(drzava) jednak imenu
      if(items != null){
        //console.log(items.drzava);
        res.status(200).json({
          flag : 2
        });
        client.close();
      } else {
        //console.log("INSERT");
        const collection = db.collection('geoEval');
        collection.insertOne({ username: req.body.username, pojam: "grad", rec: req.body.name, datum: new Date()}, (err, result) => {
          if(result != null){
            res.status(200).json({
              flag : 1
            });
            client.close();
          } else {
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
          if(err){
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
        });
      }
      if(err){
        res.status(200).json({
          flag: 0
        });
        client.close();
      }
    });
  });
});

app.post("/planina", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : 0
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('geoDatabase');
    collection.findOne({planina: req.body.name}, (err, items)=> {//ako je type(drzava) jednak imenu
      if(items != null){
        //console.log(items.drzava);
        res.status(200).json({
          flag : 2
        });
        client.close();
      } else {
        //console.log("INSERT");
        const collection = db.collection('geoEval');
        collection.insertOne({ username: req.body.username, pojam: "planina", rec: req.body.name, datum: new Date()}, (err, result) => {
          if(result != null){
            res.status(200).json({
              flag : 1
            });
            client.close();
          } else {
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
          if(err){
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
        });
      }
      if(err){
        res.status(200).json({
          flag: 0
        });
        client.close();
      }
    });
  });
});

app.post("/reka", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : 0
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('geoDatabase');
    collection.findOne({reka: req.body.name}, (err, items)=> {//ako je type(drzava) jednak imenu
      if(items != null){
        //console.log(items.drzava);
        res.status(200).json({
          flag : 2
        });
        client.close();
      } else {
        //console.log("INSERT");
        const collection = db.collection('geoEval');
        collection.insertOne({ username: req.body.username, pojam: "reka", rec: req.body.name, datum: new Date()}, (err, result) => {
          if(result != null){
            res.status(200).json({
              flag : 1
            });
            client.close();
          } else {
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
          if(err){
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
        });
      }
      if(err){
        res.status(200).json({
          flag: 0
        });
        client.close();
      }
    });
  });
});

app.post("/jezero", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : 0
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('geoDatabase');
    collection.findOne({jezero: req.body.name}, (err, items)=> {//ako je type(drzava) jednak imenu
      if(items != null){
        //console.log(items.drzava);
        res.status(200).json({
          flag : 2
        });
        client.close();
      } else {
        //console.log("INSERT");
        const collection = db.collection('geoEval');
        collection.insertOne({ username: req.body.username, pojam: "jezero", rec: req.body.name, datum: new Date()}, (err, result) => {
          if(result != null){
            res.status(200).json({
              flag : 1
            });
            client.close();
          } else {
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
          if(err){
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
        });
      }
      if(err){
        res.status(200).json({
          flag: 0
        });
        client.close();
      }
    });
  });
});

app.post("/zivotinja", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : 0
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('geoDatabase');
    collection.findOne({zivotinja: req.body.name}, (err, items)=> {//ako je type(drzava) jednak imenu
      if(items != null){
        //console.log(items.drzava);
        res.status(200).json({
          flag : 2
        });
        client.close();
      } else {
        //console.log("INSERT");
        const collection = db.collection('geoEval');
        collection.insertOne({ username: req.body.username, pojam: "zivotinja", rec: req.body.name, datum: new Date()}, (err, result) => {
          if(result != null){
            res.status(200).json({
              flag : 1
            });
            client.close();
          } else {
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
          if(err){
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
        });
      }
      if(err){
        res.status(200).json({
          flag: 0
        });
        client.close();
      }
    });
  });
});

app.post("/biljka", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : 0
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('geoDatabase');
    collection.findOne({biljka: req.body.name}, (err, items)=> {//ako je type(drzava) jednak imenu
      if(items != null){
        //console.log(items.drzava);
        res.status(200).json({
          flag : 2
        });
        client.close();
      } else {
        //console.log("INSERT");
        const collection = db.collection('geoEval');
        collection.insertOne({ username: req.body.username, pojam: "biljka", rec: req.body.name, datum: new Date()}, (err, result) => {
          if(result != null){
            res.status(200).json({
              flag : 1
            });
            client.close();
          } else {
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
          if(err){
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
        });
      }
      if(err){
        res.status(200).json({
          flag: 0
        });
        client.close();
      }
    });
  });
});

app.post("/muzGrupa", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag : 0
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('geoDatabase');
    collection.findOne({muzGrupa: req.body.name}, (err, items)=> {//ako je type(drzava) jednak imenu
      if(items != null){
        //console.log(items.drzava);
        res.status(200).json({
          flag : 2
        });
        client.close();
      } else {
        //console.log("INSERT");
        const collection = db.collection('geoEval');
        collection.insertOne({ username: req.body.username, pojam: "muzGrupa", rec: req.body.name, datum: new Date()}, (err, result) => {
          if(result != null){
            res.status(200).json({
              flag : 1
            });
            client.close();
          } else {
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
          if(err){
            res.status(200).json({
              flag : 0
            });
            client.close();
          }
        });
      }
      if(err){
        res.status(200).json({
          flag: 0
        });
        client.close();
      }
    });
  });
});

app.post("/insertGeo", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        flag: false
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('games');
    collection.insertOne({ username: req.body.username, points: req.body.points, datum: new Date() }, (err, item) => {
      if(item != null){
        res.status(200).json({
          flag : true
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

app.get("/reci", (req, res, next) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(err)
      res.status(200).json({
        reci : null
      });
      return
    }
    const db = client.db('database');
    const collection = db.collection('geoEval');
    collection.find().toArray((function(err, items) {
      if(items != null){
        //console.log(items);
        res.status(200).json({
          reci : items
        });
      } else {
        res.status(200).json({
          reci : null
        });
        client.close();
      }
      if(err){
        res.status(200).json({
          reci : null
        });
        client.close();
      }
    }));
  });
});

app.post("/acceptedGeoEval", (req, res, next) => {
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
    const collection = db.collection('games');

    var zero = new Date(req.body.rec.datum);
    var twelve = new Date(req.body.rec.datum);
    zero.setHours(0); zero.setMinutes(0); zero.setSeconds(0);
    twelve.setDate(twelve.getDate()+1); twelve.setHours(0); twelve.setMinutes(0); twelve.setSeconds(0);

    collection.updateOne({username: req.body.rec.username, datum : {"$gte": zero,"$lt": twelve}}, {'$inc': {'points': 2}}, (err, item) => {
      if(item != null){

        const collection = db.collection('geoEval');
        collection.deleteOne({username: req.body.rec.username, pojam: req.body.rec.pojam, rec: req.body.rec.rec, datum : {"$gte": zero,"$lt": twelve}}, (err,result)=>{
          if(result != null){
            res.status(200).json({
              flag : true
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

app.post("/rejectedGeoEval", (req, res, next) => {
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
    const collection = db.collection('geoEval');

    var zero = new Date(req.body.rec.datum);
    var twelve = new Date(req.body.rec.datum);
    zero.setHours(0); zero.setMinutes(0); zero.setSeconds(0);
    twelve.setDate(twelve.getDate()+1); twelve.setHours(0); twelve.setMinutes(0); twelve.setSeconds(0);

    collection.deleteOne({username: req.body.rec.username, pojam: req.body.rec.pojam, rec: req.body.rec.rec, datum : {"$gte": zero,"$lt": twelve}}, (err,result)=>{
      if(result != null){
        res.status(200).json({
          flag : true
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
