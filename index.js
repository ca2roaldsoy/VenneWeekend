const express = require("express");
const cors = require("cors");

const app = express();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const multer = require("multer");
const path = require("path");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

/* const db = mysql.createPool({
  host: "eu-cdbr-west-03.cleardb.net", //"localhost",
  user: "bbe02470a71edc", //"root",
  password: "6bae39a5", //"Aquarius2514",
  database: "heroku_79998eb0c01622d", //"vwdatabase",
}); */

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Aquarius2514",
  database: "vwdatabase",
});

app.use(
  cors({
    origin: /*  [
      "https://venneweekend.netlify.app/",
    ]  */ ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    preflightContinue: false,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
      sameSite: "none",
    },
  })
);
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).array("files");

///////////////////////////// GET /////////////////////////////////////////////////
app.get("/post/get", (req, res) => {
  const sqlGetBlogPosts = "SELECT * FROM blog_posts;";
  db.query(sqlGetBlogPosts, (err, result) => {
    res.send(result);
  });
});

app.get("/comments/get", (req, res) => {
  const sqlGetBlogPosts = "SELECT * FROM comments;";
  db.query(sqlGetBlogPosts, (err, result) => {
    res.send(result);
  });
});

app.get("/participents/get", (req, res) => {
  const sqlGetParticipents = "SELECT * FROM participents;";
  db.query(sqlGetParticipents, (err, result) => {
    res.send(result);
  });
});

app.get("/foodtable/get", (req, res) => {
  const sqlGetFoodTable = "SELECT * FROM foodtable;";
  db.query(sqlGetFoodTable, (err, result) => {
    res.send(result);
  });
});

app.get("/foodmenu/get", (req, res) => {
  const sqlGetFoodMenu = "SELECT * FROM foodmenu;";
  db.query(sqlGetFoodMenu, (err, result) => {
    res.send(result);
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("no token");
  } else {
    jwt.verify(token, process.env.REACT_APP_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.send({ auth: false, message: "fail auth" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

/* app.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send("heelo you")
}) */

app.get("/login", verifyJWT, (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/media", (req, res) => {
  const sqlMedia = "SELECT * FROM media";
  db.query(sqlMedia, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
});

///////////////////////////// INSERT /////////////////////////////////////////////////

app.post("/media", upload, (req, res) => {
  const image = req.files;
  const year = req.body.year;

  console.log(image);
  console.log(year);

  for (let img of image) {
    const sqlImage = "INSERT INTO media (image, year) VALUES (?,?);";
    db.query(sqlImage, [img.filename, year], (err, result) => {
      if (err) {
        return res.json({ message: "Error uploading image" });
      }
    });
  }
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) console.log(err);

    const sqlRegister = "INSERT INTO login (username, password) VALUES (?,?)";
    db.query(sqlRegister, [username, hash], (err, result) => {
      console.log(err);
    });
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM login WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id }, process.env.REACT_APP_SECRET_KEY, {
              expiresIn: 300,
            });

            req.session.user = result;
            res.json({ auth: true, token: token, result: result });
          } else {
            res.json({
              auth: false,
              message: "Feil brukernavn eller passord!",
            });
          }
        });
      } else {
        res.json({ auth: false, message: "Feil brukernavn" });
      }
    }
  );
});

app.post("/post/insert", (req, res) => {
  const author = req.body.author;
  const title = req.body.title;
  const message = req.body.message;

  const sqlInsertBlogPosts =
    "INSERT INTO blog_posts (author, title, message) VALUES (?,?,?);";
  db.query(sqlInsertBlogPosts, [author, title, message], (err, result) => {
    console.log(err);
  });
});

app.post("/comments/insert", (req, res) => {
  const comments = req.body.comment;
  const name = req.body.name;

  const sqlInsertComments =
    "INSERT INTO comments (comments, name) VALUES (?,?);";
  db.query(sqlInsertComments, [comments, name], (err, result) => {
    console.log(err);
  });
});

