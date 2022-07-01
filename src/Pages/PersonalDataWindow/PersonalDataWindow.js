import { useState } from "react";
import { useNavigate } from "react-router-dom"
import backIcon from "../../assets/images/back.svg"
import userProfileIcon from "../../assets/images/userProfile.svg"
import editIcon from "../../assets/images/edit.svg"
import { ModalEditPersonalData } from "../../components/ModalEditPersonalData/ModalEditPersonalData";
import "./PersonalDataWindow.css"

export default function PersonalDataWindow() {
    const navigate =  useNavigate()

    const handleClickAdmin = () => {
        navigate('/admin')
    }

    const handleClickNames = () => {
        changeModalStateNames(!modalStateNames);
    }

    const handleClickLastNames = () => {
        changeModalStateLastNames(!modalStateLastNames);
    }

    const handleClickPersonalEmail = () => {
        changeModalStatePersonalEmail(!modalStatePersonalEmail);
    }

    const handleClickAccessEmail = () => {
        changeModalStateAccessEmail(!modalStateAccessEmail);
    }

    const handleClickPhone = () => {
        changeModalStatePhone(!modalStatePhone);
    }

    const [modalStateNames, changeModalStateNames] = useState(false);
    const [modalStateLastNames, changeModalStateLastNames] = useState(false);
    const [modalStatePersonalEmail, changeModalStatePersonalEmail] = useState(false);
    const [modalStateAccessEmail, changeModalStateAccessEmail] = useState(false);
    const [modalStatePhone, changeModalStatePhone] = useState(false);

    return (
        <div className="personal-data-window">
            <input type="image" src={backIcon} width={40} onClick={handleClickAdmin} className="button-back"/>
            <img src={userProfileIcon} width={100} className="user-profile-icon"/>
            <div className="personal-data-container">
                <div>
                    <p>Nombres</p>
                    <div className="personal-data-edit">
                        <p>Nombre1 Nombre2</p>
                        <input type="image" src={editIcon} height={25} onClick={() => changeModalStateNames(!modalStateNames)}/>
                    </div>
                    <ModalEditPersonalData
                        state={modalStateNames}
                        title="Nombres"
                        inputType="text"
                        acceptFunction={handleClickNames}
                    />
                </div>
                <div>
                    <p>Apellidos</p>
                    <div className="personal-data-edit">
                        <p>Apellido1 Apellido2</p>
                        <input type="image" src={editIcon} height={25} onClick={() => changeModalStateLastNames(!modalStateLastNames)}/>
                    </div>
                    <ModalEditPersonalData
                        state={modalStateLastNames}
                        title="Apellidos"
                        inputType="text"
                        acceptFunction={handleClickLastNames}
                    />
                </div>
                <div>
                    <p>Correo personal</p>
                    <div className="personal-data-edit">
                        <p>correo.personal@mail.com</p>
                        <input type="image" src={editIcon} height={25} onClick={() => changeModalStatePersonalEmail(!modalStatePersonalEmail)}/>
                    </div>
                    <ModalEditPersonalData
                        state={modalStatePersonalEmail}
                        title="Correo personal"
                        inputType="text"
                        acceptFunction={handleClickPersonalEmail}
                    />
                </div>
                <div>
                    <p>Correo de acceso</p>
                    <div className="personal-data-edit">
                        <p>correo.acceso@mail.com</p>
                        <input type="image" src={editIcon} height={25} onClick={() => changeModalStateAccessEmail(!modalStateAccessEmail)}/>
                    </div>
                    <ModalEditPersonalData
                        state={modalStateAccessEmail}
                        title="Correo de acceso"
                        inputType="text"
                        acceptFunction={handleClickAccessEmail}
                    />
                </div>
                <div>
                    <p>Telefono</p>
                    <div className="personal-data-edit">
                        <p>3222222222</p>
                        <input type="image" src={editIcon} height={25} onClick={() => changeModalStatePhone(!modalStatePhone)}/>
                    </div>
                    <ModalEditPersonalData
                        state={modalStatePhone}
                        title="Telefono"
                        inputType="number"
                        acceptFunction={handleClickPhone}
                    />
                </div>
            </div>
        </div>
    )
}