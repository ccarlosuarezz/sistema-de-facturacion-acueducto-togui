import { useNavigate } from "react-router-dom"
import backIcon from "../../assets/images/back.svg"
import enrollmentIcon from "../../assets/images/enrollment.svg"
import "./EnrollmentWindow.css"

export function EnrollmentWindow() {

    const navigate =  useNavigate()

    const handleClickEnrollments = () => {
        navigate('/admin/matriculas')
    }

    const handleClickEditEnrollment = () => {
        navigate('/admin/editar-matricula')
    }

    return (
        <div className="enrollment-window">
            <input type="image" src={backIcon} width={40} onClick={handleClickEnrollments} className="button-back"/>
            <img src={enrollmentIcon} width={100} className="enrollment-icon"/>
            <p>Matrícula 0000000001</p>
            <div className="table-enrollment-info-container">
                <table className="table-enrollment-info">
                    <tbody>
                        <tr>
                            <td>Estado</td> 
                            <td>Activa</td>
                        </tr>
                        <tr>
                            <td>Suscriptor asociado</td>
                            <td>0000000000</td>
                        </tr>
                        <tr>
                            <td>Predio asociado</td>
                            <td>00000000000000000000</td>
                        </tr>
                        <tr>
                            <td>Fecha de adjudicación</td>
                            <td>01/01/2022</td>
                        </tr>
                        <tr>
                            <td>Tipo de servicio</td>
                            <td>Residencial</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="watermeter-info-container">
                <p>Datos del medidor</p>
                <table className="table-enrollment-info">
                    <tbody>
                        <tr>
                            <td>ID</td> 
                            <td>0000000</td>
                        </tr>
                        <tr>
                            <td>Marca</td>
                            <td>Marca X</td>
                        </tr>
                        <tr>
                            <td>Porcentaje de caliración</td>
                            <td>0.1%</td>
                        </tr>
                        <tr>
                            <td>Fecha de calibración</td>
                            <td>01/01/2022</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={handleClickEditEnrollment} className="edit-enrollment-button">Editar</button>
        </div>
    )
}