const db = require('../db');

const Avaliacao = db.sequelize.define("avaliacoes", {
	nota: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	}
});

//Avaliacao.sync({force: true});

module.exports = Avaliacao;
