const jwt = require('jsonwebtoken');

const verificarTokenCliente = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if(!token) {
		res.send('Yo, Precisamos do token de autentificação!')
	} else {
		jwt.verify(token, 'jwtSecret', (err, decoded) => {
			if(err) {
				res.json({auth: false, message: 'Falha ao autentificar-se!'});
			} else {
				req.userId = decoded.id;
				next();
			}
		});
	}
}

module.exports = verificarTokenCliente
