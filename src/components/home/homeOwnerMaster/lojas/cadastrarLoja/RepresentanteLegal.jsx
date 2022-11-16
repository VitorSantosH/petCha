import React from "react";
import NumberFormat from "react-number-format";

const RepresentanteLegal = (props) => {

    return (
        <>
            <div className="storeDadosEditarLoja2 representanteLegal" >

                <h3>Dados do representante legal</h3>
                <div className="storeDados1">

                    <div className="nome">
                        <label htmlFor="">Nome{" "}</label>
                        {/* <span>{stateStoreDetalhe.store.peregData.personData.name}</span>*/}
                        <input
                            type="text"
                            value={props.cadastrarLojaState.store.peregData.personData.name}
                            onChange={e => {

                                var storeTemp = props.cadastrarLojaState.store
                                storeTemp.peregData.personData.name = e.target.value
                                storeTemp.peregData.personData.username = e.target.value
                                storeTemp.userPersonData.name = e.target.value

                                props.setCadastrarLojaState({
                                    ...props.cadastrarLojaState,
                                    store: storeTemp
                                })

                            }}

                        />
                    </div>
                    <div className="cpf">
                        <label htmlFor="">CPF{" "}</label>
                        <NumberFormat
                            format="###.###.###-##"
                            value={props.cadastrarLojaState.store.peregData.personData.cpf}
                            onChange={e => {

                                var storeTemp = props.cadastrarLojaState.store
                                storeTemp.peregData.personData.cpf = e.target.value.replace(/\.|\-/g, '')


                                props.setCadastrarLojaState({
                                    ...props.cadastrarLojaState,
                                    store: storeTemp
                                })

                            }}
                        />

                    </div>

                    <div className="tel">
                        <label htmlFor="">Contato{" "}</label>
                        <NumberFormat
                            format="## #.####-####"
                            value={props.cadastrarLojaState.store.peregData.phoneData.fullNumber}
                            onChange={e => {

                                var storeTemp = props.cadastrarLojaState.store
                                storeTemp.peregData.phoneData.fullNumber = e.target.value.replace(/\.|\-/g, '')
                                storeTemp.peregData.phoneData.fullNumber = storeTemp.peregData.phoneData.fullNumber.replace("/", "").replace(" ", "")
                                storeTemp.peregData.phoneData.codCountryPhone = '55'


                                props.setCadastrarLojaState({
                                    ...props.cadastrarLojaState,
                                    store: storeTemp
                                })

                            }}
                        />

                        <span>    {/**{stateStoreDetalhe.store.peregData.personData.phone ? stateStoreDetalhe.store.peregData.personData.phone : "Não informado"} */} </span>
                    </div>

                    <div className="email">
                        <label htmlFor="">E-mail{" "}</label>
                        <input
                            type="email"
                            name=""
                            id=""
                            value={props.cadastrarLojaState.store.peregData.personData.email}
                            onChange={e => {

                                var storeTemp = props.cadastrarLojaState.store
                                storeTemp.peregData.personData.email = e.target.value
                                storeTemp.userPersonData.email = e.target.value

                                props.setCadastrarLojaState({
                                    ...props.cadastrarLojaState,
                                    store: storeTemp
                                })

                            }}

                        />
                        {/**<span>{stateStoreDetalhe.store.peregData.personData.email}</span> */}
                    </div>



                </div>


            </div>

            <div
                className="storeDadosEditarLoja2 representanteLegalAdressdata"
            >

                <div className="cep">
                    <label htmlFor="">
                        CEP
                    </label>
                    <span>
                        <NumberFormat
                            format="######-##"
                            placeholder="000000-00"
                            value={props.cadastrarLojaState.store.peregData.addressData.postalCode}
                            onChange={e => {

                                var storeTemp = props.cadastrarLojaState.store
                                storeTemp.peregData.addressData.postalCode = e.target.value

                                props.setCadastrarLojaState({
                                    ...props.cadastrarLojaState,
                                    store: storeTemp
                                })


                            }}

                        />
                    </span>

                </div>

                <div className="rua">
                    <label htmlFor="">Rua{" "}</label>
                    <input
                        placeholder="Digite a rua"
                        value={`${props.cadastrarLojaState.store.peregData.addressData.street}`}
                        onChange={e => {

                            var storeTemp = props.cadastrarLojaState.store
                            storeTemp.peregData.addressData.street = e.target.value
                            props.setCadastrarLojaState({
                                ...props.cadastrarLojaState,
                                store: storeTemp
                            })


                        }}
                    />

                </div>
                <div className="numero">
                    <label htmlFor="">Número{" "}</label>
                    <input
                        placeholder="Digite o número"
                        value={props.cadastrarLojaState.store.peregData.addressData.streetNumber}
                        type="number"
                        onChange={e => {
                            var storeTemp = props.cadastrarLojaState.store
                            storeTemp.peregData.addressData.streetNumber = e.target.value
                            props.setCadastrarLojaState({
                                ...props.cadastrarLojaState,
                                store: storeTemp
                            })


                        }}
                    />


                </div>
                <div className="bairro">
                    <label htmlFor="">Bairro{" "}</label>
                    <input
                        placeholder="Digite o bairro"
                        value={`${props.cadastrarLojaState.store.peregData.addressData.district}`}
                        onChange={e => {
                            var storeTemp = props.cadastrarLojaState.store
                            storeTemp.peregData.addressData.district = e.target.value
                            props.setCadastrarLojaState({
                                ...props.cadastrarLojaState,
                                store: storeTemp
                            })

                        }}
                    />

                </div>

                <div className="complemento">
                    <label htmlFor="">Complemento{" "}</label>

                    <input
                        placeholder="Digite um complemento"
                        value={props.cadastrarLojaState.store.peregData.addressData.complement}

                        onChange={e => {
                            var storeTemp = props.cadastrarLojaState.store
                            storeTemp.peregData.addressData.complement = e.target.value
                            props.setCadastrarLojaState({
                                ...props.cadastrarLojaState,
                                store: storeTemp
                            })

                        }}
                    />
                </div>

                <div className="estado">
                    <label htmlFor="">Estado{" "}</label>
                    <input

                        value={props.cadastrarLojaState.store.peregData.addressData.txtState}
                        onChange={e => {
                            var storeTemp = props.cadastrarLojaState.store
                            storeTemp.peregData.addressData.txtState = e.target.value
                            props.setCadastrarLojaState({
                                ...props.cadastrarLojaState,
                                store: storeTemp
                            })


                        }}

                    />
                </div>

                <div className="cidade">
                    <label htmlFor="">Cidade{" "}</label>

                    <input

                        placeholder="Digite a cidade"
                        value={props.cadastrarLojaState.store.peregData.addressData.city}
                        onChange={e => {

                            var storeTemp = props.cadastrarLojaState.store
                            storeTemp.peregData.addressData.city = e.target.value
                            props.setCadastrarLojaState({
                                ...props.cadastrarLojaState,
                                store: storeTemp
                            })


                        }}
                    />
                </div>

            </div>

         

        </>
    )
} 



export default RepresentanteLegal;