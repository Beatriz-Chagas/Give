const db = require('../db')

const Avaliacao = require('./Avaliacao');

const Microempresa = require('./Microempresa');

const Cliente = db.sequelize.define('cliente', {
	id: {
		type: db.Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
    	},
    	name: {
        	type: db.Sequelize.STRING,
		allowNull: false
	},
    	lastname: {
        	type: db.Sequelize.STRING,
		allowNull: false
    	},
    	email: {
        	type: db.Sequelize.STRING,
    		allowNull: false,
		unique: true
    	},
    	password: {
		type: db.Sequelize.STRING,
		allowNull: false
	}
})

Cliente.belongsToMany(Microempresa, {
	through: 'avaliacoes',
	foreignKey: 'clienteId',
	constraint: true
});

Microempresa.belongsToMany(Cliente, {
	through: 'avaliacoes',
	foreignKey: 'microempresaId',
	constraint: true
});

Cliente.belongsToMany(Microempresa, {
        through: 'favoritos',
        foreignKey: 'clienteId',
        //constraint: true
});

Microempresa.belongsToMany(Cliente, {
        through: 'favoritos',
        foreignKey: 'microempresaId',
        //constraint: true
});

//db.sequelize.sync({force: true})

module.exports = Cliente;
