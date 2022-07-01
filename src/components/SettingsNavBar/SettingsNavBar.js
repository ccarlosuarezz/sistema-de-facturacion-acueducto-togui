import { NavLink } from "react-router-dom"
import logoApp from "../../assets/images/logoApp.svg"
import "./SettingsNavBar.css";
import { ReactComponent as PersonalDataIcon } from "../../assets/images/personalData.svg"
import { ReactComponent as PasswordIcon } from "../../assets/images/password.svg"
const defaultNavIconsColor = "#FFFFFF"

export default function SettingsNavBar() {
    return (
        <div className="settings-nav-bar">
            <div className="logo-container">
                <NavLink to="/admin">
                    <div className="nav-bar-image">
                        <img src={logoApp} width={100}></img>
                    </div>
                </NavLink>
            </div>
            <div className="nav-container">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/configuracion/datos-personales" className={({isActive}) => (isActive ? "nav-option-active": "nav-option")}>
                                <PersonalDataIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active"/>
                                <p><b>Datos personales</b></p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/configuracion/contrasena" className={({isActive}) => (isActive ? "nav-option-active": "nav-option")}>
                                <PasswordIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active"/>
                                <p><b>Contraseña</b></p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}