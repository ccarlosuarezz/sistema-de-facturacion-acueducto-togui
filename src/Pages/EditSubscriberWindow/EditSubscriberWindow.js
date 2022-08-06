import { useState } from "react";
import { useNavigate } from "react-router-dom"
import editSubscriberIcon from "../../assets/images/editSubscriber.svg"
import backIcon from "../../assets/images/back.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import "./EditSubscriberWindow.css"
import { editSubscriber, getSubscriber, getSubscriberByID } from "../../services/SubscribersService";
import { validateEmail } from "../../Validations/validateForms";

let subscriber = {};

export function EditSubscriberWindow() {
    
    subscriber = getSubscriber()

    const [addressState, setAddressState] = useState(subscriber.direccion_suscriptor)
    const [emailState, setEmailState] = useState(subscriber.correo_electronico_suscriptor)
    const [phoneState, setPhoneState] = useState(subscriber.telefono_suscriptor)

    const [modalState, changeModalState] = useState(false);
    const [modalWarningState, changeModalWarningState] = useState(false);
    const [modalErrorState, changeModalErrorState] = useState(false);
    const [modalEmailErrorState, changeModalEmailErrorState] = useState(false);
    const [modalPhoneErrorState, changeModalPhoneErrorState] = useState(false);

    const navigate =  useNavigate()

    const handleClickEditSubscriber = (e) => {
        e.preventDefault();
        if (addressState === "") {
            changeModalWarningState(!modalWarningState)
        }
        else if (!validateEmail(emailState) || emailState.length > 100) {
            changeModalEmailErrorState(!modalEmailErrorState)
        }
        else if (phoneState < 3000000000 || phoneState > 4000000000) {
            changeModalPhoneErrorState(!modalPhoneErrorState)
        }
        else if (addressState !== "") {
            const subscriberEdited = {
                id_suscriptor: subscriber.id_suscriptor,
                direccion_suscriptor: addressState,
                correo_electronico_suscriptor: emailState === "" ? null: emailState,
                telefono_suscriptor: phoneState === "" ? null: phoneState
            }
            editSubscriber(subscriberEdited)
            .then(res => {
                if (res.data.ok) {
                    changeModalState(!modalState)
                }
            })
            .catch(err => {
                console.log(err)
                changeModalErrorState(!modalErrorState)
            })
        }
    }

    const handleClickSubscriber = () => {
        navigate('/admin/suscriptor/'+subscriber.id_suscriptor)
    }

    const handleClickEditSubscriberSuccesfull = () => {
        changeModalState(!modalState)
        getSubscriberByID(subscriber.id_suscriptor)
        .then(res => {
            if (res) {
                navigate('/admin/suscriptor/'+subscriber.id_suscriptor)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleClickEditSubscriberError = () => {
        changeModalErrorState(!modalErrorState)
    }

    return (
        <div className="edit-subscriber">
            <input type="image" src={backIcon} width={40} onClick={handleClickSubscriber} className="button-back"/>
            <img src={editSubscriberIcon} height={100} className="edit-subscriber-icon"/>
            <p>Editar suscriptor</p>
            <p className="name-subscriber">
                {`${(subscriber.primer_nombre_suscriptor || 'Nombre')}
                ${(subscriber.segundo_nombre_suscriptor !== null ? subscriber.segundo_nombre_suscriptor: '') || ''}
                ${subscriber.primer_apellido_suscriptor || ''}
                ${(subscriber.segundo_apellido_suscriptor !== null ? subscriber.segundo_apellido_suscriptor: '') || ''  }`}
            </p>
            <div className="edit-form">
                <div>
                    <p>Dirección *</p>
                    <input type="text" className="input-info-edit-subscriber" value={addressState} onChange={(e) => setAddressState(e.target.value)}/>
                </div>
                <div>
                    <p>Correo electrónico</p>
                    <input type="text" className="input-info-edit-subscriber" value={emailState} onChange={(e) => setEmailState(e.target.value)}/>
                </div>
                <div>
                    <p>Teléfono</p>
                    <input type="number" className="input-info-edit-subscriber" value={phoneState} onChange={(e) => setPhoneState(e.target.value)}/>
                </div>
            </div>
            <button onClick={handleClickEditSubscriber} className="save-changes-edit-button">Guardar cambios</button>
            <ModalActionPerformed
                img={editSubscriberIcon}
                title="Suscriptor editado exitosamente"
                state={modalState}
                accept={handleClickEditSubscriberSuccesfull}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Algunos datos son obligatorios"
                state={modalWarningState}
                accept={() => changeModalWarningState(!modalWarningState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al editar suscriptor"
                state={modalErrorState}
                accept={handleClickEditSubscriberError}
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