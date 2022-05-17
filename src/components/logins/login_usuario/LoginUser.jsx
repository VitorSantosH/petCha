import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import "./LoginUser.css"

import logoTitulo from '../../../assets/Layer 1.png';
import img1 from '../../../assets/amico.png';
import imgOlhoAberto from '../../../assets/olho-vermelhoAberto.png';
import imgOlhoFechado from '../../../assets/olho-vermelho.png';


const UseLoginState = () => {

    const [stateLogin, setStateLogin] = useState({
        stateTypePassword: true,
        stateEmailStyle: true,
        emailValue:undefined,

    })

    useEffect(() => {

        console.log(stateLogin.emailValue != undefined)

        if(stateLogin.emailValue != "master@gmail.com" && stateLogin.emailValue  !== undefined  && stateLogin.emailValue  !== '' ) {
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

    }, [stateLogin.emailValue])

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

    return {
        stateLogin,
        chanceTypeInput,
        changeEmailValue
    }

}




const LoginUser = () => {

    const {
        stateLogin,
        chanceTypeInput,
        changeEmailValue,

    } = UseLoginState()

    console.log(stateLogin.emailValue)

    return (
        <div className="loginUser">

            <div className="lado1">
                <img src={logoTitulo} id='img1' alt="" />
                <img src={img1}  id='img2' alt="" />
            </div>

            <div className="lado2">

                <div className="login">

                    <h1 className="titulo">
                        Faça seu login
                    </h1>

                    <div className="emailLogin">
                        <label htmlFor="email">
                            E-mail
                        </label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Digite seu E-mail"   
                            style={{'borderColor': stateLogin.stateEmailStyle ? '' : '#EE3B3B' }}
                            value={stateLogin.emailValue}
                            onChange={e => {
                                console.log(stateLogin.emailValue)
                                changeEmailValue(e.target.value)
                            }}

                            />
                    </div>

                    <div className="senhaLogin">

                        <label htmlFor="senha">
                            Senha
                        </label>

                        <input type={stateLogin.stateTypePassword ? 'password' : "text"} name="senha" id="" placeholder="Digite seua senha" />

                        <img
                            src={imgOlhoAberto}
                            style={{ 'display': stateLogin.stateTypePassword ? 'none' : "block" }}
                            onClick={chanceTypeInput}
                            alt="" />

                        <img
                            src={imgOlhoFechado}
                            style={{ 'display': stateLogin.stateTypePassword ? "block" : 'none' }}
                            onClick={chanceTypeInput}
                            alt="" />

                    </div>

                    <div className="esqueciSenha">
                        <span>
                            Esqueci minha senha
                        </span>
                    </div>

                    <div className="fazerLoginBtn">
                        Fazer Login
                    </div>

                    <div className="linkCadastro">
                        <span>
                            É logista e ainda não possue uma conta?
                        </span>
                       
                        <hr />
                        <Link to='/cadastro' className="linkCriarConta">
                            Clique aqui e cadastre sua loja
                        </Link>

                    </div>

                </div>

            </div>
        </div>
    )
}






export default LoginUser;