import React, { useEffect, useRef, useState } from "react";
import './RecuperarSenha.css'


//funções - components
import connect from "../../services/connect";
import Swal from 'sweetalert2';

//assets
import btnVoltar from '../../assets/bntVoltar.png';
import btnFechar from '../../assets/btnFechar.png';
import btnCrto from '../../assets/tick-circle.png';
import olhoFechado from '../../assets/olho-vermelho.png';
import olhoAberto from '../../assets/olho-vermelhoAberto.png';

const useRecSenha = (props) => {

    const [recState, setRecState] = useState({
        stage: null,
        display: props.display,
        inputNovaSenhaStyle: true,
        inputOldSenhaStyle: true,
        codigoStatus: true,
        codigo: undefined,
        codInputValue: undefined,
        codigoStatusMessage: false,
        newPassword: undefined,
        confirmNewPassword: undefined,
        senhasBaten: undefined,
        validateCodError: undefined,
        codigoValidStyle: true,
        loadingCodOtp: false,
        loadingSendNewPassword: false
    })

    const regexCodValid = /^\d{6}$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\\-_=+{};:,<.>]).{8,15}$/

    console.log(recState)

    useEffect(() => {




    }, [recState])

    async function alterarSenha() {


        const verifyPass = verifyPassword()

        if (!verifyPass) {
            return
        }

        setRecState({
            ...recState,
            loadingSendNewPassword: true
        })

        const resp = await connect.changePassword({
            email: props.email,
            password: recState.newPassword,
            otpPassword: recState.codInputValue
        })




        if (resp.success) {

            Swal.fire({
                icon: 'success',
                title: '',
                text: 'Senha alterada com sucesso!',
            })

            return resetState()
        } else {

            Swal.fire({
                icon: 'error',
                title: '',
                text: `${resp.message}`,
            })
            return resetState()
        }

    }

    async function getCodOtp(email) {

        setRecState({
            ...recState,
            loadingCodOtp: true
        })

        const result = await connect.getCodOtp({ email: email })

        if (result) {

            return false

        } else {

            props.setDisplay('none');
            resetState();
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Ocorreu um erro inexperado, tente novamente mais tarde`,
            })
            return true
        }

    }

    function resetState() {

        props.setDisplay('none')
        return setRecState({
            stage: null,
            display: props.display,
            inputNovaSenhaStyle: true,
            inputOldSenhaStyle: true,
            codigoStatus: true,
            codigo: undefined,
            codInputValue: undefined,
            codigoStatusMessage: false,
            newPassword: undefined,
            confirmNewPassword: undefined,
            senhasBaten: undefined,
            validateCodError: undefined,
            codigoValidStyle: true,
            loadingCodOtp: false,
            loadingSendNewPassword: false
        })

    }

    function changeStyleInput(n) {

        if (n === 0) {
            return setRecState({
                ...recState,
                inputNovaSenhaStyle: !recState.inputNovaSenhaStyle
            })
        }
        if (n === 1) {
            return setRecState({
                ...recState,
                inputOldSenhaStyle: !recState.inputOldSenhaStyle
            })
        }
        return
    }

    function nextStage(reset = false) {

        if(reset) return 

        if (recState.stage + 1 > 4) return

        return setRecState({
            ...recState,
            stage: recState.stage + 1
        })
    }

    function backStage() {
        if (recState.stage - 1 < 0) return
        setRecState({
            ...recState,
            stage: recState.stage - 1
        })
    }

    function verifyPassword() {

        const newPassword = recState.newPassword
        const confirmNewPassword = recState.confirmNewPassword

        if (!newPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Digite a nova senha.`,
            })
            return false
        }

        if (!regexPassword.test(newPassword)) {

            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: "A senha deve conter de 8 a 15 caracteres, incluindo números, letras maiúsculas, minúsculas e caracteres especiais.",
            })
            return false
        }


        if (!confirmNewPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Confirme a senha, digitando-a novamente no segundo campo.`,
            })
            return false
        }

        if (newPassword !== confirmNewPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `As senhas não são iguais.`,
            })
            return false
        }

        return true

    }

    function showBanner(display) {

        const email = props.email
        let showBanner = null
        const $banner0 = useRef(null)

        if (display === "flex" && recState.stage === null) {
            //   $banner0.current.className = "showBanner0 bannerReqSenha animeBanner"
            //  console.log($banner0)
            // showBanner = 0
            setRecState({
                ...recState,
                stage: 0
            })
        }




        return (
            <>
                <div
                    className="containerBanner"
                    style={{ 'zIndex': display === "flex" ? 1 : -1 }}
                >

                    <div className={recState.stage === 0 ? "showBanner0 bannerReqSenha animeBanner" : "showBanner0 bannerReqSenha"}
                        ref={$banner0}
                    >

                        <div className="titulo">
                            <img lt="" />
                            <h2>Recuperar Senha</h2>
                            <img
                                src={btnFechar}
                                id='btnFechar'
                                alt=""
                                onClick={resetState}
                            />
                        </div>

                        <span>
                            {` Para recuperação de sua senha, enviaremos um código para o `}
                            <strong>
                                {`e-mail`}
                                {` ${email} `}
                            </strong>
                            {` para podermos validar sua conta.`}
                        </span>

                        <div className="enviarEmailRec" onClick={async e => {
                            const reset = await getCodOtp(email);
                            return nextStage(reset);
                        }} >

                            {!recState.loadingCodOtp && (
                                <div>
                                    Enviar código por e-mail
                                </div>
                            )}

                            {recState.loadingCodOtp && (

                                <div className="loader"></div>

                            )}

                        </div>
                    </div>

                    <div className={recState.stage === 1 ? "showBanner1 bannerReqSenha animeBanner" : "showBanner1 bannerReqSenha"}
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

                    <div className={recState.stage === 2 ? "showBanner2 bannerReqSenha animeBanner" : "showBanner2 bannerReqSenha"}

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
                                    'borderColor': recState.codigoValidStyle ||
                                        recState.codigoValidStyle === '' ? '' : '#EE3B3B'
                                }}
                                value={recState.codInputValue}
                                onChange={e => {

                                    return setRecState({
                                        ...recState,
                                        codInputValue: e.target.value,
                                        validateCodError: false,
                                        codigoValidStyle: regexCodValid.test(e.target.value)
                                    })


                                }
                                }

                            />

                            <span
                                className="spanErro"
                                style={{ 'color': recState.codigoValidStyle ? '' : '#EE3B3B', 'display': recState.codigoValidStyle ? 'none' : 'block' }}>

                                O código deve conter 6 dígitos, apenas números.

                            </span>


                        </div>



                        <div
                            className="Prosseguir"
                            onClick={e => {

                                if (recState.codInputValue === null || recState.codInputValue === undefined) {
                                    return Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Digite o código para prosseguir',
                                    })
                                }

                                if (!regexCodValid.test(recState.codInputValue)) {
                                    return Swal.fire({
                                        icon: 'error',
                                        title: 'Código inválido',
                                        text: 'O código deve conter 6 dígitos, apenas números.',
                                    })
                                }

                                /**
                                 *     if (!recState.codInputValue) {
                                        return setRecState({
                                            ...recState,
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

                    <div className={recState.stage === 3 ? "showBanner3 bannerReqSenha animeBanner" : "showBanner3 bannerReqSenha"}

                    >

                        <div className="titulo">

                            <img alt="" onClick={backStage} />

                            <h1>Nova Senha</h1>

                            <img
                                src={btnFechar}
                                id='btnFechar'
                                alt=""
                                onClick={resetState}
                            />

                        </div>

                        <div className="basicInputContainer">

                            <label htmlFor="NovaSenha"> Nova Senha</label>
                            <input
                                name="newPass"
                                id="newPass"
                                type={recState.inputNovaSenhaStyle ? 'password' : "text"}
                                value={recState.novaSenha}

                                onChange={e => setRecState({
                                    ...recState,
                                    newPassword: e.target.value,
                                    senhasBaten: recState.confirmNewPassword === e.target.value ? true : false
                                })}
                            />
                            <img
                                src={olhoAberto}
                                alt=""
                                style={{ 'display': recState.inputNovaSenhaStyle ? 'none' : "block" }}
                                onClick={e => changeStyleInput(0)}
                            />

                            <img
                                src={olhoFechado}
                                alt=""
                                style={{ 'display': recState.inputNovaSenhaStyle ? 'block' : "none" }}
                                onClick={e => changeStyleInput(0)}
                            />

                        </div>
                        <div className="basicInputContainer">

                            <label htmlFor="NovaSenha"> Confirme nova senha</label>
                            <input
                                name="confirmNewPassword"
                                id="confirmNewPassword"
                                type={recState.inputOldSenhaStyle ? 'password' : "text"}
                                value={recState.confirmNewPassword}

                                onChange={e => setRecState({
                                    ...recState,
                                    confirmNewPassword: e.target.value,
                                    senhasBaten: recState.newPassword === e.target.value ? true : false
                                })}
                            />
                            <img
                                src={olhoAberto}
                                alt=""
                                style={{ 'display': recState.inputOldSenhaStyle ? 'none' : "block" }}
                                onClick={e => changeStyleInput(1)}
                            />

                            <img
                                src={olhoFechado}
                                alt=""
                                style={{ 'display': recState.inputOldSenhaStyle ? 'block' : "none" }}
                                onClick={e => changeStyleInput(1)}
                            />

                        </div>

                        <div
                            className={recState.senhasBaten && regexPassword.test(recState.newPassword) ? "Prosseguir" : "buttonProsseguirDesativado"}
                            onClick={alterarSenha}>

                            {!recState.loadingSendNewPassword && (
                                <span>Alterar senha</span>
                            )}

                            {recState.loadingSendNewPassword && (

                                <div className="loader"></div>

                            )}
                        </div>

                    </div>

                    <div className={recState.stage === 4 ? "showBanner4 bannerReqSenha animeBanner" : "showBanner4 bannerReqSenha"}

                    >

                        <img src={btnCrto} alt="" />

                        <h2>
                            A Senha foi alterada com sucesso
                        </h2>

                        <div className="Prosseguir" onClick={e => {

                            resetState()


                        }}>
                            <span>Fechar</span>
                        </div>


                    </div>

                </div>

            </>


        )

    }



    return {
        recState,
        showBanner

    }
}


const RecuperarSenha = (props) => {

    const {
        recState,
        showBanner
    } = useRecSenha(props)



    return (

        <>
            {showBanner(props.display)}
        </>

    )
}



export default RecuperarSenha;