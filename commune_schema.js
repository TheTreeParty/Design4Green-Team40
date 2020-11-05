const { Schema } = require('mongoose');

module.exports = new Schema({
    department_number: String,
    department_name: String,
    region_name: String,
    commune_name: String,
    population: Number,
    postal_code: String,
    commune_number: String,
    score_global: Number,
    acces_interface_numeriques: Number,
    acces_information: Number,
    competences_administratives: Number,
    competences_numeriques: Number,
    global_acces: Number,
    global_competences: Number,
})