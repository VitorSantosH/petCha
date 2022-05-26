import React, { useState } from "react";
import NumberFormat from 'react-number-format'
import './EditarPerfil.css';


//imgs 
import trashIcon from '../../../assets/trashIcon.png';


const EditarPerfil = (props) => {

    const [stateEdit, setStateEdit] = useState({
        user: props.user
    })

    function changeDisplayValue() {
        return props.setDisplay("none")
    }

    return (
        <div className="editarPerfilContainer" style={{ 'display': props.display }}>

            <div className="formEditarPerfil">

                <div className="namePerfilEdit">
                    Editar Perfil
                </div>

                <div className="EditImgPerfil">
                    <div>


                        <img src={stateEdit.user.imgPerfil} alt="" />

                        <div id='trashIcon'>
                            <img src={trashIcon} alt="" />
                        </div>

                    </div>
                </div>


                <div className="inputsEditPerfil">

                    <div className="infos">

                        <label htmlFor="name">Nome completo</label>
                        <input
                            type="text"
                            value={stateEdit.user.name}

                            onChange={e => setStateEdit({
                                ...stateEdit,
                                user: {
                                    ...stateEdit.user,
                                    name: e.target.value
                                }
                            })}

                        />

                    </div>

                    <div className="infos">
                        <label htmlFor="tel">Telefone</label>

                        <NumberFormat
                            format="+55 (##) #####-####"
                            className='inputTel'
                            aria-describedby=""
                            placeholder="(11) 98000-0000"
                            value={stateEdit.user.tel}

                            onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                let cellPattern = new RegExp(/^([0-9]{2}[9]{1}[0-9]{7,8})$/);
                                // setTelValue(value)
                                //console.log(cellPattern.test(value))
                                //setTel(formattedValue)

                                setStateEdit({
                                    ...stateEdit,
                                    user: {
                                        ...stateEdit.user,
                                        tel: formattedValue
                                    }
                                })

                            }}
                        />

                    </div>

                    <div className="infos">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="text"
                            value={stateEdit.user.email}
                            onChange={e => {

                                setStateEdit({
                                    ...stateEdit,
                                    user: {
                                        ...stateEdit.user,
                                        email: e.target.value
                                    }
                                })

                            }}
                        />
                    </div>

                    <div className="infos">
                        <label htmlFor="cep">CEP</label>
                        <input
                            type="text"
                            value={stateEdit.user.cep}
                            onChange={e => {

                                setStateEdit({
                                    ...stateEdit,
                                    user: {
                                        ...stateEdit.user,
                                        cep: e.target.value
                                    }
                                })

                            }}
                        />
                    </div>

                    <div className="infos">
                        <label htmlFor="logradouro">Endereço</label>
                        <input
                            type="text"
                            value={stateEdit.user.logradouro}

                            onChange={e => {

                                setStateEdit({
                                    ...stateEdit,
                                    user: {
                                        ...stateEdit.user,
                                        logradouro: e.target.value
                                    }
                                })

                            }}

                        />
                    </div>

                    <div className="infos">
                        <label htmlFor="complemento">Complemento</label>
                        <input
                            type="text"
                            value={stateEdit.user.complemento}
                            onChange={e => {

                                setStateEdit({
                                    ...stateEdit,
                                    user: {
                                        ...stateEdit.user,
                                        complemento: e.target.value
                                    }
                                })

                            }}
                        />
                    </div>

                    <div className="infos">
                        <label htmlFor="estado">Estado</label>
                        <input
                            type="text"
                            value={stateEdit.user.estado}
                            onChange={e => {

                                setStateEdit({
                                    ...stateEdit,
                                    user: {
                                        ...stateEdit.user,
                                        estado: e.target.value
                                    }
                                })

                            }}
                        />
                    </div>

                    <div className="infos">
                        <label htmlFor="cidade">Cidade</label>
                        <input
                            type="text"
                            value={stateEdit.user.cidade}
                            onChange={e => {

                                setStateEdit({
                                    ...stateEdit,
                                    user: {
                                        ...stateEdit.user,
                                        cidade: e.target.value
                                    }
                                })

                            }}
                        />
                    </div>
                </div>

                <div className="btnEditPerfil">
                    <button
                        className="btnCancelar"
                        onClick={e => changeDisplayValue()}
                    >
                        Cancelar
                    </button>

                    <button 
                        className="btnSalvar"
                        onClick={ e => {
                           
                            props.setUser({...stateEdit.user})
                            changeDisplayValue()
                            
                        }}
                    >
                        Salvar
                    </button>

                </div>

            </div>
        </div>
    )
}



export default EditarPerfil;