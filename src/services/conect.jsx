
import api from "./api";
import config from './.config.jsx';

const conect = {



    login: async (props) => {

        const string = `${props.username}:${props.password}`
        const emBase64 = btoa(string)

        const response = await api.get('/Agenda_WS/Home/main', {
            headers: {
                // codOwner: 26, >>>>>>> NECESSARIO, PASSEI PARA O HEADER NA API
                // role: 'EMPREGADO',
                // codEmployee: 28,
                // codStore: 28,
                'Authorization': `Basic ${emBase64}`,
                // username: props.username,
                // password: props.password
            }
        }).then(res => {

            if (res.data && res.headers.Authorization) {
                sessionStorage.setItem('authToken', res.headers.authorization);
                sessionStorage.setItem('sowotesDatas', JSON.stringify(res.data.results[0].sowashData.sowotes));
            }

            console.log(res)

            return res

        }).catch(err => {

            console.log(err)
            return err
        })

        return response
    },

    getOwnerInfo: async (props) => {

        const response = await api.post('/Agenda_WS/Store/searchStore', {

            username: `${props.username}`,
            codOwner: `${config.codOwner}`,
            codLinguage: "PT",

        }, {
            headers: {
                'Authorization': `${sessionStorage.getItem('authToken')}`
            },
        }

        ).then(res => {

            console.log(res)
            return res

        }).catch(err => {

            console.log(err)
            return err

        })

        return response

    }


}


export default conect;