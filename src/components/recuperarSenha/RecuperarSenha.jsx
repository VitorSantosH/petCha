import React, { useEffect, useState } from "react";

import './RecuperarSenha.css'
import btnVoltar from '../../assets/bntVoltar.png';
import btnFechar from '../../assets/btnFechar.png';
import btnCrto from '../../assets/tick-circle.png';
import olhoFechado from '../../assets/olho-vermelho.png';
import olhoAberto from '../../assets/olho-vermelhoAberto.png';

const useRecSenha = (props) => {
    const [recState, setRecState] = useState({
        stage: 0,
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

    useEffect(() => {




    }, [recState])

    function alterarSenha() {

        if (recState.novaSenha === recState.confirmNovaSenha) {
            setRecState({
                ...recState,
                senhasBaten: true
            })
            return nextStage()
        } else {
            setRecState({
                ...recState,
                senhasBaten: false
            })
        }

    }

    function resetState() {
        setRecState({
            stage: 0,
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
        props.setDisplay('none')
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

    function validateCodigo(cod) {

        var result

        if (cod == recState.codigo) {

            setRecState({
                ...recState,
                codigoStatus: true,
                codigoStatusMessage: false

            })
            return result = true
        } else {

            setRecState({
                ...recState,
                codigoStatus: false,
                codigoStatusMessage: true
            })

            return result = false
        }



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

    function showBanner() {

        if (recState.stage === 0) {
            return (
                <div className="showBanner0">



                    <div className="titulo">
                        <img src={btnVoltar} alt="" onClick={resetState} />
                        <h2>Recuperar Senha</h2>
                    </div>
                    <br />
                    <br />
                    <span>
                        Para recuperação de sua senha, enviaremos um código para o e-mail de cadastro para podermos validar sua conta.
                    </span>
                    <br />
                    <br />
                    <div className="enviarEmailRec" onClick={nextStage} >

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

                    <div className="titleValidarCodigo">
                        <img src={btnVoltar} alt="" id="btnVoltarValidarCod" onClick={backStage} />

                        <h2 id="h2ShowBanner">Validar código</h2>
                    </div>

                    <div className="basicInputContainer">

                        <label htmlFor="validarCod">
                            Código enviado por e-mail
                        </label>

                        <input
                            type="text"
                            name="validarCod"
                            value={recState.codInputValue}
                            onChange={e => setRecState({
                                ...recState,
                                codInputValue: e.target.value
                            })}

                        />

                        <span
                            className="errorCod"
                            style={{ 'display': recState.codigoStatusMessage ? 'block' : 'none' }}
                        >
                            *Código inválido
                        </span>

                    </div>

                    <div className="Prosseguir" onClick={e => {
                        const teste = validateCodigo(recState.codInputValue)
                        if (teste) {

                            nextStage()
                        }
                    }}>
                        <span>Prosseguir</span>
                    </div>


                </div>
            )
        }
        if (recState.stage === 3) {
            return (
                <div className="showBanner3">

                    <div className="titleValidarCodigo">
                        <img src={btnVoltar} alt="" onClick={backStage} />

                        <h2>Nova Senha</h2>
                    </div>

                    <div className="basicInputContainer">

                        <label htmlFor="NovaSenha"> Nova Senha</label>
                        <input
                            type={recState.inputNovaSenhaStyle ? 'password' : "text"}
                            value={recState.novaSenha}
                            onChange={e => setRecState({
                                ...recState,
                                novaSenha: e.target.value
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
                                confirmNovaSenha: e.target.value
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
                            <span style={{ 'color': 'red' }}>Senha diferentes</span>
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
        <div className="recuperarSenha" style={{ 'display': props.display }}>

            {showBanner()}
        </div>
    )
}



export default RecuperarSenha;