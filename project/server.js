const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

// http logging middleware
server.use(morgan("dev"));

server.options("*", cors());
// body parsing middleware
server.use(express.json());
// cross origin resource sharing
server.use(cors());

server.get("/", (req, res) => {
  res.send({ message: "Working" });
});

// all routes
server.use("/api", require("./api/index"));

// error handling route
server.use((error, req, res, next) => {
  res.status(500).send({ error });
});

module.exports = server;
