import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import connect from "../../../../../services/connect.jsx";
import "./CadastrarLoja.css";
import RepresentanteLegal from "./RepresentanteLegal";
import UploadImgs from "./UploadImgs";


//imgs 

// colocar pais campo
// campo pais fixo 
// campo pais phone escolher

const useCadastroState = (props) => {

    const initialState = {
        display: false,
        imgCapa: [],
        imgs: [],
        store: {
            peregData: {
                personData: {
                    codGender: 1,
                    username: "",
                    name: "",
                    cpf: "",
                    codLanguage: "PT",
                    codEntityCateg: "",
                    phone: '',
                    codCountryPhone: '55',
                    fullNumber: "",
                    email: '',
                    birthDate: {
                        "year": 1984,
                        "month": 8,
                        "day": 16
                    },


                },
                phoneData: {},
                addressData: {
                    postalCode: '',
                    street: "",
                    streetNumber: '',
                    district: "",
                    complement: "",
                    city: '',
                    codCountry: 'BR',
                    codState: 'MG',
                },
            }
            ,
            companyData: {
                name: "",
                cnpj: undefined,
                razaoSocial: '',
                codLanguage: "PT",
                username: "",
                codEntityCateg: "",
                codCountryLegal: "BR"

            },
            addressData: {
                postalCode: '',
                street: "",
                streetNumber: '',
                district: "",
                complement: "",
                city: '',
                codCountry: 'BR',
                codState: 'MG',
            },
            storextes: [],
            phones: [],
            codCountryPhone: '55',
            fullNumber: "",
            username: "",
            codLanguage: "PT",
            codCurr: "BRL",
            codTimezone: "America/Sao_Paulo",
            txtTimezone: "Fuso horário de Brasília",
            userPersonData: {
                name: '',
                email: ''
            }

        },
    }

    const [cadastrarLojaState, setCadastrarLojaState] = useState({
        ...initialState
    })

    useEffect(() => {


    }, [cadastrarLojaState.display])

    async function createStore(event) {

        Swal.fire({
            title: 'Cadastrar loja?',
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: 'Cadastrar',
            denyButtonText: `Cancelar`,

        }).then(async (result) => {

            if (result.isConfirmed) {

                const resp = await connect.generateStore(cadastrarLojaState.store)

                if (resp.status == 200) {

                    Swal.fire({
                        title: "Loja cadastrada com sucesso!",
                        icon: "success"
                    })

                    if (cadastrarLojaState.imgCapa.length > 0) {
                        uploadImage(cadastrarLojaState.imgCapa, resp.data.results[0].codStore, true)
                    }
                    if (cadastrarLojaState.imgs.length > 0) {
                        uploadImage(cadastrarLojaState.imgs, resp.data.results[0].codStore)
                    }



                    props.resetStores()
                    props.setCadastrarLoja()
                    return setCadastrarLojaState({
                        ...initialState
                    })

                } else {
                    Swal.fire(`${resp.response.data.returnMessage}`, '', 'error')
                }
            }
        })


        return props.resetStores()

    }

    async function uploadImage(files, codStore, isCover = false) {

        let numberUpload = 0;
        let responseStatus = []

        for (let index = 0; index < files.length; index++) {

            responseStatus[index] = await connect.uploadImage(files[index].file, codStore, isCover)

            if (responseStatus[index] == 200) numberUpload++
        }


    }

    function setImgs(imgCapa, imgs) {

        return setCadastrarLojaState({
            ...cadastrarLojaState,
            imgCapa: imgCapa,
            imgs: imgs
        })
    }

    if (props.display != cadastrarLojaState.display) {
        setCadastrarLojaState({
            ...cadastrarLojaState,
            display: props.display
        })
    }

    return {
        cadastrarLojaState,
        setCadastrarLojaState,
        createStore,
        setImgs
    }

}

