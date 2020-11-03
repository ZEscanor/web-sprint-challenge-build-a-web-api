const express = require('express');

const db = require("./data/dbConfig");

const actionRouter = require("./actions/action-router");
const projectRouter= require("./projects/project-router");
const server = express();

server.use(express.json());
server.use(actionRouter);
server.use(projectRouter);
server.use(logger)

server.get('/',(req,res)=>{
    res.send("Welcome to The Sprint Challenge")
})

function logger(req, res, next) {
    console.log(req.method," ",req.hostname, new Date());
    next()
  }

module.exports = server;