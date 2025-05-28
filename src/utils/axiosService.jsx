import axios from "axios"

const AxiosService = axios.create({
    baseURL:" https://crm-be-z6jc.onrender.com/api",
    headers:{
        "Content-Type":"application/json"
    }
})


export default AxiosService