import logoApp from "../../assets/images/logoApp.svg"
import "./AqueductLogo.css"

const AqueductLogo = () => {
    return (
        <div className="Aqueduct-logo">
            <div className="Aqueduct-logo-circle">
                <img src={logoApp} width={180}></img>
            </div>
            <div className="Aqueduct-name">
                <p><b>Asociación de Suscriptores del Acueducto de las Veredas <br></br> Garibay, Manga y Gachanzuca <br></br> del Municipio de Togüí (Boyacá) </b></p>
            </div>
        </div>
    )
}

export default AqueductLogo