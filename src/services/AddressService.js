import axios from "axios"
import { environment } from "../environments/environment"

let departments = [];
let municipalities = []
let sidewalks = []

export const getAddress = () => new Promise((resolve, reject) => {
    const config = {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }
    axios.get(environment.APIHost+'/getDepartments', config)
    .then(resDepartments => {
        if (resDepartments.data.ok) {
            departments = resDepartments.data.result
            axios.get(environment.APIHost+'/getMunicipalityByDepartments/'+departments[0].id_lugar, config)
            .then(resMunicipalities => {
                if (resMunicipalities.data.ok) {
                    municipalities = resMunicipalities.data.result
                    axios.get(environment.APIHost+'/getSideWalkByMunicipality/'+municipalities[0].id_lugar, config)
                    .then(resSideWalks => {
                        if (resSideWalks.data.ok) {
                            sidewalks = resSideWalks.data.result
                            resolve(true)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
                }
            })
            .catch(err => {
                reject(err)
            })
        }
    })
    .catch(err => {
        reject(err)
    })
})

export const getDepartmentList = () => {
    return departments;
}

export const getMunicipalityList = () => {
    return municipalities;
}

export const getSideWalkList = () => {
    return sidewalks;
}