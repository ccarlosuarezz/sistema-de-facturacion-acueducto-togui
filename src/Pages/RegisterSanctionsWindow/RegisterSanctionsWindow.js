import { useState } from "react";
import { useNavigate } from "react-router-dom"
import penaltyIcon from "../../assets/images/penalty.svg"
import warningIcon from "../../assets/images/warning.svg"
import viewIcon from "../../assets/images/view.svg"
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed";
import { ModalSearchEnrollment } from "../../components/ModalSearchEnrollment/ModalSearchEnrollment";
import { createNewBillingPeriod, getDateActualInvoicePeriod, getInvoiceLastPeriod, getInvoiceList } from "../../services/InvoiceService";
import { getPayment, getPaymentList, getPaymentTypesList, registerCharges } from "../../services/PaymentsService";
import "./RegisterSanctionsWindow.css"
const defaultIconsColor = "#FFFFFF"

let actualInvoicePeriod = ""
let chargeTypes = []
let chargeList = []
let quantityList = [1, 2, 3, 4, 5]

export function RegisterSanctionsWindow () {

    actualInvoicePeriod = getDateActualInvoicePeriod()
    chargeTypes = getPaymentTypesList()
    chargeList = getPaymentList()
    
    const [modalSearchEnrollmentState, setModalSearchEnrollmentState] = useState(false)

    const [enrollmentState, setEnrollmentState] = useState('-');
    const [chargeTypesState, setChargeTypesState] = useState(chargeTypes[0] ? chargeTypes[0].tipo_cobro: '')
    const [chargeListState, setChargeListState] = useState(chargeList.length > 0 ? chargeList: [])
    const [chargeState, setChargeState] = useState(chargeListState.length > 0 ? chargeListState[0]: '')
    const [quantityState, setQuantityState] = useState(quantityList[0])
    const [observationsState, setObservationsState] = useState('')
    const [totalState, setTotalState] = useState(chargeState ? quantityState * chargeState.valor_cobro : 0)

    const [penaltyListState, setPenaltyListState] = useState([])

    const [modalErrorState, changeModalErrorState] = useState(false)
    const [modalAddErrorState, changeModalAddErrorState] = useState(false)
    const [modalChargesErrorState, changeModalChargesErrorState] = useState(false)
    const [modalErrorGenerateInvoivesState, changeModalErrorGenerateInvoivesState] = useState(false)
    const [modalErrorGenerateBillingPeriodState, changeModalErrorGenerateBillingPeriodState] = useState(false)
    const [modalErrorInvoicesPeriodState, changeModalErrorInvoicesPeriodState] = useState(false)

    const navigate =  useNavigate()

    const handleClickSelectChargeType = (value) => {
        setChargeTypesState(value)
        getPayment(value)
        .then(res => {
            chargeList = res
            setChargeListState(chargeList)
            setChargeState(chargeList[0])
            setTotalState(quantityState * chargeList[0].valor_cobro)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleClickSetQuantity = (value) => {
        setQuantityState(value)
        let jsonChargeState = chargeState
        if (typeof chargeState === 'string') jsonChargeState = JSON.parse(chargeState)
        setTotalState(value * jsonChargeState.valor_cobro)
    }

    const handleClickCharge = (value) => {
        let jsonValue = JSON.parse(value)
        setChargeState(value)
        setTotalState(quantityState * jsonValue.valor_cobro)
    }

    const handleClickAddPenalty = () => {
        if (enrollmentState !== '-' && chargeTypesState !== '' && chargeState !== '') {
            const newPenalty = {
                id_enrollment: enrollmentState.id_enrollment,
                subscriber: enrollmentState.subscriber,
                id_charge: chargeState.id_cobro,
                quantity: quantityState,
                total_value: totalState,
                observations: observationsState
            }
            setPenaltyListState(newPenaltyList => [...newPenaltyList, newPenalty])
        } else {
            changeModalAddErrorState(!modalAddErrorState)
        }
    }

    const handleClickGenerateInvoices = () => {
        const chargeList = {
            charge_list: penaltyListState
        }
        registerCharges(chargeList)
        .then(res => {
            if (res.data.ok) {
                createNewBillingPeriod()
                .then(() => {
                    getInvoiceList()
                    .then(res => {
                        if (res) {
                            getInvoiceLastPeriod()
                            .then(res => {
                                if (res) {
                                    setPenaltyListState([])
                                    setEnrollmentState('-')
                                    navigate('/admin/facturas-generadas')
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                changeModalErrorInvoicesPeriodState(!modalErrorInvoicesPeriodState)
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        changeModalErrorGenerateInvoivesState(!modalErrorGenerateInvoivesState)
                    })
                })
                .catch(err => {
                    console.log(err)
                    changeModalErrorGenerateBillingPeriodState(!modalErrorGenerateBillingPeriodState)
                })
            }
        })
        .catch(err => {
            console.log(err)
            changeModalChargesErrorState(!modalChargesErrorState)
        })
    }

    return (
        <div className="register-penalties">
            <img src={penaltyIcon} width={100} className="penalty-icon"/>
            <p className="check-charge-title"><b>Periodo actual de facturación: {actualInvoicePeriod}</b></p>
            <p className="penalty-title"><b>Registrar sanciones y cobros</b></p>
            <div className="register-new-penalties">
                <div className="penalty-inputs">
                    <div className="enrollment-and-type-payment">
                        <div>
                            <p>Número de matricula</p>
                            <div className="enrollment-penalty">
                                <p className="enrollment-number-payment">{enrollmentState.id_enrollment ? enrollmentState.id_enrollment: '-'}</p>
                                <button onClick={() => setModalSearchEnrollmentState(!modalSearchEnrollmentState)} className="button-search">
                                    <SearchIcon width={30} height={30} fill={defaultIconsColor}/>
                                </button>
                            </div>
                        </div>
                        <div>
                            <p>Tipo de cobro</p>
                            <select
                                className="select-payments type-payment"
                                value={chargeTypesState}
                                onChange={(e) => {handleClickSelectChargeType(e.target.value)}}
                            >
                                {chargeTypes.map(chargeType => {
                                    return(
                                        <option key={chargeType.tipo_cobro}
                                            value={chargeType.tipo_cobro}>
                                            {chargeType.tipo_cobro}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="payment-and-quantity">
                        <div>
                            <p>Cobro</p>
                            <select
                                className="select-payments payment"
                                value={chargeState}
                                onChange={(e) => handleClickCharge(e.target.value)}
                            >
                                {chargeList.map(charge => {
                                    return(
                                        <option key={charge.id_cobro}
                                            value={JSON.stringify(charge)}>
                                            {charge.concepto_cobro}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <p>Cantidad</p>
                            <select className="select-payments quantity"
                                value={quantityState}
                                onChange={(e) => {handleClickSetQuantity(e.target.value)}}
                            >
                                {quantityList.map(quantity => {
                                    return (
                                        <option key={quantity}
                                            value={quantity}>
                                            {quantity}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Observaciones</p>
                        <textarea value={observationsState} onChange={(e) => {setObservationsState(e.target.value)}} className="observations"/>
                    </div>
                    <div>
                        <p><b>Total</b></p>
                        <p>$ {totalState}</p>
                    </div>
                    <button
                    className="penalty-buttons"
                    onClick={() => handleClickAddPenalty()}>
                        Agregar
                    </button>
                </div>
                <div className="table-penalties">
                    <table>
                        <thead>
                            <tr>
                                <th>Matricula</th>
                                <th className="row-subscriber">Suscriptor</th>
                                <th>Valor</th>
                                <th>Ver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {penaltyListState.length > 0 ? penaltyListState.map(penalty => {
                                    return (
                                        <tr key={penalty.id_enrollment}>
                                            <td>{penalty.id_enrollment}</td>
                                            <td>{penalty.subscriber}</td>
                                            <td>{penalty.total_value}</td>
                                            <td>
                                                <button
                                                className="show-penalty-details">
                                                    <img src={viewIcon} width={30}/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    <button onClick={handleClickGenerateInvoices} className="penalty-buttons">Generar facturas</button>
                </div>
            </div>
            <ModalSearchEnrollment
                state={modalSearchEnrollmentState}
                closeFunction={() => setModalSearchEnrollmentState(!modalSearchEnrollmentState)}
                selectEnrollmentFunction={(enrollment) => setEnrollmentState(enrollment)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Aún no se puede generar facturas"
                state={modalErrorState}
                accept={() => changeModalErrorState(!modalErrorState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al agregar sanción"
                state={modalAddErrorState}
                accept={() => changeModalAddErrorState(!modalAddErrorState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al registrar sanciones"
                state={modalChargesErrorState}
                accept={() => changeModalChargesErrorState(!modalChargesErrorState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al generar facturas"
                state={modalErrorGenerateInvoivesState}
                accept={() => changeModalErrorGenerateInvoivesState(!modalErrorGenerateInvoivesState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al crear periodo de facturación"
                state={modalErrorGenerateInvoivesState}
                accept={() => changeModalErrorGenerateBillingPeriodState(!modalErrorGenerateBillingPeriodState)}
            />
            <ModalActionPerformed
                img={warningIcon}
                title="Error al crear obtener facturas creadas"
                state={modalErrorInvoicesPeriodState}
                accept={() => changeModalErrorInvoicesPeriodState(!modalErrorInvoicesPeriodState)}
            />
        </div>
    )
}