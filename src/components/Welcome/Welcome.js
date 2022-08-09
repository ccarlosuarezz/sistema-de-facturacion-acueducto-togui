import logoApp from "../../assets/images/logoApp.svg"
import "./Welcome.css"

const Welcome = () => {
    return (
        <div className="welcome-panel">
            <p className="welcome"><b>Bienvenido</b></p>
            <img src={logoApp} width={180}></img>
            <p className="aqueduct-name"><b>Sistema de facturación<br></br>Asociación de Suscriptores del Acueducto de las Veredas<br></br>Garibay, Manga y Gachanzuca<br></br>del Municipio de Togüí (Boyacá)</b></p>
        </div>
    )
}

export default Welcome