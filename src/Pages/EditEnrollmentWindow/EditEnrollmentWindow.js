import { useState } from "react";
import { useNavigate } from "react-router-dom"
import backIcon from "../../assets/images/back.svg"
import editEnrollmentIcon from "../../assets/images/enrollment.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import { getEnrollment } from "../../services/EnrollmentsService";
import "./EditEnrollmentWindow.css"

let enrollment = {};

export function EditEnrollmentWindow() {

    enrollment = getEnrollment()

    const navigate =  useNavigate()

    const handleClickEnrollment = () => {
        navigate('/admin/matricula/'+enrollment.id_matricula)
    }

    const [modalState, changeModalState] = useState(false);

    return (
        <div className="edit-enrollment-window">
            <input type="image" src={backIcon} width={40} onClick={handleClickEnrollment} className="button-back"/>
            <img src={editEnrollmentIcon} width={100} className="edit-enrollment-icon"/>
            <p>Editar matrícula</p>
            <div>
                <div className="data-edit-enrollment-container">
                    <div className="div-data-edit-enrollment">
                        <p>Suscriptor asociado</p>
                        <select className="input-info-edit-enrollment">
                            <option>0000000000</option>
                            <option>0000000001</option>
                            <option>0000000002</option>
                            <option>0000000003</option>
                            <option>0000000004</option>
                            <option>0000000005</option>
                        </select>
                    </div>
                    <div className="div-data-edit-enrollment">
                        <p>Estado</p>
                        <select className="input-info-edit-enrollment input-info-edit-enrollment-state">
                            <option>Adjudicada</option>
                            <option>En instalación</option>
                            <option>Activa</option>
                            <option>Suspensión impuesta</option>
                            <option>Suspension temporal</option>
                            <option>Cancelada</option>
                        </select>
                    </div>
                    <div className="div-data-edit-enrollment">
                        <p>Tipo de servicio</p>
                        <select className="input-info-edit-enrollment">
                            <option>Abrevadero</option>
                            <option>Agroindustrial</option>
                            <option>Residencial</option>
                        </select>
                    </div>
                </div>
                <div className="data-edit-watermeter-container">
                    <p>Medidor</p>
                    <div className="data-edit-watermeter">
                        <div>
                            <p>Registrar medidor</p>
                            <select className="input-info-enrollment-watermeter">
                                <option>No</option>
                                <option>Si</option>
                            </select>
                        </div>
                        <div className="edit-enrollment-watermeter-container">
                            <div className="div-data-edit-enrollment">
                                <p>ID</p>
                                <input type="number" value="0000000" className="input-info-edit-enrollment input-info-edit-enrollment-watermeter" disabled/>
                            </div>
                            <div className="div-data-edit-enrollment">
                                <p>Marca</p>
                                <input type="text" value="Marca X" className="input-info-edit-enrollment input-info-edit-enrollment-watermeter" disabled/>
                            </div>
                            <div className="div-data-edit-enrollment">
                                <p>Calibración (%)</p>
                                <input type="number" value="0.1" className="input-info-edit-enrollment input-info-edit-enrollment-watermeter" disabled/>
                            </div>
                            <div className="div-data-edit-enrollment">
                                <p>Fecha de calibración</p>
                                <input type="date" value="2022-01-01" className="input-info-edit-enrollment input-info-edit-enrollment-watermeter" disabled/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => changeModalState(!modalState)} className="save-edit-enrollment-changes">Guardar cambios</button>
            <ModalActionPerformed
                img={editEnrollmentIcon}
                title="Matricula editada exitosamente"
                state={modalState}
                accept={handleClickEnrollment}
            />
        </div>
    )
}