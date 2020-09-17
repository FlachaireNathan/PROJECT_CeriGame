console.log('Server Starting...');

const express = require("express");
const {
  Client
} = require("pg"); // used to use pgsql with js
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const path = require("path"); //used for static directory path

//const members = require("./Members"); How to import oother js files

const PORT = 3015;

const app = express();


////console.log(path.join(__dirname, 'CERIGame/app/views'));

// View Engine
app.set(path.join(__dirname, 'CERIGame/app/views'));
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'CERIGame/app/views')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// Get username and password from login page
app.post('/api/login', function (request, response) {
  console.log("Body id : " + request.body.id);
  console.log("Body mdp : " + request.body.mdp);

  var identifiant = request.body.id;
  var motdepasse = request.body.mdp;

  if (identifiant == null) {
    console.log("ERREUR: Identifiant est null.");
    return;
  }

  if (motdepasse == null) {
    console.log("ERREUR: Motdepasse est null.");
    return;
  }

  client = createClient();
  client.connect()
  client.query(`SELECT * from basic1 where identifiant='${identifiant}' and motpasse='${motdepasse}'`, (err, res) => {
    response.send(res.rows);
    client.end();
  })

  return;
  /*
  try {
    console.log("Trying to use printTable function.");
    await client.connect();
    await client.query("BEGIN");
    console.log("Connected successfully.");
    results = await client.query(`select * from basic1 where identifiant='${id}' and motpasse='${mdp}'`);
    console.log((results.rows));
    await client.query("COMMIT");

  } catch (e) {
    console.log(`Something wrong happened ${e}`);
    await client.query("ROLLBACK");
  } finally {
    await client.end();
    console.log("Client disconnected successfully");
  }
  */

});




function createClient() {
  const client = new Client({
    user: "postgres",
    password: "Cheerio!",
    host: "localhost",
    port: 5432, // It's 3015 on uni database
    database: "basic"
  });

  return client;
}






async function printTable() {

  client = createClient();

  try {
    console.log("Trying to use printTable function.");
    await client.connect();
    await client.query("BEGIN");
    console.log("Connected successfully.");
    const results = await client.query("select * from basic1");
    console.log((results.rows));
    await client.query("COMMIT");

  } catch (e) {
    console.log(`Something wrong happened ${e}`);
    await client.query("ROLLBACK");
  } finally {
    await client.end();
    console.log("Client disconnected successfully");
  }
}

async function addMember(identifiant, motpasse, nom, prenom, date_de_naissance, statut, humeur) {

  if (identifiant == null) {
    console.log("Identifiant est null. Impossible d'ajouter ce membre.");
    return;
  }

  client = createClient();

  try {
    console.log("Trying to use addMember function.");
    await client.connect();
    await client.query("BEGIN");
    console.log("Connected successfully.");
    await client.query(`INSERT INTO basic1 (identifiant, motpasse, nom, prenom, date_de_naissance, statut, humeur) VALUES ('${identifiant}', '${motpasse}', '${nom}', '${prenom}', TO_DATE('${date_de_naissance}', 'DD/MM/YYYY'), '${statut}', '${humeur}'); `);
    await client.query("COMMIT");
    console.log("Member added successfully.");
  } catch (e) {
    console.log(`Something wrong happened ${e}`);
    await client.query("ROLLBACK");
  } finally {
    await client.end()
    console.log("Client disconnected successfully");
    printTable();
  }
}


async function deleteMember(identifiant) {

  if (identifiant == null) {
    console.log("Identifiant est null. Impossible de supprimer ce membre.");
    return;
  }

  client = createClient();

  try {
    console.log("Trying to use addMember function.");
    await client.connect();
    await client.query("BEGIN");
    console.log("Connected successfully.");
    await client.query(`DELETE FROM basic1 WHERE identifiant='${identifiant}'`);
    await client.query("COMMIT");
    console.log("Member added successfully.");
  } catch (e) {
    console.log(`Something wrong happened ${e}`);
    await client.query("ROLLBACK");
  } finally {
    await client.end()
    console.log("Client disconnected successfully");
    printTable();
  }
}