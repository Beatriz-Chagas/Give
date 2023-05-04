const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Conexão com o banco de dados MySQL
const sequelize = new Sequelize("give", "root", "", {

	host: 'localhost',
	dialect: 'mysql'

});

module.exports = {

    Sequelize: Sequelize,
    sequelize: sequelize

}
