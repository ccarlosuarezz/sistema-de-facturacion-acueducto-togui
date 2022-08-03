import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./EnrollmentsWindow.css"
import enrollmentsIcon from "../../assets/images/enrollment.svg"
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ReactComponent as AddEnrollmentIcon } from "../../assets/images/addEnrollment.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed"
import { getEnrollmentByID } from "../../services/EnrollmentsService"
import { getServiceTypes } from "../../services/ServiceTypeService"
import { getFinancingTypes } from "../../services/FinancingService"
const defaultIconsColor = "#FFFFFF"

const EnrollmentsWindow = () => {

    const navigate =  useNavigate()

    const [idEnrollment, setIdEnrollment] = useState("")
    const [modalNotFoundState, setModalNotFoundState] = useState("")

    const handleClickSearchEnrollment = (e) => {
        e.preventDefault();
        if (idEnrollment) {
            getEnrollmentByID(idEnrollment)
            .then(res => {
                if (res) {
                    navigate('/admin/matricula/'+idEnrollment)
                } else {
                    setModalNotFoundState(!modalNotFoundState)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const handleClickAddEnrollment = () => {
        getServiceTypes()
        .then(res => {
            if (res) {
                getFinancingTypes()
                .then(res => {
                    if (res) {
                        navigate('/admin/registrar-matricula')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="enrollments">
            <img src={enrollmentsIcon} width={100} className="enrollments-icon"/>
            <p className="enrollments-title"><b>Matrículas</b></p>
            <div className="form-search-enrollment">
                <div className="search-enrollment">
                    <input
                        type="number"
                        placeholder="N° de matrícula"
                        className="input-id-enrollment"
                        value={idEnrollment} onChange={(e) => setIdEnrollment(e.target.value)}
                    />
                    <button onClick={handleClickSearchEnrollment} className="button-search-enrollments">
                        <SearchIcon width={30} height={30} fill={defaultIconsColor}/>
                    </button>
                </div>
                <button onClick={handleClickAddEnrollment} className="button-register-enrollment">
                    <AddEnrollmentIcon width={30} height={30} fill={defaultIconsColor} className="add-enrollment-icon-button"/>
                    <p>Registrar matrícula</p>
                </button>
            </div>
            <ModalActionPerformed
                img={warningIcon}
                title="Matricula no encontrada"
                state={modalNotFoundState}
                accept={() => setModalNotFoundState(!modalNotFoundState)}
            />
        </div>
    )
}

export default EnrollmentsWindow