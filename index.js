import connectDB from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import User from "./models/usersModel.js";
connectDB();
dotenv.config();

const app = express();
// app.use("/api/users", userRoute);
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.post("/api/users/login", (req, res) => {
  console.log(req.body);
  const { number } = req.body;
  User.findOne({ number: number }, (err, user) => {
    if (user) {
      res.send({ message: "login sucess", user: user });
    } else {
      res.send({ message: "not register" });
    }
  });
});

app.post("/api/users/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, number, address, age } = req.body;
  User.findOne({ number: number }, (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      const user = new User({ name, email, password, number, address, age });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "successfull" });
        }
      });
    }
  });
});

//Express js listen method to run project on http://localhost:5000
app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
