import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "Hello from Express!",
    success: true,
  });
});

app.listen(3000);
