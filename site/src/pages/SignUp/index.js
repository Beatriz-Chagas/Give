import React from 'react';
import FormSignup from '../../components/MultiStepForm/Form';
import Menu from '../../components/Menu';
import {Link, useHistory} from 'react-router-dom';
import './style.css';

export default function FormSignUp(){
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


