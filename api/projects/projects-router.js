// Write your "projects" router here!

const express = require("express");
const router = express.Router();

const Projects = require("./projects-model");

const {
  validateProjectId,
  validateProject,
} = require("../middleware/middleware");

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", validateProjectId, (req, res, next) => {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((newProject) => {
      res.status(200).json(newProject);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
  const { id } = req.params;
  Projects.update(id, req.body)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  const { id } = req.params;
  Projects.remove(id)
    .then(() => {
      res.status(200).json({ message: "Project has been deleted" });
    })
    .catch((err) => {
      next(err);
    });
});

router.use((err, _, res) => {
  res.status(500).json({
    message: "There as been an error",
    error: err.message,
  });
});
module.exports = router;
