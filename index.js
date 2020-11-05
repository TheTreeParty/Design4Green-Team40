const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const CommuneSchema = require('./commune_schema.js');
const { query } = require('express');


const MONGODB_DB_NAME = 'digitalfragility'
const MONGODB_CONNECTION_URL = `localhost:27017`;
const MONGODB_USER = 'epita-admin';
const MONGODB_PASS = 'Secure-Party-40';
const COMMUNE_SCORE_COLLECTION_NAME = 'communes';

const AUTOCOMPLETE_LIMIT = 10;

// This will be our application entry. We'll setup our server here.

// Set up the express app
const app = express();

app.use(bodyParser.json());

// Index routing: http://146.59.196.18:80/
app.get('/', (req, res) => {
    res.status(200).sendFile(
        (path.join(__dirname + '/index.html'))
    );
});

//CSS folder routing
app.get("/css/:cssfile", function (req, res) {
    res.status(200).sendFile(
        (path.join(__dirname + '/css/' + req.params.cssfile))
    );
});

//JS folder routing
app.get("/javascript/:jsfile", function (req, res) {
    res.status(200).sendFile(
        (path.join(__dirname + '/javascript/' + req.params.jsfile))
    );
});

//Search
app.get("/search", (req, res) => {
    const Commune = mongoose.model(COMMUNE_SCORE_COLLECTION_NAME, CommuneSchema);
    const querySelect = {
        _id: 1,
        postal_code: 1,
        commune_name: 1
    };

    const { query } = req.query;

    let dbQueryParams = {};

    if (query && query.length > 0) {
        dbQueryParams = isNumeric(query) ? {
            postal_code: {
                $regex: new RegExp("^" + query) // Means should start with
            }
        } : {
                commune_name: {
                    $regex: new RegExp(query.toLowerCase(), "i")
                }
            };
    }

    Commune
        .find(dbQueryParams, querySelect)
        .limit(10)
        .exec((err, result) => {
            if (err) {
                res.status(500);
                res.send(err);
            }

            res.status(200);
            res.send(result);
        })
});

async function fetchCommuneReport(id) {

    function average(avg, value, _, { length }) {
        return avg + value / length;
    }

    const Commune = mongoose.model(COMMUNE_SCORE_COLLECTION_NAME, CommuneSchema);
    const targetCommune = await Commune.findById(id);

    const communesInDepartment = await Commune.find({
        department_number: targetCommune.department_number
    });

    const communesInRegion = await Commune.find({
        region_name: targetCommune.region_name
    });

    const department = {
        score_global: communesInDepartment.map(c => c.score_global).reduce(average, 0),
        acces_information: communesInDepartment.map(c => c.acces_information).reduce(average, 0),
        acces_interface_numeriques: communesInDepartment.map(c => c.acces_interface_numeriques).reduce(average, 0),
        competences_administratives: communesInDepartment.map(c => c.competences_administratives).reduce(average, 0),
        competences_numeriques: communesInDepartment.map(c => c.competences_numeriques).reduce(average, 0)
    };

    const region = {
        score_global: communesInRegion.map(c => c.score_global).reduce(average, 0),
        acces_information: communesInRegion.map(c => c.acces_information).reduce(average, 0),
        acces_interface_numeriques: communesInRegion.map(c => c.acces_interface_numeriques).reduce(average, 0),
        competences_administratives: communesInRegion.map(c => c.competences_administratives).reduce(average, 0),
        competences_numeriques: communesInRegion.map(c => c.competences_numeriques).reduce(average, 0)
    }

    const report = {
        commune_name: targetCommune.commune_name,
        postal_code: targetCommune.postal_code,
        department_name: targetCommune.department_name,
        region_name: targetCommune.region_name,
        statistics: {
            commune: {
                score_global: targetCommune.score_global,
                acces_information: targetCommune.acces_information,
                acces_interface_numeriques: targetCommune.acces_interface_numeriques,
                competences_administratives: targetCommune.competences_administratives,
                competences_numeriques: targetCommune.competences_numeriques
            },
            department: department,
            region: region
        }
    };

    return report;
}

app.post("/commune-report", (req, res) => {
    if (!req.body.id) {
        res.send(400);
        console.log("bad request", req.body);
        return;
    }

    const { id } = req.body;
    fetchCommuneReport(id)
        .then(report => {
            res.status(200);
            res.send(report);
        })
        .catch(err => {
            res.status(500);
            console.log("An error occurred", err);
        });
});

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function main() {
    console.log("Connecting to MongoDB database...");
    mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_CONNECTION_URL}/${MONGODB_DB_NAME}`, { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log("Successfully connected to MongoDB database.")
        // Server setup
        const port = parseInt(process.env.PORT, 10) || 80;
        app.set('port', port);
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log("Server listening at port", port);
        });
    });
}


main();

// Server setup
module.exports = app;
