const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  res.json(repositories)
});


app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body
  const repository = { id: uuid(), title, url, techs, likes: 0}
  repositories.push(repository)

  return res.json(repository)
});


app.put("/repositories/:id", (req, res) => {
  const { title, url, techs } = req.body
  const id = req.params.id
  const repoIndex = repositories.findIndex(e => e.id == id)

  if(repoIndex < 0) {
    return res.status(400).json({error: "Repository not found"})
  }
  
  const valuesToKeep = {
    id: repositories[repoIndex].id, 
    likes: repositories[repoIndex].likes 
  }
  const { likes } = repositories[repoIndex]

  repositories[repoIndex] = { id, likes, title, url, techs}
  return res.json(repositories[repoIndex])
});


app.delete("/repositories/:id", (req, res) => {
  const id = req.params.id
  const repoIndex = repositories.findIndex(e => e.id == id)

  if(repoIndex < 0) {
    return res.status(400).json({error: "Repository not found"})
  }

  repositories.splice(repoIndex, 1)
  res.status(204).send()
});


app.post("/repositories/:id/like", (req, res) => {
  const id = req.params.id
  const repoIndex = repositories.findIndex(e => e.id == id)
  
  if(repoIndex < 0){
    return res.status(400).json({error: "Repository not found"})
  }

  const { likes } = repositories[repoIndex]
  repositories[repoIndex].likes = likes+1

  return res.json(repositories[repoIndex])
});


module.exports = app;
