import axios from "axios"
import { environment } from "../environments/environment"

let serviceTypes = [];

export const getServiceTypes = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/allServiceType', config)
    .then(res => {
        if (res.data.ok) {
            serviceTypes = res.data.result
            resolve(true)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getServiceTypesValues = () => {
    return serviceTypes;
}