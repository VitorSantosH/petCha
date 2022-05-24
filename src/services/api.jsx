import axios from 'axios'
import config from './.config'

const api = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Authorization': `Basic ${config.basicToken}`,
        'codOwner': 26,
        'codPlatform': 'web' ,
        'codLanguage': "PT" ,
        
    }
})



export default api