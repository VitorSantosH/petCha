import React, { useState } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Bar, Doughnut } from 'react-chartjs-2';
import { useEffect } from "react";
import './Financeiro.css';
import { useRef } from "react";
ChartJS.register(...registerables);






const Financeiro = (props) => {

   
    const estadoLabel = props.estadoLabel;
    const generalData = props.generalData ? props.generalData : props.generalData.sowashData
    const inpVendas = useRef(null);
    const inpTaxas = useRef(null);
    const inpAgendas = useRef(null);
    const span1 = "total de vendas";
    const span2 = 'total de taxas';
    const span3 = 'total de agendamentos';

   
    const [state, setState] = useState({
        cheked: 'VENDAS',
        labels: [],
        values: [],
        valuesVendas: [],
        dadosFalsos: true,
        valueDropBox: "A-Z",
        teste: true,
        att: true,
        activeMonth: [],
        totalCreatedMonth: 0,
        vendaTotal30D: 0,
        vendaTotal12M: 0,
        taxatotal30D: 0,
        taxatotal12M: 0,
        AgendamentoTotal30D: 0,
        AgendamentoTotal12M: 0,
        generalData: props.generalData,
        generalDataCont: props.generalData,
        sowuses: props.generalData.sowuses? generalData.sowuses: generalData.sowashData.sowuses,
        sowordes: props.generalData.sowordes? generalData.sowordes: generalData.sowashData.sowordes,
        sowales: props.generalData.sowales? generalData.sowales: generalData.sowashData.sowales

    })

    useEffect(() => {

        
        if (state.att) {
            controlInpts(state.cheked)
            setState({
                ...state,
                att: false
            })
        }

        if (state.teste) {
            generateUsersValues(props.generalData.sowordes? props.generalData.sowordes: props.generalData.sowashData.sowordes)

        }




    }, [state.generalData]);

  
    if (state.generalDataCont != generalData) {

        setState({
            ...state,
            usersData: props.generalData.sowordes? props.generalData.sowordes: props.generalData.sowashData.sowordes,
            generalDataCont: props.generalData
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

    function controlInpts(value) {

        const inputs = [inpVendas, inpTaxas, inpAgendas];

        inputs.map(inp => {
            if (inp.current.attributes.value.value !== value) {
                inp.current.checked = false
            } else {
                inp.current.checked = true
            }
        })

        setState({
            ...state,
            cheked: value
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

    function GraficosEstadosUsersAtivos(span, data) {

        
        console.log(data)

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
                            {span}
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
            </div>
        )
    }

    function GetGrafics() {

        if (state.cheked === "VENDAS") {
            return <>
                {GetNovasLojasGrafic(state.labels, state.values, span1)}
                {GraficosEstadosUsersAtivos(span1, state.sowuses)}
            </>
        }
        if (state.cheked === "TAXAS") {
            return <>
                {GetNovasLojasGrafic(state.labels, state.valuesVendas, span2)}
                {GraficosEstadosUsersAtivos(span2, generalData)}
            </>
        }
        if (state.cheked === "AGENDAMENTOS") {
            return <>
                {GetNovasLojasGrafic(state.labels, state.valuesVendas, span3)}
                {GraficosEstadosUsersAtivos(span3, generalData)}
            </>
        }

    }

    function GetLabelFinanceiro() {

        if (state.cheked === "VENDAS") {

            return <>
                <div>
                    <span>
                        <strong>
                            Vendas
                        </strong>
                      {" "}  totais nos últimos{" "}
                        <strong>
                            30 dias
                        </strong>
                    </span>

                    <div className="valueLabel">
                        {state.vendaTotal30D}
                    </div>
                </div>
                <div>
                    <span>
                        <strong>
                            Vendas
                        </strong>
                      {" "}  totais nos últimos {" "}
                        <strong>
                            12 messes
                        </strong>
                    </span>

                    <div className="valueLabel2">
                        {state.vendaTotal12M}
                    </div>
                </div>
            </>
        }
        if (state.cheked === "TAXAS") {

            return <>
                <div>
                    <span>
                        <strong>
                            Taxas
                        </strong>
                      {" "}  totais nos últimos {" "}
                        <strong>
                            30 dias
                        </strong>
                    </span>

                    <div className="valueLabel">
                        {state.taxatotal30D}
                    </div>
                </div>
                <div>
                    <span>
                        <strong>
                            Taxas
                        </strong>
                      {" "}  totais nos últimos {" "}
                        <strong>
                            12 messes
                        </strong>
                    </span>

                    <div className="valueLabel2">
                        {state.taxatotal12M}
                    </div>
                </div>
            </>
        }
        if (state.cheked === "AGENDAMENTOS") {

            return <>
                <div>
                    <span>
                        <strong>
                            Agendamentos
                        </strong>
                      {" "}  totais nos últimos {" "}
                        <strong>
                            30 dias
                        </strong>
                    </span>

                    <div className="valueLabel">
                        {state.AgendamentoTotal30D}
                    </div>
                </div>
                <div>
                    <span>
                        <strong>
                            Agendamentos
                        </strong>
                      {" "}  totais nos últimos {" "}
                        <strong>
                            12 messes
                        </strong>
                    </span>

                    <div id="valueLabel2">
                        {state.AgendamentoTotal12M}
                    </div>
                </div>
            </>
        }

    }

    return (
        <>


            <div className="financeiroDashboard">
                <div className="labelsLojas">
                    <span>Financeiro

                    </span>

                </div>
                <div className="controlsFianceiro">
                    <div className="inputs">
                        <div className="vendas">
                            <input
                                type="checkbox"
                                name="vendas"
                                value={'VENDAS'}
                                id=""

                                ref={inpVendas}
                                onChange={e => {
                                    controlInpts(e.target.value)
                                }}
                            />
                            <label htmlFor="vendas">Vendas</label>
                        </div>
                        <div className="taxas">
                            <input
                                type="checkbox"
                                name="TAXAS"
                                id=""
                                ref={inpTaxas}
                                value={"TAXAS"}
                                onChange={e => {
                                    controlInpts(e.target.value)
                                }}
                            />
                            <label htmlFor="taxas">Taxas</label>
                        </div>
                        <div className="agendamentos">
                            <input
                                type="checkbox"
                                name="agendamentos"
                                id=""
                                ref={inpAgendas}
                                value={"AGENDAMENTOS"}
                                onChange={e => {
                                    controlInpts(e.target.value)
                                }}
                            />
                            <label htmlFor="agendamentos">Agendamentos</label>
                        </div>
                    </div>
                </div>

                <div className="labelsFinanceiro">
                    {GetLabelFinanceiro()}
                </div>

                <div className="financeiroCotainerDashboard">
                    {GetGrafics()}
                </div>
            </div>



        </>
    )
}


export default Financeiro;