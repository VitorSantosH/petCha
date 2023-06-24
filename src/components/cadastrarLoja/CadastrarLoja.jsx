import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format'
import api from '../../services/api';
import Swal from 'sweetalert2';

import './CadastrarLoja.css';


import logoTitulo from '../../assets/Layer 1.png';
import img1 from '../../assets/amico.png';
import imglogoWhite from '../../assets/logoWhite.png'
import btnVoltar from '../../assets/bntVoltar.png'


const UseLoginState = () => {

    const [stateCadLoja, setStateCadLoja] = useState({
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
    const emailRegex = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;

    useEffect(() => {


        if (stateCadLoja.emailValue !== undefined && stateCadLoja.emailValue !== '') {
            setStateCadLoja({
                ...stateCadLoja,
                stateEmailStyle: false
            })
        } else {
            setStateCadLoja({
                ...stateCadLoja,
                stateEmailStyle: true
            })
        }

        if (stateCadLoja.telefoneValue != undefined && stateCadLoja.name != undefined && stateCadLoja.emailValue != undefined) {

            setStateCadLoja({
                ...stateCadLoja,
                styleCadBtn: true
            })
        } else {

            setStateCadLoja({
                ...stateCadLoja,
                styleCadBtn: false
            })

        }

    }, [stateCadLoja.emailValue, stateCadLoja.display, stateCadLoja.emailValue, stateCadLoja.telefoneValue, stateCadLoja.name])

    function conect() {

       
        api.post('/Agenda_WS/Prospect/insertOtpProspectStore', {
            codOwner: 26,
            prospectEmail: stateCadLoja.emailValue,
            codLanguage: "PT"

        },
            {
                headers: {

                }
            }

        ).then(res => {
            
            return Swal.fire({
                icon: 'Success',
                title: 'Loja Cadastrada com sucesso',
                text: res.response.data.returnMessage,
            })

        }).catch(err => {
          
            return Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: err.response.data.returnMessage,
            })
        })

    }

    function chanceTypeInput() {
        setStateCadLoja({
            ...stateCadLoja,
            stateTypePassword: !stateCadLoja.stateTypePassword
        })
    }



    function changeNameValue(v) {
        setStateCadLoja({
            ...stateCadLoja,
            name: v
        })
    }

    function changeTelValue(formattedValue, value) {

        setStateCadLoja({
            ...stateCadLoja,
            telefoneValue: value,
            formatedTel: formattedValue
        })
    }


    function EmailRegexMessage(email) {

        /**
         *         console.log(email)
                console.log(typeof email)
                console.log(emailRegex.test(email))
         */
        if (email === null || email === undefined) {
            return setStateCadLoja({
                ...stateCadLoja,
                stateEmailStyle: true,
                emailValue: email
            })
        }
        if (emailRegex.test(email)) {
            setStateCadLoja({
                ...stateCadLoja,
                stateEmailStyle: true,
                emailValue: email
            })
        } else {
            setStateCadLoja({
                ...stateCadLoja,
                stateEmailStyle: false,
                emailValue: email
            })
        }

    }



    return {
        stateCadLoja,
        chanceTypeInput,
        conect,
        changeNameValue,
        changeTelValue,
        EmailRegexMessage

    }

}




const CadastrarLoja = () => {

    const {
        stateCadLoja,

        conect,
        changeNameValue,
        changeTelValue,
        EmailRegexMessage,


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
                    <div className="btnCadLojaDiv">
                        <a class="linkCriarConta" href="/">
                            <img
                                src={btnVoltar}
                                alt=""
                                id="btnVoltarCadLoja"
                            />
                        </a>

                    </div>
                    <h1 className="titulo" id="tituloCadastro">
                        Cadastrar loja
                    </h1>

                    <div className="emailLogin">
                        <label htmlFor="email">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="nameInput"
                            placeholder="Digite seu E-mail"
                            // style={{ 'borderColor': stateCadLoja.stateEmailStyle ? '' : '#EE3B3B' }}
                            value={stateCadLoja.name}
                            onChange={e => {
                                changeNameValue(e.target.value)
                            }}

                        />

                        {/** <span className="spanErro" style={{ 'color': stateCadLoja.stateEmailStyle ? '' : '#EE3B3B', 'display': stateCadLoja.stateEmailStyle ? 'none' : 'block' }}> *Não existe uma conta com esse E-mail</span> */}
                    </div>

                    <div className="emailLogin">
                        <label htmlFor="email">
                            E-mail
                        </label>

                        <input
                            type="text"
                            name="email"
                            placeholder="Digite seu E-mail"
                            style={{ 'borderColor': stateCadLoja.stateEmailStyle ? '' : '#EE3B3B' }}
                            value={stateCadLoja.emailValue}
                            onChange={e => {
                                EmailRegexMessage(e.target.value)
                            }}


                        />

                        <span className="spanErro" style={{ 'color': stateCadLoja.stateEmailStyle ? '' : '#EE3B3B', 'display': stateCadLoja.stateEmailStyle ? 'none' : 'block' }}> Insira um e-mail válido</span>
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
                            value={stateCadLoja.formatedTel}
                            //  style={{ 'borderColor': stateCadLoja.stateEmailStyle ? '' : '#EE3B3B' }}
                            onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                let cellPattern = new RegExp(/^([0-9]{2}[9]{1}[0-9]{7,8})$/);

                                changeTelValue(formattedValue, value)


                            }}
                        />


                        {/** <span className="spanErro" style={{ 'color': stateCadLoja.stateEmailStyle ? '' : '#EE3B3B', 'display': stateCadLoja.stateEmailStyle ? 'none' : 'block' }}> *Não existe uma conta com esse E-mail</span> */}
                    </div>




                    <div
                        className={stateCadLoja.styleCadBtn ? "btnCadPreenchido" : 'btnCadVazio'}
                        id="btnCadPreenchido"
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
