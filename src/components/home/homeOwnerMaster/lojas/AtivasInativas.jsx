import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect as connectRedux } from 'react-redux';
import { setStore } from '../../../../services/redux/actions/storeAction';

// imgs
import setaIcon from '../../../../assets/setaIcon.png';

const AtivasInativas = (props) => {

    const navigate = useNavigate();

    const [state, setState] = useState({
        lojasAtivas: [],
        lojasInativas: [],
        isLoaded: false,
        loadingProps: false,

    })

    useEffect(() => {

        if (props.dataLojas.data && state.isLoaded === false) {
            generateLojasRows(props.dataLojas.data.results)
        }

    }, [state.lojasAtivas, state.lojasInativa, state.loadingProps])


    if (props.dataLojas.data && state.loadingProps === false) {
        setState({
            ...state,
            loadingProps: true
        })
    }


    async function generateLojasRows(arr) {



        let ativas = [];
        let inativas = [];

        await arr.map(loja => {

            if (!loja.isLocked) {
                ativas.push(loja)
            } else {
                inativas.push(loja)
            }

        })

        setState({
            ...state,
            lojasAtivas: await generateTables(ativas),
            lojasInativas: await generateTables(inativas),
            isLoaded: true
        })

    }


    function generateTables(data) {

        const rows = data.map(loja => {

            const obj = JSON.stringify({
                store: loja.codStore,
                config: 'store'
            })

            return <div className="tableRows" key={loja.complisData.name + loja.phones[0].fullNumber}>
                <div className="name">
                    {loja.complisData.name}
                </div>
                <div className="UF">
                    {loja.addressData.txtState}
                </div>
                <div className="cidade">
                    {loja.addressData.city}
                </div>
                <div className="dataCadastro">
                    {`${loja.addressData.createdOn.date.day}/${loja.addressData.createdOn.date.month}/${loja.addressData.createdOn.date.year} - ${loja.addressData.createdOn.time.hour}: ${loja.addressData.createdOn.time.minute} `}
                </div>
                <div className="ParceiroPagamento">

                    {loja.storacData.hasPayPartner && <span className="constaAtiva">Ativo</span>}
                    {!loja.storacData.hasPayPartner && <span className="constaInativa">Inativo</span>}

                </div>
                <div className="statusConta">
                    <span
                    className={loja.storacData.isAccountCompleted? "constaAtiva" : "constaInativa"} 
                    >
                        {loja.storacData.isAccountCompleted ? "Completa" : "Incompleta"}
                    </span>
                </div>
                <div className="status">
                    {!loja.isLocked &&
                        <span className="constaAtiva">Ativa</span>}
                    {loja.isLocked &&
                        <span className="constaInativa">Inativa</span>}
                </div>
                <div className="detalhes">
                    <span
                        onClick={e => {
                            props.setStoreFocus(loja.codStore)
                            navigate(`/homePerfil/store`)

                            props.actionStore(loja.codStore)

                        }}
                    >
                        <img src={setaIcon} alt={">"} />
                    </span>
                </div>
            </div>
        })

        return rows
    }

    function ReturnTable() {


        return <>
            <div className="tableTitles">
                <div className="name">
                    Nome da loja
                </div>
                <div className="UF">
                    Estado
                </div>
                <div className="cidade">
                    Cidade
                </div>
                <div className="dataCadastro">
                    Data de cadastro
                </div>
                <div className="ParceiroPagamento">
                    Parceiro Pagamento
                </div>
                <div className="statusConta">
                    Status da conta
                </div>
                <div className="status">
                    Status
                </div>
                <div className="detalhes">
                    Detalhes
                </div>
            </div>

            {!props.ativas && state.lojasInativas}
            {props.ativas && state.lojasAtivas}
        </>
    }

    return (
        <>
            <ReturnTable />

        </>
    )
}

const mapStateToProps = state => {
    return {
        store: state
    }
}


const mapActionCreatorsToProp = (dispatch) => {

    return {
        actionStore: (store) => {
            const action = setStore(store)
            dispatch(action)
        }
    }
}



export default connectRedux(mapStateToProps, mapActionCreatorsToProp)(AtivasInativas);