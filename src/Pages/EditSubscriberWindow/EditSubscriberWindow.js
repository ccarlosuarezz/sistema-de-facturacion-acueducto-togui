import { useNavigate } from "react-router-dom"
import editSubscriberIcon from "../../assets/images/editSubscriber.svg"
import backIcon from "../../assets/images/back.svg"
import "./EditSubscriberWindow.css"

export function EditSubscriberWindow() {

    const navigate =  useNavigate()

    const handleClickSubscriber = () => {
        navigate('/admin/suscriptor')
    }

    return (
        <div className="edit-subscriber">
            <input type="image" src={backIcon} width={40} onClick={handleClickSubscriber} className="button-back"/>
            <img src={editSubscriberIcon} height={100} className="edit-subscriber-icon"/>
            <p>Editar suscriptor</p>
            <p className="name-subscriber">Nombre1 Nombre2 Apellido1 Apellido2</p>
            <div className="edit-form">
                <div>
                    <p>Dirección</p>
                    <input type="text" className="input-info-edit-subscriber" value="Vereda Gachanzuca"/>
                </div>
                <div>
                    <p>Correo electronico</p>
                    <input type="text" className="input-info-edit-subscriber" value="nombre.apellido@mail.com"/>
                </div>
                <div>
                    <p>Telefono</p>
                    <input type="number" className="input-info-edit-subscriber" value="3000000000"/>
                </div>
            </div>
            <button className="save-changes-edit-button">Guardar cambios</button>
        </div>
    )
}