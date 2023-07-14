import axios from 'axios'
import config from './.config'

const api = axios.create({
    baseURL: config.baseURL,
    headers: {
        
        'codOwner': config.codOwner,
        'codPlatform': 'web' ,
        'codLanguage': "PT" ,
        codCountry: "BR",
        
        
    }
})


export default api