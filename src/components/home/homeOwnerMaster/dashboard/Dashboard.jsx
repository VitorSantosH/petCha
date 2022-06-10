import React, { useEffect, useRef, useState } from "react";
import api from '../../../../services/api';
import './Dashboard.css';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Bar } from 'react-chartjs-2'
ChartJS.register(...registerables)



const useDashboardState = () => {

    const [state, setState] = useState({
        labels: "",
        values: [],
        data: JSON.parse(sessionStorage.getItem('sowotesDatas')),
    })

    useEffect(() => {


        console.log(JSON.parse(sessionStorage.getItem('sowotesDatas')))
        if (state.values.length === 0) {

            const labels = [`Jan 680`, 'February', 'March', 'April', 'May', 'June',  `Jan 680`, 'February', 'March', 'April', 'May', 'June',];
            const values = labels.map(() => parseInt(Math.random() * (100 - 0) + 0));

            setState({
                ...state,
                labels: labels,
                values: values
            })
        }

    })





    return { state }

}



const Dashboard = () => {

    const {
        state
    } = useDashboardState();


    function GetNovasLojasGrafic(labels, dataArray, data) {



        function generateArrayValues(dataArray) {

            const retorno = [];
            const labelReal = [] 

            for (let index = 12; index <= 23; index++) {

                retorno.push(data[index].countStoreCreatedMonth)
                labelReal.push(data[index].txtMonth)
            }

            return {values: retorno, labelReal}
        }

        const values = dataArray
        var totalMonth =  0 ;

        dataArray.map((value) => {
            return totalMonth +=  parseInt(value )
        })
        //const {values} = generateArrayValues(data)
        //const totalMonth = data[data.length - 1].countStoreTotalMonth;
        const valuesLine = values.map((value) => {
            return value * 1.2
        })
        const maiorValue = Math.max(...values)
        console.log(maiorValue)
        console.log(values)
        const colors = values.map((value) => {
            if (value != maiorValue) {
                return '#FD9E02';
            } else {
                return '#56BC4F'
            }
        })
        const {labelReal} = generateArrayValues(data)



        return (
            <div className="cotainerLojasCadastradas">

                <div className="title">
                    <div className="textoLojasCad">
                        <span>
                            Novas lojas cadastradas
                        </span>
                        <h5>Durante os últimos 12 meses</h5>
                    </div>

                    <div className="TotalLojasCad">
                       {totalMonth}
                    </div>

                </div>
                <Bar
                    className="novasLojas"
                    data={{
                        labels: labelReal,//labels,
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
        )
    }

    return (

        <div className="dashboard">

            <div className="menuSuperiorDashboard">
                Dashboard
            </div>
            <div className="containerDashboard">

                {GetNovasLojasGrafic(state.labels, state.values, state.data)}


            </div>


        </div>
    )

}

export default Dashboard;



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
