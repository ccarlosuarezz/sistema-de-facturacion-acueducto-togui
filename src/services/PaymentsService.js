import axios from "axios"
import { environment } from "../environments/environment"

let paymentTypes = []
let paymentList = []

export const getPaymentTypes = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getPaymentTypes', config)
    .then(res => {
        if (res.data.ok) {
            paymentTypes = res.data.result
            resolve(true)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getPaymentTypesList = () => {
    return paymentTypes;
}

export const getPayment = (paymentType) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getPaymentByType/'+paymentType, config)
    .then(res => {
        if (res.data.ok) {
            paymentList = res.data.result
            resolve(res.data.result)
        } else {
            reject(res)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getPaymentList = () => {
    return paymentList;
}

export const registerCharges = (chargeList) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.post(environment.APIHost+'/registerChargesList', chargeList, config)
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
})