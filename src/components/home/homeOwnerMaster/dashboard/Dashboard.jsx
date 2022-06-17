import React, { useEffect, useRef, useState } from "react";
import conect from "../../../../services/conect";
import './Dashboard.css';


import Lojas from './Lojas';
import Usuarios from "./Usuarios";
import Financeiro from "./Financeiro";





const useDashboardState = () => {

    const [state, setState] = useState({
        labels: "",
        values: [],
        data: JSON.parse(sessionStorage.getItem('sowotesDatas')),
        dataConst: JSON.parse(sessionStorage.getItem('sowotesDatas')),
        hora_data: undefined,
        dadosFalsos: true,
        valueDropBox: "A-Z",
        estadoLabel: 'TODOS-ESTADOS',
        estados: undefined

    })

    useEffect(() => {

        if (state.dadosFalsos == true && state.values.length == 0) {
            generateArrayValues(state.data)
        }


    }, [state, state.valueDropBox])

    // conect.getDashboradData("202201")



    
    function generateArrayValues(data) {

        if (state.dadosFalsos) {

            const labels = [`Jan`, 'February', 'March', 'April', 'May', 'June', `Jan 680`, 'February', 'March', 'April', 'May', 'June',];
            const values = labels.map(() => parseInt(Math.random() * (100 - 10) + 10));
            var countStoreCompletedMonth = 0
            var countStorePendingMonth = 0

            for (let index = 0; index < values.length; index++) {

                countStoreCompletedMonth += parseInt(values[index])
            }

            countStorePendingMonth = parseInt(countStoreCompletedMonth * 0.25)

            setState({
                ...state,
                labels: labels,
                values: values,
                dadosFalsos: !state.dadosFalsos,
                countStoreCompletedMonth,
                countStorePendingMonth
            })

        } else {


            const retorno = [Number]
            const labels = [];
            var countStoreCompletedMonth = 0
            var countStorePendingMonth = 0

            for (let index = 0; index < data.length; index++) {

                countStoreCompletedMonth += parseInt(data[index].countStoreCompletedMonth)
                countStorePendingMonth += parseInt(data[index].countStorePendingMonth)

                if (labels.includes(data[index].txtMonth)) {

                } else {


                    labels.push(data[index].txtMonth)

                }

            }


            for (let index = 0; index < labels.length; index++) {

                retorno[index] = parseInt(retorno[index])

                for (let index2 = 0; index2 < data.length; index2++) {

                   

                    if (labels[index] == data[index2].txtMonth) {

                        const n = parseInt(data[index2].countStoreCreatedMonth)
                       
                        retorno[index] = n 
                    }

                }

            }



            return setState({
                ...state,
                values: retorno,
                labels,
                dadosFalsos: !state.dadosFalsos,
                countStoreCompletedMonth,
                countStorePendingMonth

            })
        }

    }

    function time_data() {


        const dateObj = state.data[state.data.length - 1].lastChanged

        const dateUTC = new Date(Date.UTC(dateObj.date.year, dateObj.date.month, dateObj.date.day, dateObj.time.hour, dateObj.time.minute, 0))

        return setState({
            ...state,
            hora_data: `${dateUTC.toLocaleDateString()} - ${dateUTC.toLocaleTimeString()}`
        })

    }

    if (state.hora_data == undefined) {
        time_data()
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


        const newData = state.data.filter((value) => {

            if (value.codState == filter) return value
        })


        return setState({
            ...state,
            data: newData,
            estadoLabel: filter
        })

    }

    function dadosFalsos() {

        generateArrayValues(state.data)

    }

    return {
        state,
        OptionEstados,
        changeStateLabel,
        dadosFalsos

    }

}



const Dashboard = () => {

    const {
        state,
        OptionEstados,
        changeStateLabel,
        dadosFalsos

    } = useDashboardState();




    return (

        <div className="dashboard">

            <div className="menuSuperiorDashboard">
                Dashboard

                <div
                    className="FalseDatas"
                    onClick={e => {
                        dadosFalsos()
                    }}
                >
                    {state.dadosFalsos === false && <h4>Falsos</h4>}
                    {state.dadosFalsos && <h4>Reais</h4>}
                </div>

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
                            <select>
                                <option value={state.estadoLabel}>Todos os Estados</option>
                                {OptionEstados()}
                            </select>
                        </div>

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
                    data={state.data}
                />
                <Financeiro
                    labels={state.labels}
                    values={state.values}
                    data={state.data}
                />

            </div>




        </div>
    )

}

export default Dashboard;


