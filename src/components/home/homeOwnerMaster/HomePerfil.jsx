import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './HomePerfil.css';
import { connect as connectRedux } from 'react-redux';
import setStore from '../../../services/redux/actions/storeAction';


// componentes
import RecuperarSenha from "../../recuperarSenha/RecuperarSenha";
import EditarPerfil from "./perfil/EditarPerfil";
import Perfil from "./perfil/Perfil";
import Categorias from "./categorias/Categorias";
import Dashboard from "./dashboard/Dashboard";
import Lojas from "./lojas/Lojas";

// imgs 
import logo from '../../../assets/Layer 1.png';
import userNotFoundImg from '../../../assets/user.png';
import sinoIcon from '../../../assets/notification.png';
import dashboardIcon from '../../../assets/dashboardIcon.png';
import lojasIcon from '../../../assets/lojasIcon.png';
import categoriasIcon from '../../../assets/categoriasIcon.png';
//import imgUser from '../../../assets/ftUser.png';


const useHomeState = ($btnDashboard, $btnLojas, $btnCatgorias, reduxStore) => {

    const params = useParams();

    var config = { store: undefined }
    if(params.store) {
        config = {store : reduxStore}
    }

    
    const userObj = JSON.parse(sessionStorage.getItem('user'));

    const inicialState = {
        display: "none",
        user: {
            name: userObj.name,
            tel: "31 996400879",
            email: 'rafael@gmail.com',
            cep: '99999-88',
            logradouro: 'Rua das Couves',
            complemento: 'ao lado do...',
            estado: "Sâo Paulo",
            cidade: "São Paulo",
            cargo: 'Master',
            imgPerfil: userObj.fimistData.fileImgUriExternal
        },
        displayEditarPerfil: "none",
        btnFocos: null,
        screen: "PERFIL",
        store: null
    }

    const [homeState, setHomeState] = useState({
        ...inicialState
    })

    var arr = [$btnDashboard, $btnLojas, $btnCatgorias]



    useEffect(() => {


        if (config.store === undefined) {
            setHomeState({
                ...homeState,
                btnFocos: null,
                screen: "PERFIL"

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

        if (arr[0] !== undefined) {
            for (let index = 0; index < arr.length; index++) {
                if (arr[index] !== homeState.btnFocos) {
                    arr[index].current.attributes.class.value = 'dashboardAtalho'
                } else {


                    if (arr[index].current.attributes.value != undefined) {
                        setScreen(arr[index].current.attributes.value.value)
                    }


                    arr[index].current.attributes.class.value = 'itemFocus'
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

    return {
        homeState,
        ReqSenha,
        setDisplay,
        setDisplayEditPerfil,
        EditarPerfilFunc,
        setBtnFocus,
        CustonRouter,


    }
}

const HomePerfil = (props) => {


    const $btnDashboard = useRef(null)
    const $btnLojas = useRef(null)
    const $btnCatgorias = useRef(null)


    const {
        homeState,
        ReqSenha,
        EditarPerfilFunc,
        setBtnFocus,
        CustonRouter,


    } = useHomeState($btnDashboard, $btnLojas, $btnCatgorias, props.store.storeFoco.store)



    // const ftPerfil = props.user ? props.user.imgPerfil : userNotFoundImg
    //const response = conect.getOwnerInfo({ username: 'owner1@mind5.com.br', password: "%xK!S898" })
    //console.log(response)

    return (
        <div className="homePerfil">

            {EditarPerfilFunc()}
            {ReqSenha()}
            <div className="menuLateral">

                <div className="logoHomePerfil">
                    <img src={logo} alt="" />
                </div>

                <div className="bemVindoHomePerfil">
                    <img src={homeState.user.imgPerfil} />

                    <div className="textCotainerPerfil">

                        <div className="cargo">
                            {homeState.user.cargo}
                        </div>
                        <span>Bem vindo</span>

                        <h6>
                            {homeState.user.name}
                        </h6>

                    </div>

                </div>
                <div className="solicitacoes">

                    <img src={sinoIcon} alt="" />
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
                    <img src={dashboardIcon} className='iconsHome' alt="" />
                    <span>Dashboard</span>
                </div>

                <div
                    className="dashboardAtalho"
                    ref={$btnLojas}
                    onClick={e => setBtnFocus($btnLojas)}
                    value="LOJAS"
                >
                    <img src={lojasIcon} alt="" />
                    <span>Lojas</span>
                </div>

                <div
                    className="dashboardAtalho"
                    ref={$btnCatgorias}
                    onClick={e => setBtnFocus($btnCatgorias)}
                    value="CATEGORIA"
                >
                    <img src={categoriasIcon} alt="" />
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