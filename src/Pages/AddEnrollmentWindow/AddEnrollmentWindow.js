import { useNavigate } from "react-router-dom"
import addEnrollmentIcon from "../../assets/images/addEnrollment.svg"
import backIcon from "../../assets/images/back.svg"
import "./AddEnrollmentWindow.css"

export function AddEnrollmentWindow() {

    const navigate =  useNavigate()

    const handleClickEnrollments = () => {
        navigate('/admin/matriculas')
    }

    const handleClickEnrollmentProperty = () => {
        navigate('/admin/registrar-propiedad-matricula')
    }


    return (
        <div className="add-enrollment">
            <input type="image" src={backIcon} width={40} onClick={handleClickEnrollments} className="button-back"/>
            <img src={addEnrollmentIcon} height={100} className="add-enrollment-icon"/>
            <p>Nueva matrícula</p>
            <div className="enrollment-form">
                <div>
                    <p>Fecha de adjudicación</p>
                    <input type="date" className="input-info-enrollment"/>
                </div>
                <div>
                    <p>Suscriptor asociado</p>
                    <select className="input-info-enrollment">
                        <option>0000000000</option>
                        <option>0000000001</option>
                        <option>0000000002</option>
                        <option>0000000003</option>
                        <option>0000000004</option>
                        <option>0000000005</option>
                    </select>
                </div>
                <div>
                    <p>Tipo de servicio</p>
                    <select className="input-info-enrollment">
                        <option>Abrevadero</option>
                        <option>Agroindustrial</option>
                        <option>Residencial</option>
                    </select>
                </div>
            </div>
            <div className="financing-watermeter-container">
                <div className="financing">
                    <p>Financiación</p>
                    <div>
                        <div>
                            <p>Valor</p>
                            <input type="number" className="input-info-enrollment-financing"/>
                        </div>
                        <div className="div-info-financing">
                            <div>
                                <p>Cuotas</p>
                                <input type="number" className="input-info-enrollment-financing-2"/>
                            </div>
                            <div>
                                <p>Interes (%)</p>
                                <input type="number" className="input-info-enrollment-financing-2"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="watermeter">
                    <p>Medidor</p>
                    <div>
                        <div>
                            <p>Registrar medidor</p>
                            <select className="input-info-enrollment-watermeter">
                                <option>No</option>
                                <option>Si</option>
                            </select>
                        </div>
                        <div className="watermeter-register-info">
                            <div>
                                <p>ID</p>
                                <input type="number" className="input-info-enrollment-watermeter-2" disabled/>
                            </div>
                            <div>
                                <p>Marca</p>
                                <input type="text" className="input-info-enrollment-watermeter-2" disabled/>
                            </div>
                            <div>
                                <p>Calibración (%)</p>
                                <input type="number" className="input-info-enrollment-watermeter-2" disabled/>
                            </div>
                            <div>
                                <p>Fecha de calibración</p>
                                <input type="date" className="input-info-enrollment-watermeter-2" disabled/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleClickEnrollmentProperty} className="continue-button-add-enrollment">Continuar</button>
        </div>
    )
}