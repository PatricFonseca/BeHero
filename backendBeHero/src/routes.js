const { Router } = require("express");

const OngController = require("./controllers/OngController");

const routes = Router();

routes.get("/users", (req, res) => {
  return res.json({ teste: "Hellp" });
});

routes.post("/ongs", OngController.store);

module.exports = routes;
