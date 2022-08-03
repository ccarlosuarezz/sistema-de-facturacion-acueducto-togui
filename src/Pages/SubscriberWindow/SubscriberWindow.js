import { useNavigate } from "react-router-dom"
import subscriberIcon from "../../assets/images/subscriber.svg"
import backIcon from "../../assets/images/back.svg"
import viewIcon from "../../assets/images/view.svg"
import warningIcon from "../../assets/images/warning.svg"
import { getSubscriber } from "../../services/SubscribersService"
import "./SubscriberWindow.css"
import { getEnrollmentByID } from "../../services/EnrollmentsService"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import { useState } from "react"

let subscriber = {};

export function SubscriberWindow() {
    
    subscriber = getSubscriber();
    
    const [modalNotFoundState, setModalNotFoundState] = useState("")

    const navigate =  useNavigate()

    const handleClickSubscribers = () => {
        navigate('/admin/suscriptores')
    }

    const handleClickEditSubscriber = () => {
        navigate('/admin/editar-suscriptor/'+subscriber.id_suscriptor)
    }

    const handleClickEnrollment = (idEnrollment) => {
        if (idEnrollment) {
            getEnrollmentByID(idEnrollment)
            .then(res => {
                if (res) {
                    navigate('/admin/matricula/'+idEnrollment)
                } else {
                    setModalNotFoundState(!modalNotFoundState)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div className="subscriber">
            <input type="image" src={backIcon} width={40} onClick={handleClickSubscribers} className="button-back"/>
            <img src={subscriberIcon} width={100} className="subscriber-icon"/>
            <p>
                {`${(subscriber.primer_nombre_suscriptor || 'Nombre')}
                ${(subscriber.segundo_nombre_suscriptor !== null ? subscriber.segundo_nombre_suscriptor: '') || ''}
                ${subscriber.primer_apellido_suscriptor || ''}
                ${(subscriber.segundo_apellido_suscriptor !== null ? subscriber.segundo_apellido_suscriptor: '') || ''  }`}
            </p>
            <div>
                <table className="table-personal-info">
                    <tbody>
                        <tr>
                            <td>{subscriber.abreviatura_tipo_de_documento || 'Documento'}</td> 
                            <td>{subscriber.id_suscriptor}</td>
                        </tr>
                        <tr>
                            <td>Dirección</td>
                            <td>{subscriber.direccion_suscriptor}</td>
                        </tr>
                        <tr>
                            <td>Fecha de nacimiento</td>
                            <td>{subscriber.fecha_nacimiento_suscriptor}</td>
                        </tr>
                        <tr>
                            <td>Teléfono</td>
                            <td>{subscriber.telefono_suscriptor}</td>
                        </tr>
                        <tr>
                            <td>Correo electrónico</td>
                            <td>{subscriber.correo_electronico_suscriptor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="table-enrollments">
                <p>Matrículas</p>
                <table>
                    <thead>
                        <tr>
                            <th>N° de matrícula</th>
                            <th>Estado</th>
                            <th>Tipo de servicio</th>
                            <th>Nombre del predio</th>
                            <th>Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriber.enrollments ? subscriber.enrollments.map((enrollment) => {
                            return (
                                <tr key={enrollment.id_matricula}>
                                    <td>{enrollment.id_matricula}</td>
                                    <td>{enrollment.estado_matricula}</td>
                                    <td>{enrollment.nombre_servicio}</td>
                                    <td>{enrollment.nombre_predio}</td>
                                    <td>
                                        <button
                                        onClick={() => handleClickEnrollment(enrollment.id_matricula)}
                                        className="show-subscriber-enrollment">
                                            <img src={viewIcon} height={30}/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }):
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <button onClick={handleClickEditSubscriber} className="edit-button">Editar</button>
            <ModalActionPerformed
                img={warningIcon}
                title="Matricula no encontrada"
                state={modalNotFoundState}
                accept={() => setModalNotFoundState(!modalNotFoundState)}
            />
        </div>
    )
}