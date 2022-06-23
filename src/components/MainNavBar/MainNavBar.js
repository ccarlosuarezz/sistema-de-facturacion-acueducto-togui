import { NavLink } from "react-router-dom"
import React, { useState } from "react";
import './MainNavBar.css';
import logoApp from "../../assets/images/logoApp.svg"
import { ReactComponent as SubscribersIcon } from "../../assets/images/subscribers.svg"
import { ReactComponent as EnrollmentIcon } from "../../assets/images/enrollment.svg"
import { ReactComponent as InvoiceIcon } from "../../assets/images/invoice.svg"
import userProfileIcon from "../../assets/images/userProfile.svg"
const defaultNavIconsColor = "#FFFFFF"

const MainNavBar = () => {
    // const [color, setColor] = useState(false)
    return (
        <div className="nav-bar">
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
                            <NavLink to="/admin/suscriptores" className={({isActive}) => (isActive ? "nav-option-active": "nav-option")}>
                                <SubscribersIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active"/>
                                <p><b>Suscriptores</b></p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/matriculas" className={({isActive}) => (isActive ? "nav-option-active": "nav-option")}>
                            {/* <NavLink to="/admin/matriculas" className="nav-option" onClick={() => setColor(!color)}> */}
                                {/* {color ? <User2 stroke="#000000" width={30} height={30}/> : <User2 stroke="#FFFFFF"/>} */}
                                <EnrollmentIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active"/>
                                <p><b>Matrículas</b></p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/facturacion" className={({isActive}) => (isActive ? "nav-option-active": "nav-option")}>
                                <InvoiceIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active"/>
                                <p><b>Facturación</b></p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="user-container">
                <NavLink to="/" className="user-profile">
                    <p><b>Nombre usuario</b></p>
                    <img src={userProfileIcon} width={40}></img>
                </NavLink>
            </div>
        </div>
    )
}

export default MainNavBar