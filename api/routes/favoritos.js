const express = require('express');
const router = express.Router();

const db = require('../db');
const verificarTokenCliente = require('../helper/auth.js');

router.get('/consulta/:clienteid/:microempresaid', verificarTokenCliente, async (req, res) => {
	const [results, metadata] = await db.sequelize.query('SELECT * from favoritos where clienteId = ' + req.params.clienteid + ' and microempresaId = ' + req.params.microempresaid + ';');

	if(results.length < 1) {
		res.json({favoritado: false});
	} else {
		res.json({favoritado: true});
	}
})

router.get('/lista/:clienteid', verificarTokenCliente, async (req, res) => {
	const [results, metadata] = await db.sequelize.query('SELECT id, nome_empresa, cep, categoria, telefone, whatsapp, email, site, instagram, facebook, descricao, foto_perfil from microempresas join favoritos on microempresas.id = favoritos.microempresaId where favoritos.clienteId = ' + req.params.clienteid + ';');
	
	if(results) {
		res.json(results);
	} else {
		res.status(500);
	}
})

router.post('/atribuicao', verificarTokenCliente, async (req, res) => {
	const [results, metadata] = await db.sequelize.query('SELECT * from favoritos where clienteId = ' + req.body.clienteId + ' and microempresaId = ' + req.body.microempresaId + ';');

	if(results.length < 1) {
		await db.sequelize.query('insert into favoritos values (now(), now(), ' + req.body.clienteId + ', ' + req.body.microempresaId + ');');
        	res.send('Favoritado');
	} else {
		await db.sequelize.query('delete from favoritos where clienteId = ' + req.body.clienteId + ' and microempresaId = ' + req.body.microempresaId + ';');
        	res.send('Desfavoritado');
	}
})

module.exports = router

