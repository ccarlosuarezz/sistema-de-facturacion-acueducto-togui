import axios from "axios"
import { environment } from "../environments/environment"

let property = {};

export const getPropertyByID = (idProperty) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getProperty/'+idProperty, config)
    .then(res => {
        if (res.data.ok) {
            property = res.data.result
            resolve(true)
        } else {
            resolve(false)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getProperty = () => {
    return property;
}

export const addProperty = (newSubscriber) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.post(environment.APIHost+'/addSubscriber', newSubscriber, config)
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
})