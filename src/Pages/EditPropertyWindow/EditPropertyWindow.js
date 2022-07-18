import { useState } from "react";
import { useNavigate } from "react-router-dom"
import backIcon from "../../assets/images/back.svg"
import editPropertyIcon from "../../assets/images/editProperty.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import { getEconomicDestinationList } from "../../services/EconomicDestinationService";
import { editProperty, getProperty, getPropertyByID } from "../../services/PropertiesService";
import "./EditPropertyWindow.css"

let property = {};
let economicDestinationList = [];

export function EditPropertyWindow() {

    property = getProperty()
    economicDestinationList = getEconomicDestinationList()

    const [modalState, changeModalState] = useState(false);
    const [modalWarningState, changeModalWarningState] = useState(false);
    const [modalErrorState, changeModalErrorState] = useState(false);

    const [propertyNameState, setPropertyNameState] = useState(property.nombre_predio)
    const [economicDestinationState, setEconomicDestinationState] = useState(property.destino_economico_predio)
    const [propertyAreaState, setPropertyAreaState] = useState(property.area_predio)
    const [builtAreaState, setBuiltAreaState] = useState(property.area_construccion)

    const navigate =  useNavigate()

    const handleClickProperty = () => {
        navigate('/admin/predio/'+property.id_numero_predial)
    }

    const handleClickPropertySuccesfull = () => {
        changeModalState(!modalState)
        getPropertyByID(property.id_numero_predial)
        .then(res => {
            if (res) {
                navigate('/admin/predio/'+property.id_numero_predial)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleClickEditProperty = (e) => {
        e.preventDefault()
        if (propertyNameState === "" ||
            propertyAreaState === "" ||
            builtAreaState === "") {
                changeModalWarningState(!modalWarningState)
        } else {
            const propertyEdited = {
                id_numero_predial: property.id_numero_predial,
                nombre_predio: propertyNameState,
                destino_economico_predio: economicDestinationState,
                area_predio: propertyAreaState,
                area_construccion: builtAreaState
            }
            editProperty(propertyEdited)
            .then(res => {
                if (res.data.ok) {
                    changeModalState(!modalState)
                }
            })
            .catch(err => {
                console.log(err)
                changeModalErrorState(!modalErrorState)
            })
        }
    }

    return (
        <div className="edit-enrollment-property-window">
            <input type="image" src={backIcon} width={40} onClick={handleClickProperty} className="button-back"/>
            <img src={editPropertyIcon} height={100} className="edit-enrollment-icon"/>
            <p>Editar predio</p>
            <div className="enrollment-property-form">
                <div>
                    <p>Nombre *</p>
                    <input
                        type="text"
                        className="input-info-enrollment-property"
                        value={propertyNameState}
                        onChange={(e) => setPropertyNameState(e.target.value)}
                    />
                </div>
                <div>
                    <p>Destino económico *</p>
                    <select
                        className="input-info-enrollment-property"
                        value={economicDestinationState}
                        onChange={(e) => setEconomicDestinationState(e.target.value)}
                    >
                        {economicDestinationList.map(economicDestination => {
                            return(
                                <option key={economicDestination}
                                    value={economicDestination}>
                                    {economicDestination}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="propery-area-container">
                <div>
                    <p>Area del predio (m<sup>2</sup>) *</p>
                    <input
                        type="number"
                        className="input-area-property"
                        value={propertyAreaState}
                        onChange={(e) => setPropertyAreaState(e.target.value)}
                    />
                </div>
                <div>
                    <p>Area construida (m<sup>2</sup>) *</p>
                    <input
                        type="number"
                        className="input-area-property"
                        value={builtAreaState}
                        onChange={(e) => setBuiltAreaState(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={handleClickEditProperty} className="save-edit-enrollment-property-changes">Guardar cambios</button>
            <ModalActionPerformed
                img={editPropertyIcon}
                title="Predio editado exitosamente"
                state={modalState}
                accept={handleClickPropertySuccesfull}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Algunos datos son obligatorios"
                state={modalWarningState}
                accept={() => changeModalWarningState(!modalWarningState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al editar predio"
                state={modalErrorState}
                accept={() => changeModalErrorState(!modalErrorState)}
            />
        </div>
    )
}