const express = require("express");
const morgan = require("morgan");

const server = express();

// http logging middleware
server.use(morgan("dev"));

// body parsing middleware
server.use(express.json());

server.get("/"),
  (req, res) => {
    res.send({ message: "Working" });
  };

server.use("/api", require("/api/index"));

module.exports = server;
