import { useNavigate } from "react-router-dom"
import userIcon from "../../assets/images/user.svg"
import passwordIcon from "../../assets/images/password.svg"
import hideIcon from "../../assets/images/hide.svg"
import "./LoginForm.css"

const LoginForm = ({forgotPassword}) => {

    const navigate =  useNavigate()

    const handleClickAdmin = () => {
        navigate('/admin')
    }

    return (
        <div className="login-form">
            <p><b>Inicio de sesión</b></p>
            <div className="input-login">
                <img src={userIcon} stroke="black" width={30}></img>
                <input type="text" placeholder="Usuario" className="input-user"></input>
            </div>
            <div className="input-login">
                <img src={passwordIcon} width={30}></img>
                <input type="password" placeholder="Contraseña" className="input-password"></input>
                <img src={hideIcon} width={30}></img>
            </div>
            <button className="button-login" onClick={handleClickAdmin}><b>Ingresar</b></button>
            <a onClick={forgotPassword}>Olvidé mi contraseña</a>
        </div>
    )
}

export default LoginForm