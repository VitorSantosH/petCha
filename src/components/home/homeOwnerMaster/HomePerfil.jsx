import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './HomePerfil.css';
import { connect as connectRedux } from 'react-redux';
import setStore from '../../../services/redux/actions/storeAction';
import connect from "../../../services/connect";

// componentes
import RecuperarSenha from "../../recuperarSenha/RecuperarSenha";
import EditarPerfil from "./perfil/EditarPerfil";
import Perfil from "./perfil/Perfil";
import Categorias from "./categorias/Categorias";
import Dashboard from "./dashboard/Dashboard";
import Lojas from "./lojas/Lojas";
import Requests from "./solicitacoes/Requests";

// imgs 
import logo from '../../../assets/Layer 1.png';
import imgPadUser from "../../../assets/imgPadUser.png"
import Swal from "sweetalert2";
//import imgUser from '../../../assets/ftUser.png';


const useHomeState = (btnsArray, reduxStore, $btnDashboard, $btnLojas) => {

    const params = useParams();

    var config = { store: undefined }
    if (params.store) {
        config = { store: reduxStore }
    }


    const userObj = JSON.parse(sessionStorage.getItem('user'));
    if (!userObj) {
        return window.location.href = "/"
    }

    const inicialState = {
        display: "none",
        user: {
            name: userObj.name || 'Não informado',
            tel: "31 996400879",
            email: 'rafael@gmail.com',
            cep: '99999-88',
            logradouro: 'Rua das Couves',
            complemento: 'ao lado do...',
            estado: "Sâo Paulo",
            cidade: "São Paulo",
            cargo: 'Master',
            imgPerfil: userObj.fimistData ? userObj.fimistData.fileImgUriExternal : null,
        },
        displayEditarPerfil: "none",
        btnFocos: null,
        screen: "PERFIL",
        store: null
    }

    const [homeState, setHomeState] = useState({
        ...inicialState
    })

    // var btnsArray = [$btnDashboard, $btnLojas, $btnCatgorias, $btnPerfil]



    useEffect(() => {


        if (config.store === undefined) {
            setHomeState({
                ...homeState,
                btnFocos: $btnDashboard,
                screen: "DASHBOARD"

            })
        }

        if (config !== undefined) {
            if (config.store) {
                setHomeState({
                    ...homeState,
                    btnFocos: $btnLojas,
                    screen: "LOJAS"
                })

            }
        }

        if (btnsArray[0] !== undefined) {
            for (let index = 0; index < btnsArray.length; index++) {


                if (btnsArray[index] !== homeState.btnFocos) {
                    btnsArray[index].current.attributes.class.value = 'dashboardAtalho'

                } else {


                    if (btnsArray[index].current.attributes.value != undefined) {
                        setScreen(btnsArray[index].current.attributes.value.value)
                    }


                    btnsArray[index].current.attributes.class.value = 'itemFocus'
                }

            }
        }

    }, [homeState.user, homeState.btnFocos, homeState.store])



    if (homeState.store != config.store) {
        setHomeState({
            ...homeState,
            store: config.store
        })
    }


    function setBtnFocus(referencia) {

        // referencia.current.attributes.class.value = 'itemFocus'

        return setHomeState({
            ...homeState,
            btnFocos: referencia
        })

    }


    function setDisplay(value) {

        setHomeState({
            ...homeState,
            display: value
        })
    }

    function setDisplayEditPerfil(value) {

        setHomeState({
            ...homeState,
            displayEditarPerfil: value
        })

    }

    function setUser(obj) {

        setHomeState({
            ...homeState,
            user: obj,
            displayEditarPerfil: "none"
        })

    }

    function ReqSenha() {
        return <RecuperarSenha display={homeState.display} setDisplay={setDisplay} />
    }

    function EditarPerfilFunc() {
        return (
            <EditarPerfil
                display={homeState.displayEditarPerfil}
                setDisplay={setDisplayEditPerfil}
                user={homeState.user}
                setUser={setUser}
            />
        )
    }

    function CustonRouter() {


        switch (homeState.screen) {

            case "PERFIL":
                return <Perfil
                    homeState={homeState}
                    setDisplay={setDisplay}
                    setDisplayEditPerfil={setDisplayEditPerfil} />
                break;
            case "CATEGORIA":
                return <Categorias />
                break;

            case "DASHBOARD":
                return <Dashboard />
                break;

            case "LOJAS":
                return <Lojas store={config.store} />
                break;

            case "REQUESTS":
                return <Requests
                    homeState={homeState}
                    setDisplay={setDisplay}
                    setDisplayEditPerfil={setDisplayEditPerfil}
                />
                break;

            default:
                break;
        }


    }

    function setScreen(v) {

        setHomeState({
            ...homeState,
            screen: v
        })
    }
    function logout() {

        Swal.fire({
            icon: "warning",
            title: 'realizar logout',
            showCancelButton: true,
            confirmButtonText: 'Sair',
            confirmButtonColor: '#FB8500',
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#D94F4F"
        }).then((result) => {

            if (result.isConfirmed) {
                connect.logout();
            } else if (result.isDenied) {

            }
        })

    }

    return {
        homeState,
        ReqSenha,
        setDisplay,
        setDisplayEditPerfil,
        EditarPerfilFunc,
        setBtnFocus,
        CustonRouter,
        setScreen,
        logout


    }
}

