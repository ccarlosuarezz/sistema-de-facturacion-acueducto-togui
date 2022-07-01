import styled from "styled-components"
import { NavLink, useParams } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react";
import './MainNavBar.css';
import logoApp from "../../assets/images/logoApp.svg"
import { ReactComponent as SubscribersIcon } from "../../assets/images/subscribers.svg"
import { ReactComponent as PropertyIcon } from "../../assets/images/property.svg"
import { ReactComponent as EnrollmentIcon } from "../../assets/images/enrollment.svg"
import { ReactComponent as InvoiceIcon } from "../../assets/images/invoice.svg"
import userProfileIcon from "../../assets/images/userProfile.svg"
import { ModalSesion } from "../ModalSesion/ModalSesion";
const defaultNavIconsColor = "#FFFFFF"

const MainNavBar = () => {

    const [modalState, changeModalState] = useState(false);

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
                            <NavLink to="/admin/predios" className={({isActive}) => (isActive ? "nav-option-active": "nav-option")}>
                                <PropertyIcon width={30} height={30} fill={defaultNavIconsColor} className="icon-active"/>
                                <p><b>Predios</b></p>
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
                {/* <OverlayClose onClick={() => {if (modalState) {
                    changeModalState(false);
                }}}></OverlayClose> */}
                <ModalSesion
                    state={modalState}
                    closeFunction={() => changeModalState(false)}
                />
                <div onClick={() => changeModalState(!modalState)} className="user-profile">
                    <p><b>Nombre usuario</b></p>
                    <img src={userProfileIcon} width={40}></img>
                </div>
            </div>
        </div>
    )
}

export default MainNavBar

const OverlayClose = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.0);
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    z-indez: -1;
`;