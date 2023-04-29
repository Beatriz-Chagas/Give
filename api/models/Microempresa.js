const db = require('../db');

const Microempresa = db.sequelize.define('microempresas', {
	id: {
		type: db.Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	nome_dono: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	nome_empresa: {
                type: db.Sequelize.STRING,
		allowNull: false,
		unique: true
        },
	cnpj: {
                type: db.Sequelize.STRING(14),
		allowNull: true,
		unique: true
        },
	cep: {
                type: db.Sequelize.STRING(8),
		allowNull: false,
		unique: true
        },
        categoria: {
                type: db.Sequelize.STRING,
		allowNull: false
        },
	telefone: {
		type: db.Sequelize.STRING(8),
		allowNull: true,
		unique: true
	},
	whatsapp: {
		type: db.Sequelize.STRING(11),
		allowNull: false,
		unique: true
	},
	email: {
		type: db.Sequelize.STRING,
		allowNull: true,
		unique: true
	},
	site: {
		type: db.Sequelize.STRING,
		allowNull: true,
		unique: true
	},
	instagram: {
		type: db.Sequelize.STRING,
		allowNull: true,
                unique: true
	},
	facebook: {
		type: db.Sequelize.STRING,
		allowNull: true,
                unique: true
	},
	descricao: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	senha: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	foto_perfil: {
		type: db.Sequelize.STRING,
		allowNull: false
	}
})

//Microempresa.sync({force: true});

module.exports = Microempresa;
