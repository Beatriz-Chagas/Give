const express = require('express');
const router = express.Router();

const verificarTokenCliente = require('../helper/auth.js');

const Avaliacao = require('../models/Avaliacao');

router.get('/consulta/:clienteid/:microempresaid', verificarTokenCliente, async (req, res) => {
        const result = await Avaliacao.findOne({where: {
        	clienteId: req.params.clienteid,
                microempresaId: req.params.microempresaid
        }});

        if(!result) {
                return res.json({nota: 0});
        } else {
                return res.json(result);
        }
})

router.post('/publicacao', verificarTokenCliente, async (req, res) => {
        const result = await Avaliacao.findOne({where: {
                clienteId: req.body.clienteId,
		microempresaId: req.body.microempresaId
        }});

        if(!result) {
                Avaliacao.create({
                	nota: req.body.nota,
                	clienteId: req.body.clienteId,
                	microempresaId: req.body.microempresaId
        	}).then(function() {
                	return res.json({nota: req.body.nota});
			//res.send('Funcionou');
        	}).catch(function(erro) {
                	//res.send('Houve um erro: ' + erro)
        	});
        } else {
                Avaliacao.update(
			{nota: req.body.nota},
			{where: {clienteId: req.body.clienteId,
				microempresaId: req.body.microempresaId
			}}
		).then(function() {
			return res.json({nota: req.body.nota});
		});
        }
})

module.exports = router
