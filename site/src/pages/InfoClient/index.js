import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Accordion } from 'react-bootstrap';
import { IoMdLogOut } from 'react-icons/io';
import 'react-dom'

import './style.css';

import logoImg from '../../assets/elite_logo.png';
import photoCompany from '../../assets/company_photo.png';
import iconEdit from '../../assets/edit.png';

import InfoGroup1 from '../../components/InfoClient/group1';
import InfoGroup2 from '../../components/InfoClient/group2';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import HomePage from '../HomePage/index';

import { network } from '../../config/network';

export default function Info(){

    const history = useHistory();

    const [empresa, setEmpresa] = useState(null);

    //const location = useLocation();
     useEffect(() => {
        var empresaJSON = localStorage.getItem('@empresa');

        setEmpresa(JSON.parse(empresaJSON));


     }, []);


    async function handleLogOut(){
        await localStorage.removeItem('@token');
        await localStorage.removeItem('@empresa');
        history.push('/');
    }

    function handleEdit(){
        
    }

    if(empresa) {
        return(
            <div className="container-client">
    
                <div className="purple-container">
                    <div className="header-client">
                        <img className="logo" src={logoImg} alt="Logo Elite" />
                        <p>ELITE</p>
                    </div>
    
                    <div className="owner-info">
                        <img 
                            className="company-photo" 
                            src={network.api + '/' + empresa.foto_perfil} 
                            alt="empresa" 
                            
                        />
                        <p>{empresa.nome_empresa}</p>
                        <p className="owner-name">{empresa.nome_dono}</p>
                    </div>
                </div>
               
                
                <div className="info-client">
                    <div className="headerInfo">
                        <a id='a' onClick={handleLogOut}>Sair</a>
                        <a id='aNav' onClick={handleLogOut}>
                            <IoMdLogOut style={{width: '30px', height: '30px'}}/>
                        </a>
                        <h2 id="h2">Suas Informações pessoais</h2>
                    </div>
                    
    
                    <div className="infoContainer">
                        <div className="all-info">
                            <InfoGroup1
                                site = {empresa.site}
                                cep = {empresa.cep}
                                descricao = {empresa.descricao}
                                cnpj = {empresa.cnpj}
                            />
                            <InfoGroup2
                                telefone = {empresa.telefone}
                                instagram = {empresa.instagram}
                                whatsapp = {empresa.whatsapp}
                                facebook = {empresa.facebook}
                            />
    
                        </div>
                    </div>
                   
                    <Accordion className="infoAccordion">
                        <Accordion.Item eventKey="0" className="all-info2" >
                            <Accordion.Header>Informações Pessoais +</Accordion.Header>
                            <Accordion.Body>
                                <div className="all-info">
                                    <InfoGroup1
                                        site = {empresa.site}
                                        cep = {empresa.cep}
                                        descricao = {empresa.descricao}
                                        cnpj = {empresa.cnpj}
                                        className="group1"
                                    />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className="all-info2" >
                            <Accordion.Header>Informações Pessoais +</Accordion.Header>
                            <Accordion.Body>
                                <div className="all-info">
                                    <InfoGroup2
                                        telefone = {empresa.telefone}
                                        instagram = {empresa.instagram}
                                        whatsapp = {empresa.whatsapp}
                                        facebook = {empresa.facebook}
                                        className="group1"
                                    />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    
                    <div className="personal-info edit">
                        <img src={iconEdit} alt="edit" />
                        <a onClick={handleEdit}>Editar</a>
                    </div>
                </div>
    
            </div>
        );
    } else {
        return (
            <HomePage />
        )
    }
    
}