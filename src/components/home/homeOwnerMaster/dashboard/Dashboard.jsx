import React, { useEffect, useRef, useState } from "react";
import api from '../../../../services/api';
import './Dashboard.css';


import Lojas from './Lojas';
import Usuarios from "./Usuarios";
import Financeiro from "./Financeiro";





const useDashboardState = () => {

    const [state, setState] = useState({
        labels: "",
        values: [],
        data: JSON.parse(sessionStorage.getItem('sowotesDatas')),
        hora_data: undefined,
        generateValues: true,
        dadosFalsos: true,
        valueDropBox: "A-Z",
        estado: 'TODOS-ESTADOS'
    })

    useEffect(() => {



        if (state.dadosFalsos) {

            if (state.values.length === 0) {

                const labels = [`Jan`, 'February', 'March', 'April', 'May', 'June', `Jan 680`, 'February', 'March', 'April', 'May', 'June',];
                const values = labels.map(() => parseInt(Math.random() * (100 - 10) + 10));

                setState({
                    ...state,
                    labels: labels,
                    values: values
                })
            }

            return

        } else {


            if (state.generateValues === false) {
                console.log('aqui')
                return generateArrayValues(state.data)
            }

        }



    }, [state, state.valueDropBox])

    function time_data() {

        const arr = JSON.parse(sessionStorage.getItem('sowotesDatas'))
        const dateObj = arr[arr.length - 1].lastChanged
        const dateUTC = new Date(Date.UTC(dateObj.date.year, dateObj.date.month, dateObj.date.day, dateObj.time.hour, dateObj.time.minute, 0))



        return setState({
            ...state,
            hora_data: `${dateUTC.toLocaleDateString()} - ${dateUTC.toLocaleTimeString()}`
        })

    }

    if (state.hora_data == undefined) {
        time_data()
    }


    function generateArrayValues(data) {

        const retorno = [];
        const labels = []
        console.log(data)

        for (let index = 0; index < data.length; index++) {

            retorno.push(data[index].countStoreCreatedMonth)
            labels.push(data[index].txtMonth)
        }



        return setState({
            ...state,
            values: retorno,
            labels,
            generateValues: !state.generateValues
        })
    }

    return {
        state,



    }

}



const Dashboard = () => {

    const {
        state,

    } = useDashboardState();




    return (

        <div className="dashboard">

            <div className="menuSuperiorDashboard">
                Dashboard
                {/**
                *  <div
                    className="FalseDatas"
                    onClick={e => {
                        falseDatas()
                    }}
                >
                    {state.dadosFalsos === false && <h4>Verdadeiros</h4>}
                    {state.dadosFalsos && <h4>Falsos</h4>}
                </div>
                */}

                <button onClick={e => console.log(state)}>
                    state
                </button>

            </div>
            <div className="containerDashboard">

                <Lojas
                    labels={state.labels}
                    values={state.values}
                    data={state.data}
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



/**
 * 
                <div className="headerDashboard">
                    <div className="visaoGeral">
                        Visão geral
                    </div>

                    <div className="controlHeaderDashboard">

                        <div className="estadoSelect">
                            <label>Estado</label>
                            <select>
                                <option value={state.estado}>Todos os Estados</option>
                                {OptionEstados()}
                            </select>
                        </div>

                        <div className="datas">
                            <label>Data</label>
                            <select>
                                <option value={state.estado}>Todos os Estados</option>
                                {OptionEstados()}
                            </select>
                        </div>

                    </div>
                </div>

                <div className="lojasDashboard">
                    <div className="labelsLojas">
                        <span>Lojas</span>
                        <span>Datas atualizadas em {state.hora_data}</span>
                    </div>
                    <div className="graficNovasLojasDashboard">
                        {GetNovasLojasGrafic(state.labels, state.values, state.data)}
                        {GetLojasCadGrafic(140, 60,)}
                        {estadosGraficos()}
                    </div>
                </div>
 */




/*
  const labels = [`Jan 680`, 'February', 'March', 'April', 'May', 'June', 'July', `Jan 680`, 'February', 'March', 'April', 'May', 'June', 'July'];
    const values = labels.map(() => Math.random() * (1000 - 0) + 0)
    const valuesLine = values.map((value) => {
        return value * 1.2
    })
    const maiorValue = Math.max(...values)
    const colors = values.map((value) => {
        if (value != maiorValue) {
            return '#FD9E02';
        } else {
            return '#56BC4F'
        }
    })


 <div className="cotainerLojasCadastradas">

                    <div className="title">
                        <div className="textoLojasCad">
                            <span>
                                Novas lojas cadastradas
                            </span>
                            <h5>Durante os últimos 12 meses</h5>
                        </div>

                        <div className="TotalLojasCad">
                            120
                        </div>

                    </div>

                    <Bar
                        className="novasLojas"
                        data={{
                            labels: [`Jan 680`, 'February', 'March', 'April', 'May', 'June', 'July', `Jan 680`, 'February', 'March', 'April', 'May', 'June', 'July'],
                            datasets: [
                                {
                                    type: 'line',
                                    borderColor: '#023047',
                                    borderWidth: 2,
                                    fill: false,
                                    data: [...valuesLine, ...valuesLine],
                                },
                                {
                                    type: 'bar',

                                    backgroundColor: colors,
                                    data: [...values, ...values],
                                    borderColor: 'white',
                                    borderWidth: 2,
                                },

                            ],



                        }}
                        options={{
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },

                            borderRadius: 15,
                            barPercentage: .6,

                        }}

                        width={400}
                        height={200}

                    />
                </div>


                 if (state.isLoaded === false) {
            api.get('/Agenda_WS/MasterData/selectState', {
                headers: {
                    'Authorization':  `${sessionStorage.getItem('authToken')}`,
                    "codCountry": "BR"
                }
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })

            setState({
                ...state,
                isLoaded: true 
            })
        }

*/
