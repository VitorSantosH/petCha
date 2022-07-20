import React, { useState } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Bar, Doughnut } from 'react-chartjs-2';
import { useEffect } from "react";
ChartJS.register(...registerables)




const Usuarios = (props) => {

    

    const span1 = "Novos usuários cadastrados";
    const span2 = 'Usuários ativos';
    const estadoLabel = props.estadoLabel
    const dataUsers = props.generalData.sowuses ? props.generalData.sowuses : props.generalData.sowashData.sowuses

    const [state, setState] = useState({

        labels: props.labels,
        values: [],
        valuesCreated: [],
        hora_data: undefined,
        generateValues: true,
        dadosFalsos: true,
        usersData: props.generalData.sowuses ? props.generalData.sowuses : props.generalData.sowashData.sowuses,
        usersDataCont: props.generalData.sowuses ? props.generalData.sowuses : props.generalData.sowashData.sowuses,
        valueDropBox: "A-Z",
        activeMonth: [],
        totalCreatedMonth: 0,
        usersAtivos: 0,
        isLoaded: false,
        changed: true

    })

    useEffect(() => {

        generateUsersValues(props.generalData.sowuses ? props.generalData.sowuses : props.generalData.sowashData.sowuses)


    }, [state.usersDataCont])


    if (state.usersDataCont != dataUsers) {

        setState({
            ...state,
            usersData: dataUsers,
            usersDataCont: dataUsers
        })

    }



    function generateUsersValues(data) {

        const labels = [];

        // criar labels
        for (let index = 0; index < data.length; index++) {

            if (labels.includes(data[index].txtMonth)) {

            } else {

                labels.push(data[index].txtMonth)

            }

        }


        // adicionar valoeres aos labels (messes)
        var { created, activeMonth, createdMonth } = adicionarValores(labels, data)

        return setState({
            ...state,
            values: created,
            labels: labels,
            dadosFalsos: !state.dadosFalsos,
            activeMonth,
            createdMonth,
            isLoaded: !state.isLoaded,
            changed: false

        })

    }

    function ordenarArray(value, estados) {


        switch (value) {
            case "A-Z":
                estados.sort()
                return estados

            case "Z-A":

                estados.sort()
                estados.reverse()
                return estados

            case "0-9":
                estados.sort((a, b) => {
                    if (a.countStoreCompletedMonth < b.countStoreCompletedMonth) {
                        return - 1;
                    }
                    if (a.countStoreCompletedMonth > b.countStoreCompletedMonth) {
                        return 1;
                    }

                    return 0;
                })

                return estados;

            case "9-0":
                estados.sort((a, b) => {
                    if (a.countStoreCompletedMonth < b.countStoreCompletedMonth) {
                        return - 1;
                    }
                    if (a.countStoreCompletedMonth > b.countStoreCompletedMonth) {
                        return 1;
                    }

                    return 0;
                })
                estados.reverse()
                return estados;


            default:
                break;
        }
    }

    function estadosGraficos() {


        const data = state.usersData
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
        var values = []
        for (let index1 = 0; index1 < data.length; index1++) {

            for (let index2 = 0; index2 < estados.length; index2++) {

                if (data[index1].codState == estados[index2].value) {

                    estados[index2].countUserActiveMonth = data[index1].countUserActiveMonth
                    values[index1] = data[index1].countUserActiveMonth

                } else {

                    // const n = parseInt(Math.random() * (20 - 1) + 1)
                    estados[index2].countUserActiveMonth = 0
                    values[index1] = 0
                }

            }

        }
        const menorValue = Math.min(...values)
        const maiorValue = Math.max(...values)

        ordenarArray(state.valueDropBox, estados)

        let estadosDiv = estados.map(estado => {

            var colors


            if (estado.countUserActiveMonth == menorValue) {
                colors = '#EE3B3B'
            }
            else if (estado.countUserActiveMonth >= maiorValue) {
                colors = '#56BC4F'

            }
            else {
                colors = '#FD9E02';
            }


            return (
                <div key={estado.value}>
                    <span>{estado.value}</span>
                    {/**<span>{estado.countStoreCompletedMonth}</span> */}
                    <section className="rangeDivs" style={{ "width": estado.countUserActiveMonth + 5, 'backgroundColor': colors }} >

                    </section>
                    <span>{estado.countUserActiveMonth}</span>

                </div>
            )
        })






        return (
            <div id="estadosGraficos">


                <div className="titulosEstados">

                    <div className="textoLojasCad">
                        <span>
                            Total de usuários ativos
                        </span>
                        <h5>Por Estado</h5>
                    </div>

                    <select
                        className="selectGraficoEstados"
                        value={state.valueDropBox}
                        onChange={e => setState({
                            ...state,
                            valueDropBox: e.target.value
                        })}
                    >
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="0-9">0-9</option>
                        <option value="9-0">9-0</option>
                    </select>
                </div>

                <div className="cotainerEstados">
                    {estadosDiv}

                    <div
                        className="cotainerEstados"
                        style={{ "color": "white", 'backgroundColor': "white", "maxWidth": '20px' }}
                    >

                        <div >
                            <span></span>
                            {/**<span>{estado.countStoreCompletedMonth}</span> */}
                            <section className="rangeDivs"  >

                            </section>
                            <span></span>

                        </div>
                    </div>
                </div>


            </div>
        )
    }

    function adicionarValores(labels, data) {


        var created = [];
        var activeMonth = [];
        var totalCreatedMonth = 0;


        for (let index = 0; index < labels.length; index++) {

            created[index] = 0;
            activeMonth[index] = 0;

            for (let i2 = 0; i2 < data.length; i2++) {


                if (data[i2].codState == estadoLabel || estadoLabel == 'TODOS-ESTADOS') {

                    totalCreatedMonth += data[i2].countUserCreatedMonth


                    if (labels[index] == data[i2].txtMonth) {

                        created[index] += data[i2].countUserCreatedMonth // Math.random() * (1000 - 10) + 10 
                        activeMonth[index] += data[i2].countUserActiveMonth //Math.random() * (1000 - 10) + 10  

                    }

                }

            }

        }


        return { created, activeMonth, totalCreatedMonth };
    }

    function GetNovasLojasGrafic(labels, data, span) {


        const values = data


        const valuesLine = values.map((value) => {
            return value.countStoreCreatedMonth || value * 1.2
        })

        const menorValue = Math.min(...values) || 0
        const maiorValue = Math.max(...values) || 1
        const colors = values.map((value) => {
            if (value == menorValue) {
                return '#EE3B3B'
            }
            else if (value != maiorValue) {
                return '#FD9E02';
            }
            else {
                return '#56BC4F'
            }
        })


        return (
            <div className="cotainerLojasCadastradas">

                <div className="title">
                    <div className="textoLojasCad">
                        <span>
                            {span}
                        </span>
                        <h5>Durante os últimos 12 meses</h5>
                    </div>

                    <div className="TotalLojasCad">
                        {state.totalCreatedMonth}
                    </div>

                </div>
                <Bar
                    className="novasLojas"
                    data={{
                        labels: labels,
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

                    <div className="labels2">
                        
                    </div>
            </div>
        )
    }

    return (
        <>


            <div className="lojasDashboard">
                <div className="labelsLojas">
                    <span>Usuários</span>
                    <button
                        onClick={e => { console.log(state) }}
                    >
                        state
                    </button>
                </div>
                <div className="graficNovasLojasDashboard">
                    {GetNovasLojasGrafic(state.labels, state.values, span1)}
                    {GetNovasLojasGrafic(state.labels, state.activeMonth, span2)}
                    {estadosGraficos()}
                </div>
            </div>



        </>
    )
}


export default Usuarios;