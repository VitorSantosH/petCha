import React from "react";
import "./Requests.css";


const Requests = (props) => {


    const {
        homeState,
        setDisplay,
        setDisplayEditRequests,

    } = { ...props }


    return (
        <>
            <div className="menusuperior">
                Requests

                <div className="editarRequests">

                    <div
                        className="btnAltSenha"
                        onClick={e => {
                            setDisplay('flex')
                        }}
                    >
                        Alterar senha
                    </div>

                    <div
                        className="btnAltRequests"
                        onClick={e => {
                            setDisplayEditRequests('flex')

                        }}
                    >
                        Editar Requests
                    </div>

                </div>
            </div>
            <div className="conteudoRequests">

                <div className="parteSuperior">

                    <div className="barraSuperior">

                        <div className="informacoesRequests">
                            {homeState.user.imgRequests && (
                                <img src={homeState.user.imgRequests} />
                            )}

                            {!homeState.user.imgRequests && (
                                <i className="fa fa-user-o" aria-hidden="true"></i>
                            )}



                          

                            <div className="infoRequestsText">
                                <div className="cargo">
                                    {homeState.user.cargo}
                                </div>
                                <h2>
                                    {homeState.user.name}
                                </h2>
                            </div>
                        </div>
                    </div>



                </div>

                <div className="parteInferior">

                    <div className="texto1Requests">

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

                    <div className="texto2Requests">

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

            <div className="menusuperior menuInferiorMobile">
                Requests

                <div className="editarRequests">

                    <div
                        className="btnAltSenha"
                        onClick={e => {
                            setDisplay('flex')
                        }}
                    >
                        Alterar senha
                    </div>

                    <div
                        className="btnAltRequests"
                        onClick={e => {
                            setDisplayEditRequests('flex')

                        }}
                    >
                        Editar Requests
                    </div>

                </div>
            </div>
        </>

    )
}


export default Requests;