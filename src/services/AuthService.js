import axios from "axios"
import { environment } from "../environments/environment"

export function Login(email, password) {
    const loginUser = {
        email: email,
        password: password
    };
    axios.post(environment.APIHost+'/login', loginUser)
    .then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err)
    })
}