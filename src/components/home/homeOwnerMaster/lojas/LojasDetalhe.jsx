import React, { useState } from "react";
import { useEffect } from "react";
import conect from "../../../../services/conect";
import './LojasDetalhe.css'

//imgs 
import setasImg from '../../../../assets/Setas.png';
import gitCarregamento from '../../../../assets/Rolling.gif';

const LojasDetalhe = (props) => {

    const [stateStoreDetalhe, setStateStoreDetalhe] = useState({
        isLoading: false,
        store: undefined
    })

    useEffect(() => {

        if (stateStoreDetalhe.isLoading === false) {
            getStore(props.codStore)
        }

    }, [stateStoreDetalhe.isLoading])

    async function getStore(codStore) {

        const { response } = await conect.getStore(codStore);


        const store = response.data.results[0]
        console.log(store)

        setStateStoreDetalhe({
            ...stateStoreDetalhe,
            isLoading: true,
            store: store
        })
    }

    return <>

        <div className="menuSuperiorLojas">


            <div className="lojasEstouAqui">
                <span className="tituloLojaDetalhe">
                    Lojas
                </span>
                <img src={setasImg} alt="" />
                <span>
                    Estou aqui
                </span>
            </div>



            <div className="buttonsLojaDetalhe">
                <div className="genericButton excluir">
                    Excluir Loja
                </div>
                <div className="genericButton inativar">
                    Inativar Loja
                </div>
                <div className="genericButton editar">
                    Editar Loja
                </div>
            </div>
        </div>


        {!stateStoreDetalhe.store && <img className="gitCaregamento" src={gitCarregamento}></img>}
        {stateStoreDetalhe.store &&
            <>
                <div className="storeName">
                    <div className="name">
                        {stateStoreDetalhe.store.companyData.name}
                    </div>
                    <div className="datas_status">
                        <div className="data">
                            <span>
                                Data de cadastro
                            </span>
                            <div className="dataCadastro">
                                {`${stateStoreDetalhe.store.addressData.createdOn.date.day}/${stateStoreDetalhe.store.addressData.createdOn.date.month}/${stateStoreDetalhe.store.addressData.createdOn.date.year}  `}
                            </div>
                        </div>
                        <div className="statusStore">
                            <span>Status</span>
                            <div className={stateStoreDetalhe.store.isLocked ? 'ativo' : 'inativo'}>
                                {stateStoreDetalhe.store.isLocked ? 'Ativo' : 'Inativo'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="imgs_resumo">
                    <div className="imgsStore">
                        {stateStoreDetalhe.store.fimecoData && <>

                            <div className="imgPrincipal">
                                <img src={stateStoreDetalhe.store.fimecoData.fimistCover.fileImgUriExternal} alt="" />
                            </div>
                            <div className="carrosel">
                                <img src={stateStoreDetalhe.store.fimecoData.fimistes[0].fileImgUriExternal} alt="" />

                            </div>
                        </>}
                    </div>

                    <div className="resumoStore">
                        <h3>Resumo do negócio desde o início</h3>
                        <div className="containerBanners" >

                            <div className="servicos">
                                <span>
                                    {stateStoreDetalhe.store.stefilonData.countService < 10 ? "0" + stateStoreDetalhe.store.stefilonData.countService : stateStoreDetalhe.store.stefilonData.countService}
                                </span>
                                <span>
                                    Serviços
                                </span>
                            </div>

                            <div className="profissionais">
                                <span>
                                    {stateStoreDetalhe.store.stefilonData.countEmployee < 10 ? "0" + stateStoreDetalhe.store.stefilonData.countEmployee : stateStoreDetalhe.store.stefilonData.countEmployee}
                                </span>
                                <span>
                                    Profissionais
                                </span>
                            </div>

                            <div className="atendimentos">
                                <span>
                                    {stateStoreDetalhe.store.stefilonData.countScheduleConfirmed < 10 ? "0" + stateStoreDetalhe.store.stefilonData.countScheduleConfirmed : stateStoreDetalhe.store.stefilonData.countScheduleConfirmed}
                                </span>
                                <span>
                                    Atendimentos
                                </span>
                            </div>

                            <div className="clientes">
                                <span>
                                    {stateStoreDetalhe.store.stefilonData.countCustomer < 10 ? "0" + stateStoreDetalhe.store.stefilonData.countCustomer : stateStoreDetalhe.store.stefilonData.countCustomer}
                                </span>
                                <span>
                                    Clientes
                                </span>
                            </div>

                        </div>
                    </div>



                </div>
                <div className="dadosStore">
                    <h3>Dados da loja</h3>
                    <div className="storeDados1">

                    </div>
                </div>
            </>
        }



        <div onClick={props.resetStoreFocus}>
            Reset
        </div>


    </>
}



export default LojasDetalhe;