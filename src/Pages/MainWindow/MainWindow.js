import { Route, Routes } from "react-router-dom";
import MainNavBar from "../../components/MainNavBar/MainNavBar"
import Welcome from "../../components/Welcome/Welcome";
import SubscribersWindow from "../SubscribersWindow/SubscribersWindow";
import { SubscriberWindow } from "../SubscriberWindow/SubscriberWindow";
import { AddSubscriberWindow } from "../AddSubscriberWindow/AddSubscriberWindow";
import { EditSubscriberWindow } from "../EditSubscriberWindow/EditSubscriberWindow";
import EnrollmentsWindow from "../EnrollmentsWindow/EnrollmentsWindow";
import { EnrollmentWindow } from "../EnrollmentWindow/EnrollmentWindow";
import { AddEnrollmentWindow } from "../AddEnrollmentWindow/AddEnrollmentWindow";
import { AddEnrollmentPropertyWindow } from "../AddEnrollmentPropertyWindow/AddEnrollmentPropertyWindow";
import { EditEnrollmentWindow } from "../EditEnrollmentWindow/EditEnrollmentWindow";
import { EditEnrollmentPropertyWindow } from "../EditEnrollmentPropertyWindow/EditEnrollmentPropertyWindow";
import InvoicingWindow from "../InvoicingWindow/InvoicingWindow"
import NotFoundWindow from "../NotFoundWindow/NotFoundWindow";
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
                <Route path="editar-suscriptor" element={<EditSubscriberWindow/>}/>
                <Route path="matriculas" element={<EnrollmentsWindow/>}/>
                <Route path="matricula" element={<EnrollmentWindow/>}/>
                <Route path="registrar-matricula" element={<AddEnrollmentWindow/>}/>
                <Route path="registrar-propiedad-matricula" element={<AddEnrollmentPropertyWindow/>}/>
                <Route path="editar-matricula" element={<EditEnrollmentWindow/>}/>
                <Route path="editar-propiedad-matricula" element={<EditEnrollmentPropertyWindow/>}/>
                <Route path="facturacion" element={<InvoicingWindow/>}/>
                <Route path="*" element={<NotFoundWindow/>} />
            </Routes>   
        </div>
    )
}

export default MainWindow