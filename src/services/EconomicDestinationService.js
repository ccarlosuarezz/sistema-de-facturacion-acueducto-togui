import axios from "axios"
import { environment } from "../environments/environment"

let economicDestinationList = [];

export const getEconomicDestination = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getEconomicalDestine', config)
    .then(res => {
        if (res.data.ok) {
            economicDestinationList = res.data.result
            resolve(true)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getEconomicDestinationList = () => {
    return economicDestinationList;
}