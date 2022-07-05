import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import subscriberIcon from "../../assets/images/subscriber.svg"
import backIcon from "../../assets/images/back.svg"
import viewIcon from "../../assets/images/view.svg"
import { getSubscriber, getSubscriberByID } from "../../services/SubscribersService"
import "./SubscriberWindow.css"

let subscriber = {};

export function SubscriberWindow() {
    useEffect(function () {
        const params = new URLSearchParams(window.location.pathname);

        console.log(params.get("idSubscriber"))
        // getSubscriberByID()
        // .then()
        // .catch()
    })
    subscriber = getSubscriber();
    // console.log({subscriber});

    const navigate =  useNavigate()

    const handleClickSubscribers = () => {
        navigate('/admin/suscriptores')
    }

    const handleClickEditSubscriber = () => {
        navigate('/admin/editar-suscriptor')
    }

    const handleClickEnrollment = () => {
        navigate('/admin/matricula')
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
                            <td>Telefono</td>
                            <td>{subscriber.telefono_suscriptor}</td>
                        </tr>
                        <tr>
                            <td>Correo electronico</td>
                            <td>{subscriber.correo_electronico_suscriptor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="table-enrollments">
                <p>Matriculas</p>
                <table>
                    <thead>
                        <tr>
                            <th>N° de matricula</th>
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
                                    <td><button onClick={handleClickEnrollment} className="show-enrollment"><img src={viewIcon} width={30}/></button></td>
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
        </div>
    )
}