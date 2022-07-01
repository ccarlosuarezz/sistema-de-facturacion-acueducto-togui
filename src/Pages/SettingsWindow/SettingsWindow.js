import { Route, Routes } from "react-router-dom";
import SettingsNavBar from "../../components/SettingsNavBar/SettingsNavBar";
import ChangePasswordWindow from "../ChangePasswordWindow/ChangePasswordWindow";
import NotFoundWindow from "../NotFoundWindow/NotFoundWindow"
import PersonalDataWindow from "../PersonalDataWindow/PersonalDataWindow";
import "./SettingsWindow.css"

export default function SettingsWindow() {
    return (
        <div className="settings-window">
            <SettingsNavBar/>
            <Routes>
                <Route path="datos-personales" element={<PersonalDataWindow/>}/>
                <Route path="contrasena" element={<ChangePasswordWindow/>}/>
                <Route path="*" element={<NotFoundWindow/>}/>
            </Routes>
        </div>
    )
}