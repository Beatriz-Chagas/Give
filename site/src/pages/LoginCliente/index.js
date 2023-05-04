import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Menu from '../../components/Menu/index';

import logoImg from '../../assets/elite_logo.png';
import loginImg from '../../assets/loginClientImg.svg';

import { network } from '../../config/network';

export default function LoginCliente(){
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value);
      };

       const handlePassword = (event) => {
        setPassword(event.target.value);
      };
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            await fetch(network.api + '/cliente/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(async data => {
                try {
                    await localStorage.setItem('@token', data.token);
                    await localStorage.setItem('@cliente', JSON.stringify(data.result));
                    history.push({ pathname: '/clientHome' });
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
                        <h1>Login Cliente</h1>

                        <p className="labelInfo">Email</p>
                        <input 
                            className="input"
                            type = "text" placeholder="exemplo@gmail.com"
                            //value = {id}
                            onChange = {handleEmail} //pega o valor do campo
                        />

                        <p style={{marginTop: 20, marginBottom: 2}} className="labelInfo">Senha</p>
                        <input className="input link" type = "password" placeholder="Digite sua senha"
                        onChange = {handlePassword} />
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
