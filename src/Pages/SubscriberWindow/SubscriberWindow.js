import { useNavigate } from "react-router-dom"
import subscriberIcon from "../../assets/images/subscriber.svg"
import viewIcon from "../../assets/images/view.svg"
import backIcon from "../../assets/images/back.svg"
import "./SubscriberWindow.css"

export function SubscriberWindow() {

    const navigate =  useNavigate()

    const handleClickSubscribers = () => {
        navigate('/admin/suscriptores')
    }

    const handleClickEditSubscriber = () => {
        navigate('/admin/editar-suscriptor')
    }

    return (
        <div className="subscriber">
            <input type="image" src={backIcon} width={40} onClick={handleClickSubscribers} className="button-back"/>
            <img src={subscriberIcon} width={100} className="subscriber-icon"/>
            <p>Nombre1 Nombre2 Apellido1 Apellido2</p>
            <div className="personal-data-container">
                <div className="personal-data">
                    <p><b>C.C: </b>0000000000</p>
                    <p><b>Dirección: </b>Vereda Gachanzuca</p>
                </div>
                <div className="personal-data">
                    <p><b>Fecha de nacimiento: </b>01/01/2000</p>
                    <p><b>Telefono: </b>000 000 0000</p>
                </div>
                <div className="personal-data">
                    <p><b>Correo electronico: </b>nombre.apellido@mail.com</p>
                </div>
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
                            <td className="td-show-enrollment"><button className="show-enrollment"><img src={viewIcon} width={30}/></button></td>
                        </tr>
                        <tr>
                            <td>0000000002</td>
                            <td>Agroindustrial</td>
                            <td>Vereda Garibay</td>
                            <td>Predio 2</td>
                            <td className="td-show-enrollment"><button className="show-enrollment"><img src={viewIcon} width={30}/></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={handleClickEditSubscriber} className="edit-button">Editar</button>
        </div>
    )
}