import express from "express";
import { collectionName, connection } from "./dbconfig.js";

const app = express();

app.use(express.json());

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


app.listen(3000);
