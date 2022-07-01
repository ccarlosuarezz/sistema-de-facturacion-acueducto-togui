import { useState } from "react";
import { useNavigate } from "react-router-dom"
import backIcon from "../../assets/images/back.svg"
import addSubscriberIcon from "../../assets/images/addSubscriber.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import "./AddSubscriberWindow.css"

export function AddSubscriberWindow() {

    const navigate =  useNavigate()

    const handleClickSubscribers = () => {
        navigate('/admin/suscriptores')
    }

    const [modalState, changeModalState] = useState(false);

    return (
        <div className="add-subscriber">
            <input type="image" src={backIcon} width={40} onClick={handleClickSubscribers} className="button-back"/>
            <img src={addSubscriberIcon} width={100} className="add-subscriber-icon"/>
            <p>Nuevo suscriptor</p>
            <div className="add-form">
                <div>
                    <p>Tipo de documento</p>
                    <select className="input-info-subscriber">
                        <option>C.C</option>
                        <option>NIT</option>
                    </select>
                </div>
                <div>
                    <p>Número de documento</p>
                    <input className="input-info-subscriber" type="number"/>
                </div>
                <div>
                    <p>Primer nombre</p>
                    <input className="input-info-subscriber" type="text"/>
                </div>
                <div>
                    <p>Segundo nombre</p>
                    <input className="input-info-subscriber" type="text"/>
                </div>
                <div>
                    <p>Primer apellido</p>
                    <input className="input-info-subscriber" type="text"/>
                </div>
                <div>
                    <p>Segundo apellido</p>
                    <input className="input-info-subscriber" type="text"/>
                </div>
                <div>
                    <p>Fecha de nacimiento</p>
                    <input className="input-info-subscriber" type="date"/>
                </div>
                <div>
                    <p>Direccion</p>
                    <input className="input-info-subscriber" type="text"/>
                </div>
                <div>
                    <p>Correo electronico</p>
                    <input className="input-info-subscriber" type="text"/>
                </div>
                <div>
                    <p>Telefono</p>
                    <input className="input-info-subscriber" type="number"/>
                </div>
            </div>
            <button onClick={() => changeModalState(!modalState)} className="register-button">Registrar</button>
            <ModalActionPerformed
                img={addSubscriberIcon}
                title="Suscriptor registrado exitosamente"
                state={modalState}
                accept={handleClickSubscribers}
            />
        </div>
    )
}