import { useState } from "react";
import { useNavigate } from "react-router-dom"
import backIcon from "../../assets/images/back.svg"
import addEnrollmentIcon from "../../assets/images/addEnrollment.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import "./AddEnrollmentWindow.css"
import { getServiceTypesValues } from "../../services/ServiceTypeService";
import { getFinancingTypesValues } from "../../services/FinancingService";
import { addWatermeter } from "../../services/WatermeterService";
import { addEnrollment } from "../../services/EnrollmentsService";

let serviceTypeList = []
let financingList = []
let watermeterRegisterOptions = [
    {state: false, name: 'No'},
    {state: true, name: 'Si'}
]

export function AddEnrollmentWindow() {

    serviceTypeList = getServiceTypesValues()
    financingList = getFinancingTypesValues()

    const [modalState, changeModalState] = useState(false);
    const [modalwarningState, changeModalWarningState] = useState(false);
    const [modalErrorIdPropertyState, changeModalErrorIdPropertyState] = useState(false);
    const [modalErrorIdSubscriberState, changeModalErrorIdSubscriberState] = useState(false);
    const [modalErrorState, changeModalErrorState] = useState(false);

    const [asociatedSubscriberState, setAsociatedSubscriberState] = useState("");
    const [asociatedPropertyState, setAsociatedPropertyState] = useState("");
    const [serviceTypeState, setServiceTypeState] = useState(serviceTypeList.length > 0 ? serviceTypeList[0].id_tipo_de_servicio: '');
    const [financingValueState, setFinancingValueState] = useState(financingList.length > 0 ? financingList[0].valor_financiacion: '');
    const [financingInterestState, setFinancingInterestState] = useState(financingList.length > 0 ? financingList[0].porcentaje_interes: '');
    const [financingFeeState, setFinancingFeeState] = useState(financingList.length > 0 ? financingList[0].id_financiacion: '');
    const [watermeterState, setWatermeterState] = useState(watermeterRegisterOptions[0].state);
    const [brandWatermeterState, setBrandWatermeterState] = useState("");
    const [calibrationPercentageWatermeterState, setCalibrationPercentageWatermeterState] = useState("");
    const [calibrationDateWatermeterState, setCalibrationDateWatermeterState] = useState("");

    const [idEnrollmentState, setIdEnrollmentState] = useState("");

    const navigate =  useNavigate()

    const handleClickEnrollments = () => {
        navigate('/admin/matriculas')
    }

    const handleClickAddEnrollment = (e) => {
        e.preventDefault();
        if (asociatedSubscriberState === "" ||
            asociatedPropertyState === "") {
                changeModalWarningState(!modalwarningState)
        } else {
            if (watermeterState &&
                brandWatermeterState !== "" &&
                calibrationPercentageWatermeterState !== ""  &&
                calibrationDateWatermeterState !== "") {
                const newWatermeter = {
                    marca_medidor: brandWatermeterState,
                    porcentaje_calibracion: calibrationPercentageWatermeterState,
                    fecha_calibracion: calibrationDateWatermeterState
                }
                addWatermeter(newWatermeter)
                .then(res => {
                    if (res.data.ok) {
                        console.log('id matricula ->'+res.data.result)
                        const newEnrollment = {
                            id_suscriptor: asociatedSubscriberState === "" ? null: asociatedSubscriberState,
                            id_numero_predial: asociatedPropertyState === "" ? null: asociatedPropertyState,
                            id_tipo_de_servicio: serviceTypeState,
                            id_financiacion: financingFeeState,
                            id_medidor: res.data.result.id_medidor
                        }
                        addEnrollment(newEnrollment)
                        .then(resEnrollment => {
                            if (resEnrollment.data.ok) {
                                setIdEnrollmentState(resEnrollment.data.result)
                                changeModalState(!modalState)
                            }
                        })
                        .catch(errEnrollment => {
                            console.log(errEnrollment.response.data.error.fields[0])
                            if (errEnrollment.response.data.error.fields[0] === "id_numero_predial") {
                                changeModalErrorIdPropertyState(!modalErrorIdPropertyState)
                            } else if (errEnrollment.response.data.error.fields[0] === "id_suscriptor") {
                                changeModalErrorIdSubscriberState(!modalErrorIdSubscriberState)
                            } else {
                                changeModalErrorState(!modalErrorState)
                            }
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    changeModalErrorState(!modalErrorState)
                })
            } else if (watermeterState &&
                (brandWatermeterState === "" ||
                calibrationPercentageWatermeterState === ""  ||
                calibrationDateWatermeterState === "")) {
                    changeModalWarningState(!modalwarningState)
            } else if (!watermeterState) {
                const newEnrollment = {
                    id_suscriptor: asociatedSubscriberState === "" ? null: asociatedSubscriberState,
                    id_numero_predial: asociatedPropertyState === "" ? null: asociatedPropertyState,
                    id_tipo_de_servicio: serviceTypeState,
                    id_financiacion: financingFeeState,
                    id_medidor: null
                }
                addEnrollment(newEnrollment)
                .then(res => {
                    if (res.data.ok) {
                        console.log('id matricula ->'+res.data.result)
                        setIdEnrollmentState(res.data.result)
                        changeModalState(!modalState)
                    }
                })
                .catch(err => {
                    console.log(err.response.data.error.fields[0])
                    if (err.response.data.error.fields[0] === "id_numero_predial") {
                        changeModalErrorIdPropertyState(!modalErrorIdPropertyState)
                    } else if (err.response.data.error.fields[0] === "id_suscriptor") {
                        changeModalErrorIdSubscriberState(!modalErrorIdSubscriberState)
                    } else {
                        changeModalErrorState(!modalErrorState)
                    }
                })
            }
        }
    }

    return (
        <div className="add-enrollment">
            <input type="image" src={backIcon} width={40} onClick={handleClickEnrollments} className="button-back"/>
            <img src={addEnrollmentIcon} height={100} className="add-enrollment-icon"/>
            <p>Nueva matrícula</p>
            <div className="enrollment-form">
                <div>
                    <p>Suscriptor asociado *</p>
                    <input
                        type="number"
                        className="input-info-enrollment"
                        value={asociatedSubscriberState}
                        onChange={(e) => setAsociatedSubscriberState(e.target.value)}
                    />
                </div>
                <div>
                    <p>Predio asociado *</p>
                    <input
                        type="number"
                        className="input-info-enrollment-property"
                        value={asociatedPropertyState}
                        onChange={(e) => setAsociatedPropertyState(e.target.value)}
                    />
                </div>
                <div>
                    <p>Tipo de servicio</p>
                    <select
                        className="input-info-enrollment"
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
            <div className="financing-watermeter-container">
                <div className="financing">
                    <p>Financiación</p>
                    <div>
                        <div className="div-info-financing">
                            <div>
                                <p>Valor: {financingValueState}</p>
                            </div>
                            <div>
                                <p>Interes: {financingInterestState}%</p>
                            </div>
                            <div className="div-interest-fee">
                                <p>Cuotas</p>
                                <select
                                    className="input-info-enrollment-financing-2"
                                    value={financingFeeState}
                                    onChange={(e) => setFinancingFeeState(e.target.value)}
                                >
                                    {financingList.map(financing => {
                                        return(
                                        <option
                                            key={financing.id_financiacion}
                                            value={financing.id_financiacion}>
                                            {financing.cuotas_financiacion}
                                        </option>
                                        )
                                    })} 
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="watermeter">
                    <p>Medidor</p>
                    <div>
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
                        <div className="watermeter-register-info">
                            <div>
                                <p className={watermeterState ? "": "input-disabled"}>Marca *</p>
                                <input
                                    type="text"
                                    className={watermeterState ? "input-info-enrollment-watermeter": "input-info-enrollment-watermeter-2"}
                                    disabled={!watermeterState}
                                    value={brandWatermeterState}
                                    onChange={(e) => {setBrandWatermeterState(e.target.value)}}
                                />
                            </div>
                            <div>
                                <p className={watermeterState ? "": "input-disabled"}>Fecha de calibración *</p>
                                <input
                                    type="date"
                                    className={watermeterState ? "input-info-enrollment-watermeter": "input-info-enrollment-watermeter-2"}
                                    disabled={!watermeterState}
                                    value={calibrationDateWatermeterState}
                                    onChange={(e) => {setCalibrationDateWatermeterState(e.target.value)}}
                                />
                            </div>
                            <div className="div-percentaje-calibration">
                                <p className={watermeterState ? "": "input-disabled"}>Porcentaje de calibración *</p>
                                <input
                                    type="number"
                                    className={watermeterState ? "input-info-enrollment-watermeter": "input-info-enrollment-watermeter-2"}
                                    disabled={!watermeterState}
                                    value={calibrationPercentageWatermeterState}
                                    onChange={(e) => {setCalibrationPercentageWatermeterState(e.target.value)}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleClickAddEnrollment} className="add-enrollment-button">Registrar</button>
            <ModalActionPerformed
                img={addEnrollmentIcon}
                title={"Matricula registrada exitosamente con ID: "+ idEnrollmentState}
                state={modalState}
                accept={handleClickEnrollments}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Algunos datos son obligatorios"
                state={modalwarningState}
                accept={() => changeModalWarningState(!modalwarningState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al agregar matricula"
                state={modalErrorState}
                accept={() => changeModalErrorState(!modalErrorState)}
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