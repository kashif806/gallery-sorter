const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const bodyParser = require("body-parser");
const { explorer } = require("./fileExplorer.js");
const { process } = require("./sort.js");
const { commands } = require("./macNmobileAndroid.js");
const { parseLsOutput } = require("./helpers/helpers.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.json("Hello World!");
});
app.get("/checkConnection", (req, res, next) => {
  res.json(true);
});

app.post("/", async (req, res, next) => {
  console.log(req.body);

  const filePath = req.body.path;
  // const contents = await explorer(drive + ":\\", filePath);
  const contents = await explorer(filePath);

  res.json(contents);
});

app.post("/process", async (req, res, next) => {
  const drive = req.body.drive;
  const filePath = req.body.path;
  const done = await process(drive + ":\\", filePath);
  res.json(done);
});

app.get("/macNMobileAndroid/getDevices", async (req, res, next) => {
  const devices = await commands.getDevices();
  res.json(devices);
});

app.get("/macNMobileAndroid/getPathContent", async (req, res, next) => {
  const path = req.query.path;
  const content = await commands.getContent(path);
  res.json(parseLsOutput(content));
});

const getFiles = async () => {};
getFiles();
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
