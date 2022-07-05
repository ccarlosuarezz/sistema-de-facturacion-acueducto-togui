import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./PropertiesWindow.css"
import propertyIcon from "../../assets/images/property.svg"
import searchIcon from "../../assets/images/search.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ReactComponent as AddPropertyIcon } from "../../assets/images/addProperty.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import { getPropertyByID } from "../../services/PropertiesService"
import { getEconomicDestination } from "../../services/EconomicDestinationService"
import { getAddress } from "../../services/AddressService"
const defaultIconsColor = "#FFFFFF"

export function PropertiesWindow() {

    const navigate =  useNavigate()

    const [idProperty, setIdProperty] = useState("")
    const [modalNotFoundState, setModalNotFoundState] = useState("")

    const handleClickSearchProperty = (e) => {
        e.preventDefault();
        if(idProperty) {
            getPropertyByID(idProperty)
            .then(res => {
                if (res) {
                    navigate('/admin/predio/'+idProperty)
                } else {
                    setModalNotFoundState(!modalNotFoundState)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const handleClickAddProperty = () => {
        getEconomicDestination()
        .then(res => {
            if (res) {
                getAddress()
                .then(resAddress => {
                    if (resAddress) {
                        navigate('/admin/registrar-predio')
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

    return (
        <div className="enrollments">
            <img src={propertyIcon} height={100} className="enrollments-icon"/>
            <p className="enrollments-title"><b>Predios</b></p>
            <div className="form-search-enrollment">
                <div className="search-enrollment">
                    <input type="number" placeholder="N° de matrícula" className="input-id-enrollment" value={idProperty} onChange={(e) => setIdProperty(e.target.value)}/>
                    <button onClick={handleClickSearchProperty} className="button-search">
                        <img src={searchIcon} width={30}/>
                    </button>
                </div>
                <button onClick={handleClickAddProperty} className="button-register-enrollment">
                    <AddPropertyIcon width={30} height={30} fill={defaultIconsColor} className="add-enrollment-icon-button"/>
                    <p>Registrar predio</p>
                </button>
            </div>
            <ModalActionPerformed
                img={warningIcon}
                title="Predio no encontrado"
                state={modalNotFoundState}
                accept={() => setModalNotFoundState(!modalNotFoundState)}
            />
        </div>
    )
}