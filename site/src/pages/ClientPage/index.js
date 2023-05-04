import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Accordion } from 'react-bootstrap';
import { IoMdLogOut } from 'react-icons/io';
import 'react-dom'
import userPhoto from "../../assets/avatar.png"
import logoImg from '../../assets/elite_logo.png';
import photoCompany from '../../assets/company_photo.png';
import iconEdit from '../../assets/edit.png';

import InfoGroup1 from '../../components/InfoClient/group1';
import InfoGroup2 from '../../components/InfoClient/group2';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import HomePage from '../HomePage/index';

import { network } from '../../config/network';

import "./index.css";

export default function ClientPage(){

    const history = useHistory();

    const [empresa, setEmpresa] = useState(null);

    //const location = useLocation();
     useEffect(() => {
        var empresaJSON = localStorage.getItem('@cliente');

        setEmpresa(JSON.parse(empresaJSON));


     }, []);


    async function handleLogOut(){
        await localStorage.removeItem('@token');
        await localStorage.removeItem('@cliente');
        history.push('/');
    }

    function handleEdit(){
        
    }

    if(empresa) {
        return(
            <div className="container-client">
    
                <div className="purple-container">
                    <div className="header-client">
                        <img className="logo" src={logoImg} alt="Logo Give" />
                        <p>GIVE</p>
                    </div>
    
                    <div className="owner-info">
                    <img 
                            className="company-photo" 
                            src={userPhoto} 
                            style={{marginLeft: "-35%", width: "230px", marginBottom: "5%"}}
                            alt="empresa" 
                            
                        />
                        <p>{empresa.name}</p>
                        <p className="owner-name">{empresa.lastname}</p>
                        <p className="owner-name">{empresa.email}</p>
                    </div>
                </div>
               
                
                <div className="info-client">
                    <div className="headerInfo" style={{marginTop: "-45%"}}>
                        <a id='a' onClick={handleLogOut}>Sair</a>
                        <a id='aNav' onClick={handleLogOut}>
                            <IoMdLogOut style={{width: '30px', height: '30px', marginTop:"400px"}}/>
                        </a>
                        
                    </div>
                    
                    <h2 id="h2">Empresas favoritas</h2>
                    <div className="infoContainer">
                        <div className="all-info" style={{display: "flex", flexDirection: "column", marginBottom: "-5%", marginBottom: "-5%"}}>
                           <div className="empresasFav">
                                <h3>Lotus Enterprise</h3>
                                <p>LOTUS cria soluções inovadoras para transformar o dia a dia das empresas e ajudá-las a superar os desafios de seus negócios.</p>
                           </div>
                           <div className="empresasFav">
                                <h3>Mário Cars</h3>
                                <p>Desde 1935 quando o primeiro Jaguar foi produzido, nós desafiamos os limites do possível, inspirados pelo nosso fundador.</p>
                           </div>
                           <div className="empresasFav">
                                <h3>Rocket</h3>
                                <p>A loja certa com as melhores roupas para você entrar na moda e se sentir na sua melhor versão.</p>
                           </div>
                        
                        </div>
                    </div>
                   
                    <Accordion className="infoAccordion">
                        <Accordion.Item eventKey="0" className="all-info2" >
                            <Accordion.Header>Informações Pessoais +</Accordion.Header>
                            <Accordion.Body>
                                <div className="all-info">
                                    <InfoGroup1
                                        site = {empresa.name}
                                        cep = {empresa.lastname}
                                        descricao = {empresa.email}
                                        cnpj = {empresa.lastname}
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