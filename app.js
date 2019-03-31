const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cache = require("memory-cache");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

cache.put("frontendData", { "nodes": [{ "blockId": "decision585016", "nodeType": "task", "positionX": 462, "positionY": 177 }, { "blockId": "task585832", "nodeType": "task", "positionX": 198, "positionY": 164 }], "connections": [{ "uuids": ["task585832rm-out", "decision585016lm-in"] }], "numberOfElements": 2 });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/update-task-info', function (req, res, next) {
  let frontendData;
  Object.keys(req.body).forEach(key => {
    cache.put(key, req.body[key])
  });

  res.statusCode = 200;

  frontendData = cache.get("frontendData");

  res.json({
    statusCode: 200,
    stautsMessage: "UPDATED",
    data: {
      ...frontendData
    }
  });

  // console.log(cache.get("frontendData"));
})

app.get("/get-task-info", function (req, res, next) {
  const frontendData = cache.get("frontendData");

  console.log(cache.get("frontendData"));

  // res.statusCode = 200;

  res.json({
    statusCode: 200,
    stautsMessage: "SUCCESS",
    data: {
      ...frontendData
    }
  });
});

app.listen(3000, function () {
  console.log("http://localhost:3000");
});