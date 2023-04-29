const express = require('express');
const router = express.Router();

const db = require('../db');

const Microempresa = require('../models/Microempresa');

router.get('/lista/:categoria', async (req, res) => {
        const empresas = await Microempresa.findAll({attributes: ['id', 'nome_empresa', 'cep', 'categoria', 'telefone', 'whatsapp', 'email', 'site', 'instagram', 'facebook', 'descricao', 'foto_perfil'], where: {categoria: req.params.categoria}});
        return res.json(empresas);
})

router.get('/consulta/destaque', async (req, res) => {
        const [results, metadata] = await db.sequelize.query("select m.id, m.nome_empresa, m.cep, m.categoria, m.telefone, m.whatsapp, m.email, m.site, m.instagram, m.facebook, m.descricao, m.foto_perfil, AVG(a.nota) from avaliacoes as a join microempresas as m on m.id = a.microempresaId group by a.microempresaId order by AVG(a.nota) desc limit 10");

        //console.log(results.microempresaId);

        res.json(results);

})

router.get('/lista/:categoria/:nome', async (req, res) => {
        const [results, metadata] = await db.sequelize.query("SELECT id, nome_empresa, cep, categoria, telefone, whatsapp, email, site, instagram, facebook, descricao, foto_perfil from microempresas where categoria = '" + req.params.categoria  + "' and nome_empresa like '%" + req.params.nome + "%';");

        if(results) {
                res.json(results);
        } else {
                res.json({message: 'erro'});
        }
})


module.exports = router
