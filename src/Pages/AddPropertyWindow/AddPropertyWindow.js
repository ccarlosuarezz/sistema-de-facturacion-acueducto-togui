import { useState } from "react";
import { useNavigate } from "react-router-dom"
import addPropertyIcon from "../../assets/images/addProperty.svg"
import backIcon from "../../assets/images/back.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import "./AddPropertyWindow.css"

export function AddPropertyWindow() {

    const navigate =  useNavigate()

    const handleClickProperties = () => {
        navigate('/admin/predios')
    }

    const [modalState, changeModalState] = useState(false);

    return (
        <div className="enrollment-property">
            <input type="image" src={backIcon} width={40} onClick={handleClickProperties} className="button-back"/>
            <img src={addPropertyIcon} height={100} className="add-enrollment-icon"/>
            <p>Nuevo predio</p>
            <div className="enrollment-property-form">
                <div>
                    <p>Número predial anterior</p>
                    <input type="number" className="input-info-enrollment-property input-info-enrollment-property-number"/>
                </div>
                <div>
                    <p>Nombre</p>
                    <input type="text" className="input-info-enrollment-property"/>
                </div>
                <div>
                    <p>Destino económico</p>
                    <select className="input-info-enrollment-property">
                        <option>Agropecuario</option>
                        <option>Comercial</option>
                        <option>Residencial</option>
                    </select>
                </div>
            </div>
            <div className="address-property-container">
                <p>Dirección</p>
                <div>
                    <div>
                        <p>Departamento</p>
                        <select className="input-address-property">
                            <option>Boyacá</option>
                        </select>
                    </div>
                    <div>
                        <p>Municipio</p>
                        <select className="input-address-property">
                            <option>Togüí</option>
                        </select>
                    </div>
                    <div>
                        <p>Vereda</p>
                        <select className="input-address-property">
                            <option>Gachanzuca</option>
                            <option>Garibay</option>
                            <option>Manga</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="propery-area-container">
                <div>
                    <p>Area del predio (m<sup>2</sup>)</p>
                    <input type="number" className="input-area-property"/>
                </div>
                <div>
                    <p>Area construida (m<sup>2</sup>)</p>
                    <input type="number" className="input-area-property"/>
                </div>
            </div>
            <button onClick={() => changeModalState(!modalState)} className="register-enrollment-button">Registrar</button>
            <ModalActionPerformed
                img={addPropertyIcon}
                title="Predio registrado exitosamente"
                state={modalState}
                accept={handleClickProperties}
            />
        </div>
    )
}