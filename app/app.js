require('dotenv').config();
const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const mongo_db = dbConfig.MONGO_URI;

console.log(mongo_db);

const app = express();

var corsOptions = {
  origin: "https://client-server-jwt.onrender.com",
  credentials: true,
};

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

const db = require("./models");
const Role = db.role;

db.mongoose
  // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    .connect(mongo_db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);


function initial() {
  Role.estimatedDocumentCount(
    (err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  }                                                 
  );
}

module.exports = app;