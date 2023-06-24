import React, { useEffect, useRef, useState } from "react";
import './RecuperarSenha.css'


//funções - components
import conect from "../../services/conect";
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
        codigo: 'teste',
        codInputValue: undefined,
        codigoStatusMessage: false,
        novaSenha: "",
        confirmNovaSenha: "",
        senhasBaten: undefined,
        validateCodError: undefined,
        codigoValidStyle: true,
        loadingCodOtp: false
    })

    const regexCodValid = /^\d{6}$/;

    useEffect(() => {




    }, [recState])

    async function alterarSenha() {

        const resp = await conect.changePassword({
            email: props.email,
            password: recState.novaSenha,
            otpPassword: recState.codInputValue
        })



        if (resp.success) {
            resetState()
            return Swal.fire({
                icon: 'success',
                title: '',
                text: 'Senha alterada com sucesso!',
            })
        } else {
            resetState()
            return Swal.fire({
                icon: 'error',
                title: '',
                text: `${resp.message}`,
            })
        }

    }

    async function getCodOtp(email) {

        setRecState({
            ...recState,
            loadingCodOtp: true
        })

        const result = await conect.getCodOtp({ email: email })

        if (result) {
            setRecState({
                ...recState,
                loadingCodOtp: false
            })

        } else {

            props.setDisplay('none');
            setRecState({
                ...recState,
                loadingCodOtp: false
            })
            return Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Ocorreu um erro inexperado, tente novamente mais tarde`,
            })
        }

        return console.log(result)

    }

    function resetState() {

        props.setDisplay('none')
        return setRecState({
            stage: null,
            display: props.display,
            inputNovaSenhaStyle: true,
            inputOldSenhaStyle: true,
            codigoStatus: true,
            codigo: 'teste',
            codInputValue: '',
            codigoStatusMessage: false,
            novaSenha: "",
            confirmNovaSenha: "",
            senhasBaten: undefined
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

    function nextStage() {

        if (recState.stage + 1 > 4) return
        setRecState({
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

    function showBanner1() {

        const email = props.email

        if (recState.stage === 0) {
            return (
                <div className="showBanner0">



                    <div className="titulo">
                        <img lt="" onClick={resetState} />
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

                    <div className="enviarEmailRec" onClick={e => {

                        conect.getCodOtp({ email: email })
                        nextStage()
                    }} >

                        Enviar código por e-mail

                    </div>
                </div>
            )
        }
        if (recState.stage === 1) {
            return (
                <div className="showBanner1">

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

                    <div className="validarCodigo" onClick={nextStage}>
                        Validar código
                    </div>

                </div>
            )
        }
        if (recState.stage === 2) {

            return (
                <div className="showBanner2">


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

                        {/**
                      *    <input
                            type="text"
                            name="validarCod"
                            value={recState.codInputValue}
                            onChange={e => setRecState({
                                ...recState,
                                codInputValue: e.target.value,
                                validateCodError: false
                            })}

                        />
                      */}

                        <input
                            type="text"
                            name="codigo"
                            placeholder="Código de 6 dígitos"
                            style={{ 'borderColor': recState.codigoValidStyle ? '' : '#EE3B3B' }}
                            value={recState.codInputValue}
                            onChange={e => setRecState({
                                ...recState,
                                codInputValue: e.target.value,
                                validateCodError: false,
                                codigoValidStyle: regexCodValid.test(e.target.value)
                            })
                            }

                        />

                        <span
                            className="spanErro"
                            style={{ 'color': recState.codigoValidStyle ? '' : '#EE3B3B', 'display': recState.codigoValidStyle ? 'none' : 'block' }}>

                            O código contém 6 dígitos, apenas números.

                        </span>


                    </div>



                    <div
                        className="Prosseguir"
                        onClick={e => {

                            if (!recState.codInputValue) {
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
            )
        }
        if (recState.stage === 3) {
            return (
                <div className="bannerResetPass showBanner3">

                    <div className="titulo">

                        <img alt="" onClick={backStage} />

                        <h2>Nova Senha</h2>
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
                            type={recState.inputNovaSenhaStyle ? 'password' : "text"}
                            value={recState.novaSenha}
                            onChange={e => setRecState({
                                ...recState,
                                novaSenha: e.target.value,
                                senhasBaten: recState.confirmNovaSenha === e.target.value ? true : false
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
                            type={recState.inputOldSenhaStyle ? 'password' : "text"}
                            value={recState.confirmNovaSenha}
                            onChange={e => setRecState({
                                ...recState,
                                confirmNovaSenha: e.target.value,
                                senhasBaten: recState.novaSenha === e.target.value ? true : false
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

                        {recState.senhasBaten === false && (
                            <span style={{ 'color': 'red' }}>Senhas Incompatíveis</span>
                        )}


                    </div>



                    <div className="inputsNovaSenha">

                    </div>

                    <div className="Prosseguir" onClick={alterarSenha}>
                        <span>Alterar senha</span>
                    </div>

                </div>
            )
        }
        if (recState.stage === 4) {
            return (
                <div className="showBanner4">

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
            )
        }

    }

    function showBanner(display) {

        const email = props.email
        let showBanner = null
        const $banner0 = useRef(null)

        if (display == "flex" && showBanner === null) {
            //   $banner0.current.className = "showBanner0 bannerReqSenha animeBanner"
            //  console.log($banner0)
            showBanner = 0
        }




        return (
            <>
                <div
                    className="containerBanner"
                    style={{ 'zIndex': display == "flex" ? 1 : -1 }}
                >

                    <div
                        className={showBanner == 0 ? "showBanner0 bannerReqSenha animeBanner" : "showBanner0 bannerReqSenha"}
                        ref={$banner0}
                    >

                        <div className="titulo">
                            <img lt="" onClick={resetState} />
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


                            await getCodOtp(email);
                            $banner0.current.classList.remove("animeBanner")

                            return nextStage();

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

                    <div
                        className={recState.stage == 1 ? "showBanner1 bannerReqSenha animeBanner" : "showBanner1 bannerReqSenha"}
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

                        <div className="validarCodigo" onClick={nextStage}>
                            Validar código
                        </div>

                    </div>

                    <div
                        className={recState.stage == 2 ? "showBanner2 bannerReqSenha animeBanner" : "showBanner2 bannerReqSenha"}

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
                                name="codigo"
                                placeholder="Código de 6 dígitos"
                                style={{
                                    'borderColor': recState.codigoValidStyle ||
                                        recState.codigoValidStyle == '' ? '' : '#EE3B3B'
                                }}
                                value={recState.codInputValue}
                                onChange={e => setRecState({
                                    ...recState,
                                    codInputValue: e.target.value,
                                    validateCodError: false,
                                    codigoValidStyle: regexCodValid.test(e.target.value)
                                })
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

                                if (!recState.codInputValue) {
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

                    <div
                        className={recState.stage == 3 ? "showBanner3 bannerReqSenha animeBanner" : "showBanner3 bannerReqSenha"}

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
                                type={recState.inputNovaSenhaStyle ? 'password' : "text"}
                                value={recState.novaSenha}
                                onChange={e => setRecState({
                                    ...recState,
                                    novaSenha: e.target.value,
                                    senhasBaten: recState.confirmNovaSenha === e.target.value ? true : false
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
                                type={recState.inputOldSenhaStyle ? 'password' : "text"}
                                value={recState.confirmNovaSenha}
                                onChange={e => setRecState({
                                    ...recState,
                                    confirmNovaSenha: e.target.value,
                                    senhasBaten: recState.novaSenha === e.target.value ? true : false
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

                            {recState.senhasBaten === false && (
                                <span style={{ 'color': 'red' }}>Senhas Incompatíveis</span>
                            )}


                        </div>



                        <div className="inputsNovaSenha">

                        </div>

                        <div className="Prosseguir" onClick={alterarSenha}>
                            <span>Alterar senha</span>
                        </div>

                    </div>

                    <div
                        className={recState.stage == 4 ? "showBanner4 bannerReqSenha animeBanner" : "showBanner4 bannerReqSenha"}

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