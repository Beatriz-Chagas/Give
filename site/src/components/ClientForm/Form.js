import React, { useState } from 'react';
import { Input } from 'reactstrap';
import { network } from '../../config/network';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/logo-purple.png';

export default function Form(){
    const history = useHistory();

    const [name, setName] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [message, setMessage] = useState(null);

    const handleName = (event) => {
        setName(event.target.value);
      };
      const handleLastName = (event) => {
        setLastname(event.target.value);
      };
      const handleEmail = (event) => {
        setEmail(event.target.value);
      };

       const handlePassword = (event) => {
        setPassword(event.target.value);
      };

      function handleHome(){
        history.push('/');
    }
    const register = async () => {
        if(name || lastname || email || password) {
          await fetch(network.api + '/cliente/cadastro', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              lastname: lastname,
              email: email,
              password: password
            })
          })
          .then(response => response.json())
            .then( async data => {
                if(data.token && data.result) {
                    await localStorage.setItem('@token', data.token);
                    await localStorage.setItem('@cliente', JSON.stringify(data.result));
                    history.push({ pathname: '/info' });
                } else {
                    setMessage(data.message);
                }
               
            })

        } 
      }

    return (
        <div className='form-content-right'>
            
            <form onSubmit={register} className='form-signup '>
            
                <div className="header-logo-img" onClick={handleHome}>
                <img src={Logo} />
                    <h1 className="title-form">
                    GIVE
                    </h1>
                </div>
                <div className='form-inputs'>
                <input
                    className='form-input'
                    type='text'
                    name='name'
                    placeholder='Nome'
                    onChange={handleName} 
                />
                </div>
                <div className='form-inputs'>
                <input
                    className='form-input'
                    type='text'
                    name='lastname'
                    placeholder='Sobrenome'
                    onChange={handleLastName} 
                />
                
                </div>
                <div className='form-inputs'>

                <input
                    className='form-input'
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={handleEmail} 
                />
                
                </div>
                
                <div className='form-inputs'>
               <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Senha"
                    type="password"
                    onChange={handlePassword} 
                />

                </div>
                <div className="buttonsForm">
                    <button onClick={register} style={{width: "345px", marginLeft: "-10px"}}>
                        Cadastrar
                    </button>
               </div>
                
            </form>
            </div>
   )
}