const HomePerfil = (props) => {


    const $btnDashboard = useRef(null)
    const $btnLojas = useRef(null)
    const $btnCatgorias = useRef(null)
    const $btnPerfil = useRef(null)
    const $requests = useRef(null)
    const btnsArray = [
        $btnDashboard, $btnLojas, $btnCatgorias, $btnPerfil, $requests
    ]

    const {
        homeState,
        ReqSenha,
        EditarPerfilFunc,
        setBtnFocus,
        CustonRouter,
        setScreen,
        logout


    } = useHomeState(btnsArray, props.store.storeFoco.store, $btnDashboard, $btnLojas)




    return (
        <div className="homePerfil">

            {EditarPerfilFunc()}
            {ReqSenha()}
            <div className="menuLateral">

                <div className="logoHomePerfil">
                    <img
                        src={logo}
                        alt=""
                        onClick={e => {

                            setBtnFocus($btnDashboard)

                        }}

                    />
                </div>

                <div
                    id="bemVindoHomePerfil"
                    className=""
                    value="PERFIL"
                    ref={$btnPerfil}
                    onClick={e => {
                        //  setScreen("PERFIL")
                        setBtnFocus($btnPerfil)
                    }}
                >
                    {homeState.user.imgPerfil && (
                        <img src={homeState.user.imgPerfil} />
                    )}

                    {!homeState.user.imgPerfil && (
                        <img src={imgPadUser} alt="" />
                  )}




                    <div
                        className="textCotainerPerfil"

                    >

                        <div className="cargo">
                            {homeState.user.cargo}
                        </div>
                        <span>Bem vindo</span>

                        <h6>
                            {homeState.user.name}
                        </h6>

                    </div>

                </div>

                <div
                    className="logout dashboardAtalho"
                    onClick={e => {
                        logout();
                    }}
                >

                    <i className="fa fa-sign-out" aria-hidden="true" id="sinoLogout"></i>

                    <span>Sair</span>

                </div>
                <div
                    className="solicitacoes"
                    value="REQUESTS"
                    ref={$requests}
                    onClick={e => {
                        setBtnFocus($requests)
                    }}

                >
                    <i class="fa fa-bell-o" aria-hidden="true"></i>
                    <span> Solicitações </span>
                    {props.user ? 'notifi counter' : ''}

                </div>

                <div
                    className="dashboardAtalho"
                    ref={$btnDashboard}
                    value="DASHBOARD"
                    onClick={e => {
                        setBtnFocus($btnDashboard)
                    }}
                >
                    {/** <img src={dashboardIcon} className='iconsHome' alt="" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 22H21" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 22H6" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3 13V18C3 18.55 3.45 19 4 19H5.59998C6.14998 19 6.59998 18.55 6.59998 18V9.38C6.59998 8.83 6.14998 8.38 5.59998 8.38H4C3.45 8.38 3 8.83 3 9.38" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.8002 5.19H11.2002C10.6502 5.19 10.2002 5.64 10.2002 6.19V18C10.2002 18.55 10.6502 19 11.2002 19H12.8002C13.3502 19 13.8002 18.55 13.8002 18V6.19C13.8002 5.64 13.3502 5.19 12.8002 5.19Z" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20.9999 3C20.9999 2.45 20.5499 2 19.9999 2H18.3999C17.8499 2 17.3999 2.45 17.3999 3V18C17.3999 18.55 17.8499 19 18.3999 19H19.9999C20.5499 19 20.9999 18.55 20.9999 18V7.13" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Dashboard</span>
                </div>

                <div
                    className="dashboardAtalho"
                    ref={$btnLojas}
                    onClick={e => setBtnFocus($btnLojas)}
                    value="LOJAS"
                >
                    {/**
                  *    <img src={lojasIcon} alt="" />
                  */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M3.51196 18.3283C3.51196 23.5667 5.61196 25.6667 10.8503 25.6667H17.1386C22.377 25.6667 24.477 23.5667 24.477 18.3283V13.09" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.0005 14C16.1355 14 17.7105 12.2617 17.5005 10.1267L16.7305 2.33334H11.2821L10.5005 10.1267C10.2905 12.2617 11.8655 14 14.0005 14Z" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M21.3622 14C23.7188 14 25.4455 12.0867 25.2122 9.74168L24.8855 6.53334C24.4655 3.50001 23.2988 2.33334 20.2422 2.33334H16.6838L17.5005 10.5117C17.6988 12.4367 19.4372 14 21.3622 14Z" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.58035 14C8.50535 14 10.2437 12.4367 10.4304 10.5117L10.687 7.93334L11.247 2.33334H7.68869C4.63202 2.33334 3.46535 3.50001 3.04535 6.53334L2.73035 9.74168C2.49702 12.0867 4.22368 14 6.58035 14Z" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.0004 19.8333C12.0521 19.8333 11.0837 20.8017 11.0837 22.75V25.6667H16.9171V22.75C16.9171 20.8017 15.9487 19.8333 14.0004 19.8333Z" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Lojas</span>
                </div>

                <div
                    className="dashboardAtalho"
                    ref={$btnCatgorias}
                    onClick={e => setBtnFocus($btnCatgorias)}
                    value="CATEGORIA"
                >
                    {/**
                    *  <img src={categoriasIcon} alt="" />
                    */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22 9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V12.97" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7 4.99V2.44" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17 2.44V12.42C17 14.39 15.59 15.16 13.86 14.12L12.54 13.33C12.24 13.15 11.76 13.15 11.46 13.33L10.14 14.12C8.41 15.15 7 14.39 7 12.42V9" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Categorias</span>
                </div>

            </div>
            <div className="containerPerfil">
                {CustonRouter()}
            </div>
        </div>
    )

}


const mapStateToProps = state => {
    return {
        store: state
    }
}

export default connectRedux(mapStateToProps)(HomePerfil);