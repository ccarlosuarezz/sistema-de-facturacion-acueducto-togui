import axios from "axios"
import { environment } from "../environments/environment"

export const addWatermeter = (newWatermeter) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.post(environment.APIHost+'/addMeasurer', newWatermeter, config)
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
})