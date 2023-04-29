import React from 'react';
import { useHistory } from 'react-router-dom';

import './index.css';
import Menu from '../../components/Menu/index';
import logoImg from '../../assets/elite_logo.png';
import svg from '../../assets/innovation.png';
import svg2 from '../../assets/working.png';
import svg3 from '../../assets/phone-svg.png';
import cloud from '../../assets/cloud.png';
import wave from '../../assets/bg.png';

export default function HomePage(){
    const history = useHistory();

    function handleSignUp(){
        history.push('/signup');
    }

    return(
        <div className="containerHome">
            <div className="bg-purple">

            </div>
            <div className="header">
                    <img src={logoImg}/>
                    <Menu/>
                </div>
                <div className="info" id="header-info">
                    <div className="basic-info">
                        <h1>Bem vindo A Elite</h1>
                        <p>Cadastre sua empresa e seja encontrado por vários clientes de forma rápida e prática no nosso aplicativo.</p>
                        <a className="button" onClick={handleSignUp}>Cadastre-se</a>
                    </div>
                    <div className="mockup" id="header-svg">
                        <img src={svg}/>
                    </div>
                </div>
            <div>
           
            <img src={wave} className="wave" />
            <img src={cloud} className="cloud"/>
            <div className="info" id="about-us">
                <div className="mockup" id="about-us-svg">
                        <img src={svg2}/>
                    </div>
                    <div className="basic-info about-us">
                        <h1>Sobre nós</h1>
                        <p>A Elite é uma empresa nova no mercado de trabalho, a qual atua ajudando microempreendedores a se promoverem e conseguirem uma gama maior de clientes por meio do nosso sistema, facilitando a vida de nossos clientes e ajudando a economia de famílias com pessoas que começaram a empreender.</p>
                    </div>
                
                </div>
            </div>
            <img src={cloud} className="cloud cloud2"/>
            <div className="space"></div>
            <div className="info" id="app">
            <img src={wave} className="wave2" />
            <div className="bg-purple2"></div>
                <div className="basic-info app-elite" >
                    <h1>Sobre nosso aplicativo</h1>
                    <p>Nosso software tem a função de cadastrar empresas no nosso sistema, distribuindo-as em uma lista de fácil acesso em nosso aplicativo, onde o cliente conseguirá se comunicar com o microempreendedor por meio do WhatsApp, e outros meios disponíveis no APP.</p>
                </div>
                <div className="mockup" id="cellphone">
                    <img src={svg3}/>
                </div>
            </div>
            
        </div>
    );
}