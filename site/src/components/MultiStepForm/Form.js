import React, { useState } from 'react';
import AccountSetup from './AccountSetup';
import SocialProfiles from './SocialProfiles';
import SocialMedia from './SocialMedia';
//import Confirm from './Confirm';
import Success from './Success';


export default function Form(){
    const [state, setState ] = useState(
    {
        name: '',
        companyName: '',
        cnpj: '',
        adress: '',

        email: '',
        phone: '',
        whatsapp: '',
        site: '',

        instagram: '',
        facebook: '',
        description: '',
        password: '',
        category: '',

        photo: '',
    });

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const inputChange = (field, input) => {
        setState({
            ...state, [field]: input
        });
        console.log(state);
    };

    const { 
        name, 
        companyName, 
        cnpj, 
        adress, 
        email, 
        phone, 
        whatsapp, 
        site, 
        instagram, 
        facebook,
        description,
        password,
        category,
        photo

    } = state;
    const values = { 
        name, 
        companyName, 
        cnpj, 
        adress, 
        email, 
        phone, 
        whatsapp, 
        site, 
        instagram, 
        facebook,
        description,
        password,
        category,
        photo
    };

    switch (step) {
        case 1:
            return (
                <AccountSetup
                    nextStep={nextStep}
                    inputChange={inputChange}
                    values={state}
                />
            );
        case 2:
            return (
                <SocialProfiles
                    nextStep={nextStep}
                    prevStep={prevStep}
                    inputChange={inputChange}
                    values={state}
                />
            );
        case 3:
            return (
                <SocialMedia
                    nextStep={nextStep}
                    prevStep={prevStep}
                    inputChange={inputChange}
                    values={state}
                    
                />
            );
        case 4:
            return (
                <Success
                    values={state}
                />
            );
        /*case 4:
            return (
                <Confirm
                    nextStep={nextStep}
                    prevStep={prevStep}
                    values={values}
                />
            );
        */
    }
}

