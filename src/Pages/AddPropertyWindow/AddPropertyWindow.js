import { useState } from "react";
import { useNavigate } from "react-router-dom"
import addPropertyIcon from "../../assets/images/addProperty.svg"
import backIcon from "../../assets/images/back.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import { getDepartmentList, getMunicipalityList, getSideWalkList } from "../../services/AddressService";
import { getEconomicDestinationList } from "../../services/EconomicDestinationService";
import { addProperty } from "../../services/PropertiesService";
import "./AddPropertyWindow.css"

let economicDestinationList = [];
let departmentList = []
let municipalityList = []
let sidewalkList = []

export function AddPropertyWindow() {

    economicDestinationList = getEconomicDestinationList()
    departmentList = getDepartmentList()
    municipalityList = getMunicipalityList()
    sidewalkList = getSideWalkList()
    // console.log({departmentList}, {municipalityList}, {sidewalkList})

    const navigate =  useNavigate()

    const [modalState, changeModalState] = useState(false);
    const [modalwarningState, changeModalWarningState] = useState(false);
    const [modalErrorState, changeModalErrorState] = useState(false);
    const [modalExistState, changeModalExistState] = useState(false);

    const [propertyNumberState, setPropertyNumberState] = useState("")
    const [propertyNameState, setPropertyNameState] = useState("")
    const [economicDestinationState, setEconomicDestinationState] = useState("")
    const [departmentState, setDepartmentState] = useState("")
    const [municipalityState, setMunicipalityState] = useState("")
    const [sidewalkState, setSidewalkState] = useState("")
    const [propertyAreaState, setPropertyAreaState] = useState("")
    const [builtAreaState, setBuiltAreaState] = useState("")

    const handleClickAddProperty = (e) => {
        e.preventDefault();
        if (propertyNumberState === "" ||
            propertyNameState === "" ||
            departmentState === "" ||
            municipalityState === "" ||
            sidewalkState === "" ||
            propertyAreaState === "" ||
            builtAreaState === "") {
            changeModalWarningState(!modalwarningState)
        } else {
            const newProperty = {
                id_numero_predial: propertyNumberState === "" ? null: propertyNumberState,
                numero_predial_anterior: propertyNumberState === "" ? null: propertyNumberState,
                direccion_predio: propertyNameState === "" && sidewalkState === "" ? null: propertyNameState+' '+sidewalkState.name,
                nombre_predio: propertyNameState === "" ? null: propertyNameState,
                area_predio: propertyAreaState === "" ? null: propertyAreaState,
                area_construccion_predio: builtAreaState === "" ? null: builtAreaState,
                destino_economico_predio: economicDestinationState === "" ? null: economicDestinationState,
                id_lugar: sidewalkState === "" ? null: sidewalkState.id
            };
            addProperty(newProperty)
            .then(res => {
                if (res.data.ok) {
                    changeModalState(!modalState)
                } else {
                    changeModalExistState(!modalExistState)
                }
            })
            .catch(err => {
                console.log(err)
                changeModalErrorState(!modalErrorState)
            })
        }
    }

    const handleClickProperties = () => {
        navigate('/admin/predios')
    }

    const handleClickAddSubscribers = (modalState) => {
        changeModalWarningState(!modalState)
    }

    const handleClickAddSubscribersError = () => {
        changeModalErrorState(!modalErrorState)
    }

    const handleClickAddSubscribersExist = () => {
        changeModalExistState(!modalExistState)
    }

    return (
        <div className="enrollment-property">
            <input type="image" src={backIcon} width={40} onClick={handleClickProperties} className="button-back"/>
            <img src={addPropertyIcon} height={100} className="add-enrollment-icon"/>
            <p>Nuevo predio</p>
            <div className="enrollment-property-form">
                <div>
                    <p>Número predial *</p>
                    <input type="number"
                        className="input-info-enrollment-property input-info-enrollment-property-number"
                        value={propertyNumberState}
                        onChange={(e) => setPropertyNumberState(e.target.value)}
                    />
                </div>
                <div>
                    <p>Nombre *</p>
                    <input type="text"
                        className="input-info-enrollment-property"
                        value={propertyNameState}
                        onChange={(e) => setPropertyNameState(e.target.value)}
                    />
                </div>
                <div>
                    <p>Destino económico</p>
                    <select className="input-info-enrollment-property"
                        value={economicDestinationState}
                        onChange={(e) => setEconomicDestinationState(e.target.value)}
                    >
                        <option key={""} value={""}>-</option>
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
            <div className="address-property-container">
                <p>Dirección</p>
                <div>
                    <div>
                        <p>Departamento *</p>
                        <select className="input-address-property"
                            value={departmentState}
                            onChange={(e) => setDepartmentState(e.target.value)}
                        >
                            <option key={""} value={""}>-</option>
                            {departmentList.map(department => {
                                return(
                                    <option key={department.id_lugar}
                                        value={department.nombre_lugar}>
                                        {department.nombre_lugar}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <p>Municipio *</p>
                        <select className="input-address-property"
                            value={municipalityState}
                            onChange={(e) => setMunicipalityState(e.target.value)}
                        >
                            <option key={""} value={""}>-</option>
                            {municipalityList.map(municipality => {
                                return(
                                    <option key={municipality.id_lugar}
                                        value={municipality.nombre_lugar}>
                                        {municipality.nombre_lugar}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <p>Vereda *</p>
                        <select className="input-address-property"
                            value={sidewalkState}
                            onChange={(e) => setSidewalkState(e.target.value)}
                        >
                            <option key={""} value={""}>-</option>
                            {sidewalkList.map(sidewalk => {
                                return(
                                    <option key={sidewalk.id_lugar}
                                        value={{id:sidewalk.id_lugar, name:sidewalk.nombre_lugar}}>
                                        {sidewalk.nombre_lugar}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="propery-area-container">
                <div>
                    <p>Area del predio (m<sup>2</sup>) *</p>
                    <input type="number"
                        className="input-area-property"
                        value={propertyAreaState}
                        onChange={(e) => setPropertyAreaState(e.target.value)}
                    />
                </div>
                <div>
                    <p>Area construida (m<sup>2</sup>) *</p>
                    <input type="number"
                        className="input-area-property"
                        value={builtAreaState}
                        onChange={(e) => setBuiltAreaState(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={handleClickAddProperty} className="register-enrollment-button">Registrar</button>
            <ModalActionPerformed
                img={addPropertyIcon}
                title="Predio registrado exitosamente"
                state={modalState}
                accept={handleClickProperties}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Algunos datos son obligatorios"
                state={modalwarningState}
                accept={handleClickAddSubscribers}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al agregar predio"
                state={modalErrorState}
                accept={handleClickAddSubscribersError}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="El predio ya existe"
                state={modalExistState}
                accept={handleClickAddSubscribersExist}
            />
        </div>
    )
}