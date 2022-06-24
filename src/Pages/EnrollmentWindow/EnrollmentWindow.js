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
            <div>
                <div className="enrollment-info">
                    <div>
                        <p><b>Estado: </b>Activa</p>
                        <p><b>Suscriptor asociado: </b>0000000000</p>
                    </div>
                    <div>
                        <p><b>Fecha de adjudicación: </b>01/01/2022</p>
                        <p><b>Tipo de servicio: </b>Residencial</p>
                    </div>
                </div>
                <div className="info-property-watermeter">
                    <div className="property-info">
                        <p>Datos del predio</p>
                        <div>
                            <p><b>Número predial anterior:</b><br/>00000000000000000000</p>
                            <p><b>Nombre: </b>Nombre del predio</p>
                            <p><b>Dirección: </b>Boyacá, Togüí, Vereda Garibay</p>
                            <p><b>Destino económico: </b>Residencial</p>
                            <p><b>Área del predio: </b>50 m<sup>2</sup></p>
                            <p><b>Área construida: </b>10 m<sup>2</sup></p>
                        </div>
                    </div>
                    <div className="watermeter-info">
                        <p>Datos del medidor</p>
                        <div>
                            <p><b>ID: </b>0000000</p>
                            <p><b>Marca: </b>Marca X</p>
                            <p><b>Porcentaje de calibración: </b>0.1%</p>
                            <p><b>Fecha de calibración: </b>01/01/2022</p>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleClickEditEnrollment} className="edit-enrollment-button">Editar</button>
        </div>
    )
}