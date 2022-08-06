import { useState } from "react";
import { useNavigate } from "react-router-dom"
import backIcon from "../../assets/images/back.svg"
import addSubscriberIcon from "../../assets/images/addSubscriber.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import { getDocumentTypesValues } from "../../services/DocumentTypeService";
import "./AddSubscriberWindow.css"
import { addSubscriber } from "../../services/SubscribersService";
import { validateEmail, validateNames } from "../../Validations/validateForms";

let documentTypes = [];

export function AddSubscriberWindow() {

    documentTypes = getDocumentTypesValues();
    
    const [modalState, changeModalState] = useState(false);
    const [modalwarningState, changeModalWarningState] = useState(false);
    const [modalErrorState, changeModalErrorState] = useState(false);
    const [modalExistState, changeModalExistState] = useState(false);
    const [modalDocumentErrorState, changeModalDocumentErrorState] = useState(false);
    const [modalFirstNameErrorState, changeModalFirstNameErrorState] = useState(false);
    const [modalSecondNameErrorState, changeModalSecondNameErrorState] = useState(false);
    const [modalFirstLastNameErrorState, changeModalFirstLastNameErrorState] = useState(false);
    const [modalSecondLastNameErrorState, changeModalSecondLastNameErrorState] = useState(false);
    const [modalEmailErrorState, changeModalEmailErrorState] = useState(false);
    const [modalPhoneErrorState, changeModalPhoneErrorState] = useState(false);

    const [documentTypeState, setDocumentTypeState] = useState(documentTypes.length > 0 ? documentTypes[0].id_tipo_de_documento: '')
    const [documentNumberState, setDocumentNumberState] = useState("")
    const [firstNameState, setFirstNameState] = useState("")
    const [secondNameState, setSecondNameState] = useState("")
    const [firstLastnameState, setFirstLastnameState] = useState("")
    const [secondLastnameState, setSecondLastnameState] = useState("")
    const [birthdayState, setBirthdayState] = useState("")
    const [addressState, setAddressState] = useState("")
    const [mailState, setMailState] = useState("")
    const [phoneState, setPhoneState] = useState("")

    const navigate =  useNavigate()

    const handleClickAddSubscriber = (e) => {
        e.preventDefault();
        if (documentNumberState === "" ||
            firstLastnameState === "" ||
            firstNameState === "" ||
            addressState === "" ||
            documentTypeState === "") {
            changeModalWarningState(!modalwarningState)
        }
        else if (documentNumberState < 2000000 || documentNumberState > 2000000000) {
            changeModalDocumentErrorState(!modalDocumentErrorState)
        }
        else if (!validateNames(firstNameState) || firstNameState.length > 45) {
            changeModalFirstNameErrorState(!modalFirstNameErrorState)
        }
        else if ((!validateNames(secondNameState) || secondNameState.length > 45) && secondNameState !== '') {
            changeModalSecondNameErrorState(!modalSecondNameErrorState)
        }
        else if (!validateNames(firstLastnameState) || firstLastnameState.length > 45) {
            changeModalFirstLastNameErrorState(!modalFirstLastNameErrorState)
        }
        else if ((!validateNames(secondLastnameState) || secondLastnameState.length > 45) && secondLastnameState !== '') {
            changeModalSecondLastNameErrorState(!modalSecondLastNameErrorState)
        }
        else if ((!validateEmail(mailState) || mailState.length > 100) && mailState !== '') {
            changeModalEmailErrorState(!modalEmailErrorState)
        }
        else if ((phoneState < 3000000000 || phoneState > 4000000000) && phoneState !== '') {
            changeModalPhoneErrorState(!modalPhoneErrorState)
        }
        else if (documentNumberState !== "" &&
            firstLastnameState !== "" &&
            firstNameState !== "" &&
            addressState !== "" &&
            documentTypeState !== "") {
            const newSubscriber = {
                id_suscriptor: documentNumberState === "" ? null: documentNumberState,
                primer_apellido_suscriptor: firstLastnameState === "" ? null: firstLastnameState,
                segundo_apellido_suscriptor: secondLastnameState === "" ? null: secondLastnameState,
                primer_nombre_suscriptor: firstNameState === "" ? null: firstNameState,
                segundo_nombre_suscriptor: secondNameState === "" ? null: secondNameState,
                fecha_nacimiento_suscriptor: birthdayState === "" ? null: birthdayState,
                direccion_suscriptor: addressState === "" ? null: addressState,
                correo_electronico_suscriptor: mailState === "" ? null: mailState,
                telefono_suscriptor: phoneState === "" ? null: phoneState, 
                id_tipo_de_documento: documentTypeState === "" ? null: documentTypeState,
            };
            addSubscriber(newSubscriber)
            .then(res => {
                if (res.data.ok) {
                    changeModalState(!modalState)
                } else {
                    changeModalExistState(!modalExistState)
                }
            })
            .catch(err => {
                console.log(err)
                changeModalErrorState(!modalErrorState)
            })
        }
    }

    const handleClickSubscribers = () => {
        navigate('/admin/suscriptores')
    }

    const handleClickAddSubscribers = (modalState) => {
        changeModalWarningState(!modalState)
    }

    const handleClickAddSubscribersError = () => {
        changeModalErrorState(!modalErrorState)
    }

    const handleClickAddSubscribersExist = () => {
        changeModalExistState(!modalExistState)
    }

    return (
        <div className="add-subscriber">
            <input type="image" src={backIcon} width={40} onClick={handleClickSubscribers} className="button-back"/>
            <img src={addSubscriberIcon} width={100} className="add-subscriber-icon"/>
            <p>Nuevo suscriptor</p>
            <div className="add-form">
                <div>
                    <p>Tipo de documento *</p>
                    <select className="input-info-subscriber"
                        value={documentTypeState}
                        onChange={(e) => setDocumentTypeState(e.target.value)}
                    >
                        {documentTypes.map(documentType => {
                            return(
                                <option key={documentType.id_tipo_de_documento}
                                    value={documentType.id_tipo_de_documento}>
                                    {documentType.abreviatura_tipo_de_documento}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <p>Número de documento *</p>
                    <input className="input-info-subscriber" type="number" value={documentNumberState} onChange={(e) => setDocumentNumberState(e.target.value)}/>
                </div>
                <div>
                    <p>Primer nombre *</p>
                    <input className="input-info-subscriber" type="text" value={firstNameState} onChange={(e) => setFirstNameState(e.target.value)}/>
                </div>
                <div>
                    <p>Segundo nombre</p>
                    <input className="input-info-subscriber" type="text" value={secondNameState} onChange={(e) => setSecondNameState(e.target.value)}/>
                </div>
                <div>
                    <p>Primer apellido *</p>
                    <input className="input-info-subscriber" type="text" value={firstLastnameState} onChange={(e) => setFirstLastnameState(e.target.value)}/>
                </div>
                <div id="second-lastname">
                    <p>Segundo apellido</p>
                    <input className="input-info-subscriber" type="text" value={secondLastnameState} onChange={(e) => setSecondLastnameState(e.target.value)}/>
                </div>
                <div id="birthdate">
                    <p>Fecha de nacimiento</p>
                    <input className="input-info-subscriber" type="date" value={birthdayState} onChange={(e) => setBirthdayState(e.target.value)}/>
                </div>
                <div>
                    <p>Dirección *</p>
                    <input className="input-info-subscriber" type="text" value={addressState} onChange={(e) => setAddressState(e.target.value)}/>
                </div>
                <div>
                    <p>Correo electrónico</p>
                    <input className="input-info-subscriber" type="text" value={mailState} onChange={(e) => setMailState(e.target.value)}/>
                </div>
                <div>
                    <p>Teléfono</p>
                    <input
                        className="input-info-subscriber"
                        type="number"
                        value={phoneState}
                        onChange={(e) => setPhoneState(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={handleClickAddSubscriber} className="register-button">Registrar</button>
            <ModalActionPerformed
                img={addSubscriberIcon}
                title="Suscriptor registrado exitosamente"
                state={modalState}
                accept={handleClickSubscribers}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Algunos datos son obligatorios"
                state={modalwarningState}
                accept={handleClickAddSubscribers}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al agregar suscriptor"
                state={modalErrorState}
                accept={handleClickAddSubscribersError}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="El suscriptor ya existe"
                state={modalExistState}
                accept={handleClickAddSubscribersExist}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Número de documento inválido"
                state={modalDocumentErrorState}
                accept={() => {changeModalDocumentErrorState(!modalDocumentErrorState)}}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Primer nombre inválido"
                state={modalFirstNameErrorState}
                accept={() => {changeModalFirstNameErrorState(!modalFirstNameErrorState)}}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Segundo nombre inválido"
                state={modalSecondNameErrorState}
                accept={() => {changeModalSecondNameErrorState(!modalSecondNameErrorState)}}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Primer apellido inválido"
                state={modalFirstLastNameErrorState}
                accept={() => {changeModalFirstLastNameErrorState(!modalFirstLastNameErrorState)}}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Segundo apellido inválido"
                state={modalSecondLastNameErrorState}
                accept={() => {changeModalSecondLastNameErrorState(!modalSecondLastNameErrorState)}}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Correo electónico inválido"
                state={modalEmailErrorState}
                accept={() => {changeModalEmailErrorState(!modalEmailErrorState)}}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Número de télefono inválido"
                state={modalPhoneErrorState}
                accept={() => {changeModalPhoneErrorState(!modalPhoneErrorState)}}
            />
        </div>
    )
}