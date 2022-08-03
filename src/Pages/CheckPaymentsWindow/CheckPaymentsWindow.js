import { useState } from "react";
import { useNavigate } from "react-router-dom"
import backIcon from "../../assets/images/back.svg"
import invoicingIcon from "../../assets/images/invoice.svg"
import warningIcon from "../../assets/images/warning.svg"
import { ModalActionPerformed } from "../../components/ModalActionPerformed/ModalActionPerformed";
import { getDateActualInvoicePeriod, getDateLastInvoicePeriod, getinvoicesLastPeriodList, paidInvoices } from "../../services/InvoiceService"
import { getPayment, getPaymentTypes, getPaymentTypesList } from "../../services/PaymentsService";
import "./CheckPaymentsWindow.css"

let invoicesLastPeriod = []
let actualInvoicePeriod = ""
let lastInvoicePeriod = ""

export function CheckPaymentsWindow () {

    invoicesLastPeriod = getinvoicesLastPeriodList()
    invoicesLastPeriod.map(invoice => {
        invoice.not_make_payment = false
    })
    actualInvoicePeriod = getDateActualInvoicePeriod()
    lastInvoicePeriod = getDateLastInvoicePeriod()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const [modalErrorState, changeModalErrorState] = useState(false);

    const navigate =  useNavigate()

    const handleClickInvoicing = () => {
        navigate('/admin/facturacion')
    }

    const handleClickRegisterPayments = () => {
        let paymentList = []
        invoicesLastPeriod.map(invoice => {
            if (!invoice.not_make_payment) {
                paymentList.push(invoice.id_factura)
            }
        })
        const invoicePaymentList = {
            payment_list: paymentList
        }
        paidInvoices(invoicePaymentList)
        .then(res => {
            if (res.data.ok) {
                getPaymentTypes()
                .then(resPaymentTypes => {
                    if (resPaymentTypes) {
                        getPayment(getPaymentTypesList()[0].tipo_cobro)
                        .then(resPayment => {
                            navigate('/admin/registrar-sanciones')
                        })
                        .catch(err => {
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
        <div className="check-payments">
            <input type="image" src={backIcon} width={40} onClick={handleClickInvoicing} className="button-back"/>
            <img src={invoicingIcon} width={100} className="invoicing-icon"/>
            <p className="check-payments-title"><b>Periodo actual de facturación: {actualInvoicePeriod}</b></p>
            <p className="table-payments-title"><b>Verificación de pagos periodo {lastInvoicePeriod}</b></p>
            <div className="table-check-payments">
                <table>
                    <thead>
                        <tr>
                            <th>N° de Factura</th>
                            <th>N° matricula</th>
                            <th>Nombre del suscriptor</th>
                            <th>Dirección</th>
                            <th>Valor factura</th>
                            <th>No pagó</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoicesLastPeriod.length > 0 ? invoicesLastPeriod.map(invoice => {
                                return (
                                    <tr key={invoice.id_factura}>
                                        <td>{invoice.id_factura}</td>
                                        <td>{invoice.id_matricula}</td>
                                        <td>{invoice.subscriber}</td>
                                        <td>{invoice.direccion_suscriptor}</td>
                                        <td>{formatter.format(invoice.valor_total_factura)}</td>
                                        <td><input className="check-payment" type="checkbox" onChange={(e) => invoice.not_make_payment = e.target.checked}/></td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <button
                className="check-payment-continue-button"
                onClick={handleClickRegisterPayments}
            >
            Continuar
            </button>
            <ModalActionPerformed
                img={warningIcon}
                title="Error al verificar pagos"
                state={modalErrorState}
                accept={() => changeModalErrorState(!modalErrorState)}
            />
        </div>
    )
}