import axios from "axios"
import { environment } from "../environments/environment"

let invoicesLastPeriod = []
let actualInvoicePeriod = ""
let lastInvoicePeriod = ""
let generatedInvoices = []

export const getInvoiceLastPeriod = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getInvoiceLastPeriod', config)
    .then(res => {
        if (res.data.ok) {
            invoicesLastPeriod = res.data.result
            resolve(true)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getinvoicesLastPeriodList = () => {
    return invoicesLastPeriod;
}

export const paidInvoices = (paidInvoiceList) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.post(environment.APIHost+'/getPaidInvoices', paidInvoiceList, config)
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
})

export const getDateActualInvoicingPeriod = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getActualDateFromBillingPeriod', config)
    .then(res => {
        if (res.data.ok) {
            actualInvoicePeriod = res.data.result[0].actualPeriod
            resolve(true)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getDateActualInvoicePeriod = () => {
    return actualInvoicePeriod;
}

export const getDateLastInvoicingPeriod = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getDateFromLastPeriod', config)
    .then(res => {
        if (res.data.ok) {
            lastInvoicePeriod = res.data.result[0].dateLastPeriod
            resolve(true)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getDateLastInvoicePeriod = () => {
    return lastInvoicePeriod;
}

export const getInvoiceList = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/realiceBilling', config)
    .then(res => {
        if (res.data.ok) {
            generatedInvoices = res.data.result
            generatedInvoices.pop()
            resolve(true)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getGeneratedInvoiceList = () => {
    return generatedInvoices
}

export const createNewBillingPeriod = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/addBillingPeriod', config)
    .then(res => {
        if (res.data.ok) {
            resolve(res.data.result)
        }
    })
    .catch(err => {
        reject(err)
    })
})