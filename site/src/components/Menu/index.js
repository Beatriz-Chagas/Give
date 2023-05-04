import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import {MdOutlineLogin} from 'react-icons/md';
import { IoIosCreate } from 'react-icons/io'
import './index.css';


export default function Menu(){
    const history = useHistory();

    function handleLogin(){
        history.push('/login');
    }
    function handleHome(){
        history.push('/');
    }
    function handleRegister(){
        history.push('/signup');
    }
   


    return(
        <div className="containerNavMenu">
            <div className="containerMenu">
                <div className="menu">
                    <a className="menu-link" onClick={handleHome}>Home</a>
                    <a className="menu-link" href="">Give</a>
                    <a className="menu-link" href="">Aplicativo</a>
                    <a className="menu-link" onClick={handleRegister}>Cadastro</a>
                    <a className="menu-link login" onClick={handleLogin}>Login</a>
                   
                </div>
                
            </div>
            <div className="navBar">
                <button id='btnMenu' onClick={handleHome}>
                    <FaHome style={{width: 30, height: 30, color: 'white'}}/>
                </button>
                <button id='btnMenu' onClick={handleLogin}>
                    <MdOutlineLogin style={{width: 30, height: 30, color: 'white'}}/>
                </button>
                <button id='btnMenu' onClick={handleRegister}>
                    <IoIosCreate style={{width: 30, height: 30, color: 'white'}}/>
                </button>
            </div>
        </div>
       
    );
}