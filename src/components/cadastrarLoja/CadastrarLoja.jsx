import React, { useState, useEffect } from "react";
import connect from "../../services/conect";
import NumberFormat from 'react-number-format'
import api from '../../services/api';
import Swal from 'sweetalert2';

import './CadastrarLoja.css';


import logoTitulo from '../../assets/Layer 1.png';
import img1 from '../../assets/amico.png';
import imglogoWhite from '../../assets/logoWhite.png';
import btnVoltar from '../../assets/bntVoltar.png';
import btnFechar from '../../assets/btnFechar.png';
import btnCrto from '../../assets/tick-circle.png';


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
        isPreenchido: undefined,
        textOpcional: undefined,
        optCod: undefined,
        loading: false,
        stage: null,
        codigoValidStyle: true,
        codInputValue: undefined,
        loadingCodOtp: false,


    })
    const emailRegex = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
    const regexCodValid = /^\d{6}$/;

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


    async function getCodNewAccount(props) {

        setStateCadLoja({
            ...stateCadLoja,
            loadingCodOtp: true
        })

        const result = await connect.getCodNewAccount(props)

        if (result) {

            return false

        } else {
            
            resetState();
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Ocorreu um erro inexperado, tente novamente mais tarde`,
            })
            return true
        }

    }

    async function createNewAccount(props) {

        setStateCadLoja({
            ...stateCadLoja,
            loading: true
        })

        const responseCod = await connect.getCodNewAccount(props)

        if (!responseCod.success) {

            return Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: responseCod.err.data.returnMessage,
            })

        }





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

    function changeTextOpc(text) {


        return setStateCadLoja({
            ...stateCadLoja,
            textOpcional: text
        })

    }

    function showBanner(display) {


        if (display === "flex" && stateCadLoja.stage === null) {
            //   $banner0.current.className = "showBanner0 bannerReqSenha animeBanner"
            //  console.log($banner0)
            // showBanner = 0
            setStateCadLoja({
                ...stateCadLoja,
                stage: 0
            })
        }




        return (
            <>
                <div
                    className="containerBanner"
                    style={{ 'zIndex': display === "flex" ? 1 : -1 }}
                >


                    <div className={stateCadLoja.stage === 0 ? "showBanner0 bannerReqSenha animeBanner" : "showBanner0 bannerReqSenha"}
                        
                    >

                        <div className="titulo">
                            <img lt="" />
                            <h2>Cadastrar Loja</h2>
                            <img
                                src={btnFechar}
                                id='btnFechar'
                                alt=""
                                onClick={resetState}
                            />
                        </div>

                        <span>
                            {`Enviaremos um código para o `}
                            <strong>
                                {`e-mail`}
                                {` ${stateCadLoja.emailValue} `}
                            </strong>
                            {` para podermos validar sua conta.`}
                        </span>

                        <div className="enviarEmailRec" onClick={async e => {
                            const reset = await getCodNewAccount({email: stateCadLoja.emailValue});
                            return nextStage(reset);
                        }} >

                            {!stateCadLoja.loadingCodOtp && (
                                <div>
                                    Enviar código por e-mail
                                </div>
                            )}

                            {stateCadLoja.loadingCodOtp && (

                                <div className="loader"></div>

                            )}

                        </div>
                    </div>

                    <div className={stateCadLoja.stage === 1 ? "showBanner1 bannerReqSenha animeBanner" : "showBanner1 bannerReqSenha"}
                    >

                        <div className="iconsBanner1">

                            <img
                                src={btnFechar}
                                id='btnFechar'
                                alt=""
                                onClick={resetState}
                            />

                        </div>
                        <img src={btnCrto} id='btnCerto' alt="" />

                        <h2>Um código foi enviado ao seu e-mail.</h2>

                        <div className="validarCodigo" onClick={e => {

                            nextStage()

                        }}>
                            Validar código
                        </div>

                    </div>

                    <div className={stateCadLoja.stage === 2 ? "showBanner2 bannerReqSenha animeBanner" : "showBanner2 bannerReqSenha"}

                    >


                        <div className="titulo">
                            <img onClick={resetState} />

                            <h2 id="h2ShowBanner">Validar código</h2>
                            <img
                                src={btnFechar}
                                id='btnFechar'
                                alt=""
                                onClick={resetState}
                            />
                        </div>

                        <div className="basicInputContainer">

                            <label htmlFor="validarCod">
                                Código enviado por e-mail
                            </label>



                            <input
                                type="text"
                                name="validarCod"
                                placeholder="Código de 6 dígitos"

                                style={{
                                    'borderColor': stateCadLoja.codigoValidStyle ||
                                        stateCadLoja.codigoValidStyle === '' ? '' : '#EE3B3B'
                                }}
                                value={stateCadLoja.codInputValue}
                                onChange={e => {

                                    return setStateCadLoja({
                                        ...stateCadLoja,
                                        codInputValue: e.target.value,
                                        //validateCodError: false,
                                        codigoValidStyle: regexCodValid.test(e.target.value)
                                    })


                                }
                                }

                            />

                            <span
                                className="spanErro"
                                style={{ 'color': stateCadLoja.codigoValidStyle ? '' : '#EE3B3B', 'display': stateCadLoja.codigoValidStyle ? 'none' : 'block' }}>

                                O código deve conter 6 dígitos, apenas números.

                            </span>


                        </div>



                        <div
                            className="Prosseguir"
                            onClick={e => {

                                if (stateCadLoja.codInputValue === null || stateCadLoja.codInputValue === undefined) {
                                    return Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Digite o código para prosseguir',
                                    })
                                }

                                if (!regexCodValid.test(stateCadLoja.codInputValue)) {
                                    return Swal.fire({
                                        icon: 'error',
                                        title: 'Código inválido',
                                        text: 'O código deve conter 6 dígitos, apenas números.',
                                    })
                                }

                                /**
                                 *     if (!stateCadLoja.codInputValue) {
                                        return setstateCadLoja({
                                            ...stateCadLoja,
                                            validateCodError: true
                                        })
                                    }
                                 */

                                nextStage();
                            }}>


                            <span>
                                Prosseguir
                            </span>


                        </div>


                    </div>


                </div>

            </>


        )

    }
    function resetState() {


        return setStateCadLoja({
            stateTypePassword: true,
            stateEmailStyle: true,
            emailValue: undefined,
            name: undefined,
            telefoneValue: undefined,
            formatedTel: undefined,
            display: "none",
            isLog: false,
            styleCadBtn: false,
            isPreenchido: undefined,
            textOpcional: undefined,
            optCod: undefined,
            loading: false,
            stage: null
        })

    }
    function nextStage(reset = false) {

        if (reset) return

        if (stateCadLoja.stage + 1 > 4) return

        return setStateCadLoja({
            ...stateCadLoja,
            stage: stateCadLoja.stage + 1
        })
    }
    function backStage() {
        if (stateCadLoja.stage - 1 < 0) return
        setStateCadLoja({
            ...stateCadLoja,
            stage: stateCadLoja.stage - 1
        })
    }
    function setDisplay() {
        setStateCadLoja({
            ...stateCadLoja,
            display: "flex"
        })
    }



    return {
        stateCadLoja,
        chanceTypeInput,
        createNewAccount,
        changeNameValue,
        changeTelValue,
        EmailRegexMessage,
        changeTextOpc,
        showBanner,
        setDisplay

    }

}




const CadastrarLoja = () => {

    const {
        stateCadLoja,
        createNewAccount,
        changeNameValue,
        changeTelValue,
        EmailRegexMessage,
        changeTextOpc,
        showBanner,
        setDisplay


    } = UseLoginState()



    return (
        <>

            {showBanner(stateCadLoja.display)}
            <div className="loginUser">

                <button
                    onClick={e => {
                        setDisplay()
                    }}
                >
                    display
                </button>

                <div className="lado1">
                    <img src={logoTitulo} id='img1' alt="" />
                    <img src={img1} id='img2' alt="" />
                </div>

                <img src={imglogoWhite} id='logoWhiteLogin' alt="" />

                <div className="lado2">

                    <div className="login">
                        <div className="btnCadLojaDiv">
                            <a className="linkCriarConta" href="/">
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
                                placeholder="Digite seu nome..."
                                // style={{ 'borderColor': stateCadLoja.stateEmailStyle ? '' : '#EE3B3B' }}
                                value={stateCadLoja.name}
                                onChange={e => {
                                    changeNameValue(e.target.value)
                                }}

                            />


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



                        </div>

                        <div className="emailLogin">
                            <label htmlFor="textAdd">
                                Informações adicionais que queira nos contar:
                            </label>
                            <textarea
                                name="textAdd"
                                value={stateCadLoja.textOpcional}
                                onChange={e => {
                                    changeTextOpc(e.target.value)
                                }}
                            >

                            </textarea>


                        </div>


                        <div className="emailLogin">
                            <div
                                className={stateCadLoja.styleCadBtn ? "btnCadPreenchido" : 'btnCadVazio'}
                                id="btnCadPreenchido"
                                onClick={async e => {
                                    createNewAccount({ email: stateCadLoja.emailValue, nome: stateCadLoja.name, tel: stateCadLoja.telefoneValue, textOpcional: stateCadLoja.textOpcional })
                                }
                                }
                            >


                                {!stateCadLoja.loading && (
                                    <div>
                                        Cadastrar loja
                                    </div>
                                )}


                                {stateCadLoja.loading && (
                                    <div>
                                        <span className="c-loader"></span>
                                    </div>
                                )}


                            </div>
                        </div>

                    </div>



                </div>
            </div>
        </>


    )
}









export default CadastrarLoja;
