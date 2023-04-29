import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/logo-purple.png';
import { Input } from 'reactstrap';
import '../../pages/SignUp/style.css';

export default function SocialProfiles(props){
    const go = e => {
        e.preventDefault();
        props.nextStep();
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    const history = useHistory();

    function handleSubmit(){
        
    }

    function handleLogin(){
        history.push('/login');
    }

   
        const { values, inputChange } = props;

        return (
        <div className='form-content-right'>
            
            <form onSubmit={handleSubmit} className='form-signup '>
            
                <div className="header-logo-img">
                <img src={Logo} />
                    <h1 className="title-form">
                    ELITE
                    </h1>
                </div>
                <div className='form-inputs'>
                <input
                    className='form-input'
                    type='text'
                    name='phone'
                    placeholder='Telefone'
                    onChange={(e) => inputChange('phone', e.target.value)} 
                    value={values.phone}
                />
                </div>
                <div className='form-inputs'>

                <input
                    className='form-input'
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={(e) => inputChange('email', e.target.value)} 
                    value={values.email}
                />
                
                </div>
                <div className='form-inputs'>
                <input
                    className='form-input'
                    type='text'
                    name='whatsapp'
                    placeholder='WhatApp'
                    onChange={(e) => inputChange('whatsapp', e.target.value)} 
                    value={values.whatsapp}
                />
                
                </div>
                <div className='form-inputs'>
                <input
                    className='form-input'
                    type='text'
                    name='site'
                    placeholder='Site(Opcional)'
                    onChange={(e) => inputChange('site', e.target.value)} 
                    value={values.site}
                />
               
               <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Senha"
                    type="password"
                    onChange={(e) => inputChange('password', e.target.value)} 
                    value={values.password}
                />

                </div>
               <div className="buttonsForm">
                    <button onClick={back}>
                        Voltar
                    </button>
                    <button onClick={go}>
                        Próximo
                    </button>
               </div>
                
            </form>
            </div>

        )
}

