import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./LoginUser.css";

import conect from "../../../services/conect";
import RecuperarSenha from "../../recuperarSenha/RecuperarSenha";

import logoTitulo from '../../../assets/Layer 1.png';
import img1 from '../../../assets/amico.png';
import imgOlhoAberto from '../../../assets/olho-vermelhoAberto.png';
import imgOlhoFechado from '../../../assets/olho-vermelho.png';
import imglogoWhite from '../../../assets/logoWhite.png'


const UseLoginState = () => {

    const [stateLogin, setStateLogin] = useState({
        stateTypePassword: true,
        stateEmailStyle: true,
        emailValue: "",
        display: "none",
        isLog: false,
        password: ""

    })
    const navigate = useNavigate()

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

    }, [stateLogin.emailValue, stateLogin.display])


    async function logar() {

        const username = stateLogin.emailValue
        const password = stateLogin.password
        const response = await conect.login({ username, password })

        let codAuth

        try {
            codAuth = response.data.results[0].usomeData.codAuthGroup
        } catch (error) {
            console.log(error)
        }

       

        switch (codAuth) {
            case 'EMPLOYEE':
                return navigate('/homeEmployee')
                break;
            case 'CUSTOMER':
                return navigate('/homeCliente')
                break;
            case 'STORE_MANAGER':
                return navigate('/homePerfil')
                break;
            case 'OWNER':
                return navigate('/homePerfil')
                break;
            default:
                break;
        }
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

    function setDisplay(value) {

        setStateLogin({
            ...stateLogin,
            display: value
        })
    }
    function ReqSenha() {
        return <RecuperarSenha display={stateLogin.display} setDisplay={setDisplay} />
    }
    function setPassword(value) {
        setStateLogin({
            ...stateLogin,
            password: value
        })
    }

    return {
        stateLogin,
        chanceTypeInput,
        changeEmailValue,
        setDisplay,
        ReqSenha,
        conect,
        setPassword,
        logar
    }

}




const LoginUser = () => {

    const {
        stateLogin,
        chanceTypeInput,
        changeEmailValue,
        setDisplay,
        ReqSenha,
        logar,
        setPassword

    } = UseLoginState()



    return (
        <div className="loginUser">

            {ReqSenha()}

            <div className="lado1">
                <img src={logoTitulo} id='img1' alt="" />
                <img src={img1} id='img2' alt="" />
            </div>

            <img src={imglogoWhite} id='logoWhiteLogin' alt="" />

            <div className="lado2">

                <div className="login">

                    <h1 className="titulo">
                        Fa??a seu login
                    </h1>

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
                                console.log(stateLogin.emailValue)
                                changeEmailValue(e.target.value)
                            }}

                        />

                        <span className="spanErro" style={{ 'color': stateLogin.stateEmailStyle ? '' : '#EE3B3B', 'display': stateLogin.stateEmailStyle ? 'none' : 'block' }}> *N??o existe uma conta com esse E-mail</span>
                    </div>

                    <div className="senhaLogin">

                        <label htmlFor="senha">
                            Senha
                        </label>

                        <input
                            type={stateLogin.stateTypePassword ? 'password' : "text"}
                            name="senha"
                            id=""
                            placeholder="Digite seua senha"
                            value={stateLogin.password}
                            onChange={e => setPassword(e.target.value)}
                        />

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

                    <div
                        className="esqueciSenha"
                        onClick={e => {
                            setDisplay('flex')
                        }}
                    >
                        <span>
                            Esqueci minha senha
                        </span>
                    </div>

                    <div
                        className="fazerLoginBtn"
                        onClick={logar}
                    >
                        Fazer Login
                    </div>

                    <div className="linkCadastro">
                        <span>
                            ?? logista e ainda n??o possue uma conta?
                        </span>

                        <hr />
                        <Link to='/cadastrarLoja' className="linkCriarConta">
                            Clique aqui e cadastre sua loja
                        </Link>

                    </div>



                </div>



            </div>
        </div>
    )
}






export default LoginUser;