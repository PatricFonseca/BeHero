const { Router } = require("express");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = Router();

routes.get("/users", (req, res) => {
  return res.json({ teste: "Hellp" });
});

routes.post("/ongs", OngController.store);
routes.get("/ongs", OngController.index);

routes.post('/incidents', IncidentController.store);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.store);

module.exports = routes;