app.post("/participents/insert", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const friday = req.body.friday;
  const saturday = req.body.saturday;
  const sunday = req.body.sunday;
  const monday = req.body.monday;
  const sheets = req.body.sheets;
  const lactose = req.body.lactose;
  const gluten = req.body.gluten;
  const other = req.body.other;

  const sqlInsertParticipents =
    "INSERT INTO participents (name, age, friday, saturday, sunday, monday, sheets, lactose, gluten, other) VALUES (?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlInsertParticipents,
    [
      name,
      age,
      friday,
      saturday,
      sunday,
      monday,
      sheets,
      lactose,
      gluten,
      other,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/foodtable/insert", (req, res) => {
  const ingredient = req.body.ingredient;
  const bought = req.body.bought;
  const used = req.body.used;
  const measurement = req.body.measurement;

  const sqlInsertParticipents =
    "INSERT INTO foodtable (ingredient, bought, used, measurement) VALUES (?,?,?,?);";
  db.query(
    sqlInsertParticipents,
    [ingredient, bought, used, measurement],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/foodmenu/insert", (req, res) => {
  const friday = req.body.friday;
  const saturday = req.body.saturday;
  const sunday = req.body.sunday;
  const year = req.body.year;

  const sqlInsertFoodMenu =
    "INSERT INTO foodmenu (friday, saturday, sunday, year) VALUES (?,?,?,?);";
  db.query(
    sqlInsertFoodMenu,
    [friday, saturday, sunday, year],
    (err, result) => {
      console.log(err);
    }
  );
});

///////////////////////////// DELETE /////////////////////////////////////////////////
app.delete("/post/delete/:id", (req, res) => {
  const id = req.params.id;

  const sqlDeleteBlogPosts = "DELETE FROM blog_posts WHERE id = ?";
  db.query(sqlDeleteBlogPosts, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.delete("/comments/delete/:id", (req, res) => {
  const id = req.params.id;

  const sqlDeleteComments = "DELETE FROM comments WHERE id = ?";
  db.query(sqlDeleteComments, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.delete("/participents/delete/:id", (req, res) => {
  const id = req.params.id;

  const sqlDeleteParticipents = "DELETE FROM participents WHERE id = ?";
  db.query(sqlDeleteParticipents, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.delete("/foodtable/delete/:id", (req, res) => {
  const id = req.params.id;

  const sqlDeleteFoodTable = "DELETE FROM foodtable WHERE id = ?";
  db.query(sqlDeleteFoodTable, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.delete("/foodmenu/delete/:id", (req, res) => {
  const id = req.params.id;

  const sqlDeleteFoodMenu = "DELETE FROM foodmenu WHERE id = ?";
  db.query(sqlDeleteFoodMenu, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.delete("/media/delete/:id", (req, res) => {
  const id = req.params.id;

  const sqlDeleteMedia = "DELETE FROM media WHERE id = ?";
  db.query(sqlDeleteMedia, id, (err, result) => {
    if (err) console.log(err);
  });
});

///////////////////////////// UPDATE /////////////////////////////////////////////////
app.put("/post/update", (req, res) => {
  const id = req.body.id;
  const author = req.body.author;
  const title = req.body.title;
  const message = req.body.message;

  const sqlUpdateBlogPostsAuthor =
    "UPDATE blog_posts SET author = ? WHERE id = ?;";
  db.query(sqlUpdateBlogPostsAuthor, [author, id], (err, result) => {
    if (err) console.log(err);
  });

  const sqlUpdateBlogPostsTitle =
    "UPDATE blog_posts SET title = ? WHERE id = ?;";
  db.query(sqlUpdateBlogPostsTitle, [title, id], (err, result) => {
    if (err) console.log(err);
  });

  const sqlUpdateBlogPostsMessage =
    "UPDATE blog_posts SET message = ? WHERE id = ?;";
  db.query(sqlUpdateBlogPostsMessage, [message, id], (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/comments/update", (req, res) => {
  const id = req.body.id;
  const comment = req.body.comment;
  const name = req.body.name;

  const sqlUpdateCommentMessage =
    "UPDATE comments SET comments = ? WHERE id = ?;";
  db.query(sqlUpdateCommentMessage, [comment, id], (err, result) => {
    if (err) console.log(err);
  });

  const sqlUpdateCommentName = "UPDATE comments SET name = ? WHERE id = ?;";
  db.query(sqlUpdateCommentName, [name, id], (err, result) => {
    if (err) console.log(err);
  });
});

/* app.put("/participents/update", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const friday = req.body.friday;
  const saturday = req.body.saturday;
  const sunday = req.body.sunday;
  const monday = req.body.monday;
  const sheets = req.body.sheets;
  const lactose = req.body.lactose;
  const gluten = req.body.gluten;
  const other = req.body.other;
  const id = req.body.id;

  const participentsArr = [
    "name",
    "age",
    "friday",
    "saturday",
    "sunday",
    "monday",
    "sheets",
    "lactose",
    "gluten",
    "other",
  ];

  participentsArr.forEach((p, i) => {
    const sqlUpdateParticipents = `UPDATE participents SET ${p} = ? WHERE id = ?;`;
    db.query(sqlUpdateParticipents, [p, id], (err, result) => {
      if (err) console.log(err);
    });
  }); */

/* const sqlUpdateParticipentName =
    "UPDATE participents SET name = ? WHERE id = ?;";
  db.query(sqlUpdateParticipentName, [name, id], (err, result) => {
    if (err) console.log(err);
  });

  const sqlUpdateParticipentName =
    "UPDATE participents SET name = ? WHERE id = ?;";
  db.query(sqlUpdateParticipentName, [name, id], (err, result) => {
    if (err) console.log(err);
  }); */
//});

app.put("/foodtable/update", (req, res) => {
  const ingredient = req.body.ingredient;
  const id = req.body.id;
  const bought = req.body.bought;
  const used = req.body.used;
  const measurement = req.body.measurement;

  const sqlUpdateIngredient =
    "UPDATE foodtable SET ingredient = ? WHERE id = ?;";
  db.query(sqlUpdateIngredient, [ingredient, id], (err, result) => {
    if (err) console.log(err);
  });

  const sqlUpdateBought = "UPDATE foodtable SET bought = ? WHERE id = ?;";
  db.query(sqlUpdateBought, [bought, id], (err, result) => {
    if (err) console.log(err);
  });

  const sqlUpdateUsed = "UPDATE foodtable SET used = ? WHERE id = ?;";
  db.query(sqlUpdateUsed, [used, id], (err, result) => {
    if (err) console.log(err);
  });

  const sqlUpdateMeasurements =
    "UPDATE foodtable SET measurement = ? WHERE id = ?;";
  db.query(sqlUpdateMeasurements, [measurement, id], (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/foodmenu/update", (req, res) => {
  const friday = req.body.friday;
  const saturday = req.body.saturday;
  const sunday = req.body.sunday;
  const id = req.body.id;

  const sqlUpdateFoodMenuFriday =
    "UPDATE foodmenu SET friday = ? WHERE id = ?;";
  db.query(sqlUpdateFoodMenuFriday, [friday, id], (err, result) => {
    if (err) console.log(err);
  });

  const sqlUpdateFoodMenuSaturday =
    "UPDATE foodmenu SET saturday = ? WHERE id = ?;";
  db.query(sqlUpdateFoodMenuSaturday, [saturday, id], (err, result) => {
    if (err) console.log(err);
  });

  const sqlUpdateFoodMenuSunday =
    "UPDATE foodmenu SET sunday = ? WHERE id = ?;";
  db.query(sqlUpdateFoodMenuSunday, [sunday, id], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(process.env.PORT || 3001, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
