import { useNavigate } from "react-router-dom"
import backIcon from "../../assets/images/back.svg"
import enrollmentIcon from "../../assets/images/enrollment.svg"
import { getEnrollment, getEnrollmentStates } from "../../services/EnrollmentsService";
import { getServiceTypes } from "../../services/ServiceTypeService";
import "./EnrollmentWindow.css"

let enrollment = {};

export function EnrollmentWindow() {

    enrollment = getEnrollment()

    const navigate =  useNavigate()

    const handleClickEnrollments = () => {
        navigate('/admin/matriculas')
    }

    const handleClickEditEnrollment = () => {
        getEnrollmentStates()
        .then(resEnrollmentStates => {
            if (resEnrollmentStates) {
                getServiceTypes()
                .then(resServiceType => {
                    if (resServiceType) {
                        navigate('/admin/editar-matricula/'+enrollment.id_matricula)
                    }
                })
                .catch(errServiceType => {
                    console.log(errServiceType)
                })
            }
        })
        .catch(errEnrollmentStates => {
            console.log(errEnrollmentStates)
        })
    }

    return (
        <div className="enrollment-window">
            <input type="image" src={backIcon} width={40} onClick={handleClickEnrollments} className="button-back"/>
            <img src={enrollmentIcon} width={100} className="enrollment-icon"/>
            <p>Matrícula {enrollment.id_matricula}</p>
            <div className="table-enrollment-info-container">
                <table className="table-enrollment-info">
                    <tbody>
                        <tr>
                            <td>Estado</td> 
                            <td>{enrollment.estado_matricula}</td>
                        </tr>
                        <tr>
                            <td>Suscriptor asociado</td>
                            <td>{enrollment.subscriber ? enrollment.subscriber.nombre : ''}</td>
                        </tr>
                        <tr>
                            <td>Predio asociado</td>
                            <td>{enrollment.propertyName ? enrollment.propertyName.nombre_predio : ''}</td>
                        </tr>
                        <tr>
                            <td>Fecha de adjudicación</td>
                            <td>{enrollment.fecha_adjudicacion === null ? '': enrollment.fecha_adjudicacion}</td>
                        </tr>
                        <tr>
                            <td>Tipo de servicio</td>
                            <td>{enrollment.serviceType ? enrollment.serviceType.nombre_servicio : ''}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="watermeter-info-container">
                <p>Datos del medidor</p>
                <table className="table-enrollment-info">
                        {enrollment.medidores ?
                            <tbody>
                                <tr>
                                    <td>ID</td> 
                                    <td>{enrollment.medidores.id_medidor}</td>
                                </tr>
                                <tr>
                                    <td>Marca</td>
                                    <td>{enrollment.medidores.marca_medidor}</td>
                                </tr>
                                <tr>
                                    <td>Porcentaje de calibración</td>
                                    <td>{enrollment.medidores.porcentaje_calibracion}%</td>
                                </tr>
                                <tr>
                                    <td>Fecha de calibración</td>
                                    <td>{enrollment.medidores.fecha_calibracion}</td>
                                </tr>
                            </tbody>
                            :
                            <tbody>
                                <tr>
                                    <td>No cuenta con medidor</td>
                                </tr>
                            </tbody>
                        }
                </table>
            </div>
            <button onClick={handleClickEditEnrollment} className="edit-enrollment-button">Editar</button>
        </div>
    )
}