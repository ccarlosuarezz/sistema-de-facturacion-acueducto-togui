import { useNavigate } from "react-router-dom"
import subscriberIcon from "../../assets/images/subscriber.svg"
import backIcon from "../../assets/images/back.svg"
import viewIcon from "../../assets/images/view.svg"
import "./SubscriberWindow.css"

export function SubscriberWindow() {

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
            <p>Nombre1 Nombre2 Apellido1 Apellido2</p>
            <div>
                <table className="table-personal-info">
                    <tbody>
                        <tr>
                            <td>C.C</td> 
                            <td>0000000000</td>
                        </tr>
                        <tr>
                            <td>Dirección</td>
                            <td>Vereda gachanzuca</td>
                        </tr>
                        <tr>
                            <td>Fecha de nacimiento</td>
                            <td>01/01/2000</td>
                        </tr>
                        <tr>
                            <td>Telefono</td>
                            <td>0000000000</td>
                        </tr>
                        <tr>
                            <td>Correo electronico</td>
                            <td>nombre.apellido@mail.com</td>
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
                            <th>Tipo de servicio</th>
                            <th>Dirección</th>
                            <th>Nombre del predio</th>
                            <th>Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0000000001</td>
                            <td>Residencial</td>
                            <td>Vereda Manga</td>
                            <td>Predio 1</td>
                            <td><button onClick={handleClickEnrollment} className="show-enrollment"><img src={viewIcon} width={30}/></button></td>
                        </tr>
                        <tr>
                            <td>0000000002</td>
                            <td>Agroindustrial</td>
                            <td>Vereda Garibay</td>
                            <td>Predio 2</td>
                            <td><button onClick={handleClickEnrollment} className="show-enrollment"><img src={viewIcon} width={30}/></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={handleClickEditSubscriber} className="edit-button">Editar</button>
        </div>
    )
}