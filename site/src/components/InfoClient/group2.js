import React, { useState } from 'react';

import iconPhone from '../../assets/phone.png';
import iconInsta from '../../assets/instagram.png';
import iconWhats from '../../assets/whatsapp.png';
import iconUser from '../../assets/user.png';


export default function InfoGroup2(props){
    const telefone = props.telefone;
    const instagram = props.instagram;
    const facebook = props.facebook;
    const whatsapp = props.whatsapp;

    return(

        <div id="group-2">
            <div>
                <div className="personal-info">
                    <img src={iconPhone} alt="site" />
                    <p>{telefone}</p>
                </div>

                <div className="line"></div>

                <div className="personal-info">
                    <img src={iconInsta} alt="site" />
                    <p>{instagram}</p>
                </div>

                <div className="line"></div>
            </div>
            <div>
                <div className="personal-info">
                    <img src={iconWhats} alt="site" />
                    <p>{whatsapp}</p>
                </div>

                <div className="line"></div>

                <div className="personal-info">
                    <img src={iconUser} alt="site" />
                    <p>{facebook}</p>
                </div>

                <div className="line"></div>
            </div>

            

        </div>

    );
}