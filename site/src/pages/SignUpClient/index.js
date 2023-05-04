import React from 'react';
import FormSignup from '../../components/ClientForm/Form';
import Menu from '../../components/Menu';
import './index.css';

export default function SignUpClient(){
  return (
    <div className="bg-form">
       
      <div className='form-container'>
      
        <FormSignup />
        <div className='form-content-left'>
          
        </div>
        
      </div>
    </div>
  );
};


