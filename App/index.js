const express = require("express");
const path = require("path");
const db = require("./data/database").db;
const querystring = require('querystring');

const app = express();
const router = express.Router();

router.get("/", function (req, res) {
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/dataset", function (req, res) {
  res.sendFile(path.join(__dirname, "public/browse.html"));
});

router.get("/query", function (req, res) {
  try {
    res.status(200).json({
      "dataset": db.query(req.query)
    }) 
  } catch (error) {
    res.status(400).json({ error: error });
  }  
});

router.get("/count", function (req, res) {
  try {
    res.status(200).json({
      "count": db.count(req.query)
    })
  } catch (error) {
    res.status(400).json({ error: error });
  }  
});

//add the router
app.use("/", router);
app.use(express.static(path.join(__dirname, "public")));
app.listen(process.env.port || 7000);

console.log("Running at 127.0.0.1:7000");
