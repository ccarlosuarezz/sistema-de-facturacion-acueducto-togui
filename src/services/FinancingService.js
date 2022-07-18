import axios from "axios"
import { environment } from "../environments/environment"

let financingTypes = {};

export const getFinancingTypes = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getAllFinancing', config)
    .then(res => {
        if (res.data.ok) {
            financingTypes = res.data.result
            resolve(true)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getFinancingTypesValues = () => {
    return financingTypes;
}