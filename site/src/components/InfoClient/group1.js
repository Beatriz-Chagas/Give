import React from 'react';

import iconInternet from '../../assets/internet.png';
import iconEndereco from '../../assets/endereco.png';
import iconDescicao from '../../assets/descricao.png';
import iconCnpj from '../../assets/cnpj.png';

import './infoClient.css';


export default function InfoGroup1(props){

    const site = props.site;
    const cep = props.cep;
    const descricao = props.descricao;
    const cnpj = props.cnpj;

    return(

        <div id="group-1">
            <div>
                <div className="personal-info">
                    <img className="img-group1" src={iconInternet} alt="site" />
                    <p>{site}</p>
                </div>

                <div className="line"></div>

                <div className="personal-info">
                    <img className="img-group1" src={iconEndereco} alt="site" />
                    <p>{cep}</p>
                </div>

                <div className="line"></div>
            </div>

            <div>
                <div className="personal-info">
                    <img className="img-desc" src={iconDescicao} alt="site" />
                    <p className="info-desc">{descricao}</p>
                </div>

                <div className="line"></div>

                <div className="personal-info">
                    <img className="img-group1" src={iconCnpj} alt="site" />
                    <p>{cnpj}</p>
                </div>
                
                <div className="line"></div>
            </div>
           
        </div>

                
    );
}