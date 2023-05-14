import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import "./LoginUser.css";
import conect from "../../../services/conect";
import RecuperarSenha from "../../recuperarSenha/RecuperarSenha";

import logoTitulo from '../../../assets/Layer 1.png';
import img1 from '../../../assets/amico.png';
import imgOlhoAberto from '../../../assets/olho-vermelhoAberto.png';
import imgOlhoFechado from '../../../assets/olho-vermelho.png';
import imglogoWhite from '../../../assets/logoWhite.png';



const UseLoginState = () => {

    const [stateLogin, setStateLogin] = useState({
        stateTypePassword: true,
        stateEmailStyle: true,
        emailValue: "",
        display: "none",
        isLog: false,
        password: undefined,
        loading: false

    })
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    const navigate = useNavigate()

    useEffect(() => {


    }, [stateLogin.emailValue, stateLogin.display])


    async function logar() {



        const username = stateLogin.emailValue
        const password = stateLogin.password
        let codAuth


        if (username === null || username === undefined || username === "") {

            setStateLogin({
                ...stateLogin,
                loading: false
            })

            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Defina o e-mail para efetuar o login',
            })
        }

        if (password == null || password === undefined || password === "") {


            setStateLogin({
                ...stateLogin,
                loading: false
            })

            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Digite a senha para efetuar o login',
            })
        }

        const response = await conect.login({ username, password })



        if (response.status === 401) {

            setStateLogin({
                ...stateLogin,
                loading: false
            })

            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'E-mail ou senha inválidos',
            })


        }

        if (response.data) {

            try {
                codAuth = response.data.results[0].usomeData.codAuthGroup
            } catch (error) {
                console.log(error)
            }
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

        return setStateLogin({
            ...stateLogin,
            loading: true
        })
    }

    function chanceTypeInput() {
        setStateLogin({
            ...stateLogin,
            stateTypePassword: !stateLogin.stateTypePassword
        })
    }


    function setDisplay(value) {

        setStateLogin({
            ...stateLogin,
            display: value
        })
    }
    function ReqSenha() {
        return <RecuperarSenha display={stateLogin.display} setDisplay={setDisplay} email={stateLogin.emailValue} />
    }
    function setPassword(value) {
        setStateLogin({
            ...stateLogin,
            password: value
        })
    }


    function EmailRegexMessage(email) {

        console.log(email)
        console.log(typeof email)
        console.log(emailRegex.test(email))
        if (email === null || email === undefined) {
            return setStateLogin({
                ...stateLogin,
                stateEmailStyle: true,
                emailValue: email
            })
        }
        if (emailRegex.test(email)) {
            setStateLogin({
                ...stateLogin,
                stateEmailStyle: true,
                emailValue: email
            })
        } else {
            setStateLogin({
                ...stateLogin,
                stateEmailStyle: false,
                emailValue: email
            })
        }

    }


    return {
        stateLogin,
        chanceTypeInput,
        setDisplay,
        ReqSenha,
        conect,
        setPassword,
        logar,
        EmailRegexMessage,
        setStateLogin
    }

}




const LoginUser = () => {

    const {
        stateLogin,
        chanceTypeInput,
        setDisplay,
        ReqSenha,
        logar,
        setPassword,
        EmailRegexMessage,
        setStateLogin


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
                            style={{ 'borderColor': stateLogin.stateEmailStyle ? '' : '#EE3B3B' }}
                            value={stateLogin.emailValue}
                            onChange={e => {
                                EmailRegexMessage(e.target.value)
                            }}

                        />

                        <span className="spanErro" style={{ 'color': stateLogin.stateEmailStyle ? '' : '#EE3B3B', 'display': stateLogin.stateEmailStyle ? 'none' : 'block' }}> Email inválido</span>
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

                            if (stateLogin.emailValue == null) {
                                return   Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Defina o e-mail para recuperar sua senha',
                                })

                                
                            }
                            setDisplay('flex')
                        }}
                    >
                        <span>

                            Esqueci minha senha
                            
                        </span>
                    </div>


                    <div
                        className="fazerLoginBtn"
                        onClick={e => {
                            setStateLogin({
                                ...stateLogin,
                                loading: true
                            })
                            logar();
                        }}
                    >

                        {!stateLogin.loading && (
                            <div>
                                Fazer Login
                            </div>
                        )}


                        {stateLogin.loading && (
                            <div className="loaderDiv">
                                <i className="fa  fa-circle-o-notch fa-spin fa-3x fa-fw "></i>
                            </div>
                        )}


                    </div>






                    <div className="linkCadastro">
                        <span>
                            É logista e ainda não possue uma conta?
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