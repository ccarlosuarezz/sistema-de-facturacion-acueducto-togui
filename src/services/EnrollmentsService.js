import axios from "axios"
import { environment } from "../environments/environment"

let enrollment = {};
let enrollmentStates = [];

export const getEnrollmentByID = (idEnrollment) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getEnrollment/'+idEnrollment, config)
    .then(res => {
        if (res.data.ok) {
            enrollment = res.data.result
            resolve(true)
        } else {
            resolve(false)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const addEnrollment = (newEnrollment) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.post(environment.APIHost+'/addEnrollment', newEnrollment, config)
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
})

export const getEnrollment = () => {
    return enrollment;
}

export const getEnrollmentStates = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getEnrollmentState', config)
    .then(res => {
        if (res.data.ok) {
            enrollmentStates = res.data.result
            resolve(true)
        } else {
            resolve(false)
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getEnrollmentStatesList = () => {
    return enrollmentStates;
}

export const editEnrollment = (enrollmentEdited) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.post(environment.APIHost+'/updateEnrollment', enrollmentEdited, config)
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
})

export const getEnrollmentsBySimilarId = (idEnrollment) => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getEnrollmentByID/'+idEnrollment, config)
    .then(res => {
        if (res.data.ok) {
            resolve(res.data.result)
        }
    })
    .catch(err => {
        reject(err)
    })
})