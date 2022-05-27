import React, { useEffect, useRef, useState } from "react";
import './HomePerfil.css';
import conect from '../../../services/conect';

// componentes
import RecuperarSenha from "../../recuperarSenha/RecuperarSenha";
import EditarPerfil from "./EditarPerfil";
import Perfil from "./Perfil";
import Categorias from "./Categorias";


// imgs 
import logo from '../../../assets/Layer 1.png';
import userNotFoundImg from '../../../assets/user.png';
import sinoIcon from '../../../assets/notification.png';
import dashboardIcon from '../../../assets/dashboardIcon.png';
import lojasIcon from '../../../assets/lojasIcon.png';
import categoriasIcon from '../../../assets/categoriasIcon.png';
import imgUser from '../../../assets/ftUser.png';


const useHomeState = ($btnDashboard, $btnLojas, $btnCatgorias) => {

    const [homeState, setHomeState] = useState({
        display: "none",
        user: {
            name: 'Rafael Coimbra',
            tel: "31 996400879",
            email: 'rafael@gmail.com',
            cep: '99999-88',
            logradouro: 'Rua das Couves',
            complemento: 'ao lado do...',
            estado: "Sâo Paulo",
            cidade: "São Paulo",
            cargo: 'Master',
            imgPerfil: imgUser


        },
        displayEditarPerfil: "none",
        btnFocos: null,
        screen: "PERFIL"


    })

    var arr = [$btnDashboard, $btnLojas, $btnCatgorias]

    useEffect(() => {



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

    }, [homeState.user, homeState.btnFocos])


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
            user: obj
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

        if (homeState.screen == "PERFIL") {
            return <Perfil useHomeState={useHomeState} />
        }

        if (homeState.screen == "CATEGORIA") {
            return <Categorias />
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
        setUser,
        setBtnFocus,
        CustonRouter,
        setScreen
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
        setScreen

    } = useHomeState($btnDashboard, $btnLojas, $btnCatgorias)



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
                    value="CATEGORIA"
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
                >
                    <img src={lojasIcon} alt="" />
                    <span>Lojas</span>
                </div>

                <div
                    className="dashboardAtalho"
                    ref={$btnCatgorias}
                    onClick={e => setBtnFocus($btnCatgorias)}
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


export default HomePerfil;