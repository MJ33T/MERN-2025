import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { collectionName, connection } from "./dbconfig.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = db.collection("users");
    const result = await collection.insertOne(userData);
    if (result) {
      jwt.sign(userData, "google", { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ message: "Error in token generation", success: false });
        } else {
          res.send({
            message: "User signed up successfully",
            success: true,
            token,
          });
        }
      });
    } else {
      res.send({ message: "Failed to sign up", success: false });
    }
  }
});

app.post("/login", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = db.collection("users");
    const result = await collection.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (result) {
      jwt.sign(userData, "google", { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ message: "Error in token generation", success: false });
        } else {
          res.send({
            message: "User signed up successfully",
            success: true,
            token,
          });
        }
      });
    } else {
      res.send({
        message: "User Not Found or Invalid Password",
        success: false,
      });
    }
  } else {
    res.send({ message: "Failed to Login", success: false });
  }
});

app.post("/add-task", async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);

  const result = await collection.insertOne(req.body);

  if (result) {
    res.send({
      message: "Task added successfully",
      success: true,
      data: result,
    });
  } else {
    res.send({ message: "Failed to add task", success: false, data: null });
  }
});
app.get("/tasks", verifyJWTToken, async (req, res) => {
  const db = await connection();

  const collection = db.collection(collectionName);
  const result = await collection.find().toArray();

  if (result) {
    res.send({
      message: "Tasks fetched successfully",
      success: true,
      data: result,
    });
  } else {
    res.send({ message: "Failed to fetch tasks", success: false, data: null });
  }
});

function verifyJWTToken(req, res, next) {
  const token = req.cookies["token"];
  jwt.verify(token, "google", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "Unauthorized Access", success: false });
    }
    next();
  });
}

app.put("/update-task", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const { _id, ...rest } = req.body;
  const update = { $set: rest };
  const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);

  if (result) {
    res.send({
      message: "Task updated successfully",
      success: true,
      data: result,
    });
  } else {
    res.send({ message: "Failed to update task", success: false, data: null });
  }
});
app.delete("/delete-task/:id", async (req, res) => {
  const id = req.params.id;
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  if (result) {
    res.send({
      message: "Task deleted successfully",
      success: true,
      data: result,
    });
  } else {
    res.send({ message: "Failed to delete task", success: false, data: null });
  }
});

app.get("/task/:id", async (req, res) => {
  const id = req.params.id;
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.findOne({ _id: new ObjectId(id) });

  if (result) {
    res.send({
      message: "Task fetched successfully",
      success: true,
      data: result,
    });
  } else {
    res.send({ message: "Failed to fetch task", success: false, data: null });
  }
});

app.delete("/delete-task-multiple", async (req, res) => {
  const db = await connection();
  const Ids = req.body;

  const deleteTaskIds = Ids.ids.map((id) => new ObjectId(id));

  const collection = db.collection(collectionName);
  const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } });

  if (result) {
    res.send({
      message: "Tasks deleted successfully",
      success: true,
      data: result,
    });
  } else {
    res.send({ message: "Failed to delete tasks", success: false, data: null });
  }
});

app.listen(3000);
