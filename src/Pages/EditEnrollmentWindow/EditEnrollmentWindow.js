import { useState } from "react";
import { useNavigate } from "react-router-dom"
import backIcon from "../../assets/images/back.svg"
import editEnrollmentIcon from "../../assets/images/enrollment.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import { getEnrollment, getEnrollmentStatesList, getEnrollmentByID, editEnrollment } from "../../services/EnrollmentsService";
import { getServiceTypesValues } from "../../services/ServiceTypeService";
import { addWatermeter } from "../../services/WatermeterService";
import "./EditEnrollmentWindow.css"

let enrollment = {};
let enrollmentStates = []
let serviceTypeList = []
let watermeterRegisterOptions = [
    {state: false, name: 'No'},
    {state: true, name: 'Si'}
]

export function EditEnrollmentWindow() {

    enrollment = getEnrollment()
    enrollmentStates = getEnrollmentStatesList()
    serviceTypeList = getServiceTypesValues()

    const [modalState, changeModalState] = useState(false);
    const [modalWarningState, changeModalWarningState] = useState(false);
    const [modalErrorIdPropertyState, changeModalErrorIdPropertyState] = useState(false);
    const [modalErrorIdSubscriberState, changeModalErrorIdSubscriberState] = useState(false);
    const [modalErrorState, changeModalErrorState] = useState(false);
    const [modalWatermeterExistState, changeModalWatermeterExistState] = useState(false);

    const [asociatedSubscriberState, setAsociatedSubscriberState] = useState(enrollment.id_suscriptor);
    const [asociatedPropertyState, setAsociatedPropertyState] = useState(enrollment.id_numero_predial);
    const [enrollmentState, setEnrollmentState] = useState(enrollment.estado_matricula);
    const [serviceTypeState, setServiceTypeState] = useState(enrollment.id_tipo_de_servicio);
    const [watermeterState, setWatermeterState] = useState(watermeterRegisterOptions[0].state);
    const [brandWatermeterState, setBrandWatermeterState] = useState("");
    const [calibrationPercentageWatermeterState, setCalibrationPercentageWatermeterState] = useState("");
    const [calibrationDateWatermeterState, setCalibrationDateWatermeterState] = useState("");

    const navigate =  useNavigate()

    const handleClickEnrollment = () => {
        navigate('/admin/matricula/'+enrollment.id_matricula)
    }
    
    const handleClickEditEnrollment = (e) => {
        e.preventDefault()
        if (asociatedSubscriberState === "" ||
        asociatedPropertyState === "") {
            changeModalWarningState(!modalWarningState)
        } else {
            if (watermeterState && enrollment.medidores) {
                changeModalWatermeterExistState(!modalWatermeterExistState)
            } else if (watermeterState && !enrollment.medidores) {
                if (brandWatermeterState === "" ||
                    calibrationPercentageWatermeterState === "" ||
                    calibrationDateWatermeterState === "") {
                        changeModalWarningState(!modalWarningState)
                } else {
                    const newWatermeter = {
                        marca_medidor: brandWatermeterState,
                        porcentaje_calibracion: calibrationPercentageWatermeterState,
                        fecha_calibracion: calibrationDateWatermeterState
                    }
                    editEnrollment(newWatermeter)
                    .then(resWatermeter => {
                        if (resWatermeter.data.ok) {
                            const enrollmentEdited = {
                                id_matricula: enrollment.id_matricula,
                                id_numero_predial: asociatedPropertyState,
                                id_suscriptor: asociatedSubscriberState,
                                estado_matricula: enrollmentState,
                                id_tipo_de_servicio: serviceTypeState,
                                id_medidor: resWatermeter.data.result.id_medidor
                            }
                            editEnrollment(enrollmentEdited)
                            .then(resEditEnrollment => {
                                if (resEditEnrollment.data.ok) {
                                    changeModalState(!modalState)
                                }
                            })
                            .catch(errEditEnrollment => {
                                console.log(errEditEnrollment.response.data.error.fields[0])
                                if (errEditEnrollment.response.data.error.fields[0] === "id_numero_predial") {
                                    changeModalErrorIdPropertyState(!modalErrorIdPropertyState)
                                } else if (errEditEnrollment.response.data.error.fields[0] === "id_suscriptor") {
                                    changeModalErrorIdSubscriberState(!modalErrorIdSubscriberState)
                                } else {
                                    changeModalErrorState(!modalErrorState)
                                }
                            })
                        }
                    })
                    .catch(errWatermeter => {
                        console.log(errWatermeter)
                        changeModalErrorState(!modalErrorState)
                    })
                }
            } else if (!watermeterState) {
                console.log(enrollment)
                const enrollmentEdited = {
                    id_matricula: enrollment.id_matricula,
                    id_numero_predial: asociatedPropertyState,
                    id_suscriptor: asociatedSubscriberState,
                    estado_matricula: enrollmentState,
                    id_tipo_de_servicio: serviceTypeState,
                    id_medidor: enrollment.id_medidor
                }
                editEnrollment(enrollmentEdited)
                .then(resEditEnrollment => {
                    if (resEditEnrollment.data.ok) {
                        changeModalState(!modalState)
                    }
                })
                .catch(errEditEnrollment => {
                    console.log(errEditEnrollment.response.data.error.fields[0])
                    if (errEditEnrollment.response.data.error.fields[0] === "id_numero_predial") {
                        changeModalErrorIdPropertyState(!modalErrorIdPropertyState)
                    } else if (errEditEnrollment.response.data.error.fields[0] === "id_suscriptor") {
                        changeModalErrorIdSubscriberState(!modalErrorIdSubscriberState)
                    } else {
                        changeModalErrorState(!modalErrorState)
                    }
                })
            }
        }
    }

    const handleClickEnrollmentEditedSuccesfull = () => {
        changeModalState(!modalState)
        getEnrollmentByID(enrollment.id_matricula)
        .then(res => {
            if (res) {
                navigate('/admin/matricula/'+enrollment.id_matricula)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="edit-enrollment-window">
            <input type="image" src={backIcon} width={40} onClick={handleClickEnrollment} className="button-back"/>
            <img src={editEnrollmentIcon} width={100} className="edit-enrollment-icon"/>
            <p>Editar matrícula</p>
            <div>
                <div className="data-edit-enrollment-container">
                    <div className="div-data-edit-enrollment">
                        <p>Suscriptor asociado *</p>
                        <input
                            type="number"
                            className="input-info-edit-enrollment input-info-edit-enrollment-subscriber"
                            value={asociatedSubscriberState}
                            onChange={(e) => setAsociatedSubscriberState(e.target.value)}
                        />
                    </div>
                    <div className="div-data-edit-enrollment">
                        <p>Predio asociado *</p>
                        <input
                            type="number"
                            className="input-info-edit-enrollment input-info-edit-enrollment-property"
                            value={asociatedPropertyState}
                            onChange={(e) => setAsociatedPropertyState(e.target.value)}
                        />
                    </div>
                    <div className="div-data-edit-enrollment">
                        <p>Estado</p>
                        <select
                            className="input-info-edit-enrollment input-info-edit-enrollment-state"
                            value={enrollmentState}
                            onChange={(e) => setEnrollmentState(e.target.value)}
                        >
                            {enrollmentStates.map(enrollmentState => {
                                return(
                                    <option key={enrollmentState}
                                        value={enrollmentState}>
                                        {enrollmentState}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="div-data-edit-enrollment">
                        <p>Tipo de servicio *</p>
                        <select
                            className="input-info-edit-enrollment input-info-edit-enrollment-service"
                            value={serviceTypeState}
                            onChange={(e) => setServiceTypeState(e.target.value)}
                        >
                            {serviceTypeList.map(serviceType => {
                                return(
                                    <option key={serviceType.id_tipo_de_servicio}
                                        value={serviceType.id_tipo_de_servicio}>
                                        {serviceType.nombre_servicio}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="data-edit-watermeter-container">
                    <p>Medidor</p>
                    <div className="data-edit-watermeter">
                        <div>
                            <p>Registrar medidor</p>
                            <select className="input-info-enrollment-watermeter"
                                value={watermeterState}
                                onChange={(e) => {setWatermeterState(e.target.value==='true')}}
                            >
                                {watermeterRegisterOptions.map(watermeterRegister => {
                                    return(
                                        <option
                                            key={watermeterRegister.state}
                                            value={watermeterRegister.state}
                                        >
                                            {watermeterRegister.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="edit-enrollment-watermeter-container">
                            <div>
                                <p className={watermeterState ? "": "input-disabled"}>Marca *</p>
                                <input
                                    type="text"
                                    disabled={!watermeterState}
                                    value={brandWatermeterState}
                                    className="input-info-edit-enrollment input-info-edit-enrollment-watermeter"
                                    onChange={(e) => setBrandWatermeterState(e.target.value)}
                                />
                            </div>
                            <div>
                                <p className={watermeterState ? "": "input-disabled"}>Fecha de calibración *</p>
                                <input
                                    type="date"
                                    disabled={!watermeterState}
                                    value={calibrationDateWatermeterState}
                                    className="input-info-edit-enrollment input-info-edit-enrollment-watermeter"
                                    onChange={(e) => setCalibrationDateWatermeterState(e.target.value)}
                                />
                            </div>
                            <div className="div-percentaje-calibration">
                                <p className={watermeterState ? "": "input-disabled"}>Porcentaje de calibración</p>
                                <input
                                    type="number"
                                    disabled={!watermeterState}
                                    value={calibrationPercentageWatermeterState}
                                    className="input-info-edit-enrollment input-info-edit-enrollment-watermeter"
                                    onChange={(e) => setCalibrationPercentageWatermeterState(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleClickEditEnrollment} className="save-edit-enrollment-changes">Guardar cambios</button>
            <ModalActionPerformed
                img={editEnrollmentIcon}
                title="Matricula editada exitosamente"
                state={modalState}
                accept={handleClickEnrollmentEditedSuccesfull}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Algunos datos son obligatorios"
                state={modalWarningState}
                accept={() => changeModalWarningState(!modalWarningState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al editar matricula"
                state={modalErrorState}
                accept={() => changeModalErrorState(!modalErrorState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="La matricula ya cuenta con medidor"
                state={modalWatermeterExistState}
                accept={() => changeModalWatermeterExistState(!modalWatermeterExistState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error - El predio asociado no existe"
                state={modalErrorIdPropertyState}
                accept={() => changeModalErrorIdPropertyState(!modalErrorIdPropertyState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error - El suscriptor asociado no existe"
                state={modalErrorIdSubscriberState}
                accept={() => changeModalErrorIdSubscriberState(!modalErrorIdSubscriberState)}
            />
        </div>
    )
}