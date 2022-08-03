import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { environment } from "../../environments/environment"
import userIcon from "../../assets/images/user.svg"
import passwordIcon from "../../assets/images/password.svg"
import hideIcon from "../../assets/images/hide.svg"
import viewIcon from "../../assets/images/view.svg"
import "./LoginForm.css"

const LoginForm = ({forgotPassword}) => {

    const navigate =  useNavigate()

    const [loginUser, setLoginUser] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [invalidAuth, setinvalidAuth] = useState("")
    const [showPasswordState, setShowPasswordState] = useState(false);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setinvalidAuth(false)
        const user = {
            email: loginUser,
            password: loginPassword
        };
        axios.post(environment.APIHost+'/login', user)
        .then(res => {
            if (res.data.ok) {
                setinvalidAuth(false)
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('userName', res.data.message.username)
                sessionStorage.setItem('idUser', res.data.message.id_user)
                sessionStorage.setItem('idRol', res.data.message.id_rol)
                navigate('/admin')
            } else {
                setinvalidAuth(true)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="login-form">
            <p className="login-title"><b>Inicio de sesión</b></p>
            { invalidAuth &&
                <p className="auth-error-message">Usuario o contraseña incorrecta</p>
            }
            <div className="input-login">
                <img src={userIcon} width={30}></img>
                <input type="text" placeholder="Usuario" className="input-user" value={loginUser} onChange={(e) => setLoginUser(e.target.value)}/>
            </div>
            <div className="input-login">
                <img src={passwordIcon} width={30}></img>
                <input type={showPasswordState ? "text" : "password"} placeholder="Contraseña" className="input-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                <button className="show-hide-button" onClick={() => setShowPasswordState(!showPasswordState)}>
                    <img src={showPasswordState ? hideIcon : viewIcon} width={30}></img>
                </button>
            </div>
            <button className="button-login" onClick={handleSubmitLogin}><b>Ingresar</b></button>
            <a onClick={forgotPassword}>Olvidé mi contraseña</a>
        </div>
    )
}

export default LoginForm