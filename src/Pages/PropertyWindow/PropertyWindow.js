import { useNavigate } from "react-router-dom"
import propertyIcon from "../../assets/images/property.svg"
import backIcon from "../../assets/images/back.svg"
import viewIcon from "../../assets/images/view.svg"
import "./PropertyWindow.css"
import { getProperty } from "../../services/PropertiesService"
import { getEconomicDestination } from "../../services/EconomicDestinationService"
import { getAddress } from "../../services/AddressService"

let property = {};

export function PropertyWindow() {

    property = getProperty()

    const navigate =  useNavigate()

    const handleClickProperties = () => {
        navigate('/admin/predios')
    }

    const handleClickEditProperty = () => {
        getEconomicDestination()
        .then(res => {
            if (res) {
                getAddress()
                .then(resAddress => {
                    if (resAddress) {
                        navigate('/admin/editar-predio/'+property.id_numero_predial)
                    }
                })
                .catch(errAddress => {
                    console.log(errAddress)
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleClickEnrollment = (idEnrollment) => {
        navigate('/admin/matricula/'+idEnrollment)
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
                            <td>N° predial</td> 
                            <td>{property.numero_predial_anterior}</td>
                        </tr>
                        <tr>
                            <td>Nombre</td>
                            <td>{property.nombre_predio}</td>
                        </tr>
                        <tr>
                            <td>Destino económico</td>
                            <td>{property.destino_economico_predio}</td>
                        </tr>
                        <tr>
                            <td>Dirección</td>
                            <td>{property.direccion_predio ? property.direccion_predio.direccion: ''}</td>
                        </tr>
                        <tr>
                            <td>Area del predio</td>
                            <td>{property.area_predio} m<sup>2</sup></td>
                        </tr>
                        <tr>
                            <td>Area construida</td>
                            <td>{property.area_construccion} m<sup>2</sup></td>
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
                        {property.matriculas ? property.matriculas.map((enrollment) => {
                            return (
                                <tr key={enrollment.id_matricula}>
                                    <td>{enrollment.id_matricula}</td>
                                    <td>{enrollment.estado_matricula}</td>
                                    <td>{enrollment.nombre_servicio}</td>
                                    <td>{enrollment.nombre_predio}</td>
                                    <td><button onClick={handleClickEnrollment(enrollment.id_matricula)} className="show-enrollment"><img src={viewIcon} width={30}/></button></td>
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
            <button onClick={handleClickEditProperty} className="edit-property-button">Editar</button>
        </div>
    )
}