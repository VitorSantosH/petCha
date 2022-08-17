
import api from "./api";
import config from './.config.jsx';

const conect = {



    login: async (props) => {

        const string = `${props.username}:${props.password}`
        const emBase64 = btoa(string)
        sessionStorage.setItem('userName', props.username);

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


            if (res.data && res.headers.authorization) {
                console.log(res)
                sessionStorage.setItem('generalData', JSON.stringify(res.data.results[0]))

                if (res.data.results[0].sowashData) {
                    sessionStorage.setItem('authToken', res.headers.authorization);
                    sessionStorage.setItem('sowotesDatas', JSON.stringify(res.data.results[0].sowashData.sowotes));
                    sessionStorage.setItem('userData', JSON.stringify(res.data.results[0].sowashData.sowuses));
                    sessionStorage.setItem('vendas', JSON.stringify(res.data.results[0].sowashData.sowales));
                    sessionStorage.setItem('user', JSON.stringify(res.data.results[0].usomeData));
                }
            }


            console.log(res)
            return res

        }).catch(err => {


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
                'Authorization': `${sessionStorage.getItem('authToken')}`,

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

    },

    getDashboradData: async (data) => {

        const response = await api.get('/Agenda_WS/Stats/selectOwnerDashboard', {
            headers: {
                'Authorization': `${sessionStorage.getItem('authToken')}`,
                'codLanguage': 'PT',
                'codCountry': "BR",
                'calmonth': data,
                'app': 'owner'

            },
        })
            .then(res => {

                return res
            })
            .catch(err => {
                console.log(err)
                return err
            })

        return response

    },

    getStores: async () => {

        var err = false;
        const response = await api.post('/Agenda_WS/Store/searchStore', {

            username: `${sessionStorage.getItem('userName')}`,
            codOwner: `${config.codOwner}`,
            codLinguage: "PT",

        }, {
            headers: {
                'Authorization': `${sessionStorage.getItem('authToken')}`,

            },
        }

        ).then(res => {


            return res

        }).catch(err => {

            err = true;
            return err

        })

        return { response, err }


    },

    getStore: async (codStore) => {

        var err = false;
        const response = await api.get('/Agenda_WS/Store/selectStore', {
            headers: {
                'Authorization': `${sessionStorage.getItem('authToken')}`,
                'codStore': `${parseInt(codStore)}`,
                username: `${sessionStorage.getItem('userName')}`,
                codOwner: `${config.codOwner}`,
                codLinguage: "PT"

            },
        }

        ).then(res => {

            return res

        }).catch(err => {

            err = true;
            return err

        })

        return { response, err }


    },

    updateStore: async (data, codStore) => {

        const responseStatus = await api.post('/Agenda_WS/Store/updateStore', data, {

            headers: {

                'Authorization': `${sessionStorage.getItem('authToken')}`,
                'codStore': `${parseInt(codStore)}`,
                username: `${sessionStorage.getItem('userName')}`,
                codOwner: `${config.codOwner}`,
                codLinguage: "PT",

            },


        }).then(response => {

            return response.status

        }).catch(err => {

            return err.status
        })


        return responseStatus

    },

    uploadImage: async (uploadedFile, codStore, isCover = false) => {

        var responseStatus

        if (uploadedFile === null) {
            return
        }
        else {

            var data = new FormData();

            data.append('file', uploadedFile,);
            data.append('codStore', codStore,);
            data.append('isCover', isCover,);

            //http://localhost:3333/posts

            responseStatus = await api.post('/Agenda_WS/File/insertFileImgStore', data, {

                headers: {
                    'Content-Type': 'multipart/form-data;',
                    'Authorization': `${sessionStorage.getItem('authToken')}`,
                    'codStore': `${parseInt(codStore)}`,
                    username: `${sessionStorage.getItem('userName')}`,
                    codOwner: `${config.codOwner}`,
                    codLinguage: "PT",
                    'isCover': isCover
                },


            }

            ).then(response => {


                return response.status

            }).catch(err => {

                return err.status
            })



        }

        return responseStatus

    },

    deleteImage: async (codFileImg, codStore) => {

        const responseStatus = await api.delete('/Agenda_WS/File/deleteFileImgStore', {

            headers: {

                'Authorization': `${sessionStorage.getItem('authToken')}`,
                'codStore': `${parseInt(codStore)}`,
                username: `${sessionStorage.getItem('userName')}`,
                codOwner: `${config.codOwner}`,
                codLinguage: "PT",
                codFileImg: codFileImg
            },


        }

        ).then(response => {
            console.log(response)
            return response.status
        }).catch(err => {
            return err.status
        })

        return responseStatus
    }



}


export default conect;