const CadastrarLoja = (props) => {

    const {
        cadastrarLojaState,
        setCadastrarLojaState,
        createStore,
        setImgs
    } = useCadastroState(props)


    return (
        <div className={cadastrarLojaState.display ? "cadastrarLojaCotainer cadastrarLojaCotainerAnime" : "cadastrarLojaCotainer"}>

            <div className="headerCadastrarLoja">
                <h2>Cadastrar</h2>
            </div>

            <div className="cadastrarLojaCotainer2">
                <div className="dadosLoja">
                    Dados da loja
                    <div
                        className="btn"
                        onClick={e => console.log(cadastrarLojaState)}

                    >
                        Show State
                    </div>

                    <div
                        className="reset"
                        onClick={e => props.resetStores()}
                    >
                        reset
                    </div>
                </div>

                <UploadImgs setImgs={setImgs} />

                <div className="storeDadosEditarLoja">

                    <div className="name">
                        <label htmlFor="">
                            Nome da loja
                        </label>
                        <input
                            placeholder="Digite o nome da loja"
                            value={cadastrarLojaState.store.companyData.name}

                            onChange={e => {

                                var storeTemp = cadastrarLojaState.store
                                storeTemp.companyData.name = e.target.value
                                storeTemp.username = e.target.value

                                setCadastrarLojaState({
                                    ...cadastrarLojaState,
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
                                placeholder='Digite o CNPJ'
                                value={cadastrarLojaState.store.companyData.cnpj}
                                onChange={e => {
                                    var storeTemp = cadastrarLojaState.store

                                    storeTemp.companyData.cnpj = e.target.value.replace(/\.|\-/g, '')
                                    storeTemp.companyData.cnpj = storeTemp.companyData.cnpj.replace("/", "")

                                    setCadastrarLojaState({
                                        ...cadastrarLojaState,
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
                            placeholder="Digite a Razão Social"
                            value={cadastrarLojaState.store.companyData.razaoSocial}
                            onChange={e => {

                                var storeTemp = cadastrarLojaState.store
                                storeTemp.companyData.razaoSocial = e.target.value
                                setCadastrarLojaState({
                                    ...cadastrarLojaState,
                                    store: storeTemp
                                })

                            }}
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
                                value={cadastrarLojaState.store.addressData.postalCode}
                                onChange={e => {

                                    var storeTemp = cadastrarLojaState.store
                                    storeTemp.addressData.postalCode = e.target.value
                                    setCadastrarLojaState({
                                        ...cadastrarLojaState,
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
                            value={`${cadastrarLojaState.store.addressData.street}`}
                            onChange={e => {

                                var storeTemp = cadastrarLojaState.store
                                storeTemp.addressData.street = e.target.value
                                setCadastrarLojaState({
                                    ...cadastrarLojaState,
                                    store: storeTemp
                                })


                            }}
                        />

                    </div>
                    <div className="numero">
                        <label htmlFor="">Número{" "}</label>
                        <input
                            placeholder="Digite o número"
                            value={cadastrarLojaState.store.addressData.streetNumber}
                            type="number"
                            onChange={e => {
                                var storeTemp = cadastrarLojaState.store
                                storeTemp.addressData.streetNumber = e.target.value
                                setCadastrarLojaState({
                                    ...cadastrarLojaState,
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
                            placeholder="Digite o bairro"
                            value={`${cadastrarLojaState.store.addressData.district}`}
                            onChange={e => {
                                var storeTemp = cadastrarLojaState.store
                                storeTemp.addressData.district = e.target.value
                                setCadastrarLojaState({
                                    ...cadastrarLojaState,
                                    store: storeTemp
                                })

                            }}
                        />

                    </div>

                    <div className="complemento">
                        <label htmlFor="">Complemento{" "}</label>

                        <input
                            placeholder="Digite um complemento"
                            value={cadastrarLojaState.store.addressData.complement}

                            onChange={e => {
                                var storeTemp = cadastrarLojaState.store
                                storeTemp.addressData.complement = e.target.value
                                setCadastrarLojaState({
                                    ...cadastrarLojaState,
                                    store: storeTemp
                                })

                            }}
                        />
                    </div>

                    <div className="estado">
                        <label htmlFor="">Estado{" "}</label>
                        <input

                            value={cadastrarLojaState.store.addressData.txtState}
                            onChange={e => {
                                var storeTemp = cadastrarLojaState.store
                                storeTemp.addressData.txtState = e.target.value
                                setCadastrarLojaState({
                                    ...cadastrarLojaState,
                                    store: storeTemp
                                })


                            }}

                        />
                    </div>

                    <div className="cidade">
                        <label htmlFor="">Cidade{" "}</label>

                        <input

                            placeholder="Digite a cidade"
                            value={cadastrarLojaState.store.addressData.city}
                            onChange={e => {

                                var storeTemp = cadastrarLojaState.store
                                storeTemp.addressData.city = e.target.value
                                setCadastrarLojaState({
                                    ...cadastrarLojaState,
                                    store: storeTemp
                                })


                            }}
                        />
                    </div>
                    <div className="tel">
                        <label htmlFor="">Telefone da loja{" "}</label>
                        <NumberFormat
                            format="##-#########"
                            placeholder="00 00000-0000"
                            value={cadastrarLojaState.store.phones[0] ? cadastrarLojaState.store.phones[0].fullNumber : ''}
                            onChange={e => {

                                var storeTemp = cadastrarLojaState.store
                                if (!storeTemp.phones[0]) {
                                    storeTemp.phones[0] = {
                                        fullNumber: null
                                    }
                                }
                                storeTemp.phones[0].fullNumber = e.target.value
                                storeTemp.phones[0].codCountryPhone = '55'
                                setCadastrarLojaState({
                                    ...cadastrarLojaState,
                                    store: storeTemp
                                })


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
                            value={cadastrarLojaState.store.storextes[0] ? cadastrarLojaState.store.storextes[0].description : ""}
                            onChange={e => {

                                var storeTemp = cadastrarLojaState.store
                                if (!storeTemp.storextes[0]) {
                                    storeTemp.storextes[0] = {
                                        description: ''
                                    }
                                }
                                storeTemp.storextes[0].description = e.target.value
                                setCadastrarLojaState({
                                    ...cadastrarLojaState,
                                    store: storeTemp
                                })


                            }}

                        />
                    </div>
                </div>

                <RepresentanteLegal
                    setCadastrarLojaState={setCadastrarLojaState}
                    cadastrarLojaState={cadastrarLojaState}
                />

                <div className="storeDadosEditarLoja2">
                    <div className="btnCancelar">
                        Cancelar
                    </div>
                    <div
                        className="btnFinalizarCadastro"
                        onClick={async e => {
                            createStore(e)
                        }}
                    >
                        Finalizar cadastro
                    </div>
                </div>

            </div>


        </div>
    )
}




export default CadastrarLoja;