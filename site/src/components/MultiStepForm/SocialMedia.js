import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/logo-purple.png';
import '../../pages/SignUp/style.css';

export default function SocialMedia(props){
    const history = useHistory();

    const submit = e => {
        e.preventDefault();
        props.nextStep();
    }
    const back = e => {
        e.preventDefault();
        props.prevStep();
    }
   
        const { values, inputChange } = props;

        return (
        <div className='form-content-right'>
            
            <form onSubmit={submit} className='form-signup '>
            
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
                    name='instagram'
                    placeholder='Instagram(Opcional)'
                    onChange={(e) => inputChange('instagram', e.target.value)} 
                    value={values.instagram}
                />
                </div>
                <div className='form-inputs'>

                <input
                    className='form-input'
                    type='text'
                    name='facebook'
                    placeholder='Facebook(Opcional)'
                    onChange={(e) => inputChange('facebook', e.target.value)} 
                    value={values.facebook}
                />
                
                </div>
                <div className='form-inputs'>
                <textarea 
                    className='textArea'
                    name='description'
                    placeholder='Breve descrição sobre sua empresa'
                    onChange={(e) => inputChange('description', e.target.value)} 
                    value={values.description}
                    >

                </textarea>
                
                </div>
                <div className='form-inputs'>
                
                    <input className='file' id="file" class="pg-2" type="file" accept="image/*"
                    onChange={(e) => inputChange('photo', e.target.files[0])} />
                    <label for="file">
                        Escolha uma foto
                    </label>
                       
                    
                        
                </div>
                
                <div className="buttonsForm">
                    <button onClick={back}>
                        Voltar
                    </button>
                    <button onClick={submit}>
                        Cadastrar
                    </button>
               </div>
            </form>
            </div>

        )
}

