import { useNavigate } from "react-router-dom"
import "./SubscribersWindow.css"
import subscribersIcon from "../../assets/images/subscribers.svg"
import searchIcon from "../../assets/images/search.svg"
import { ReactComponent as AddSubscriberIcon } from "../../assets/images/addSubscriber.svg"
const defaultIconsColor = "#FFFFFF"

const SubscribersWindow = () => {

    const navigate =  useNavigate()

    const handleClickSearchSubscriber = () => {
        navigate('/admin/suscriptor')
    }

    const handleClickAddSubscriber = () => {
        navigate('/admin/registrar-suscriptor')
    }

    return (
        <div className="subscribers">
            <img src={subscribersIcon} width={100} className="subscribers-icon"/>
            <p className="subscribers-title"><b>Suscriptores</b></p>
            <div className="form-search-subscriber">
                <div className="search-subscriber">
                    <input type="number" placeholder="N° de documento del suscriptor" className="input-id-subscriber"></input>
                    <button onClick={handleClickSearchSubscriber} className="button-search">
                        <img src={searchIcon} width={30}/>
                    </button>
                </div>
                <button onClick={handleClickAddSubscriber} className="button-register-new-subscriber">
                    <AddSubscriberIcon width={30} height={30} fill={defaultIconsColor} className="add-subscriber-icon-button"/>
                    <p>Registrar suscriptor</p>
                </button>
            </div>
        </div>
    )
}

export default SubscribersWindow