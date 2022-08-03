import { useState } from "react"
import styled from "styled-components"
import enrollmentsIcon from "../../assets/images/enrollment.svg"
import closeIcon from "../../assets/images/close.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg"
import "./ModalSearchEnrollment.css"
import { getEnrollmentsBySimilarId } from "../../services/EnrollmentsService"
import { ModalActionPerformed } from "../ModalActionPerformed/ModalActionPerformed"
const defaultIconsColor = "#FFFFFF"

let enrollmentListFound = []

export function ModalSearchEnrollment({state, closeFunction, selectEnrollmentFunction}) {

    const [numberEnrollmentState, setNumberEnrollmentState] = useState("");
    const [modalErrorState, changeModalErrorState] = useState(false);
    const [enrollmentListFoundState, setEnrollmentListFoundState] = useState(enrollmentListFound);

    const handleClickSearchEnrollment = () => {
        getEnrollmentsBySimilarId(numberEnrollmentState)
        .then(res => {
            enrollmentListFound = res
            setEnrollmentListFoundState(enrollmentListFound)
        })
        .catch(err => {
            changeModalErrorState(!modalErrorState)
            console.log(err)
        })
    }

    const handleClickSelectEnrollment = (idEnrollment, subscriber) => {
        enrollmentListFound = []
        selectEnrollmentFunction({id_enrollment: idEnrollment, subscriber: subscriber})
        setEnrollmentListFoundState(enrollmentListFound)
        setNumberEnrollmentState("")
        closeFunction()
    }

    return (
        <>
            {state &&
                <Overlay>
                    <ModalContainer>
                    <input
                        type="image"
                        src={closeIcon}
                        width={30}
                        onClick={() => {closeFunction();  enrollmentListFound = []; setEnrollmentListFoundState(enrollmentListFound); setNumberEnrollmentState("")}}
                        className="button-back"
                    />
                        <img src={enrollmentsIcon} height={100}/>
                        <p className="search-enrollment-title">Buscar Matricula</p>
                        <div className="search-bar">
                            <input
                                type='number'
                                placeholder="N° de matrícula"
                                value={numberEnrollmentState}
                                onChange={(e) => setNumberEnrollmentState(e.target.value)}
                            />
                            <button onClick={handleClickSearchEnrollment} className="button-search-enrollment-for-add-penalty">
                                <SearchIcon width={25} height={25} fill={defaultIconsColor}/>
                            </button>
                        </div>
                        <table className="table-enrollments-found">
                            <thead>
                                <tr>
                                    <th>Matricula</th>
                                    <th className="row-subscriber-found">Suscriptor</th>
                                    <th className="row-select-enrollment-found"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollmentListFoundState.length > 0 ? enrollmentListFoundState.map(enrollment => {
                                    return (
                                        <tr key={enrollment.id_matricula}>
                                            <td>{enrollment.id_matricula}</td>
                                            <td>{enrollment.nameSubscriber}</td>
                                            <td>
                                                <button
                                                    className="button-select-enrollment"
                                                    onClick={() => {handleClickSelectEnrollment(enrollment.id_matricula, enrollment.nameSubscriber)}}>
                                                    Seleccionar
                                                </button>
                                            </td>
                                        </tr>
                                    )})
                                    :
                                    <tr>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        <ModalActionPerformed
                            img={warningIcon}
                            title="Error al buscar matrícula"
                            state={modalErrorState}
                            accept={() => changeModalErrorState(!modalErrorState)}
                        />
                    </ModalContainer>
                </Overlay>
            }
        </>
    )
}

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center
`;

const ModalContainer = styled.div`
    background: #ffffff;
    position: relative;
    border-radius: 10px;
    padding-inline: 40px;
    padding-block: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
`;