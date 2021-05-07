const express = require("express");
const server = express();
const actionRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (_, res) => {
  res.send(`<h1>Craig's Sprint Challenge`);
});

module.exports = server;
