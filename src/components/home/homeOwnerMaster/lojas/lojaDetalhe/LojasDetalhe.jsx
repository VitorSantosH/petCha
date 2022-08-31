import React, { useState } from "react";
import { useEffect } from "react";
import conect from "../../../../../services/conect";
import NumberFormat from "react-number-format";
import './LojasDetalhe.css'
import { connect } from 'react-redux';
import EditarLoja from "../editarLoja/EditarLoja";
import Swal from "sweetalert2";

//
import 'animate.css'



//imgs 
import setasImg from '../../../../../assets/Setas.png';
import gitCarregamento from '../../../../../assets/Rolling.gif';
import btnVoltar from '../../../../../assets/bntVoltar.png';
import btnIr from '../../../../../assets/arrow-circle-right.png';


const LojasDetalhe = (props) => {


    const [stateStoreDetalhe, setStateStoreDetalhe] = useState({
        isLoading: false,
        store: undefined,
        lengthCarrosel: 0,
        carroselPosition: 0,
        imgs: [],
        editarLoja: false
    })

    useEffect(() => {

        if (stateStoreDetalhe.store != undefined && stateStoreDetalhe.lengthCarrosel == 0) {

            if (!stateStoreDetalhe.store.fimecoData) return
            setStateStoreDetalhe({
                ...stateStoreDetalhe,
                lengthCarrosel: stateStoreDetalhe.store.fimecoData.fimistes.length ? stateStoreDetalhe.store.fimecoData.fimistes.length : 0
            })
        }

        if (stateStoreDetalhe.isLoading === false) {
            getStore(props.codStore)
        }

    }, [stateStoreDetalhe.isLoading, stateStoreDetalhe.store])

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
        const spans = arr.map((spanTxt, i) => {

            return <>
                <span key={`${i}spanTxtMat`}

                >
                    {spanTxt.matlisData.txtMat}
                </span>
            </>
        })

        return spans
    }

    function GenerateCarrosel(store, carroselPosition) {

        if (store === undefined) return <></>

        const imgs = store.fimecoData.fimistes.map((img, i) => {

            return <img
                key={`${i}-${carroselPosition}`}
                src={img.fileImgUriExternal}
                numberimage={i}
                alt=""
                className={carroselPosition == i ? "selected imgsCarroselDetalheStore" : "imgsCarroselDetalheStore"}

            />

        })

        return <>
            {imgs}
        </>


    }

    function showEditarLoja() {
        setStateStoreDetalhe({
            ...stateStoreDetalhe,
            editarLoja: !stateStoreDetalhe.editarLoja
        })
    }

    async function activateStore(codStore) {

        Swal.fire({
            title: 'Deseja mesmo ativar essa loja?',
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: ' <div className="confirmButton">  Sim, Ativar   </div>',
            denyButtonText: '<div className="denyButtonCuston">Não, voltar</div>',
            confirmButtonColor: '#FB8500',
            cancelButtonColor: 'cancelButtonColor',
            preConfirm: async (login) => {
                return  conect.activateStore(codStore)
                    .then(response => {
                        console.log(response)
                        if (!response.status == 200) {
                            throw new Error('Erro inexperado')
                        }

                        return response
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()

        }).then( async (result) => {
            console.log(result)
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: `A loja foi ativada com sucesso!`,
                    confirmButtonText: 'Fechar',
                    confirmButtonColor: '#FB8500',
                    
                    
                })
            }
            await props.resetStores()
            return getStore(props.codStore)
        })

        return    

    }

    async function inactivateStore(codStore) {

        Swal.fire({
            title: 'Deseja mesmo inativar essa loja?',
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: ' <div className="confirmButton">  Sim, inativar   </div>',
            denyButtonText: '<div className="denyButtonCuston">Não, voltar</div>',
            confirmButtonColor: '#FB8500',
            cancelButtonColor: 'cancelButtonColor',
            preConfirm: async (login) => {
                return  conect.inactivateStore(codStore)
                    .then(response => {
                        console.log(response)
                        if (!response.status == 200) {
                            throw new Error('Erro inexperado')
                        }

                        return response
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()

        }).then( async (result) => {
            console.log(result)
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: `A loja foi inativada com sucesso!`,
                    confirmButtonText: 'Fechar',
                    confirmButtonColor: '#FB8500',
                    
                    
                })
            }
            await props.resetStores()
            return getStore(props.codStore)
        })

      return

    }

    return <>

        <EditarLoja
            display={stateStoreDetalhe.editarLoja}
            loja={stateStoreDetalhe.store}
            codStore={props.codStore}
            generateSpans={generateSpans}
            updateStore={getStore}
        />
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


                {stateStoreDetalhe.store &&
                    <>
                        <div className="genericButton excluir">
                            Excluir Loja
                        </div>
                        {!stateStoreDetalhe.store.isLocked &&
                            <div
                                className="genericButton inativar"
                                onClick={e => {
                                    inactivateStore(props.codStore)
                                }}
                            >
                                Inativar Loja
                            </div>
                        }
                        {stateStoreDetalhe.store.isLocked &&
                            <div className="genericButton ativar"
                                onClick={e => {
                                    activateStore(props.codStore)
                                }}
                            >
                                Ativar Loja
                            </div>
                        }
                    </>}


                <div
                    className="genericButton editar"
                    onClick={e => {
                        showEditarLoja()
                    }}
                >
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
                            <div className={!stateStoreDetalhe.store.isLocked ? 'ativo' : 'inativo'}>
                                {!stateStoreDetalhe.store.isLocked ? 'Ativo' : 'Inativo'}
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



                                {/**
                               *   <img src={stateStoreDetalhe.store.fimecoData.fimistes[stateStoreDetalhe.carroselPosition].fileImgUriExternal} alt="" />
                               */}
                                {GenerateCarrosel(stateStoreDetalhe.store, stateStoreDetalhe.carroselPosition)}


                                <div className="controlCarrosel">
                                    <div

                                        onClick={e => {

                                            if (stateStoreDetalhe.carroselPosition - 1 >= 0) {
                                                setStateStoreDetalhe({
                                                    ...stateStoreDetalhe,
                                                    carroselPosition: stateStoreDetalhe.carroselPosition - 1
                                                })
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z" /></svg>

                                    </div>
                                    <div

                                        onClick={e => {

                                            if (stateStoreDetalhe.lengthCarrosel - 1 >= stateStoreDetalhe.carroselPosition + 1) {
                                                setStateStoreDetalhe({
                                                    ...stateStoreDetalhe,
                                                    carroselPosition: stateStoreDetalhe.carroselPosition + 1
                                                })
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM406.6 278.6l-103.1 103.1c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L306.8 288H128C110.3 288 96 273.7 96 256s14.31-32 32-32h178.8l-49.38-49.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l103.1 103.1C414.6 241.3 416 251.1 416 256C416 260.9 414.6 270.7 406.6 278.6z" /></svg>
                                    </div>
                                </div>

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







    </>
}


const mapStateToProps = state => {
    return {
        store: state
    }
}

export default connect(mapStateToProps)(LojasDetalhe);