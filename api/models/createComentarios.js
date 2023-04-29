const db = require('../db');

db.sequelize.query('create table comentarios ( clienteId int, microempresaId int, texto varchar(255) not null, foreign key(clienteId) references clientes(id), foreign key(microempresaId) references microempresas(id));');
