import React, { useState } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Bar, Doughnut } from 'react-chartjs-2';
ChartJS.register(...registerables)




const Financeiro = (props) => {

    const span1 = "Novos usuários cadastrados";
    const span2 = 'Usuários ativos';
    
    const [state, setState] = useState({
        labels: props.labels,
        values: props.values,
        data: JSON.parse(sessionStorage.getItem('sowotesDatas')),
        hora_data: undefined,
        generateValues: true,
        dadosFalsos: true,
        valueDropBox: "A-Z",
        estado: 'TODOS-ESTADOS'
    })

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

    function GetNovasLojasGrafic(labels, dataArray, data, span1, span2) {

       

        const values = dataArray
        var totalMonth = 0;
        dataArray.map((value) => {
            return totalMonth += parseInt(value)
        })
        if (totalMonth === 0) {
            totalMonth = data[data.length - 1].countStoreTotalMonth
        }
        //const {values} = generateArrayValues(data)
        //const totalMonth = data[data.length - 1].countStoreTotalMonth;
        //const { labelReal } = generateArrayValues(data)

        const valuesLine = values.map((value) => {
            return value * 1.2
        })
        const menorValue = Math.min(...values)
        const maiorValue = Math.max(...values)
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
                           {span1}
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
            </div>
        )
    }

    function estadosGraficos() {


        const data = JSON.parse(sessionStorage.getItem('sowotesDatas'));
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
                    estados[index2].countStoreCompletedMonth = data[index1].countStoreCompletedMonth
                    values[index1] = data[index1].countStoreCompletedMonth
                } else {

                   // const n = parseInt(Math.random() * (20 - 1) + 1)
                    estados[index2].countStoreCompletedMonth = 0
                    values[index1] = 0
                }

            }

        }
        const menorValue = Math.min(...values)
        const maiorValue = Math.max(...values)

        ordenarArray(state.valueDropBox, estados)

        

        let estadosDiv = estados.map(estado => {

            var colors


            if (estado.countStoreCompletedMonth == menorValue) {
                colors = '#EE3B3B'
            }
            else if (estado.countStoreCompletedMonth >= maiorValue) {
                colors = '#56BC4F'

            }
            else {
                colors = '#FD9E02';
            }


            return (
                <div key={estado.value}>
                    <span>{estado.value}</span>
                    {/**<span>{estado.countStoreCompletedMonth}</span> */}
                    <section className="rangeDivs" style={{ "width": estado.countStoreCompletedMonth + 5, 'backgroundColor': colors }} >

                    </section>
                    <span>{estado.countStoreCompletedMonth}</span>

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

    return (
        <>

        
            <div className="lojasDashboard">
                <div className="labelsLojas">
                    <span>Usuários</span>
                 
                </div>
                <div className="graficNovasLojasDashboard">
                    {GetNovasLojasGrafic(props.labels, props.values, props.data, span1)}
                    {GetNovasLojasGrafic(props.labels, props.values, props.data, span2)}
                    {estadosGraficos()}
                </div>
            </div>


            <div className="teste">
               TESTE
            </div>



        </>
    )
}


export default Financeiro;