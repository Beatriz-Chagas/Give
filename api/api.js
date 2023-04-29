const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const avaliacao = require('./routes/avaliacao');
const cliente = require('./routes/cliente');
const comentarios = require('./routes/comentarios');
const empresa = require('./routes/empresa');
const empresas = require('./routes/empresas');
const favoritos = require('./routes/favoritos');

const db = require('./db');
const verificarTokenCliente = require('./helper/auth.js');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express();

app.use(bodyParser.json());
app.use(
	cors({
		origin: 'http://localhost:3000'
	})
);

app.use(express.static('uploads'));

app.get('/', function (req, res) {
	res.send('Elite API');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/cliente', cliente);

app.use('/empresa', empresa);

app.use('/empresas', empresas);

app.use('/avaliacao', avaliacao);

app.use('/comentarios', comentarios);

app.use('/favoritos', favoritos);

app.listen(8080, function () {
	console.log("Elite API");
});
