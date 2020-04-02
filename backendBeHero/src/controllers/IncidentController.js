const connection = require("../database/connnection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count_incidents] = await connection("incidents").count("id");

    const incidents = await connection("incidents")
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.city",
        "ongs.whatsapp",
        "ongs.email",
        "ongs.uf"
      ])
      .limit(5)
      .offset((page - 1) * 5)
      .join("ongs", "ongs.id", "=", "incidents.ong_id");

    response.header("X-Total-Count", count_incidents["count(`id`)"]);
    console.log(count_incidents);
    return response.json(incidents);
  },

  async store(request, response) {
    const { title, description, value } = request.body;

    const ong_id = request.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });
    return response.json({ id });
  },

  async delete(request, response) {
    try {
      const { id } = request.params;

      const ong_id = request.headers.authorization;

      const incident = await connection("incidents")
        .select("ong_id")
        .where("id", id)
        .first();

      if (ong_id !== incident.ong_id) {
        return response.status(401).json({ error: "Operation not allowed" });
      }

      await connection("incidents")
        .where("id", id)
        .delete();

      return response.status(204).send();
    } catch (error) {
      console.log(error + "Ocorreu um erro");
    }
  }
};
