// Write your "actions" router here!

const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");

const {
  validateActionID,
  validateAction,
} = require("../middleware/middleware");

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", validateActionID, (req, res, next) => {
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", validateActionID, validateAction, (req, res, next) => {
  const { id } = req.params;
  Actions.update(id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", validateActionID, (req, res, next) => {
  const { id } = req.params;
  Actions.remove(id)
    .then(() => {
      res.status(200).json({ message: "Action successfully deleted" });
    })
    .catch((err) => {
      next(err);
    });
});

router.use((err, _, res) => {
  res.status(500).json({
    message: "There has been an error",
    error: err.message,
  });
});

module.exports = router;
