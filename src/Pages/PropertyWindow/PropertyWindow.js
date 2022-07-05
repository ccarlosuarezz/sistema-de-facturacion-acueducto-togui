import { useNavigate } from "react-router-dom"
import propertyIcon from "../../assets/images/property.svg"
import backIcon from "../../assets/images/back.svg"
import viewIcon from "../../assets/images/view.svg"
import "./PropertyWindow.css"

export function PropertyWindow() {

    const navigate =  useNavigate()

    const handleClickProperties = () => {
        navigate('/admin/predios')
    }

    const handleClickEditProperty = () => {
        navigate('/admin/editar-predio')
    }

    const handleClickEnrollment = () => {
        navigate('/admin/matricula')
    }

    return (
        <div className="property">
            <input type="image" src={backIcon} width={40} onClick={handleClickProperties} className="button-back"/>
            <img src={propertyIcon} height={100} className="property-icon"/>
            <p>Predio</p>
            <div>
                <table className="table-property-info">
                    <tbody>
                        <tr>
                            <td>N° predial anterior</td> 
                            <td>00000000000000000000</td>
                        </tr>
                        <tr>
                            <td>Nombre</td>
                            <td>Nombre del predio</td>
                        </tr>
                        <tr>
                            <td>Destino económico</td>
                            <td>Residencial</td>
                        </tr>
                        <tr>
                            <td>Dirección</td>
                            <td>Boyacá, Togüí, Vereda Gachanzuca</td>
                        </tr>
                        <tr>
                            <td>Area del predio</td>
                            <td>50 m<sup>2</sup></td>
                        </tr>
                        <tr>
                            <td>Area construida</td>
                            <td>10 m<sup>2</sup></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="table-enrollments-property">
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
                        <tr>
                            <td>0000000002</td>
                            <td>Agroindustrial</td>
                            <td>Vereda Garibay</td>
                            <td>Predio 2</td>
                            <td className="td-show-enrollment"><button onClick={handleClickEnrollment} className="show-enrollment"><img src={viewIcon} width={30}/></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={handleClickEditProperty} className="edit-property-button">Editar</button>
        </div>
    )
}