const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const session = require('express-session');

const verificarTokenCliente = require('../helper/auth.js');

const Cliente = require('../models/Cliente');

router.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

router.post('/cadastro', async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		await Cliente.create({
		        name: req.body.name,
		        lastname: req.body.lastname,
		        email: req.body.email,
		        password: hashedPassword
		}).catch(function(erro) {
			console.log(erro);
		        res.json({mensagem: 'Houve um erro'});
		});

		const result = await Cliente.findOne({ attributes: ['id', 'name', 'lastname', 'email'] , where: {email: req.body.email} });

		if (result) {
		        const id = result.id
		        const token = jwt.sign({id}, 'jwtSecret', {
		        	expiresIn: '30d',
		        });

		        req.session.user = result;

		        res.json({auth: true, token: token, result: result});
		} else {
		        res.status(500);
		}
	} catch (e) {
		res.status(404);
	}
});

router.post('/login', async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		const result = await Cliente.findOne({ where: {email: email} });

		if (result) {
			if(await bcrypt.compare(password, result.password)) {	
				const id = result.id
		                const token = jwt.sign({id}, 'jwtSecret', {
		                        expiresIn: '30d',
		                });
				
				req.session.user = result;
				
				delete result['password'];

		               	res.json({auth: true, token: token, result: result});
			} else {
				console.log("Nome/senha errados!");
				res.json({message: 'Nome/senha errados!'});
			}	
		} else {
			console.log("Usuário não existe");
			res.json({auth: false, message: 'Usuário não existe'});
		}
	} catch (e) {
		res.status(404);
	}
	
});

router.get('/dados', verificarTokenCliente, (req, res) => {
        return res.json({
		id: req.session.user.id,
		name: req.session.user.name,
		lastname: req.session.user.lastname,
		email: req.session.user.email
	});
});

module.exports = router
