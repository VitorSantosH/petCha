import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import conect from "../../../../services/conect";
import './Lojas.css';

//components 
import AtivasInativas from "./AtivasInativas";
import LojasDetalhe from "./LojasDetalhe";

// imgs 
import inconPesquisa from '../../../../assets/icone=pesquisa.png'



const useLojasState = () => {

    const [lojasState, setLojasState] = useState({
        ativas: true,
        isLoading: false,
        errorConexao: false,
        dataLojas: [],
        storeFocus: false,
        codStore: 0
    })

    useEffect(() => {

        loadingLojas()

    }, [lojasState])

    function changeAtiva_Inativa(value) {

        return setLojasState({
            ...lojasState,
            ativas: (value.value == 'ATIVAS' ? true : false)
        })
    }

    async function loadingLojas() {

        if (lojasState.isLoading === false) {

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


    return {
        lojasState,
        changeAtiva_Inativa,
        setStoreFocus,
        resetStoreFocus
    }
}

const Lojas = () => {

    const {
        lojasState,
        changeAtiva_Inativa,
        setStoreFocus,
        resetStoreFocus
    } = useLojasState()

    return (
        <div className="lojas">



            {lojasState.storeFocus &&
                <LojasDetalhe
                    codStore={lojasState.codStore}
                    resetStoreFocus={resetStoreFocus}
                />
            }

            {lojasState.storeFocus === false &&
                <>
                    <div className="menuSuperiorLojas">
                        Lojas

                        <div className="cadastrarLoja"
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


                        <div className="lojasTable">
                            <AtivasInativas
                                ativas={lojasState.ativas}
                                dataLojas={lojasState.dataLojas}
                                setStoreFocus={setStoreFocus}
                            />
                        </div>


                    </div>
                </>
            }
        </div>
    )
}




export default Lojas;