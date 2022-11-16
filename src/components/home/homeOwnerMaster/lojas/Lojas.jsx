import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import conect from "../../../../services/conect";
import './Lojas.css';

//components 
import AtivasInativas from "./AtivasInativas";
import LojasDetalhe from "./lojaDetalhe/LojasDetalhe";
import CadastrarLoja from "./cadastrarLoja/CadastrarLoja";


// imgs 
import inconPesquisa from '../../../../assets/icone=pesquisa.png';



const useLojasState = (props) => {




    const [lojasState, setLojasState] = useState({
        ativas: true,
        isLoading: false,
        errorConexao: false,
        dataLojas: [],
        storeFocus: false,
        codStore: 0,
        propsState: null,
        showCadastrarLoja: false
    })

    useEffect(() => {

        loadingLojas()

        if (props.store) {

            setLojasState({
                ...lojasState,
                codStore: props.store,
                storeFocus: true
            })

        }

        if (props.store === undefined) {
            setLojasState({
                ...lojasState,
                storeFocus: false,
                codStore: 0

            })
        }

    }, [lojasState.codStore, lojasState.storeFocus, lojasState.propsState, lojasState.isLoading])

    if (lojasState.propsState == null || lojasState.propsState != props) {
        setLojasState({
            ...lojasState,
            propsState: props
        })
    }


    function changeAtiva_Inativa(value) {

        return setLojasState({
            ...lojasState,
            ativas: (value.value == 'ATIVAS' ? true : false)
        })
    }

    async function loadingLojas(reset) {

        console.log(reset == true)

        if (lojasState.isLoading === false || reset == true) {

            const { response, err } = await conect.getStores()

            if (err) {

                setLojasState({
                    ...lojasState,
                    isLoading: true,
                    errorConexao: true,

                })

            } else {

                setLojasState({
                    ...lojasState,
                    isLoading: true,
                    dataLojas: response
                })

            }

        }
    }

    function setStoreFocus(codStore) {

        setLojasState({
            ...lojasState,
            codStore: codStore,
            storeFocus: true
        })

    }

    function resetStoreFocus() {
        setLojasState({
            ...lojasState,
            codStore: 0,
            storeFocus: false
        })

    }

    function setCadastrarLoja() {
        setLojasState({
            ...lojasState,
            showCadastrarLoja: !lojasState.showCadastrarLoja
        })
    }

    async function resetStores() {

        loadingLojas(true)

    }




    return {
        lojasState,
        changeAtiva_Inativa,
        setStoreFocus,
        resetStoreFocus,
        setCadastrarLoja,
        resetStores
    }
}

const Lojas = (props) => {


    const {
        lojasState,
        changeAtiva_Inativa,
        setStoreFocus,
        resetStoreFocus,
        setCadastrarLoja,
        resetStores
    } = useLojasState(props)

    return (
        <div className="lojas">



            {lojasState.storeFocus &&
                <LojasDetalhe
                    codStore={lojasState.codStore}
                    resetStoreFocus={resetStoreFocus}
                    resetStores={resetStores}
                />
            }

            {lojasState.storeFocus === false &&

                <>


                    <CadastrarLoja
                        display={lojasState.showCadastrarLoja}
                        resetStores={resetStores}
                        setCadastrarLoja={setCadastrarLoja}
                    />

                    <div className="menuSuperiorLojas">
                        Lojas

                        <div
                            className="cadastrarLoja"
                            onClick={e => {
                                setCadastrarLoja();
                            }}
                        >
                            Cadastrar Loja
                        </div>
                    </div>
                    <div className="lojasContainer">

                        <div className="ativas_inativas">

                            <div className="parte1Lojas">
                                <div
                                    className={lojasState.ativas ? 'focus' : 'offFocus'}
                                    value='ATIVAS'
                                    onClick={e => changeAtiva_Inativa(e.target.attributes.value)}

                                >
                                    Ativas
                                </div>
                                <div
                                    className={!lojasState.ativas ? 'focus' : 'offFocus'}
                                    value='INATIVAS'
                                    onClick={e => changeAtiva_Inativa(e.target.attributes.value)}
                                >
                                    Inativas
                                </div>
                            </div>

                            <div className="parte2Lojas">
                                <div className="inputLojasCotainer">
                                    <input type="text" name="pesquisa" id="" placeholder="Pesquisar..." />
                                    <img src={inconPesquisa} alt="" />
                                </div>
                            </div>

                        </div>


                        <div className="lojaBox">
                            <div className="lojasTable">
                                <AtivasInativas
                                    ativas={lojasState.ativas}
                                    dataLojas={lojasState.dataLojas}
                                    setStoreFocus={setStoreFocus}
                                />
                            </div>
                        </div>


                    </div>
                </>
            }
        </div>
    )
}




export default Lojas;