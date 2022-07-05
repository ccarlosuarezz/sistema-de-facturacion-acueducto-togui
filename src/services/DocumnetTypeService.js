import axios from "axios"
import { environment } from "../environments/environment"

let documentTypes = {};

export const getDocumentType = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getDocumentType', config)
    .then(res => {
        if (res.data.ok) {
            documentTypes = res.data.result
            resolve(true)
        }
    })
    .catch(err => {
        console.log(err)
        resolve(false)
    })
})

export const getDocumentTypesValues = () => {
    return documentTypes;
}