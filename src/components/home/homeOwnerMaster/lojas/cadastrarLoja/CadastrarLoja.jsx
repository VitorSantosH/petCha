import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

import "./CadastrarLoja.css";

//imgs 
import addCirculo from "../../../../../assets/add-circle.png";

const CadastrarLoja = (props) => {

    const [cadastrarLojaState, setCadastrarLojaState] = useState({
        display: false,
    })

    useEffect(() => {



    }, [cadastrarLojaState.display])

    if (props.display != cadastrarLojaState.display) {
        setCadastrarLojaState({
            ...cadastrarLojaState,
            display: props.display
        })
    }



    return (
        <div className={cadastrarLojaState.display ? "cadastrarLojaCotainer cadastrarLojaCotainerAnime" : "cadastrarLojaCotainer"}>

            <div className="headerCadastrarLoja">
                <h2>Cadastrar</h2>
            </div>
            <div className="dadosLoja">
                Dados da loja
            </div>

            <div className="addImgsCadLoja">


                <div className="imgCap">
                    <span>
                        Foto de capa
                    </span>
                    <div className="adicionarFoto">

                        <label htmlFor="uploadImageInput" id="labelUploadImageInput">

                            <img src={addCirculo} alt="" />

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                id="uploadImageInput"
                                onChange={event => {
                                    // uploadImage(event)
                                }}
                                placeholder=""
                            />
                            <span>
                                Adicionar Foto
                            </span>
                        </label>




                    </div>
                </div>

                <div className="imgsCarrossel">

                    <span>Fotos carrossel</span>

                    <div className="adicionarFoto">

                        <label htmlFor="uploadImageInput" id="labelUploadImageInput">

                            <img src={addCirculo} alt="" />

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                id="uploadImageInput"
                                onChange={event => {
                                    // uploadImage(event)
                                }}
                                placeholder=""
                            />
                            <span>
                                Adicionar Foto
                            </span>
                        </label>

                    </div>
                </div>



            </div>
            <div className="storeDadosEditarLoja">

                <div className="name">
                    <label htmlFor="">
                        Nome da loja
                    </label>
                    <input
                        placeholder="Digite o nome da loja"
                        onChange={e => {

                            /**
                             *        var storeTemp = state.store
                                   storeTemp.companyData.name = e.target.value
                                   setState({
                                       ...state,
                                       store: storeTemp
                                   })
                             */
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
                            placeholder='Digite o CNPJ'
                            onChange={e => {

                                /**
                                 *    var storeTemp = state.store
                                   storeTemp.companyData.cnpj = e.target.value
                                   setState({
                                       ...state,
                                       store: storeTemp
                                   })
                                 */

                            }}

                        />
                    </span>
                </div>

                <div className="razaoSocial">
                    <label htmlFor="">
                        Razão Social
                    </label>
                    <input
                        placeholder="Digite a Razão Social"
                    // value={state.store.companyData.razaoSocial}
                    />
                </div>

                <div className="cep">
                    <label htmlFor="">
                        CEP
                    </label>
                    <span>
                        <NumberFormat
                            format="######-##"
                            placeholder="000000-00"
                            //  value={state.store.addressData.postalCode}
                            onChange={e => {

                                /**
                                 *       var storeTemp = state.store
                                      storeTemp.addressData.postalCode = e.target.value
                                      setState({
                                          ...state,
                                          store: storeTemp
                                      })
                                 */

                            }}

                        />
                    </span>

                </div>

                <div className="rua">
                    <label htmlFor="">Rua{" "}</label>
                    <input
                        placeholder="Digite a rua"
                        //   value={`${state.store.addressData.street}`}
                        onChange={e => {

                            /**
                             *       var storeTemp = state.store
                                  storeTemp.addressData.street = e.target.value
                                  setState({
                                      ...state,
                                      store: storeTemp
                                  })
                             */

                        }}
                    />

                </div>
                <div className="numero">
                    <label htmlFor="">Número{" "}</label>
                    <input
                        placeholder="Digite o número"
                        //  value={` ${state.store.addressData.streetNumber}`}
                        onChange={e => {

                            /**
                             *    var storeTemp = state.store
                               storeTemp.addressData.streetNumber = e.target.value
                               setState({
                                   ...state,
                                   store: storeTemp
                               })
                             */

                        }}
                    />

                </div>

            </div>

            <div className="storeDadosEditarLoja">

                <div className="bairro">
                    <label htmlFor="">Bairro{" "}</label>
                    <input
                        placeholder="Digite o bairro"
                        //  value={`${state.store.addressData.district}`}
                        onChange={e => {

                            /**
                             *      var storeTemp = state.store
                                 storeTemp.addressData.district = e.target.value
                                 setState({
                                     ...state,
                                     store: storeTemp
                                 })
                             */

                        }}
                    />

                </div>

                <div className="complemento">
                    <label htmlFor="">Complemento{" "}</label>

                    <input
                        placeholder="Digite um complemento"
                        /*  value={state.store.addressData.complement ?
                              state.store.addressData.complement : "Não informado"}
                  */
                        onChange={e => {

                            /*       var storeTemp = state.store
                                   storeTemp.addressData.complement = e.target.value
                                   setState({
                                       ...state,
                                       store: storeTemp
                                   })
                       */
                        }}
                    />
                </div>

                <div className="estado">
                    <label htmlFor="">Estado{" "}</label>
                    <input

                        // value={state.store.addressData.txtState}

                        onChange={e => {

                            /**
                             * var storeTemp = state.store
                               storeTemp.addressData.txtState = e.target.value
                               setState({
                                   ...state,
                                   store: storeTemp
                               })
                             */

                        }}

                    />
                </div>

                <div className="cidade">
                    <label htmlFor="">Cidade{" "}</label>

                    <input

                        placeholder="Digite a cidade"
                        //  value={state.store.addressData.city}
                        onChange={e => {

                            /**
                             *  var storeTemp = state.store
                                storeTemp.addressData.city = e.target.value
                                setState({
                                    ...state,
                                    store: storeTemp
                                })
                             */

                        }}
                    />
                </div>
                <div className="tel">
                    <label htmlFor="">Telefone da loja{" "}</label>
                    <NumberFormat
                        format="##-#########"
                        placeholder="00 00000-0000"
                        //  value={state.store.phones[0].fullNumber}
                        onChange={e => {

                            /**
                             *   var storeTemp = state.store
                              storeTemp.phones[0].fullNumber = e.target.value
                              setState({
                                  ...state,
                                  store: storeTemp
                              })
                             */

                        }}
                    />
                </div>

            </div>

            <div className="storeDadosEditarLoja2">
                <div className="resumo">
                    <span>Resumo</span>
                    <div className="spansResumo">
                        Nenhum dia selecionado
                    </div>
                </div>
                <div className="sobreLoja">
                    <span >
                        Sobre a Loja
                    </span>
                    <textarea
                        type="text"
                        placeholder="Descrição da loja"
                    />
                </div>
            </div>
            <div className="storeDadosEditarLoja2 representanteLegal" >

                <h3>Dados do representante legal</h3>
                <div className="storeDados1">

                    <div className="nome">
                        <label htmlFor="">Nome{" "}</label>
                        {/* <span>{stateStoreDetalhe.store.personData.name}</span>*/}
                    </div>
                    <div className="cpf">
                        <label htmlFor="">CPF{" "}</label>
                        <NumberFormat
                            format="###.###.###-##"
                        />
                        {/**value={stateStoreDetalhe.store.personData.cpf} */}
                    </div>

                    <div className="tel">
                        <label htmlFor="">Contato{" "}</label>

                        <span>    {/**{stateStoreDetalhe.store.personData.phone ? stateStoreDetalhe.store.personData.phone : "Não informado"} */} </span>
                    </div>

                    <div className="email">
                        <label htmlFor="">E-mail{" "}</label>
                        {/**<span>{stateStoreDetalhe.store.personData.email}</span> */}
                    </div>



                </div>


            </div>


        </div>
    )
}

/*
exemplo de obj time 
     var teste = {
            beginTime: { hour: 0, minute: 0 },
            codLanguage: "PT",
            codOwner: 26,
            codSnapshot: -1,
            codStore: 34,
            codTimezone: "America/Sao_Paulo",
            codWeekday: 1,
            createdBy: 132,
            // createdOn:  { date: { year: 0, month: 0, day: 0 }, time: {hour: 0, minute: 0 } },
            endTime: { hour: 0, minute: 0 },
            isDeleted: false,
            // lastChanged:  { date: { year: 0, month: 0, day: 0 }, time: {hour: 0, minute: 0 } },
            lastChangedBy: 132,
            txtWeekday: "Segunda",
            username: "owner1@mind5.com.br"
        }
 */


export default CadastrarLoja;