import React from "react";



const Perfil = (props) => {


    const {
        homeState,
        ReqSenha,
        setDisplay,
        setDisplayEditPerfil,
        EditarPerfilFunc,
        setUser

    } = props.useHomeState()


    return (
        <>
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

                    <div
                        className="btnAltPerfil"
                        onClick={e => {
                            setDisplayEditPerfil('flex')

                        }}
                    >
                        Editar perfil
                    </div>

                </div>
            </div>
            <div className="conteudoPerfil">

                <div className="parteSuperior">

                    <div className="barraSuperior">

                    </div>

                    <div className="informacoesPerfil">

                        <img src={homeState.user.imgPerfil} alt="" />

                        <div className="infoPerfilText">
                            <div className="cargo">
                                {homeState.user.cargo}
                            </div>
                            <h2>
                                {homeState.user.name}
                            </h2>
                        </div>
                    </div>

                </div>

                <div className="parteInferior">

                    <div className="texto1Perfil">

                        <div className="infos">
                            <label htmlFor="name">Nome completo</label>
                            <span>{homeState.user.name}</span>
                        </div>

                        <div className="infos">
                            <label htmlFor="tel">Telefone</label>
                            <span>{homeState.user.tel}</span>
                        </div>

                        <div className="infos">
                            <label htmlFor="email">E-mail</label>
                            <span>{homeState.user.email}</span>
                        </div>

                    </div>

                    <div className="texto2Perfil">

                        <div className="infos">
                            <label htmlFor="cep">CEP</label>
                            <span>{homeState.user.cep}</span>
                        </div>

                        <div className="infos">
                            <label htmlFor="logradouro">Endereço</label>
                            <span>{homeState.user.logradouro}</span>
                        </div>

                        <div className="infos">
                            <label htmlFor="complemento">Complemento</label>
                            <span>{homeState.user.complemento}</span>
                        </div>

                        <div className="infos">
                            <label htmlFor="estado">Estado</label>
                            <span>{homeState.user.estado}</span>
                        </div>

                        <div className="infos">
                            <label htmlFor="cidade">Cidade</label>
                            <span>{homeState.user.cidade}</span>
                        </div>

                    </div>

                </div>



            </div>
        </>
    )
}


export default Perfil;