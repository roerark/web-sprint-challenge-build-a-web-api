const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

function validateActionID(req, res, next) {
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      if (!action) {
        res.status(404).json({ message: "Action with this ID not found" });
      } else {
        req.action = action;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
}

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  Projects.get(project_id)
    .then((project) => {
      if (!project) {
        res.status(404).json({ message: "Project with this ID not found" });
      } else {
        if (!description || description.length > 128 || !notes) {
          res
            .status(400)
            .json({ message: "Description w/128 or less and Notes required" });
        } else {
          next();
        }
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
}

function validateProjectId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (!project) {
        res.status(404).json({ message: "No Project with this ID was found" });
      } else {
        req.project = project;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
}

function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ mssage: "Name and Description required" });
  } else {
    next();
  }
}

module.exports = {
  validateActionID,
  validateAction,
  validateProjectId,
  validateProject,
};
