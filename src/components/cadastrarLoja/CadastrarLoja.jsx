import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format'
import api from '../../services/api';

import './CadastrarLoja.css';


import logoTitulo from '../../assets/Layer 1.png';
import img1 from '../../assets/amico.png';
import imglogoWhite from '../../assets/logoWhite.png'


const UseLoginState = () => {

    const [stateLogin, setStateLogin] = useState({
        stateTypePassword: true,
        stateEmailStyle: true,
        emailValue: undefined,
        name: undefined,
        telefoneValue: undefined,
        formatedTel: undefined,
        display: "none",
        isLog: false,
        styleCadBtn: false,
        isPreenchido: undefined

    })

    useEffect(() => {


        if (stateLogin.emailValue != "master@gmail.com" && stateLogin.emailValue !== undefined && stateLogin.emailValue !== '') {
            setStateLogin({
                ...stateLogin,
                stateEmailStyle: false
            })
        } else {
            setStateLogin({
                ...stateLogin,
                stateEmailStyle: true
            })
        }

        if(stateLogin.telefoneValue != undefined && stateLogin.name != undefined && stateLogin.emailValue != undefined) {
            console.log('aqui')
            setStateLogin({
                ...stateLogin,
                styleCadBtn: true 
            })
        } else {
           
            setStateLogin({
                ...stateLogin,
                styleCadBtn: false 
            })

        }

    }, [stateLogin.emailValue, stateLogin.display, stateLogin.emailValue, stateLogin.telefoneValue, stateLogin.name ])

    function conect() {

        api.post('/Agenda_WS/Prospect/insertOtpProspectStore', {
            codOwner: 26,
            prospectEmail: 'wytorh@gmail.com',
            codLanguage: "PT"

        },
            {
                headers: {
            
                }
            }
          
        ).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    }

    function chanceTypeInput() {
        setStateLogin({
            ...stateLogin,
            stateTypePassword: !stateLogin.stateTypePassword
        })
    }

    function changeEmailValue(v) {
        setStateLogin({
            ...stateLogin,
            emailValue: v
        })
    }

    function changeNameValue(v) {
        setStateLogin({
            ...stateLogin,
            name: v
        })
    }

    function changeTelValue(formattedValue, value) {
        console.log(stateLogin)
        setStateLogin({
            ...stateLogin,
            telefoneValue: value ,
            formatedTel: formattedValue
        })
    }


    return {
        stateLogin,
        chanceTypeInput,
        changeEmailValue,
        conect,
        changeNameValue,
        changeTelValue,
        
    }

}




const CadastrarLoja = () => {

    const {
        stateLogin,
        changeEmailValue,
        conect,
        changeNameValue,
        changeTelValue,
        

    } = UseLoginState()



    return (
        <div className="loginUser">


            <div className="lado1">
                <img src={logoTitulo} id='img1' alt="" />
                <img src={img1} id='img2' alt="" />
            </div>

            <img src={imglogoWhite} id='logoWhiteLogin' alt="" />

            <div className="lado2">

                <div className="login">

                    <h1 className="titulo">
                        Cadastrar loja
                    </h1>

                    <div className="emailLogin">
                        <label htmlFor="email">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Digite seu E-mail"
                            // style={{ 'borderColor': stateLogin.stateEmailStyle ? '' : '#EE3B3B' }}
                            value={stateLogin.name}
                            onChange={e => {

                                changeNameValue(e.target.value)
                            }}

                        />

                        {/** <span className="spanErro" style={{ 'color': stateLogin.stateEmailStyle ? '' : '#EE3B3B', 'display': stateLogin.stateEmailStyle ? 'none' : 'block' }}> *Não existe uma conta com esse E-mail</span> */}
                    </div>

                    <div className="emailLogin">
                        <label htmlFor="email">
                            E-mail
                        </label>

                        <input
                            type="text"
                            name="email"
                            placeholder="Digite seu E-mail"
                            style={{ 'borderColor': stateLogin.stateEmailStyle ? '' : '#EE3B3B' }}
                            value={stateLogin.emailValue}
                            onChange={e => {
                                changeEmailValue(e.target.value)
                            }}

                        />

                        <span className="spanErro" style={{ 'color': stateLogin.stateEmailStyle ? '' : '#EE3B3B', 'display': stateLogin.stateEmailStyle ? 'none' : 'block' }}> *Não existe uma conta com esse E-mail</span>
                    </div>

                    <div className="emailLogin">
                        <label htmlFor="email">
                            Telefone
                        </label>
                        <NumberFormat
                            format="+55 (##) #####-####"
                            className='inputTel'
                            aria-describedby=""
                            placeholder="(11) 98000-0000"
                            value={stateLogin.formatedTel}
                            //  style={{ 'borderColor': stateLogin.stateEmailStyle ? '' : '#EE3B3B' }}
                            onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                let cellPattern = new RegExp(/^([0-9]{2}[9]{1}[0-9]{7,8})$/);
                               
                                changeTelValue(formattedValue, value)
                               

                            }}
                        />


                        {/** <span className="spanErro" style={{ 'color': stateLogin.stateEmailStyle ? '' : '#EE3B3B', 'display': stateLogin.stateEmailStyle ? 'none' : 'block' }}> *Não existe uma conta com esse E-mail</span> */}
                    </div>




                    <div
                        className={stateLogin.styleCadBtn ? "btnCadPreenchido" : 'btnCadVazio'}
                        onClick={conect}
                    >
                        Cadastrar loja
                    </div>


                </div>



            </div>
        </div>
    )
}









export default CadastrarLoja;
