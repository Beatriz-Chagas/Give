import { Alert } from 'bootstrap';
import React, { useEffect , useState } from 'react'

import { Link, useHistory } from 'react-router-dom';

import { network } from '../../config/network';

export default function Success(props) {

    const history = useHistory();

    const [message, setMessage] = useState(null);
    
    const { values } = props;

    const formData = new FormData();

    formData.append('nome_dono', values.name);
    formData.append('nome_empresa', values.companyName);
    formData.append('cnpj', values.cnpj);
    formData.append('cep', values.adress);
    formData.append('categoria', values.category);
    formData.append('telefone', values.phone);
    formData.append('whatsapp', values.whatsapp);
    formData.append('email', values.email);
    formData.append('site', values.site);
    formData.append('instagram', values.instagram);
    formData.append('facebook', values.facebook);
    formData.append('descricao', values.description);
    formData.append('senha', values.password);
    formData.append('photo', values.photo);

    useEffect(() => {
        //console.log(values);

        const storeData = async () => {
            await fetch(network.api + '/empresa/cadastro', {
                method: 'post',
                body: formData
            })
            .then(response => response.json())
            .then( async data => {
                if(data.token && data.result) {
                    await localStorage.setItem('@token', data.token);
                    await localStorage.setItem('@empresa', JSON.stringify(data.result));
                    history.push({ pathname: '/info' });
                } else {
                    setMessage(data.message);
                }
               
            })
        }

        storeData();
    
    }, [])

    return (
        <div>
            <h1 className="text-white">{message}</h1>
        </div>
    )
}
