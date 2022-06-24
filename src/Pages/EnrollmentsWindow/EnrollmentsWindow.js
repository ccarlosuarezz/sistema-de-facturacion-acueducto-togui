import { useNavigate } from "react-router-dom"
import "./EnrollmentsWindow.css"
import enrollmentsIcon from "../../assets/images/enrollment.svg"
import searchIcon from "../../assets/images/search.svg"
import { ReactComponent as AddEnrollmentIcon } from "../../assets/images/addEnrollment.svg"
const defaultIconsColor = "#FFFFFF"

const EnrollmentsWindow = () => {

    const navigate =  useNavigate()

    const handleClickSearchEnrollment = () => {
        navigate('/admin/matricula')
    }

    const handleClickAddEnrollment = () => {
        navigate('/admin/registrar-matricula')
    }

    return (
        <div className="enrollments">
            <img src={enrollmentsIcon} width={100} className="enrollments-icon"/>
            <p className="enrollments-title"><b>Matrículas</b></p>
            <div className="form-search-enrollment">
                <div className="search-enrollment">
                    <input type="number" placeholder="N° de matrícula" className="input-id-enrollment"></input>
                    <button onClick={handleClickSearchEnrollment} className="button-search">
                        <img src={searchIcon} width={30}/>
                    </button>
                </div>
                <button onClick={handleClickAddEnrollment} className="button-register-enrollment">
                    <AddEnrollmentIcon width={30} height={30} fill={defaultIconsColor} className="add-enrollment-icon-button"/>
                    <p>Registrar matrícula</p>
                </button>
            </div>
        </div>
    )
}

export default EnrollmentsWindow