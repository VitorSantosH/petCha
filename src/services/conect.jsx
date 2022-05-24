import api from "./api"

const conect = async (props) => {

    console.log(props)
    const response = await api.get('/Agenda_WS/Home/main', {
        headers: {

            // codOwner: 26, >>>>>>> NECESSARIO, PASSEI PARA O HEADER NA API

            // role: 'EMPREGADO',
            // codEmployee: 28,
            // codStore: 28,

            username: props.username,
            password: props.password
        }
    }).then(res => {

        return res

    }).catch(err => {
        
        return err
    })

    return response
}


export default conect;