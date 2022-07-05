import axios from "axios"
import { environment } from "../environments/environment"

let enrollment = {};

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

export const getEnrollment = () => {
    return enrollment;
}