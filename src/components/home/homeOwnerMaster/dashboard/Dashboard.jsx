import React, { useEffect, useRef, useState } from "react";
import conect from "../../../../services/conect";
import './Dashboard.css';


import Lojas from './Lojas';
import Usuarios from "./Usuarios";
import Financeiro from "./financeiro/Financeiro";
import imgLoading from '../../../../assets/Rolling.gif'





const useDashboardState = () => {

    const [state, setState] = useState({
        labels: "",
        values: [],
        data: JSON.parse(sessionStorage.getItem('sowotesDatas')),
        dataConst: JSON.parse(sessionStorage.getItem('sowotesDatas')),
        generalData: JSON.parse(sessionStorage.getItem('generalData')),
        hora_data: undefined,
        dadosFalsos: true,
        valueDropBox: "A-Z",
        estadoLabel: 'TODOS-ESTADOS',
        loadingDatasGif: false


    })

    useEffect(() => {


        generateArrayValues(state.data)



    }, [state.estadoLabel, state.data, state.valueDropBox])


    if (state.hora_data == undefined) {
        time_data()
    }

    function generateArrayValues(data) {

        const labels = [];
        var countStoreCompletedMonth = 0
        var countStorePendingMonth = 0

        // criar labels
        for (let index = 0; index < data.length; index++) {

            if (state.estadoLabel == 'TODOS-ESTADOS' || state.estadoLabel == data[index].codState) {

                countStoreCompletedMonth += data[index].countStoreCompletedMonth || 0
                countStorePendingMonth += data[index].countStorePendingMonth || 0

            }

            if (labels.includes(data[index].txtMonth)) {

            } else {

                labels.push(data[index].txtMonth)

            }

        }

        // adicionar valoeres aos labels (messes)
        var values = adicionarValoresPLabels(labels, data)


        return setState({
            ...state,
            values: values,
            labels,
            dadosFalsos: !state.dadosFalsos,
            countStoreCompletedMonth,
            countStorePendingMonth

        })
    }

    function adicionarValoresPLabels(labels, data) {

        var obj = data;
        var newArr = [];

        for (let index = 0; index < labels.length; index++) {

            for (let i2 = 0; i2 < obj.length; i2++) {

                newArr[index] = 0

                if (obj[i2].codState == state.estadoLabel || state.estadoLabel == 'TODOS-ESTADOS') {

                    if (labels[index] == obj[i2].txtMonth) {

                        newArr[index] += obj[i2].countStoreCreatedMonth || 0

                    }

                }

            }

        }




        return newArr
    }

    function time_data() {


        const dateObj = state.dataConst[state.data.length - 1].lastChanged

        const dateUTC = new Date(Date.UTC(dateObj.date.year, dateObj.date.month - 1, dateObj.date.day, dateObj.time.hour, dateObj.time.minute,))

        return setState({
            ...state,
            hora_data: `${dateUTC.toLocaleDateString()} - ${dateUTC.toLocaleTimeString()}`,
            dateObj: dateObj
        })

    }

    function OptionEstados() {

        let estados = [
            { value: 'AC', label: 'Acre' },
            { value: 'AL', label: 'Alagoas' },
            { value: 'AP', label: 'Amapá' },
            { value: 'AM', label: 'Amazonas' },
            { value: 'BA', label: 'Bahia' },
            { value: 'CE', label: 'Ceará' },
            { value: 'DF', label: 'Distrito Federal' },
            { value: 'ES', label: 'Espírito Santo' },
            { value: 'GO', label: 'Goías' },
            { value: 'MA', label: 'Maranhão' },
            { value: 'MT', label: 'Mato Grosso' },
            { value: 'MS', label: 'Mato Grosso do Sul' },
            { value: 'MG', label: 'Minas Gerais' },
            { value: 'PA', label: 'Pará' },
            { value: 'PB', label: 'Paraíba' },
            { value: 'PR', label: 'Paraná' },
            { value: 'PE', label: 'Pernambuco' },
            { value: 'PI', label: 'Piauí' },
            { value: 'RJ', label: 'Rio de Janeiro' },
            { value: 'RN', label: 'Rio Grande do Norte' },
            { value: 'RS', label: 'Rio Grande do Sul' },
            { value: 'RO', label: 'Rondônia' },
            { value: 'RR', label: 'Roraíma' },
            { value: 'SC', label: 'Santa Catarina' },
            { value: 'SP', label: 'São Paulo' },
            { value: 'SE', label: 'Sergipe' },
            { value: 'TO', label: 'Tocantins' },
        ]

        const options = estados.map((estado) => {

            return (
                <option key={estado.value + estado.label} value={estado.value}>{estado.label}</option>
            )

        })

        return options


    }

    function changeStateLabel(filter) {


        return setState({
            ...state,
            estadoLabel: filter
        })

    }

    function OptionDatas() {

        var meses = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ];
        var data = state.dataConst[state.dataConst.length - 1].lastChanged
        var mes = (data.date.month + 1)
        var ano = data.date.year
        const datas = []

        for (let index = 0; index < 12; index++) {

            if (mes - 1 <= 0) {
                ano -= 1
                mes = 12
                datas[index] = {}
                datas[index].label = `${ano}${((mes < 10) ? ("00" + mes).slice(-2) : mes)}`;
                datas[index].mes = mes;
                datas[index].ano = ano
            } else {
                mes -= 1
                datas[index] = {}
                datas[index].label = `${ano}${((mes < 10) ? ("00" + mes).slice(-2) : mes)}`
                datas[index].mes = mes;
                datas[index].ano = ano
            }


        }

        const options = []

        for (let index = 0; index < datas.length; index++) {

            options[index] = <option key={datas[index].label} value={datas[index].label}>{meses[datas[index].mes - 1]}/{datas[index].ano}</option>;

        }



        return options
    }

    async function loadingDatas(calmonth) {

        setState({
            ...state,
            loadingDatasGif: true
        })

        const res = await conect.getDashboradData(calmonth)


        if (res.data) {

            return setState({
                ...state,
                data: res.data.results[0].sowotes,
                generalData: res.data.results[0]
            })

        }


    }


    return {
        state,
        OptionEstados,
        OptionDatas,
        changeStateLabel,
        loadingDatas


    }

}



