import React, { useState } from "react";
import { useEffect } from "react";
import conect from "../../../../services/conect";
import NumberFormat from "react-number-format";
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

        setStateStoreDetalhe({
            ...stateStoreDetalhe,
            isLoading: true,
            store: store
        })
    }

    function generateSpans(arr) {
        const spans = arr.map(spanTxt => {

            return <>
                <span>
                    {spanTxt.matlisData.txtMat}
                </span>
            </>
        })

        return spans
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
                                {`${stateStoreDetalhe.store.addressData.createdOn.date.day}/${stateStoreDetalhe.store.addressData.createdOn.date.month < 10 ? "0" + stateStoreDetalhe.store.addressData.createdOn.date.month : stateStoreDetalhe.store.addressData.createdOn.date.month}/${stateStoreDetalhe.store.addressData.createdOn.date.year}  `}
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

                        <div className="nameStore">
                            <label htmlFor="">
                                Nome da loja
                            </label>
                            <span>
                                {stateStoreDetalhe.store.companyData.name}
                            </span>
                        </div>

                        <div className="cnpj">
                            <label htmlFor="">
                                CNPJ
                            </label>
                            <span>

                                <NumberFormat format="##.###.###/####-##" value={stateStoreDetalhe.store.companyData.cnpj} />
                            </span>
                        </div>

                        <div className="razaoSocial">
                            <label htmlFor="">
                                Razão Social
                            </label>
                            <span>
                                {stateStoreDetalhe.store.companyData.razaoSocial}

                            </span>
                        </div>

                        <div className="cep">
                            <label htmlFor="">
                                CEP
                            </label>
                            <span>
                                <NumberFormat format="######-##" value={stateStoreDetalhe.store.addressData.postalCode} />
                            </span>
                        </div>

                        <div className="endereco">
                            <label htmlFor="">Endereço{" "}</label>
                            <span>{stateStoreDetalhe.store.addressData.street},{" "}{stateStoreDetalhe.store.addressData.streetNumber},{" "} {stateStoreDetalhe.store.addressData.district} </span>
                        </div>

                        <div className="complemento">
                            <label htmlFor="">Complemento{" "}</label>
                            <span>{stateStoreDetalhe.store.addressData.complement ?
                                stateStoreDetalhe.store.addressData.complement : "Não informado"}</span>
                        </div>

                    </div>

                    <div className="storeDados1">

                        <div className="estado">
                            <label htmlFor="">Estado{" "}</label>
                            <span>{stateStoreDetalhe.store.addressData.txtState}</span>
                        </div>
                        <div className="cidade">
                            <label htmlFor="">Cidade{" "}</label>
                            <span>{stateStoreDetalhe.store.addressData.city}</span>
                        </div>
                        <div className="tel">
                            <label htmlFor="">Telefone da loja{" "}</label>
                            <NumberFormat format="##-#########" value={stateStoreDetalhe.store.phones[0].fullNumber} />
                        </div>
                        <div id="horariosDeAtendimento">
                            <label htmlFor="">Horários de atendimento{" "}</label>

                            <div className="horariosSpan2">
                                <span>
                                    {`2° à 6° -   ${stateStoreDetalhe.store.stowotmes[0].beginTime.hour < 10 ? "0" + stateStoreDetalhe.store.stowotmes[0].beginTime.hour : stateStoreDetalhe.store.stowotmes[0].beginTime.hour}:${stateStoreDetalhe.store.stowotmes[0].beginTime.minute < 10 ? "0" + stateStoreDetalhe.store.stowotmes[0].beginTime.minute : stateStoreDetalhe.store.stowotmes[0].beginTime.minute}   
                                às ${stateStoreDetalhe.store.stowotmes[0].endTime.hour < 10 ? "0" + stateStoreDetalhe.store.stowotmes[0].endTime.hour : stateStoreDetalhe.store.stowotmes[0].endTime.hour}:${stateStoreDetalhe.store.stowotmes[0].endTime.minute < 10 ? "0" + stateStoreDetalhe.store.stowotmes[0].endTime.minute : stateStoreDetalhe.store.stowotmes[0].endTime.minute} `}
                                </span>
                                {" "}{" "}
                                {stateStoreDetalhe.store.stowotmes[5] && <>
                                    <span>{`Sáb - 
                                ${stateStoreDetalhe.store.stowotmes[5].beginTime.hour < 10 ? "0" + stateStoreDetalhe.store.stowotmes[5].beginTime.hour : stateStoreDetalhe.store.stowotmes[5].beginTime.hour}:${stateStoreDetalhe.store.stowotmes[5].beginTime.minute < 10 ? "0" + stateStoreDetalhe.store.stowotmes[5].beginTime.minute : stateStoreDetalhe.store.stowotmes[5].beginTime.minute} 
                                às
                                ${stateStoreDetalhe.store.stowotmes[5].endTime.hour < 10 ? "0" + stateStoreDetalhe.store.stowotmes[5].endTime.hour : stateStoreDetalhe.store.stowotmes[5].endTime.hour}:${stateStoreDetalhe.store.stowotmes[5].endTime.minute < 10 ? "0" + stateStoreDetalhe.store.stowotmes[5].endTime.minute : stateStoreDetalhe.store.stowotmes[5].endTime.minute} `}</span>
                                </>}
                                <span className="fechado">Dom - Fechado </span>
                                <span className="fechado">Feriados - Fechados</span>
                            </div>
                        </div>

                    </div>
                    <div className="storeDados1">
                        <div className="SobreLoja">
                            <label htmlFor="">Sobre a loja{" "}</label>
                            <span>{stateStoreDetalhe.store.storextes[1].description}</span>
                        </div>

                        <div id="servicosLoja">
                            <label htmlFor="" style={{ 'marginLeft': '10px' }}>Serviços da loja</label>
                            <div className="spansServicoLoja">
                                {generateSpans(stateStoreDetalhe.store.matores)}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="dadosStore" >

                    <h3>Dados do representante legal</h3>
                    <div className="storeDados1">

                        <div className="nome">
                            <label htmlFor="">Nome{" "}</label>
                            <span>{stateStoreDetalhe.store.personData.name}</span>
                        </div>
                        <div className="cpf">
                            <label htmlFor="">CPF{" "}</label>
                            <NumberFormat format="###.###.###-##" value={stateStoreDetalhe.store.personData.cpf} />
                        </div>

                        <div className="tel">
                            <label htmlFor="">Contato{" "}</label>
                            <span>{stateStoreDetalhe.store.personData.phone ? stateStoreDetalhe.store.personData.phone : "Não informado"}</span>
                        </div>

                        <div className="email">
                            <label htmlFor="">E-mail{" "}</label>
                            <span>{stateStoreDetalhe.store.personData.email}</span>
                        </div>



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