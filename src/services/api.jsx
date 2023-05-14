import axios from 'axios'
import config from './.config'

const api = axios.create({
    baseURL: config.baseURL,
    headers: {
        
        'codOwner': 3,
        'codPlatform': 'web' ,
        'codLanguage': "PT" ,
        codCountry: "BR",
        
        
    }
})


export default api