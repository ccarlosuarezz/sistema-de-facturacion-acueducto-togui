import { Routes, Route } from "react-router-dom";
import LoginWindow from "../Pages/LoginWindow/LoginWindow";
import MainWindow from "../Pages/MainWindow/MainWindow";
import NotFoundWindow from "../Pages/NotFoundWindow/NotFoundWindow";

export const Navigation = () => {
    return (
        <Routes>
          <Route path="/" element={<LoginWindow/>} />
          <Route path="/admin/*" element={<MainWindow/>} />
          <Route path="/*" element={<NotFoundWindow/>} />
        </Routes>
    )
}