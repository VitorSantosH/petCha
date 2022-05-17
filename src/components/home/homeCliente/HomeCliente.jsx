import React from "react";
import {Link } from 'react-router-dom'

import './HomeCliente.css';

import imgTitulo from '../../../assets/Layer 1.png';
import donwloadGoogle from '../../../assets/DownloadGoogle.png';
import downloadApple from '../../../assets/DownloadApple.png';

const HomeCliente = () => {

    

    return (
        <div className="HomeCliente">

            <Link to={'/'} className="btnSairHomeCliente" >
                <span>
                    Sair 
                </span>
            </Link>

            <div className="bannerHomeCliente">

                <img src={imgTitulo} id='imgTituloBannerCliente' alt="" />

                <h2>
                    Para ter acesso a todas as funcionaliodades 
                </h2>
                <h2>
                    da PetCha, acesse o nosso aplicativo!
                </h2>

                <div className="linksHomeCliente">

                    <img src={donwloadGoogle} alt="" />
                    <img src={downloadApple} alt="" />

                </div>

            </div>


        </div>
    )
}


export default HomeCliente;