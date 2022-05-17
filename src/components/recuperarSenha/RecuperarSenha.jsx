import React, { useState } from "react";

import './RecuperarSenha.css'
import btnVoltar from '../../assets/btnVoltar.png';
import btnFechar from '../../assets/btnFechar.png'

const useRecSenha = () => {
    const [recState, setRecState] = useState({
        stage: 0
    })

    function showBanner() {

        if (recState.stage === 0) {
            return (
                <div className="showBanner0">
                    <h2>Recuperar Senha</h2>

                    <div className="titulo">
                        <img src={btnVoltar} alt="" />
                        <span>
                            Para recuperação de sua senha, enviaremos um código para o e-mail de cadastro para podermos validar sua conta.
                        </span>
                    </div>
                    <div className="enviarEmailRec">
                        <span>
                            Enviar código por e-mail
                        </span>
                    </div>
                </div>
            )
        }
        if (recState.stage === 1) {
            return (
                <div className="showBanner1">

                </div>
            )
        }
        if (recState.stage === 2) {
            return (
                <div className="showBanner2">

                </div>
            )
        }

    }

    return {
        recState,

    }
}


const RecuperarSenha = () => {

    const {
        recState
    } = useRecSenha()


    return (
        <div className="recuperarSenha">

        </div>
    )
}



export default RecuperarSenha;