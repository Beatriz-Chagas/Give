import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Menu from '../../components/Menu/index';

import './style.css';

import logoImg from '../../assets/elite_logo.png';
import loginImg from '../../assets/loginImg.png';

import { network } from '../../config/network';

export default function Logon(){
    const history = useHistory();
    
    const [nome_empresa, setNomeEmpresa] = useState('');
    const [senha, setSenha] = useState('');
    const [text, setText] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            await fetch(network.api + '/empresa/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome_empresa: nome_empresa,
                    password: senha
                })
            })
            .then(response => response.json())
            .then(async data => {
                try {
                    await localStorage.setItem('@token', data.token);
                    await localStorage.setItem('@empresa', JSON.stringify(data.result));
                    history.push({ pathname: '/info' });
                } catch (e) {
                    // saving error
                }
            })
            
        }catch(err){
            //
        } 

    }

     /*function handleLogin(e){
        history.push('/info');
     }*/

    return(
        <div className="containerLogin">
            <div className="header">
                    <img src= {logoImg} alt="Elite" />
                    <Menu/>
                </div>
            <div className="logon-conteiner">
                <img className="loginImg" src = {loginImg} alt="Login"/>

                <section className="form">
                    <form onSubmit={(e) => handleLogin(e)}>
                        <h1>Login</h1>

                        <p className="labelInfo">Nome da empresa</p>
                        <input 
                            className="input"
                            type = "text" placeholder="Nome da sua empresa"
                            //value = {id}
                            onChange = {(e) => setNomeEmpresa(e.target.value)} //pega o valor do campo
                        />

                        <p style={{marginTop: 20, marginBottom: 2}} className="labelInfo">Senha</p>
                        <input className="input link" type = "text" placeholder="Digite sua senha"
                        onChange = {(e) => setSenha(e.target.value)} />
                        <button className="button1 " type = "submit">Entrar</button>

                        <Link className = "back-link" to="/signup">    
                            Não tenho cadastro
                        </Link>
                    </form>
                    <a>{text}</a>
                </section>

                
            </div>
        </div>
    );
}
