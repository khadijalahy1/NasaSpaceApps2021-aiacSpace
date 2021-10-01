const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

app.use(express.json()); // for parsing application/json

router.get("/", function (req, res) {
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname, "public/index.html"));
});

/*
router.post("/getdata", function (req, res) {
  // let secret = req.secret; must be given to the user when he logs in.

  db.query(req.body, function (error, results, fields) {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.status(200).json(results);
    }
  });
});
*/

//add the router
app.use("/", router);
app.use(express.static(path.join(__dirname, "public")));
app.listen(process.env.port || 7000);

console.log("Running at 127.0.0.1:7000");
