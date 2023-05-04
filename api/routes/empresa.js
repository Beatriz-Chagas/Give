const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const router = express.Router();
const { uuid } = require('uuidv4')

const Microempresa = require('../models/Microempresa');

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/',
    filename(req, file, callback) {
      const fileName = `${uuid()}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
})

router.post('/cadastro', upload.single('photo'), async (req, res) => {
	try {
		const { filename, size } = req.file;
	  
	  	const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.senha, salt);

		await Microempresa.create({
			nome_dono: req.body.nome_dono,
			nome_empresa: req.body.nome_empresa,
			cnpj: req.body.cnpj?req.body.cnpj:null,
			cep: req.body.cep,
			categoria: req.body.categoria,
			telefone: req.body.telefone?req.body.telefone:null,
			whatsapp: req.body.whatsapp,
			email: req.body.email?req.body.email:null,
			site: req.body.site?req.body.site:null,
			instagram: req.body.instagram?req.body.instagram:null,
			facebook: req.body.facebook?req.body.facebook:null,
			descricao: req.body.descricao,
			senha: hashedPassword,
			foto_perfil: filename
		}).catch(function(erro) {
			console.log(erro);
		        res.send('Houve um erro');
		});
		

		const result = await Microempresa.findOne({attributes: ['id', 'nome_dono', 'nome_empresa', 'cnpj', 'cep', 'categoria', 'telefone', 'whatsapp', 'email', 'site', 'instagram', 'facebook', 'descricao', 'foto_perfil'], where: {nome_empresa: req.body.nome_empresa}});

		if (result) {
		        const id = result.id
		        const token = jwt.sign({id}, 'jwtSecret', {
		                expiresIn: '30d',
		        });

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
		const nome_empresa = req.body.nome_empresa;
		const password = req.body.password;

		const result = await Microempresa.findOne( { where: {nome_empresa: nome_empresa} } );

		if (result) {
			if(await bcrypt.compare(password, result.senha)) {	
				const id = result.dataValues.id
		                const token = jwt.sign({id}, 'jwtSecret', {
		                        expiresIn: '30d',
		                });
		                
		                await delete result['senha'];

		               	res.json({auth: true, token: token, result: result});
			} else {
				res.send({message: 'Nome/senha errados!'});
			}	
		} else {
			res.send({message: 'Usuário não existe'});
		}
	} catch (e) {
		res.status(404);
	}
})

const verificarTokenEmpresa = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if(!token) {
		res.send('Yo, Precisamos do token de autentificação!')
	} else {
		jwt.verify(token, 'jwtSecret', (err, decoded) => {
			if(err) {
				res.json({auth: false, message: 'Falha ao autentificar-se!'});
			} else {
				req.empresaId = decoded.id;
				next();
			}
		});
	}
}

module.exports = router
