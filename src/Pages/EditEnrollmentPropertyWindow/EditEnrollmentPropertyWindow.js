import { useNavigate } from "react-router-dom"
import editEnrollmentIcon from "../../assets/images/enrollment.svg"
import backIcon from "../../assets/images/back.svg"
import "./EditEnrollmentPropertyWindow.css"

export function EditEnrollmentPropertyWindow() {

    const navigate =  useNavigate()

    const handleClickEditEnrollment = () => {
        navigate('/admin/editar-matricula')
    }

    return (
        <div className="edit-enrollment-property-window">
            <input type="image" src={backIcon} width={40} onClick={handleClickEditEnrollment} className="button-back"/>
            <img src={editEnrollmentIcon} width={100} className="edit-enrollment-icon"/>
            <p>Editar matrícula</p>
            <div className="enrollment-property-form">
                <div>
                    <p>Número predial anterior</p>
                    <input type="number" className="input-info-enrollment-property input-info-enrollment-property-number" value="00000000000000000000"/>
                </div>
                <div>
                    <p>Nombre</p>
                    <input type="text" className="input-info-enrollment-property" value="Nombre del predio"/>
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
                    <input type="number" className="input-area-property" value="50"/>
                </div>
                <div>
                    <p>Area construida (m<sup>2</sup>)</p>
                    <input type="number" className="input-area-property" value="10"/>
                </div>
            </div>
            <button className="save-edit-enrollment-property-changes">Guardar cambios</button>
        </div>
    )
}