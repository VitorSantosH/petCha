import React, { useState } from "react";
import './HomePerfil.css';


// componentes
import RecuperarSenha from "../../recuperarSenha/RecuperarSenha";


// imgs 
import logo from '../../../assets/Layer 1.png';
import userNotFoundImg from '../../../assets/user.png';
import sinoIcon from '../../../assets/notification.png';
import dashboardIcon from '../../../assets/dashboardIcon.png';
import lojasIcon from '../../../assets/lojasIcon.png';
import categoriasIcon from '../../../assets/categoriasIcon.png';



const useHomeState = () => {
    const [homeState, setHomeState] = useState({
        display: "none",

    })


    function setDisplay(value) {

        setHomeState({
            ...homeState,
            display: value
        })
    }

    function ReqSenha() {
        return <RecuperarSenha display={homeState.display} setDisplay={setDisplay} />
    }

    return {
        homeState,
        ReqSenha,
        setDisplay
    }
}




const HomePerfil = (props) => {

    const {
        homeState,
        ReqSenha,
        setDisplay,

    } = useHomeState()

    const ftPerfil = props.user ? props.user.imgPerfil : userNotFoundImg

    return (
        <div className="homePerfil">
            {ReqSenha()}
            <div className="menuLateral">

                <div className="logoHomePerfil">
                    <img src={logo} alt="" />
                </div>

                <div className="bemVindoHomePerfil">
                    <img src={ftPerfil} />

                    <div className="textCotainerPerfil">

                        <div className="cargo">
                            Master
                        </div>
                        <span>Bem vindo</span>

                        <h6>
                            Rafael Coimbra
                        </h6>

                    </div>

                </div>
                <div className="solicitacoes">

                    <img src={sinoIcon} alt="" />
                    <span> Solicitações </span>
                    {props.user ? 'notifi counter' : ''}

                </div>

                <div className="dashboardAtalho">
                    <img src={dashboardIcon} className='iconsHome' alt="" />
                    <span>Dashboard</span>
                </div>

                <div className="dashboardAtalho">
                    <img src={lojasIcon} alt="" />
                    <span>Lojas</span>
                </div>

                <div className="dashboardAtalho">
                    <img src={categoriasIcon} alt="" />
                    <span>Categorias</span>
                </div>

            </div>
            <div className="containerPerfil">
                <div className="menusuperior">
                    Perfil

                    <div className="editarPerfil">

                        <div
                            className="btnAltSenha"
                            onClick={e => {
                                setDisplay('flex')
                            }}
                        >
                            Alterar senha
                        </div>

                        <div className="btnAltPerfil">
                            Editar perfil
                        </div>

                    </div>
                </div>
                <div className="conteudoPerfil">

                    <div className="parteSuperior">

                        <div className="barraSuperior">

                        </div>

                        <div className="informacoesPerfil">

                            <img src={ftPerfil} alt="" srcset="" />

                            <div className="infoPerfilText">
                                <div className="cargo">
                                    Master
                                </div>
                                <h2>
                                    Rafael Coimbra
                                </h2>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )

}


export default HomePerfil;