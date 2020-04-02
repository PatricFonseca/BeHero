const connection = require('../database/connnection');

module.exports = {
    async store(request, response){
        const {id} = request.body;

        const ong = await connection('ongs')
            .select('name')       
            .where('id', id)                         
            .first();

        if (!ong){
            return response.status(400).json('No ONG found with this id');
        }

        return response.json(ong);
    }
}