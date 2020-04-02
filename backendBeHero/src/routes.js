const { Router } = require("express");

const OngController = require("./controllers/OngController");
const incidentController = require("./controllers/IncidentController");

const routes = Router();

routes.get("/users", (req, res) => {
  return res.json({ teste: "Hellp" });
});

routes.post("/ongs", OngController.store);
routes.get("/ongs", OngController.index);

routes.post('/incidents', incidentController.store);
routes.get('/incidents', incidentController.index);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;
