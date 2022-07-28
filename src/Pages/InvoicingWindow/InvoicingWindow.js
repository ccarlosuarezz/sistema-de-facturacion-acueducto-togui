import { useState } from "react";
import { useNavigate } from "react-router-dom"
import invoicingIcon from "../../assets/images/invoice.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed";
import { getDateActualInvoicingPeriod, getDateLastInvoicingPeriod, getInvoiceLastPeriod } from "../../services/InvoiceService";
import "./InvoicingWindow.css"

export function InvoicingWindow () {

    const disabledButton = true;
    const disabledButton2 = false;

    const [modalErrorState, changeModalErrorState] = useState(false);

    const navigate =  useNavigate()

    const handleClickBillingPeriod = () => {
        getInvoiceLastPeriod()
        .then(res => {
            if (res) {
                getDateActualInvoicingPeriod()
                .then(resActualPeriod => {
                    if (resActualPeriod) {
                        getDateLastInvoicingPeriod()
                        .then(resLastPeriod => {
                            if (resLastPeriod) {
                                navigate('/admin/verificar-pagos')
                            }
                        })
                        .catch(err => {
                            changeModalErrorState(!modalErrorState)
                            console.log(err)        
                        })
                    }
                })
                .catch(err => {
                    changeModalErrorState(!modalErrorState)
                    console.log(err)
                })
            }
        })
        .catch(err => {
            changeModalErrorState(!modalErrorState)
            console.log(err)
        })
    }

    return (
        <div className="invoicing">
            <img src={invoicingIcon} width={100} className="invoicing-icon"/>
            <p className="invoicing-title"><b>Facturación</b></p>
            <div className="invoicing-buttons">
                <button
                    disabled={true}
                    className={disabledButton ? "disable-button-invicing": ""}
                    onClick={() => console.log('1')}
                >
                    Generar factura
                </button>
                <button
                    disabled={true}
                    className={disabledButton ? "disable-button-invicing": ""}
                    onClick={() => console.log('2')}
                >
                    Consultar factura
                </button>
                <button
                    disabled={true}
                    className={disabledButton ? "disable-button-invicing": ""}
                    onClick={() => console.log('3')}
                >
                    Registrar cobros
                </button>
                <button
                    disabled={false}
                    className={disabledButton2 ? "disable-button-invicing": ""}
                    onClick={handleClickBillingPeriod}
                >
                    Periodo de facturación
                </button>
            </div>
            <ModalActionPerformed
                img={warningIcon}
                title="Error al generar periodo de facturación"
                state={modalErrorState}
                accept={() => changeModalErrorState(!modalErrorState)}
            />
        </div>
    )
}