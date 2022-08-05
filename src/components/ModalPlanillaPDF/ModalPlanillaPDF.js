import styled from "styled-components"
import { Document, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer"
import "./ModalPlanillaPDF.css"

const styles = StyleSheet.create({
    page: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    pageTable: {
        padding: '20px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    viewTitle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    titleTable: {
        fontSize: "20px",
        color: "#000000"
    },
    row: {
        flexDirection: 'row',
        borderColor: '#000000',
        borderWidth: 2,
        alignItems: 'center',
        height: '35px',
        fontStyle: 'bold',
        margin: -1,
        fontSize: 16
    },
    rowHeader: {
        marginTop: 10
    },
    col: {
        height: '32px',
        borderRightColor: '#000000',
        borderRightWidth: 2,
        padding: 5
    },
    enrollment: {
        width: '25%',
    },
    subscriber: {
        width: '50%',
    },
    signature: {
        padding: 5,
        width: '25%',
        height: '32px'
    },
    tableHeader: {
        textAlign: 'center',
        backgroundColor: '#00CCFF',
    }
})

let generatedInvoiceList = []

export default function ModalPlanillaPDF({state, invoiceList, closeFunction, backFunction}) {
    generatedInvoiceList = invoiceList
    let invoiceListGachanzuca = []
    let invoiceListGaribay = []
    let invoiceListManga = []

    if (generatedInvoiceList.length > 0) {
        generatedInvoiceList.map(invoice => {
            switch (invoice[0].vereda) {
                case 'Gachanzuca':
                    invoiceListGachanzuca.push(invoice[0])
                    break;
                case 'Garibay':
                    invoiceListGaribay.push(invoice[0])
                    break;
                case 'Manga':
                    invoiceListManga.push(invoice[0])
                    break;
                default:
                    break;
            }
        })
    }

    function sort_by_key(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    sort_by_key(invoiceListGachanzuca, 'nombre_suscriptor')
    sort_by_key(invoiceListGaribay, 'nombre_suscriptor')
    sort_by_key(invoiceListManga, 'nombre_suscriptor')

    const functionPlanilla = (list, sidewalk) => {
        return(
        list.length > 0 ?
            <Page size="A4" style={styles.pageTable}>
                <View fixed style={styles.viewTitle}>
                    <Text style={styles.titleTable}>Lista de usuarios</Text>
                    <Text style={styles.titleTable}>Vereda {sidewalk}</Text>
                    <Text style={styles.titleTable}>Entrega de recibos {list[0].periodo_facturado}</Text>
                </View>
                <View style={styles.table}>
                    <View fixed style={[styles.row, styles.rowHeader]}>
                        <Text style={[styles.enrollment, styles.col, styles.tableHeader]}>Matrícula</Text>
                        <Text style={[styles.subscriber, styles.col, styles.tableHeader]}>Suscriptor</Text>
                        <Text style={[styles.signature, styles.tableHeader]}>Firma</Text>
                    </View>
                    {list.length > 0 ? list.map(invoice => {
                        return (
                            <View style={styles.row}>
                                <Text style={[styles.enrollment, styles.col]}>{invoice.numero_matricula}</Text>
                                <Text style={[styles.subscriber, styles.col]}>{invoice.nombre_suscriptor}</Text>
                                <Text style={styles.signature}></Text>
                            </View>
                        )
                    }):<></>}
                </View>
            </Page>
            :
            <></>
        )
    }

    return (
        <>
            {state &&
                <Overlay>
                    <ModalContainer>
                        <PDFViewer style={{width: "700px", height: "500px"}}>
                            <Document>
                                {functionPlanilla(invoiceListGachanzuca, 'Gachanzuca')}
                                {functionPlanilla(invoiceListGaribay, 'Garibay')}
                                {functionPlanilla(invoiceListManga, 'Manga')}
                            </Document>
                        </PDFViewer>
                        <div className="div-buttons-planilla-pdf">
                            <button onClick={() => {closeFunction()}} className="finish-invoicing-button">Terminar</button>
                            <button onClick={() => {backFunction()}} className="finish-invoicing-button">Atras</button>
                        </div>
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
    padding-inline: 20px;
    padding-block: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
`;