const Dashboard = () => {

    const {
        state,
        OptionEstados,
        OptionDatas,
        changeStateLabel,
        loadingDatas


    } = useDashboardState();




    return (

        <div className="dashboard">

            <div className="menuSuperiorDashboard">
                Dashboard

                <button onClick={e => {
                    console.log(state)
                }}>
                    State
                </button>

            </div>

            <div className="containerDashboard">
                <div className="headerDashboard">
                    <div className="visaoGeral">
                        Visão geral
                    </div>

                    <div className="controlHeaderDashboard">

                        <div className="estadoSelect">
                            <label>Estado</label>
                            <select
                                value={state.estadoLabel}
                                onChange={e => {
                                    changeStateLabel(e.target.value)
                                }}
                            >
                                <option value='TODOS-ESTADOS'>Todos os Estados</option>
                                {OptionEstados()}
                            </select>
                        </div>

                        <div className="datas">
                            <label>Data</label>
                            <select
                                onChange={e => {
                                    loadingDatas(e.target.value)
                                }}
                            >
                                {OptionDatas()}
                            </select>

                        </div>
                        {
                            state.loadingDatasGif &&

                            <img src={imgLoading} alt="" className="gitLoadingDatas" />
                        }

                    </div>

                </div>

                <Lojas
                    labels={state.labels}
                    values={state.values}
                    data={state.data}
                    hora_data={state.hora_data}
                    countStoreCompletedMonth={state.countStoreCompletedMonth}
                    countStorePendingMonth={state.countStorePendingMonth}
                />

                <Usuarios
                    labels={state.labels}
                    values={state.values}
                    generalData={state.generalData}
                    estadoLabel={state.estadoLabel}
                    isLoaded={true}
                />
                
                <Financeiro
                    labels={state.labels}
                    values={state.values}
                    data={state.data}
                    generalData={state.generalData}
                    estadoLabel={state.estadoLabel}
                />

            </div>




        </div>
    )

}

export default Dashboard;


