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

// 'Authorization': "Bearer: eyJhbGciOiJIUzUxMiJ9.eyJjb2RQbGF0Zm9ybSI6IndlYiIsImNvZE93bmVyIjoiMjYiLCJ1c2VybmFtZSI6InN0b3JlMUBtaW5kNS5jb20uYnIiLCJjcmVhdGVkT24iOiIyMDIyMDUyNjAwMzA1NCIsImV4cCI6MTY1MzUzOTQ1NH0.9tqzIWwq2A1N_zTT6H77KrThgBBTJyxCgQ12C37pUVABXOW9AU87FoCdkZlJVZAl8uyqOEr_hbulFQ8KkZpm-Q",

export default api