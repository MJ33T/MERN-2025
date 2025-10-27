import cors from "cors";
import express from "express";
import { ObjectId } from "mongodb";
import { collectionName, connection } from "./dbconfig.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

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
app.get("/tasks", async (req, res) => {
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

app.listen(3000);
