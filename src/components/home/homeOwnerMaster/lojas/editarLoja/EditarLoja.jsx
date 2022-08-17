import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect as connectRedux } from 'react-redux';
import NumberFormat from "react-number-format";
import conect from "../../../../../services/conect";
import Swal from 'sweetalert2';
import DropDiv from "./dropzone";
import './EditarLoja.css';

// imgs 
import trash from '../../../../../assets/trash.png';
import addCirculo from "../../../../../assets/add-circle.png";


const EditarLoja = (props) => {



    const [state, setState] = useState({
        display: false,
        store: props.loja,
        stowotmes: []
    })



    useEffect(() => {


    }, [setState.display])


    if (props.loja != state.store) {
        setState({
            ...state,
            store: props.loja
        })
    }

    if (props.display != state.display) {

        setState({
            ...state,
            display: props.display
        })
    }

    if (state.store && state.store.stowotmes.length > 0 && state.stowotmes.length == 0) {


        let stowotmes =
            [

                { day: "Segunda" },
                { day: "Terça" },
                { day: "Quarta" },
                { day: "Quinta" },
                { day: "Sexta" },
                { day: "Sábado" },
                { day: "Domingo" }
            ];
        for (let index = 0; index < stowotmes.length; index++) {



            if (state.store.stowotmes[index]) {

                if (state.store.stowotmes[index].txtWeekday == stowotmes[index].day) {

                    stowotmes[index].open = true;
                    stowotmes[index].beginTime = state.store.stowotmes[index].beginTime
                    stowotmes[index].endTime = state.store.stowotmes[index].endTime

                }

            } else {
                stowotmes[index].open = false;
            }




        }

        setState({
            ...state,
            stowotmes: stowotmes
        })
    }

    function GenerateCarrosel() {

        if (state.store === undefined) return <></>

        const imgs = state.store.fimecoData.fimistes.map((img, i) => {


            return (
                <div className="imgsCarrosel">
                    <img
                        src={img.fileImgUriExternal}
                        numberimage={i}
                        alt=""

                    />
                    <div
                        id="trash"
                        onClick={async event => {
                            // const res = await conect.deleteImage(img.codFileImg, props.codStore)
                            deleteImage(img.codFileImg, props.codStore, event)
                        }}
                    >
                        <img src={trash} alt="" />

                    </div>
                </div>
            )


        })

        return <>
            {imgs}
        </>


    }

    function GenerateHorariosFuncionamento() {




        let stowotmesDivs = state.stowotmes.map((item, indice) => {

            /** 
             *   onChange={e => {

                                let stowotmes = state.stowotmes;
                                stowotmes[indice] = e.target.value;

                                setState({
                                    ...state,
                                    stowotmes: stowotmes
                                })

                            }}
            */

            return (
                <div>

                    <span className={item.day}>
                        <input
                            type="checkbox"
                            name={item.day}

                        />
                        <label htmlFor="dom">{item.day}</label>
                    </span>
                    {item.open && <>
                        <h4>Horário</h4>

                        <div id="timeItemDay">

                            {/**
                       * 
                       *    <span> {state.store.stowotmes[indice].beginTime.hour < 10 ? "0" + state.store.stowotmes[indice].beginTime.hour : state.store.stowotmes[indice].beginTime.hour}:{state.store.stowotmes[indice].beginTime.minute < 10 ? "0" + state.store.stowotmes[indice].beginTime.minute : state.store.stowotmes[indice].beginTime.minute}</span>
                            ás
                            <span>{state.store.stowotmes[indice].endTime.hour < 10 ? "0" + state.store.stowotmes[indice].endTime.hour : state.store.stowotmes[indice].endTime.hour}:{state.store.stowotmes[indice].endTime.minute < 10 ? "0" + state.store.stowotmes[indice].endTime.minute : state.store.stowotmes[indice].endTime.minute} </span>
                       * 
                       */}

                            <span>
                                <input
                                    type="text"
                                    value={`${state.store.stowotmes[indice].beginTime.hour < 10 ? "0" + state.store.stowotmes[indice].beginTime.hour : state.store.stowotmes[indice].beginTime.hour}`}
                                    onChange={e => {

                                        var storeTemp = state.store
                                        storeTemp.stowotmes[indice].beginTime.hour = parseInt(e.target.value)
                                        setState({
                                            ...state,
                                            store: storeTemp
                                        })

                                    }}
                                />
                                {": "}
                                <input
                                    type="text"
                                    value={`${state.store.stowotmes[indice].beginTime.minute < 10 ? "0" + state.store.stowotmes[indice].beginTime.minute : state.store.stowotmes[indice].beginTime.minute}`}

                                    onChange={e => {
                                        var storeTemp = state.store
                                        storeTemp.stowotmes[indice].beginTime.minute = parseInt(e.target.value)
                                        setState({
                                            ...state,
                                            store: storeTemp
                                        })

                                    }}
                                />
                            </span>

                            {" ás"}
                    
                            <span>
                                <input
                                    type="text"
                                    value={`${state.store.stowotmes[indice].endTime.hour < 10 ? "0" + state.store.stowotmes[indice].endTime.hour : state.store.stowotmes[indice].endTime.hour}`}
                                    onChange={e => {

                                        var storeTemp = state.store
                                        storeTemp.stowotmes[indice].endTime.hour = parseInt(e.target.value)
                                        setState({
                                            ...state,
                                            store: storeTemp
                                        })

                                    }}
                                />
                                {": "}
                                <input
                                    type="text"
                                    value={`${state.store.stowotmes[indice].endTime.minute < 10 ? "0" + state.store.stowotmes[indice].endTime.minute : state.store.stowotmes[indice].endTime.minute}`}

                                    onChange={e => {
                                        var storeTemp = state.store
                                        storeTemp.stowotmes[indice].endTime.minute = parseInt(e.target.value)
                                        setState({
                                            ...state,
                                            store: storeTemp
                                        })

                                    }}
                                />
                            </span>

                        </div>


                        {state.store.stuntmes[indice] && <>
                            <h4>Intervalo</h4>
                            <div id="timeItemDay">
                                <span> {state.store.stuntmes[indice].beginTime.hour < 10 ? "0" + state.store.stuntmes[indice].beginTime.hour : state.store.stuntmes[indice].beginTime.hour}:{state.store.stuntmes[indice].beginTime.minute < 10 ? "0" + state.store.stuntmes[indice].beginTime.minute : state.store.stuntmes[indice].beginTime.minute}</span>
                                ás
                                <span>{state.store.stuntmes[indice].endTime.hour < 10 ? "0" + state.store.stuntmes[indice].endTime.hour : state.store.stuntmes[indice].endTime.hour}:{state.store.stuntmes[indice].endTime.minute < 10 ? "0" + state.store.stuntmes[indice].endTime.minute : state.store.stuntmes[indice].endTime.minute} </span>
                            </div>
                        </>}

                    </>}
                    {!item.open && <><div id="fechado">
                        Fechado
                    </div></>}
                </div>
            )




        })



        return stowotmesDivs


    }

    async function uploadImage(event) {

        if (event.target.files[0].size < 2097152) {


            const responseStatus = await conect.uploadImage(event.target.files[0], props.codStore)

            if (responseStatus == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Upload realizado com sucesso'
                });
                props.updateStore(props.codStore)

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ocorreu um erro inesperado'
                });
            }
            event.target.value = "";

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Imagem maior que o permitido, escolha uma imagem com no máximo 2 mb.'
            });
            event.target.value = "";

        }

    }

    async function deleteImage(codFileImg, codStore, event) {

        const responseStatus = await conect.deleteImage(codFileImg, codStore)

        if (responseStatus == 200) {

        }
        Swal.fire({
            icon: 'success',
            title: 'Imagem excluída com sucesso'
        });

        props.updateStore(props.codStore)

    }


    return (
        <>
            {state.store && (
                <div
                    className={state.display ? "editarLoja anime" : "editarLoja"}>
                    <div className="headerEditarLoja">
                        Editar Loja
                    </div>
                    {state.store &&
                        <div className="dadosDaLoja">
                            <h2>Dados da loja</h2>

                            <div className="containerUpdateStore">

                                <div className="buttonUpdateStore">
                                    Salvar Alterações
                                </div>

                                <div
                                    onClick={e => {
                                        console.log(state.store)
                                    }}
                                >
                                    Show Store state
                                </div>

                            </div>

                            <div className="titlesImgs">
                                <span>
                                    Foto de capa
                                </span>
                                <span className="fotosCarroselSpan">
                                    Fotos carrossel
                                </span>

                            </div>

                            {state.store.fimecoData && (
                                <div className="imgsEditarLoja">


                                    <div className="imgCapa">

                                        <img src={state.store.fimecoData.fimistCover.fileImgUriExternal} alt="" />
                                        <div id="trash">
                                            <img src={trash} alt="" />
                                        </div>
                                    </div>

                                    {GenerateCarrosel()}
                                    {GenerateCarrosel()}
                                    <div className="adicionarFoto">

                                        <label htmlFor="uploadImageInput" id="labelUploadImageInput">
                                            <img src={addCirculo} alt="" />
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                id="uploadImageInput"
                                                onChange={event => uploadImage(event)}
                                                placeholder=""


                                            />
                                            <span>
                                                Adicionar Foto
                                            </span>
                                        </label>




                                    </div>

                                </div>
                            )}

                            <div className="storeDadosEditarLoja">

                                <div className="nameStore">
                                    <label htmlFor="">
                                        Nome da loja
                                    </label>
                                    <input
                                        value={`${state.store.companyData.name}`}
                                        onChange={e => {

                                            var storeTemp = state.store
                                            storeTemp.companyData.name = e.target.value
                                            setState({
                                                ...state,
                                                store: storeTemp
                                            })
                                        }}
                                    />
                                </div>

                                <div className="cnpj">
                                    <label htmlFor="">
                                        CNPJ
                                    </label>
                                    <span>
                                        <NumberFormat
                                            format="##.###.###/####-##"
                                            value={state.store.companyData.cnpj}

                                            onChange={e => {

                                                var storeTemp = state.store
                                                storeTemp.companyData.cnpj = e.target.value
                                                setState({
                                                    ...state,
                                                    store: storeTemp
                                                })

                                            }}

                                        />
                                    </span>
                                </div>

                                <div className="razaoSocial">
                                    <label htmlFor="">
                                        Razão Social
                                    </label>
                                    <input
                                        value={state.store.companyData.razaoSocial}
                                    />
                                </div>

                                <div className="cep">
                                    <label htmlFor="">
                                        CEP
                                    </label>
                                    <span>
                                        <NumberFormat
                                            format="######-##"
                                            value={state.store.addressData.postalCode}
                                            onChange={e => {

                                                var storeTemp = state.store
                                                storeTemp.addressData.postalCode = e.target.value
                                                setState({
                                                    ...state,
                                                    store: storeTemp
                                                })

                                            }}

                                        />
                                    </span>

                                </div>

                                <div className="rua">
                                    <label htmlFor="">Rua{" "}</label>
                                    <input
                                        value={`${state.store.addressData.street}`}
                                        onChange={e => {

                                            var storeTemp = state.store
                                            storeTemp.addressData.street = e.target.value
                                            setState({
                                                ...state,
                                                store: storeTemp
                                            })

                                        }}
                                    />

                                </div>
                                <div className="numero">
                                    <label htmlFor="">Número{" "}</label>
                                    <input
                                        value={` ${state.store.addressData.streetNumber}`}
                                        onChange={e => {

                                            var storeTemp = state.store
                                            storeTemp.addressData.streetNumber = e.target.value
                                            setState({
                                                ...state,
                                                store: storeTemp
                                            })

                                        }}
                                    />

                                </div>

                            </div>

                            <div className="storeDadosEditarLoja">

                                <div className="bairro">
                                    <label htmlFor="">Bairro{" "}</label>
                                    <input
                                        value={`${state.store.addressData.district}`}
                                        onChange={e => {

                                            var storeTemp = state.store
                                            storeTemp.addressData.district = e.target.value
                                            setState({
                                                ...state,
                                                store: storeTemp
                                            })

                                        }}
                                    />

                                </div>

                                <div className="complemento">
                                    <label htmlFor="">Complemento{" "}</label>

                                    <input
                                        value={state.store.addressData.complement ?
                                            state.store.addressData.complement : "Não informado"}

                                        onChange={e => {

                                            var storeTemp = state.store
                                            storeTemp.addressData.complement = e.target.value
                                            setState({
                                                ...state,
                                                store: storeTemp
                                            })

                                        }}
                                    />
                                </div>

                                <div className="estado">
                                    <label htmlFor="">Estado{" "}</label>
                                    <input

                                        value={state.store.addressData.txtState}

                                        onChange={e => {

                                            var storeTemp = state.store
                                            storeTemp.addressData.txtState = e.target.value
                                            setState({
                                                ...state,
                                                store: storeTemp
                                            })

                                        }}

                                    />
                                </div>

                                <div className="cidade">
                                    <label htmlFor="">Cidade{" "}</label>

                                    <input
                                        value={state.store.addressData.city}
                                        onChange={e => {

                                            var storeTemp = state.store
                                            storeTemp.addressData.city = e.target.value
                                            setState({
                                                ...state,
                                                store: storeTemp
                                            })

                                        }}
                                    />
                                </div>
                                <div className="tel">
                                    <label htmlFor="">Telefone da loja{" "}</label>
                                    <NumberFormat
                                        format="##-#########"
                                        value={state.store.phones[0].fullNumber}
                                        onChange={e => {

                                            var storeTemp = state.store
                                            storeTemp.phones[0].fullNumber = e.target.value
                                            setState({
                                                ...state,
                                                store: storeTemp
                                            })

                                        }}
                                    />
                                </div>

                            </div>

                            {state.stowotmes && <>
                                <div className="horarioFuncionamento">
                                    {GenerateHorariosFuncionamento()}
                                </div>
                                <div id="horariosDeAtendimento">
                                    <label htmlFor="">Horários de atendimento{" "}</label>

                                    <div className="horariosSpan2">

                                        <span>
                                            {`2° à 6° -   ${state.store.stowotmes[0].beginTime.hour < 10 ? "0" + state.store.stowotmes[0].beginTime.hour : state.store.stowotmes[0].beginTime.hour}:${state.store.stowotmes[0].beginTime.minute < 10 ? "0" + state.store.stowotmes[0].beginTime.minute : state.store.stowotmes[0].beginTime.minute}   
                             às ${state.store.stowotmes[0].endTime.hour < 10 ? "0" + state.store.stowotmes[0].endTime.hour : state.store.stowotmes[0].endTime.hour}:${state.store.stowotmes[0].endTime.minute < 10 ? "0" + state.store.stowotmes[0].endTime.minute : state.store.stowotmes[0].endTime.minute} `}
                                        </span>
                                        {" "}{" "}
                                        {state.store.stowotmes[5] && <>
                                            <span>{`Sáb - 
                             ${state.store.stowotmes[5].beginTime.hour < 10 ? "0" + state.store.stowotmes[5].beginTime.hour : state.store.stowotmes[5].beginTime.hour}:${state.store.stowotmes[5].beginTime.minute < 10 ? "0" + state.store.stowotmes[5].beginTime.minute : state.store.stowotmes[5].beginTime.minute} 
                             às
                             ${state.store.stowotmes[5].endTime.hour < 10 ? "0" + state.store.stowotmes[5].endTime.hour : state.store.stowotmes[5].endTime.hour}:${state.store.stowotmes[5].endTime.minute < 10 ? "0" + state.store.stowotmes[5].endTime.minute : state.store.stowotmes[5].endTime.minute} `}</span>
                                        </>}
                                        <span className="fechado">Dom - Fechado </span>
                                        <span className="fechado">Feriados - Fechados</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="storeDadosEditarLoja">
                                        <div className="SobreLoja">
                                            <label htmlFor="">Sobre a loja{" "}</label>
                                            <span>{state.store.storextes[1].description}</span>
                                        </div>

                                        <div id="servicosLoja">
                                            <label htmlFor="" style={{ 'marginLeft': '10px' }}>Serviços da loja</label>
                                            <div className="spansServicoLoja">
                                                {props.generateSpans(state.store.matores)}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="dadosStore" >

                                    <h3>Dados do representante legal</h3>
                                    <div className="storeDados1">

                                        <div className="nome">
                                            <label htmlFor="">Nome{" "}</label>
                                            <span>{state.store.personData.name}</span>
                                        </div>
                                        <div className="cpf">
                                            <label htmlFor="">CPF{" "}</label>
                                            <NumberFormat format="###.###.###-##" value={state.store.personData.cpf} />
                                        </div>

                                        <div className="tel">
                                            <label htmlFor="">Contato{" "}</label>
                                            <span>{state.store.personData.phone ? state.store.personData.phone : "Não informado"}</span>
                                        </div>

                                        <div className="email">
                                            <label htmlFor="">E-mail{" "}</label>
                                            <span>{state.store.personData.email}</span>
                                        </div>



                                    </div>


                                </div>
                            </>}

                        </div>
                    }



                </div >
            )}
        </>
    )


}


const mapStateToProps = state => {
    return {
        store: state
    }
}

export default connectRedux(mapStateToProps)(EditarLoja);

