import { useState } from "react";
import { useNavigate } from "react-router-dom";
import invoicingIcon from "../../assets/images/invoice.svg"
import ModalInvoicesPDF from "../../components/ModalInvoicesPDF/ModalInvoicesPDF";
import { getDateActualInvoicePeriod, getGeneratedInvoiceList, getinvoicesLastPeriodList } from "../../services/InvoiceService";
import "./GeneratedInvoicesWindow.css"

let actualInvoicePeriod = ''
let invoiceList = []
let invoicesLastPeriod = []
let totalInvoices = 0

export function GeneratedInvoicesWindow () {

    actualInvoicePeriod = getDateActualInvoicePeriod()
    invoicesLastPeriod = getinvoicesLastPeriodList()
    invoiceList = getGeneratedInvoiceList()
    totalInvoices = invoiceList.length;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const [modalPDFstate, setModalPDFstate] = useState(false);

    const navigate =  useNavigate()

    const handleClickPrintInvoices = () => {
        setModalPDFstate(!modalPDFstate)
    }

    const handleClickInvoicingFinish = () => {
        setModalPDFstate(!modalPDFstate)
        invoiceList = []
        invoicesLastPeriod = []
        totalInvoices = 0
        actualInvoicePeriod = ''
        navigate('/admin/facturacion')
    }

    return (
        <div className="generated-invoices">
            <img src={invoicingIcon} width={100} className="invoicing-icon"/>
            <p className="check-payments-title"><b>Periodo actual de facturación: {actualInvoicePeriod}</b></p>
            <div className="div-table-invoices-generated">
                <p className="table-invoices-title"><b>{totalInvoices} facturas generadas</b></p>
                <table className="table-generated-invoices">
                    <thead>
                        <tr>
                            <th className="row-invoice-number">N° de factura</th>
                            <th className="row-enrollment-number">N° matricula</th>
                            <th className="row-invoice-subscriber">Suscriptor</th>
                            <th className="row-invoice-address">Dirección</th>
                            <th className="row-invoive-total">Valor</th>
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
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
            <button onClick={handleClickPrintInvoices} className="print-invoices-button">Imprimir</button>
            <ModalInvoicesPDF
                state={modalPDFstate}
                invoiceList={invoiceList}
                closeFunction={handleClickInvoicingFinish}
            />
        </div>
    )
}