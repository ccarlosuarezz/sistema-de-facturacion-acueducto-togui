import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SubscribersWindow.css"
import subscribersIcon from "../../assets/images/subscribers.svg"
import searchIcon from "../../assets/images/search.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ReactComponent as AddSubscriberIcon } from "../../assets/images/addSubscriber.svg"
import { getSubscriberByID } from "../../services/SubscribersService"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import { getDocumentType } from "../../services/DocumentTypeService"
const defaultIconsColor = "#FFFFFF"

const SubscribersWindow = () => {

    const navigate =  useNavigate()

    const [idSubscriber, setIdSubscriber] = useState("")
    const [modalNotFoundState, setModalNotFoundState] = useState("")

    const handleClickSearchSubscriber = (e) => {
        e.preventDefault();
        if(idSubscriber) {
            getSubscriberByID(idSubscriber)
            .then(res => {
                if (res) {
                    navigate('/admin/suscriptor/'+idSubscriber)
                } else {
                    setModalNotFoundState(!modalNotFoundState)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const handleClickAddSubscriber = () => {
        getDocumentType()
        .then(res => {
            if (res) {
                navigate('/admin/registrar-suscriptor')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="subscribers">
            <img src={subscribersIcon} width={100} className="subscribers-icon"/>
            <p className="subscribers-title"><b>Suscriptores</b></p>
            <div className="form-search-subscriber">
                <div className="search-subscriber">
                    <input type="number" placeholder="N° de documento del suscriptor" className="input-id-subscriber" value={idSubscriber} onChange={(e) => setIdSubscriber(e.target.value)}/>
                    <button onClick={handleClickSearchSubscriber} className="button-search">
                        <img src={searchIcon} width={30}/>
                    </button>
                </div>
                <button onClick={handleClickAddSubscriber} className="button-register-new-subscriber">
                    <AddSubscriberIcon width={30} height={30} fill={defaultIconsColor} className="add-subscriber-icon-button"/>
                    <p>Registrar suscriptor</p>
                </button>
            </div>
            <ModalActionPerformed
                img={warningIcon}
                title="Suscriptor no encontrado"
                state={modalNotFoundState}
                accept={() => setModalNotFoundState(!modalNotFoundState)}
            />
        </div>
    )
}

export default SubscribersWindow