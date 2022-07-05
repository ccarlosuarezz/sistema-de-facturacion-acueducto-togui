import { Route, Routes, Redirect } from "react-router-dom";
import MainNavBar from "../../components/MainNavBar/MainNavBar"
import Welcome from "../../components/Welcome/Welcome";
import SubscribersWindow from "../SubscribersWindow/SubscribersWindow";
import { SubscriberWindow } from "../SubscriberWindow/SubscriberWindow";
import { AddSubscriberWindow } from "../AddSubscriberWindow/AddSubscriberWindow";
import { EditSubscriberWindow } from "../EditSubscriberWindow/EditSubscriberWindow";
import { PropertiesWindow } from "../PropertiesWindow/PropertiesWindow";
import { PropertyWindow } from "../PropertyWindow/PropertyWindow";
import { AddPropertyWindow } from "../AddPropertyWindow/AddPropertyWindow";
import { EditPropertyWindow } from "../EditPropertyWindow/EditPropertyWindow";
import EnrollmentsWindow from "../EnrollmentsWindow/EnrollmentsWindow";
import { EnrollmentWindow } from "../EnrollmentWindow/EnrollmentWindow";
import { AddEnrollmentWindow } from "../AddEnrollmentWindow/AddEnrollmentWindow";
import { EditEnrollmentWindow } from "../EditEnrollmentWindow/EditEnrollmentWindow";
import InvoicingWindow from "../InvoicingWindow/InvoicingWindow"
import NotFoundWindow from "../NotFoundWindow/NotFoundWindow";
import './MainWindow.css';

const MainWindow = () => {
    return (
        <div className="main-window">
            <MainNavBar/>
            <Routes>
                <Route path="" element={<Welcome/>}/>
                <Route path="suscriptores" element={<SubscribersWindow/>}/>
                <Route path="suscriptor" element={<SubscriberWindow/>}/>
                <Route path="registrar-suscriptor" element={<AddSubscriberWindow/>}/>
                <Route path="editar-suscriptor" element={<EditSubscriberWindow/>}/>
                <Route path="predios" element={<PropertiesWindow/>}/>
                <Route path="predio" element={<PropertyWindow/>}/>
                <Route path="registrar-predio" element={<AddPropertyWindow/>}/>
                <Route path="editar-predio" element={<EditPropertyWindow/>}/>
                <Route path="matriculas" element={<EnrollmentsWindow/>}/>
                <Route path="matricula" element={<EnrollmentWindow/>}/>
                <Route path="registrar-matricula" element={<AddEnrollmentWindow/>}/>
                <Route path="editar-matricula" element={<EditEnrollmentWindow/>}/>
                <Route path="facturacion" element={<InvoicingWindow/>}/>
                <Route path="*" element={<NotFoundWindow/>} />
            </Routes>   
        </div>
    )
}

export default MainWindow