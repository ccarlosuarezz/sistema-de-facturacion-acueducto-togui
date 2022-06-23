import { Route, Routes } from "react-router-dom";
import MainNavBar from "../../components/MainNavBar/MainNavBar"
import Welcome from "../../components/Welcome/Welcome";
import SubscribersWindow from "../SubscribersWindow/SubscribersWindow";
import { AddSubscriberWindow } from "../AddSubscriberWindow/AddSubscriberWindow";
import EnrollmentsWindow from "../EnrollmentsWindow/EnrollmentsWindow";
import InvoicingWindow from "../InvoicingWindow/InvoicingWindow"
import NotFoundWindow from "../NotFoundWindow/NotFoundWindow";
import { SubscriberWindow } from "../SubscriberWindow/SubscriberWindow";
import './MainWindow.css';

const MainWindow = () => {
    return (
        <div className="main-window">
            <MainNavBar/>
            <Routes>
                <Route path="" element={<Welcome/>} />
                <Route path="suscriptores" element={<SubscribersWindow/>}/>
                <Route path="suscriptor" element={<SubscriberWindow/>}/>
                <Route path="registrar-suscriptor" element={<AddSubscriberWindow/>}/>
                <Route path="matriculas" element={<EnrollmentsWindow/>}/>
                <Route path="matricula" element={<NotFoundWindow/>}/>
                <Route path="registrar-matricula" element={<NotFoundWindow/>}/>
                <Route path="facturacion" element={<InvoicingWindow/>}/>
                <Route path="*" element={<NotFoundWindow/>} />
            </Routes>   
        </div>
    )
}

export default MainWindow