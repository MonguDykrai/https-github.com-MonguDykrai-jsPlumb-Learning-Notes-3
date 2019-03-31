const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cache = require("memory-cache");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

cache.put("frontendData", { "nodes": [{ "blockId": "decisioncontainer1", "nodeType": "decision", "positionX": 1130, "positionY": 267 }, { "blockId": "taskcontainer2", "nodeType": "task", "positionX": 729, "positionY": 170 }, { "blockId": "decisioncontainer3", "nodeType": "decision", "positionX": 745, "positionY": 401 }, { "blockId": "taskcontainer4", "nodeType": "task", "positionX": 328, "positionY": 368 }, { "blockId": "decision234759", "nodeType": "task", "positionX": 411, "positionY": 140 }], "connections": [{ "uuids": ["decision234759rm-out", "taskcontainer2lm-in"] }, { "uuids": ["taskcontainer4rm-out", "decisioncontainer3ll-in"] }, { "uuids": ["decisioncontainer3rm-out", "decisioncontainer1lr-in"] }], "numberOfElements": 5 });

app.get('/update-task-info', function (req, res, next) {
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

  // console.log(cache.get("frontendData"));

  res.statusCode = 200;

  res.json({
    statusCode: 200,
    stautsMessage: "SUCCESS",
    data: {
      ...frontendData
    }
  });
});

app.listen(3000, function () {
  console.log("http://localhost:3000")
});